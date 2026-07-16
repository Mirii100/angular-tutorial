import { Component, signal, Directive, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


type Item = { id: number; name: string };

@Directive({
  selector: '[w3Highlight]',
  standalone: true
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
  selector: 'app-root',
  imports: [RouterModule, CommonModule, W3HighlightDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true
})
export class App {

  protected readonly title = signal('Angular lecture during attachment');

  points = [1, 2, 3, 7, 'jane', 6];
  firstName = '';
  lastName = '';
  x: any;
  count = 0;
  isDisabled = true;
  favorite: any;
  span = 1
  titleLocal: any;
  clickMe(firstName: string, lastName: string) {
    if (firstName === '' || lastName === '') {
      alert('Please enter both first name and last name.');
      return;
    }
    else {
      alert('Hello ' + firstName + ' ' + lastName);
      console.log('Hello ' + firstName + ' ' + lastName);
    }
  }
  quantity: number | undefined;
  price: number | undefined;

  names = [
    { name: 'Jani', country: 'Norway' },
    { name: 'Hege', country: 'Sweden' },
    { name: 'Kai', country: 'Denmark' }]


  today = new Date();
  name = this.names[0].name;// for loop this names 
  ratio = 0.756;

  wide = true;
  get label() { return this.wide ? 'Table is wide' : 'Table is narrow'; }
  toggle() { this.wide = !this.wide; }

  loggedIn = false;
  user = 'Angular User';
  hasAccess = true;
  //
  lastCount = 0;
  /** @param {number} n */
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
    this.handle = setTimeout(() => this.debounced = v, 400);
  }
  value = '';
  lastKey = '';

  items: Item[] = [
    { id: 1, name: 'Alpha' },
    { id: 2, name: 'Beta' },
    { id: 3, name: 'Gamma' }
  ];

  increment() { this.count++; }
  onInput(e: Event) { this.value = (e.target as HTMLInputElement).value; }


  shuffle() {
    this.items = [...this.items].reverse();
  }
  trackById(_i: number, it: Item) { return it.id; }

  draft = '';
  todoItems = ['Buy milk', 'Learn Angular'];

  add() {
    const v = (this.draft || '').trim();
    if (!v) return;
    this.todoItems = [...this.todoItems, v];
    this.draft = '';
  }
  clear() { this.todoItems = []; }
}

@Component({
  selector: 'counter-button',
  standalone: true,
  template: `
    <button (click)="inc()">Clicked {{ count }} times</button>
  `
})
export class CounterButton {
  @Input() step = 1;
  @Output()
  /** @type {import('@angular/core').EventEmitter<number>} */
  clicked = new EventEmitter();
  count = 0;
  inc() {
    this.count += this.step;
    this.clicked.emit(this.count);
  }



}
