/**
 * AI generation function using OpenAI.
 * Install deps:
 *   npm install openai express body-parser
 *
 * Environment variable required:
 *   OPENAI_API_KEY
 *
 * Run locally:
 *   node index.js
 */
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY not found. Function will return fallback responses.');
}

const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

function buildPrompt({ niche, platform, language = 'English', tone = 'informal' }) {
  return `
You are a senior content strategist. Generate 8 content ideas for the niche: "${niche}" targeting platform: ${platform}.
Return strictly JSON: an object with a single key "ideas" which is an array of objects with fields:
title (string), hooks (string[]), snippet (string), keywords (string[]), hashtags (string[]), estimated_virality_score (number).
Example:
{"ideas":[{"title":"...","hooks":["..."],"snippet":"...","keywords":["..."],"hashtags":["..."],"estimated_virality_score":75}]}
`;
}

app.post('/generate', async (req, res) => {
  const { niche, platform } = req.body || {};
  if (!niche || !platform) return res.status(400).json({ error: 'niche and platform required' });

  const prompt = buildPrompt({ niche, platform });

  if (!OPENAI_API_KEY) {
    return res.json({
      ideas: [
        { title: `Fallback: Top 5 ${niche}`, hooks: ['Quick list','Must watch','Save this'], snippet: 'Fallback due to missing API key', keywords: [niche,'tools'], hashtags: ['#fallback'], estimated_virality_score: 30 }
      ]
    });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a JSON-only assistant. Output only JSON.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 700,
      temperature: 0.8
    });

    const text = completion.data.choices?.[0]?.message?.content || completion.data.choices?.[0]?.text || '';
    // Extract JSON
    const firstBrace = text.indexOf('{');
    const jsonText = firstBrace >= 0 ? text.slice(firstBrace) : text;
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (e) {
      const m = text.match(/\{[\s\S]*\}/);
      if (m) parsed = JSON.parse(m[0]);
      else throw new Error('Failed to parse AI response as JSON. Response: ' + text.slice(0,500));
    }

    return res.json(parsed);
  } catch (err) {
    console.error('OpenAI error', err);
    return res.status(500).json({ error: 'AI generation failed', details: String(err) });
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () => console.log('AI function listening on', port));
