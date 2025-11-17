export class GeneratorService {
  async generate(params:any) {
    // Calls backend AI generation endpoint defined in environment.aiEndpoint
    try {
      const resp = await fetch((globalThis as any).APP_ENV?.aiEndpoint || '/functions/generate/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error('AI endpoint error: ' + txt);
      }
      const json = await resp.json();
      return json;
    } catch (err) {
      console.error('GeneratorService.generate error', err);
      // Fallback: return stubbed ideas
      return {
        ideas: [
          { title: `Top 5 ${params.niche} tools in 2025 (stub)`, snippet: 'Fallback hook + formats' },
          { title: `${params.niche} growth hacks (stub)`, snippet: 'Fallback script + hook' }
        ]
      };
    }
  }
}
