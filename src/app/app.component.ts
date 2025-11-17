
import { Component } from '@angular/core';
import { GeneratorComponent } from './features/generator/generator.component';
import { AuthComponent } from './features/auth/auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GeneratorComponent, AuthComponent],
  template: `
    <div class="min-h-screen bg-slate-50 text-slate-900 p-6">
      <header class="max-w-4xl mx-auto mb-6">
        <h1 class="text-3xl font-semibold">Content Idea Finder</h1>
        <p class="text-slate-600">Angular 17 starter — Supabase & AI stubs included.</p>
      </header>

      <main class="max-w-4xl mx-auto">
        <app-auth class="mb-6"></app-auth>
        <app-generator></app-generator>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {}
