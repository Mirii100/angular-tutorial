import { Component, signal, computed, effect, ChangeDetectionStrategy, EventEmitter, Output, Input, ElementRef, ViewChild, inject, EnvironmentInjector, ComponentRef } from '@angular/core';
import { createComponent } from '@angular/core';


@Component({
  selector: 'app-card',
  standalone: true,
  template: `<div class="card" (click)="clicked.emit()">{{title}}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  @Input() title = 'Card';
  @Output() clicked = new EventEmitter<void>();
}



@Component({
  selector: 'app-control-flow',
  imports: [],
  templateUrl: './control-flow.html',
  styleUrl: './control-flow.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlFlow {

  @ViewChild('host', { read: ElementRef }) host!: ElementRef<HTMLElement>;
  env: EnvironmentInjector = inject(EnvironmentInjector);
  ref: ComponentRef<Card> | null = null;



  show = signal(true);
  items = signal(['One', 'Two', 'Three']);
  reset() { this.items.set(['One', 'Two', 'Three']); }

  count = signal(0);
  double = computed(() => this.count() * 2);
  a = signal(2);
  b = signal(3);
  sum = computed(() => this.a() + this.b());


  constructor() {
    effect(() => console.log('count =', this.count()));
    this.count.update(n => n + 1);

    effect(() => console.log('sum =', this.sum()));
  }


  incA() { this.a.update(n => n + 1); }

  incB() { this.b.update(n => n + 1); }

  inc() { this.count.update(n => n + 1); }




  mount() {
    if (this.ref) return;
    this.ref = createComponent(Card, {
      environmentInjector: this.env,
      hostElement: this.host.nativeElement
    });
    this.ref.setInput?.('title', 'Hello from Dynamic');
    this.ref.instance.clicked.subscribe(() => alert('Card clicked'));
  }
  update() {
    if (!this.ref) return;
    this.ref.setInput?.('title', 'Updated Title ' + new Date().toLocaleTimeString());
  }
  unmount() {
    this.ref?.destroy();
    this.ref = null;
  }


}

class Demo {
  count = signal(0);
  items = signal([{ id: 1, label: 'A' }]);
  add() { this.items.update(a => [...a, { id: Date.now(), label: 'N' }]); }

  inc() { this.count.set(this.count() + 1); }
}

