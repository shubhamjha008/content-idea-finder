
export class GeneratorService {
  async generate(params: {niche:string, platform:string}) {
    // This is a local stub. Replace with backend API call.
    await new Promise(r => setTimeout(r, 400));
    return {
      ideas: [
        { title: `Top 5 ${params.niche} tools in 2025`, snippet: 'Short hook + 3 variants' },
        { title: `How to use ${params.niche} for fast growth`, snippet: 'Short hook + script' }
      ]
    };
  }
}
