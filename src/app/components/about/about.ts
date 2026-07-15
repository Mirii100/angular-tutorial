import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
  standalone: true
})
export class About {
  status = signal<'loading' | 'success' | 'error' | string>('loading');
  // angular lists 

  items = signal(['Angular', 'React', 'Vue']);
  add() { this.items.update(arr => [...arr, 'Svelte']); }
  clear() { this.items.set([]); }
  reset() { this.items.set(['Angular', 'React', 'Vue']); }

  //end of angular list component and tutorial

  //   Lists with track (@for)
  // On list changes, Angular reconciles DOM rows with data items.
  // track provides a stable identity (e.g., an id) to minimize DOM churn and preserve focus/inputs.
  // Legacy equivalence: With *ngFor, use trackBy to achieve the same effect

  // syntax: @for (item of items(); track item.id) { ... } @empty { ... }
  // @for (it of items(); track it.id) { <li>{{ it.name }}</li> } @empty { <li>No items</li> }

  myitems = signal([
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' }
  ]);
  nextId = 4;

  renameFirst() {
    this.myitems.update(arr => arr.map((it, i) => i === 0 ? { ...it, name: it.name + ' *' } : it));
  }

  shuffle() {
    this.myitems.update(arr => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });
  }

  addition() {
    this.myitems.update(arr => [...arr, { id: this.nextId++, name: 'New ' + Date.now() }]);
  }

  // items = signal([{ name: 'Angular', price: 0 }, { name: 'React', price: 0 }]);
  query = signal('');
  sortKey = signal<'name' | 'price'>('name');
  sortDir = signal<1 | -1>(1);

  view = computed(() => {
    const q = this.query().toLowerCase();
    const dir = this.sortDir();
    const key = this.sortKey();
    return this.myitems()
      .filter(it => it.name.toLowerCase().includes(q))
      .sort((a, b) => {
        const av: any = (a as any)[key];
        const bv: any = (b as any)[key];
        return av < bv ? -1 * dir : av > bv ? 1 * dir : 0;
      });
  });
}
