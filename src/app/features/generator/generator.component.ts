
import { Component, inject, signal } from '@angular/core';
import { GeneratorService } from './generator.service';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [],
  template: `
    <section class="bg-white p-6 rounded-lg shadow">
      <form (submit)="onGenerate($event)" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700">Niche</label>
          <input [(ngModel)]="niche" name="niche" class="mt-1 block w-full rounded border px-3 py-2" placeholder="e.g. Personal Finance"/>
        </div>
        <div class="flex gap-2">
          <select [(ngModel)]="platform" name="platform" class="rounded border px-3 py-2">
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
            <option value="blog">Blog</option>
          </select>
          <button class="ml-auto bg-teal-600 text-white px-4 py-2 rounded">Generate</button>
        </div>
      </form>

      <div *ngIf="ideas.length" class="mt-6 grid gap-4">
        <div *ngFor="let idea of ideas" class="p-4 border rounded">
          <h3 class="font-semibold">{{idea.title}}</h3>
          <p class="text-sm text-slate-600">{{idea.snippet}}</p>
        </div>
      </div>
    </section>
  `,
  providers: [GeneratorService]
})
export class GeneratorComponent {
  niche = 'AI tools';
  platform = 'youtube';
  ideas: any[] = [];
  private svc = inject(GeneratorService);

  onGenerate(e: Event) {
    e.preventDefault();
    this.svc.generate({niche: this.niche, platform: this.platform}).then(r => {
      this.ideas = r.ideas || [];
    }).catch(err => {
      console.error(err);
      alert('Failed to generate (stub)');
    });
  }
}
