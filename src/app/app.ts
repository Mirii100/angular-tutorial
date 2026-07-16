import { Component, signal, Directive, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

type Item = { id: number; name: string };

@Directive({
  selector: '[w3Highlight]',
  standalone: true,
})
export class W3HighlightDirective {
  @HostBinding('style.backgroundColor') backgroundColor?: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = '';
  }
}

@Component({
  selector: 'counter-button',
  standalone: true,
  template: `
    <button class="btn-primary btn-sm" (click)="inc()">Clicked {{ count }} times</button>
  `,
})
export class CounterButton {
  @Input() step = 1;
  @Output() clicked = new EventEmitter<number>();
  count = 0;

  inc() {
    this.count += this.step;
    this.clicked.emit(this.count);
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule, W3HighlightDirective, CounterButton],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
})
export class App {
  protected readonly title = signal('Angular Lecture');

  expandedSections = new Set<string>();

  toggleSection(id: string) {
    if (this.expandedSections.has(id)) {
      this.expandedSections.delete(id);
    } else {
      this.expandedSections.add(id);
    }
  }

  isExpanded(id: string) {
    return this.expandedSections.has(id);
  }

  codeInterpolation = `{{ expression }}

<p>Hello {{ name }}!</p>
<p>3 + 4 = {{ 3 + 4 }}</p>
<p>Array item: {{ items[0] }}</p>`;

  codePropertyBinding = `<input [value]="propertyName">
<img [src]="imageUrl">
<button [disabled]="isDisabled">`;

  codeEventBinding = `<button (click)="handler()">Click</button>
<input (input)="onInput($event)">
<input (keyup.enter)="onSubmit()">
<select (change)="onChange($event)">`;

  codeTwoWayBinding = `<input [value]="name" (input)="name = $event.target.value">
<select [value]="favorite" (change)="favorite = $event.target.value">`;

  codeNgIf = `<div *ngIf="condition">Visible when true</div>

<ng-container *ngIf="condition; else fallback">
  <p>Condition is true</p>
</ng-container>
<ng-template #fallback>
  <p>Condition is false</p>
</ng-template>

<!-- then / else -->
<ng-container *ngIf="ok; then tplA; else tplB"></ng-container>`;

  codeNgFor = `<li *ngFor="let item of items">{{ item }}</li>

<!-- with index -->
<tr *ngFor="let person of names; let i = index">
  <td>{{ i + 1 }}</td>
</tr>

<!-- with trackBy for performance -->
<li *ngFor="let it of items; trackBy: trackById">{{ it.name }}</li>

// trackBy function
trackById(index: number, item: Item) { return item.id; }`;

  codeAttrBinding = `<td [attr.colspan]="wide ? 2 : 1">Merged cell</td>
<button [attr.aria-label]="label">Accessible button</button>
<table [attr.title]="dynamicTitle">...</table>`;

  codePipes = `<p>{{ today | date:'shortDate' }}</p>
<p>{{ price | currency:'USD' }}</p>
<p>{{ ratio | number:'1.2-4' }}</p>
<p>{{ name | uppercase }}</p>

// Method calls work too (no pipe needed):
<p>{{ value.toFixed(2) }}</p>
<p>{{ today.getFullYear() }}</p>`;

  codeDirectives = `// Directive definition
@Directive({ selector: '[w3Highlight]', standalone: true })
export class W3HighlightDirective {
  @HostBinding('style.backgroundColor') bg?: string;
  @HostListener('mouseenter') onEnter() { this.bg = 'yellow'; }
  @HostListener('mouseleave') onLeave() { this.bg = ''; }
}

// Usage in template
<div w3Highlight="lightyellow">Hover me</div>`;

  codeComponentComm = `// Child component
@Component({ selector: 'counter-button', standalone: true, ... })
export class CounterButton {
  @Input() step = 1;
  @Output() clicked = new EventEmitter<number>();
  count = 0;
  inc() {
    this.count += this.step;
    this.clicked.emit(this.count);
  }
}

// Parent template
<counter-button [step]="5" (clicked)="onChildClicked($event)">
</counter-button>`;

  codeDebounce = `<!-- Manual debounce with setTimeout -->
<input (input)="onInput($event)">
<p>Immediate: {{ immediate }}</p>
<p>Debounced (400ms): {{ debounced }}</p>

<!-- keyup.enter modifier -->
<input (keyup.enter)="addItem()" />

// Component method
onInput(e: Event) {
  const v = (e.target as HTMLInputElement).value;
  this.immediate = v;
  clearTimeout(this.handle);
  this.handle = setTimeout(() => this.debounced = v, 400);
}`;

  points = [1, 2, 3, 7, 'jane', 6];
  firstName = '';
  lastName = '';
  count = 0;
  isDisabled = true;
  favorite: any;
  span = 1;
  titleLocal: any;

  clickMe(firstName: string, lastName: string) {
    if (firstName === '' || lastName === '') {
      alert('Please enter both first name and last name.');
      return;
    } else {
      alert('Hello ' + firstName + ' ' + lastName);
    }
  }

  quantity: number | undefined;
  price: number | undefined;

  names = [
    { name: 'Jani', country: 'Norway' },
    { name: 'Hege', country: 'Sweden' },
    { name: 'Kai', country: 'Denmark' },
  ];

  today = new Date();
  name = this.names[0].name;
  ratio = 0.756;

  wide = true;
  get label() {
    return this.wide ? 'Table is wide' : 'Table is narrow';
  }
  toggle() {
    this.wide = !this.wide;
  }

  loggedIn = false;
  user = 'Angular User';
  hasAccess = true;

  lastCount = 0;
  onChildClicked(n: number) {
    this.lastCount = n;
  }

  immediate = '';
  debounced = '';
  private handle: any;

  onInput1(e: Event) {
    const v = (e.target as HTMLInputElement)?.value ?? '';
    this.immediate = v;
    clearTimeout(this.handle);
    this.handle = setTimeout(() => (this.debounced = v), 400);
  }

  value = '';
  lastKey = '';

  items: Item[] = [
    { id: 1, name: 'Alpha' },
    { id: 2, name: 'Beta' },
    { id: 3, name: 'Gamma' },
  ];

  increment() {
    this.count++;
  }

  onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }

  shuffle() {
    this.items = [...this.items].reverse();
  }

  trackById(_i: number, it: Item) {
    return it.id;
  }

  draft = '';
  todoItems = ['Buy milk', 'Learn Angular'];

  add() {
    const v = (this.draft || '').trim();
    if (!v) return;
    this.todoItems = [...this.todoItems, v];
    this.draft = '';
  }

  clear() {
    this.todoItems = [];
  }
}
