import { Component } from '@angular/core';

@Component({
  selector: 'app-planner',
  template: `
    <section class="bg-white p-6 rounded shadow">
      <h2 class="text-xl">Weekly Planner</h2>
      <p class="text-sm text-slate-600">Export your 7-day content plan (stub)</p>
      <button class="mt-3 bg-teal-600 text-white px-3 py-1 rounded" (click)="export()">Export CSV</button>
    </section>
  `
})
export class PlannerComponent {
  export() {
    const csv = 'day,idea\nMonday,Test idea';
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'planner.csv'; a.click();
    URL.revokeObjectURL(url);
  }
}
