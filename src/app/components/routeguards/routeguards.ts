import { Component, inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

let loggedIn = false;

export const authGuard = () => {
  if (loggedIn) return true;
  const router = inject(Router);
  return router.createUrlTree(['/']);
};

@Injectable({ providedIn: 'root' })
export class CounterService {
  value = 0;
  inc() { this.value++; }
  dec() { this.value--; }
  reset() { this.value = 0; }
}

@Component({
  selector: 'app-protected',
  template: `
    <div class="page-title">Protected Page</div>
    <p class="page-subtitle">This page is guarded by an auth guard.</p>
    <div class="card">
      <p class="result success">You have access! This content is protected.</p>
      <a routerLink="/routeguards" class="back-link">Back to Route Guards</a>
    </div>
  `,
  imports: [RouterModule],
  styles: [`
    :host { display: block; max-width: 860px; margin: 0 auto; padding: 28px 20px; }
    .page-title { font-size: 1.6rem; font-weight: 700; margin-bottom: 6px; }
    .page-subtitle { color: var(--color-text-muted); margin-bottom: 28px; font-size: 0.95rem; }
    .card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm); }
    .result.success { color: var(--color-success); font-weight: 500; }
    .back-link { display: inline-block; margin-top: 16px; padding: 8px 16px; background: var(--color-bg); border: 1.5px solid var(--color-border); border-radius: var(--radius); font-weight: 500; font-size: 0.88rem; color: var(--color-text-secondary); text-decoration: none; transition: all 150ms; }
    .back-link:hover { border-color: var(--color-primary); color: var(--color-primary); background: var(--color-primary-light); text-decoration: none; }
  `],
})
export class Protected {}

@Component({
  selector: 'app-routeguards',
  imports: [RouterModule],
  templateUrl: './routeguards.html',
  styleUrl: './routeguards.css',
  standalone: true,
})
export class Routeguards {
  get loggedIn() { return loggedIn; }
  toggle() { loggedIn = !loggedIn; }

  constructor(public counter: CounterService) {}
}
