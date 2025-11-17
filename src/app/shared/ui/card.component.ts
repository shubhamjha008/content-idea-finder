import { Component } from '@angular/core';

@Component({
  selector: 'ui-card',
  template: `<div class="p-4 border rounded bg-white"><ng-content></ng-content></div>`
})
export class CardComponent {}
