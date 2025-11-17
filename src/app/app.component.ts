import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900 p-6">
      <header class="max-w-5xl mx-auto mb-6">
        <h1 class="text-3xl font-semibold">Content Idea Finder</h1>
        <p class="text-slate-600">Angular 17 - Full SaaS starter (AI-enabled)</p>
      </header>

      <main class="max-w-5xl mx-auto space-y-6">
        <app-auth></app-auth>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}
