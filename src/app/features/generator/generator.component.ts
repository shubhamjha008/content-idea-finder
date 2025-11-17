import { Component } from '@angular/core';
import { GeneratorService } from './generator.service';

@Component({
  selector: 'app-generator',
  template: `
    <section class="bg-white p-6 rounded shadow">
      <h2 class="text-xl mb-2">Idea Generator</h2>
      <form (submit)="generate($event)" class="space-y-3">
        <input [(ngModel)]="niche" name="niche" placeholder="Niche e.g. Productivity" class="border rounded px-2 py-1 w-full" />
        <div class="flex gap-2">
          <select [(ngModel)]="platform" name="platform" class="border rounded px-2 py-1">
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
            <option value="blog">Blog</option>
          </select>
          <button class="ml-auto bg-teal-600 text-white px-4 py-2 rounded">Generate</button>
        </div>
      </form>

      <div *ngIf="ideas.length" class="mt-4 grid gap-3">
        <div *ngFor="let it of ideas" class="p-3 border rounded">
          <h3 class="font-semibold">{{it.title}}</h3>
          <p class="text-slate-600">{{it.snippet}}</p>
        </div>
      </div>
    </section>
  `
})
export class GeneratorComponent {
  niche = 'AI tools';
  platform = 'youtube';
  ideas: any[] = [];
  private svc = new GeneratorService();

  async generate(e:any) {
    e.preventDefault();
    const res = await this.svc.generate({niche: this.niche, platform: this.platform});
    this.ideas = res.ideas || [];
  }
}
