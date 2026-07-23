import { Component, InjectionToken, signal, effect, ChangeDetectionStrategy, computed, EventEmitter, Output, Input, ElementRef, ViewChild, inject, EnvironmentInjector, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createComponent } from '@angular/core';
import { provideHttpClient, withInterceptors, HttpClient, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { JsonPipe } from '@angular/common'
import { HttpResponse, HttpHandlerFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const FEATURES = new InjectionToken<string[]>('FEATURES');



const logInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  console.log('Request', req.method, req.url);
  return next(req);
};

// Mock interceptor so the demo runs without external network
const mockInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (req.method === 'GET' && req.url.includes('jsonplaceholder.typicode.com/todos/1')) {
    const body = { id: 1, title: 'Mocked todo', completed: false };
    return of(new HttpResponse({ status: 200, body }));
  }
  return next(req);
};




@Component({
  selector: 'app-action-button',
  standalone: true,
  template: `
    <button class="btn-primary" (click)="clicked.emit()">{{ label }}</button>
  `
})
export class ActionButton {
  @Input() label = 'Do it';
  @Output() clicked = new EventEmitter<void>();
}

@Component({
  selector: 'app-card',
  template: `<div class="card-click" (click)="clicked.emit()">{{ title }}</div>`,
  standalone: true
})
export class Card {
  @Input() title = 'lecture';
  @Output() clicked = new EventEmitter<void>();
}

@Component({
  selector: 'app-angular-signal',
  imports: [CommonModule],
  templateUrl: './angular-signal.html',
  styleUrls: ['./angular-signal.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AngularSignal {
  @ViewChild('host', { read: ElementRef }) host!: ElementRef<HTMLElement>;
  #http: HttpClient = inject(HttpClient);
  env: EnvironmentInjector = inject(EnvironmentInjector);
  ref: ComponentRef<Card> | null = null;

  items = signal([{ id: 1, label: 'A' }]);
  title = 'Hello from Dynamic';
  add() { this.items.update(a => [...a, { id: Date.now(), label: 'N' }]); }

  count = signal(0);
  inc() { this.count.set(this.count() + 1); }

  features = inject(FEATURES);

  ActionButton = ActionButton;
  clicks = signal(0);
  onClick = () => this.clicks.update(n => n + 1);

  double = computed(() => this.count() * 2);
  constructor() {
    effect((): void => console.log('double =', this.double()));
  }
  data: any;
  load() {
    this.#http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(r => this.data = r);
  }
  mount() {
    if (this.ref) return;
    this.ref = createComponent(Card, {
      environmentInjector: this.env,
      hostElement: this.host.nativeElement
    });
    this.ref.setInput('title', 'Hello from Dynamic');
    this.ref.instance.clicked.subscribe(() => alert('Card clicked'));
  }

  updateTitle() {
    if (!this.ref) return;
    this.ref.setInput('title', 'Updated Title ' + new Date().toLocaleTimeString());
  }

  unmount() {
    this.ref?.destroy();
    this.ref = null;
  }

  authInterceptor = (req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> => {
    const cloned = req.clone({ setHeaders: { Authorization: 'Bearer token' } });
    return next.handle(cloned);
  };

  errorInterceptor = (req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> => {
    return next.handle(req).pipe(
      catchError(err => {
        // map/log/notify
        return throwError(() => err);
      })
    );
  };

}
