import { Component, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CounterService {
  value = 0;
  inc() { this.value++; }
  dec() { this.value--; }
  reset() { this.value = 0; }
}

@Component({
  selector: 'counter-a',
  standalone: true,
  template: `
    <div class="counter-card">
      <h4>Counter A</h4>
      <p class="value">{{ counter.value }}</p>
      <div class="counter-actions">
        <button class="btn-primary" (click)="counter.inc()">+1</button>
        <button class="btn-secondary" (click)="counter.dec()">-1</button>
      </div>
    </div>
  `,
})
export class CounterA {
  constructor(public counter: CounterService) {}
}

@Component({
  selector: 'counter-b',
  standalone: true,
  template: `
    <div class="counter-card">
      <h4>Counter B</h4>
      <p class="value">{{ counter.value }}</p>
      <div class="counter-actions">
        <button class="btn-primary" (click)="counter.inc()">+1</button>
        <button class="btn-secondary" (click)="counter.dec()">-1</button>
      </div>
    </div>
  `,
})
export class CounterB {
  constructor(public counter: CounterService) {}
}

@Component({
  selector: 'app-counters',
  imports: [RouterModule, CounterA, CounterB],
  templateUrl: './counters.html',
  styleUrl: './counters.css',
  standalone: true,
})


export class Counters {
  constructor(public counter: CounterService) {}
}
