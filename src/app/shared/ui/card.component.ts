
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  template: `<div class="p-4 border rounded bg-white"><ng-content></ng-content></div>`
})
export class CardComponent {
  @Input() title = '';
}
