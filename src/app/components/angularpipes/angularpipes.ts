import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titlecase2', standalone: true })
export class TitleCase2Pipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .split(/\s+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }
}

@Component({
  selector: 'app-angularpipes',
  imports: [CommonModule, FormsModule, TitleCase2Pipe],
  templateUrl: './angularpipes.html',
  styleUrl: './angularpipes.css',
})
export class Angularpipes {
  title = 'Angular Pipes';
  price = 1234.5;
  today = new Date();
  percent = 0.3495;

  time$ = interval(1000).pipe(map(() => new Date()));
  users$ = of([{ name: 'Alice' }, { name: 'Bob' }, { name: 'Carol' }]).pipe(delay(1200));

  text = 'hello and welcome to angular pipes tutorial';

  // Syntax reference
  codeSyntax = `// Basic syntax
{{ value | pipeName }}

// With arguments
{{ value | pipeName:'arg1':'arg2' }}

// Chaining pipes
{{ value | pipeA | pipeB:'arg' }}

// In a component (standalone)
@Component({
  imports: [CommonModule]
})
export class MyComponent {
  price = 9.99;
}

// Template
<p>{{ price | currency:'USD' }}</p>`;

  // String pipe demos
  strInput = 'hello world from angular';

  // Number pipe demos
  numValue = 1234567.891;

  // Date pipe demos
  dateValue = new Date();

  // Currency pipe demos
  currencyValue = 1234.5;

  // Json pipe demos
  jsonObject = { name: 'Alice', age: 30, skills: ['Angular', 'TypeScript'] };

  // Chaining demo
  chainText = 'hello world';

  // Custom pipe reference code
  codeCustomPipe = `import { Pipe, PipeTransform } from '@angular/core';

&#64;Pipe({
  name: 'titlecase2',
  standalone: true    // no NgModule needed
})
export class TitleCase2Pipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .split(/\\s+/)
      .map(w =&gt;
        w.charAt(0).toUpperCase() +
        w.slice(1).toLowerCase()
      )
      .join(' ');
  }
}

// Usage in a component:
&#64;Component({
  selector: 'app-demo',
  imports: [TitleCase2Pipe],
  template: \`
    &lt;p&gt;{{ text | titlecase2 }}&lt;/p&gt;
  \`
})
export class DemoComponent {
  text = 'hello world';
}`;
}
