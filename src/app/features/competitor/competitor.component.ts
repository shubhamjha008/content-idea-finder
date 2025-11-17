import { Component } from '@angular/core';

@Component({
  selector: 'app-competitor',
  template: `
    <section class="bg-white p-6 rounded shadow">
      <h2 class="text-xl">Competitor Analyzer (stub)</h2>
      <p class="text-sm text-slate-600">Enter a username to fetch top posts and patterns.</p>
      <form (submit)="analyze($event)" class="mt-3">
        <input [(ngModel)]="handle" name="handle" placeholder="@username" class="border rounded px-2 py-1" />
        <button class="ml-2 bg-teal-600 text-white px-3 py-1 rounded">Analyze</button>
      </form>

      <div *ngIf="insights" class="mt-3 p-3 border rounded">
        <pre>{{insights | json}}</pre>
      </div>
    </section>
  `
})
export class CompetitorComponent {
  handle = '';
  insights: any = null;

  analyze(e:any) {
    e.preventDefault();
    this.insights = { topFormats: ['list','story'], avgLength: '30s', sample: 'How I saved $500' };
  }
}
