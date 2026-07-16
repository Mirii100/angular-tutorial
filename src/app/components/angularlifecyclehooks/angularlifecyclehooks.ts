import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ── Child component to demonstrate lifecycle events ── */
@Component({
  selector: 'lifecycle-child',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="child-box">
      <p class="child-title">{{ label }}</p>
      <p class="child-status">Initialised at: {{ initTime }}</p>
      <p class="child-status">View ready at: {{ viewTime }}</p>
      <button class="btn-sm btn-danger" (click)="destroySelf()">Destroy me</button>
    </div>
  `
})
export class LifecycleChild implements OnInit, AfterViewInit, OnDestroy {
  @Input() label = 'Child';
  initTime = '';
  viewTime = '';
  _onDestroyFn?: () => void;

  ngOnInit() {
    this.initTime = new Date().toLocaleTimeString();
    console.log(`[${this.label}] ngOnInit`);
  }

  ngAfterViewInit() {
    this.viewTime = new Date().toLocaleTimeString();
    console.log(`[${this.label}] ngAfterViewInit`);
  }

  ngOnDestroy() {
    console.log(`[${this.label}] ngOnDestroy`);
  }

  destroySelf() {
    this._onDestroyFn?.();
  }
}

/* ── Parent component for the live demo ── */
@Component({
  selector: 'lifecycle-parent',
  standalone: true,
  imports: [CommonModule, LifecycleChild],
  template: `
    <div class="demo-area">
      <div class="toolbar">
        <button class="btn-primary" (click)="createChild()">Create Child</button>
        <button class="btn-danger" (click)="showChild = false" [disabled]="!showChild">Destroy Child</button>
        <button class="btn-secondary" (click)="updateInput()">Update Input</button>
      </div>
      <p class="demo-hint" *ngIf="!showChild">No child component rendered. Click <strong>Create Child</strong> to start.</p>
      <lifecycle-child *ngIf="showChild" [label]="childLabel"></lifecycle-child>
      <div class="event-log" *ngIf="events.length">
        <h4 class="sub-heading">Event Log</h4>
        <ul class="log-list">
          <li *ngFor="let e of events; let i = index">
            <span class="log-index">{{ i + 1 }}</span>
            <span class="log-text">{{ e }}</span>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class LifecycleDemo {
  showChild = true;
  childLabel = 'Child #1';
  events: string[] = [];
  private counter = 1;

  createChild() {
    this.counter++;
    this.childLabel = `Child #${this.counter}`;
    this.showChild = true;
    this.events.push(`Child created — ${new Date().toLocaleTimeString()}`);
  }

  updateInput() {
    this.counter++;
    this.childLabel = `Child #${this.counter}`;
    this.events.push(`Input updated to "${this.childLabel}" — ${new Date().toLocaleTimeString()}`);
  }
}

/* ── Main page component ── */
@Component({
  selector: 'app-angularlifecyclehooks',
  imports: [CommonModule, LifecycleDemo],
  templateUrl: './angularlifecyclehooks.html',
  styleUrl: './angularlifecyclehooks.css',
})
export class Angularlifecyclehooks {
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

  codeSyntax = `@Component({ ... })
export class MyComponent implements OnInit, OnDestroy {

  // 1. ngOnInit — run once after inputs are bound
  ngOnInit() {
    this.loadData();
  }

  // 2. ngOnChanges — fires on every @Input change
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  // 3. ngAfterViewInit — view is ready, @ViewChild refs available
  ngAfterViewInit() {
    this.inputRef.nativeElement.focus();
  }

  // 4. ngOnDestroy — clean up before removal
  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.timer);
  }
}`;

  codeHookRef = `// Hook                When it fires
// ──────────────────  ────────────────────────────────────────────
// ngOnChanges        Every time an @Input changes (before ngOnInit)
// ngOnInit           Once, after the first ngOnChanges (inputs set)
// ngDoCheck          On every change-detection cycle
// ngAfterContentInit  After projected content (<ng-content>) renders
// ngAfterContentChecked  After projected content is checked
// ngAfterViewInit    After the component's view renders
// ngAfterViewChecked  After the component's view is checked
// ngOnDestroy         Once, before the component is removed from DOM`;

  codeNgOnChanges = `@Component({
  selector: 'parent-cmp',
  template: \`
    <child-cmp [name]="userName"></child-cmp>
    <input [(ngModel)]="userName">
  \`
})
export class ParentComponent {
  userName = 'Alice';
}

@Component({
  selector: 'child-cmp',
  template: \`<p>Hello {{ name }}</p>\`
})
export class ChildComponent implements OnChanges {
  @Input() name = '';

  ngOnChanges(changes: SimpleChanges) {
    // changes.name.previousValue  -> 'Alice'
    // changes.name.currentValue   -> 'Bob'
    // changes.name.firstChange    -> true (first call only)
    console.log(changes);
  }
}`;

  codeOnInit = `@Component({ ... })
export class UserProfileComponent implements OnInit {
  @Input() userId = '';
  user?: User;

  ngOnInit() {
    // Inputs are guaranteed to be set
    this.loadUser(this.userId);
  }

  private loadUser(id: string) {
    this.http.get&lt;User&gt;('/api/users/' + id)
      .subscribe(u =&gt; this.user = u);
  }
}`;

  codeDoCheck = `@Component({
  selector: 'list-cmp',
  template: \`&lt;p&gt;{{ items.length }} items&lt;/p&gt;\`
})
export class ListComponent implements DoCheck {
  items: string[] = [];
  private detector: ChangeDetectorRef;

  ngDoCheck() {
    // Angular won't detect Array.push automatically
    // so we check manually and trigger an update
    this.detector.detectChanges();
  }

  addItem(item: string) {
    this.items.push(item);   // mutation, not reassignment
  }
}`;

  codeAfterContentInit = `@Component({
  selector: 'tabs-cmp',
  template: \`
    &lt;ng-content&gt;&lt;/ng-content&gt;
    &lt;p&gt;{{ activeTab }}&lt;/p&gt;
  \`
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList&lt;TabComponent&gt;;
  activeTab = '';

  ngAfterContentInit() {
    this.activeTab = this.tabs.first?.title ?? '';
  }
}`;

  codeAfterViewInit = `&#64;Component({
  selector: 'auto-focus',
  template: \`
    &lt;input #nameInput type="text" placeholder="Your name"&gt;
  \`
})
export class AutoFocusComponent implements AfterViewInit {
  &#64;ViewChild('nameInput') inputRef!: ElementRef&lt;HTMLInputElement&gt;;

  ngAfterViewInit() {
    // View is ready — safe to access DOM refs
    this.inputRef.nativeElement.focus();
  }
}`;

  codeNgOnDestroy = `@Component({ ... })
export class RealtimeComponent implements OnInit, OnDestroy {
  private sub?: Subscription;
  private timer: any;

  ngOnInit() {
    this.sub = this.ws.listen('data').subscribe(d =&gt; {
      this.data = d;
    });
    this.timer = setInterval(() =&gt; this.tick(), 1000);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    clearInterval(this.timer);
    window.removeEventListener('resize', this.handler);
  }
}`;

  codeLifecycleOrder = `// ─── Creation ───────────────────────────
//   ngOnChanges      (first, with input values)
//   ngOnInit          (once, inputs are set)
//   ngDoCheck         (custom change detection)
//   ngAfterContentInit (projected content ready)
//   ngAfterContentChecked
//   ngAfterViewInit   (view rendered, ViewChild available)
//   ngAfterViewChecked

// ─── Change Detection ──────────────────
//   ngDoCheck
//   ngAfterContentChecked
//   ngAfterViewChecked

// ─── Destruction ───────────────────────
//   ngOnDestroy (once, before removal from DOM)`;
}
