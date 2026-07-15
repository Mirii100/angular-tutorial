import { Component,signal } from '@angular/core';

@Component({
  selector: 'app-conditional-rendering',
  imports: [],
  templateUrl: './conditional-rendering.html',
  styleUrl: './conditional-rendering.css',
})
export class ConditionalRendering {
  showMessage = true;
show = signal(true);
}
