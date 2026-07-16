import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, HttpClient , withInterceptors, HttpResponse, HttpErrorResponse, HttpRequest, HttpHandlerFn} from '@angular/common/http';
import { of, throwError } from 'rxjs';



function mockHttp(req: HttpRequest<any>, next: HttpHandlerFn) {
  if (req.method === 'GET' && req.url.includes('jsonplaceholder.typicode.com/usersx')) {
    return throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found', url: req.url }));
  }
  if (req.method === 'GET' && req.url.includes('jsonplaceholder.typicode.com/users')) {
    const body = [
      { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
      { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' }
    ];
    return of(new HttpResponse({ status: 200, body }));
  }
  return next(req);
}




@Component({
  selector: 'app-angular-httpclients-component',
  imports: [CommonModule],
  templateUrl: './angular-httpclients-component.html',
  styleUrl: './angular-httpclients-component.css',
  standalone: true,
})
export class AngularHttpclientsComponent {

  http = inject(HttpClient);
  users: any[] = [];
  loading = false;
  error = '';
result: any = null;
data: any[] | null = null;
  lastAction = '';

  load() {
    this.loading = true;
    this.error = '';
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data) => { this.users = data; this.loading = false; },
        error: () => { this.error = 'Failed to load users'; this.loading = false; }
      });
  }
createPost() {
    this.loading = true;
    this.error = '';
    this.result = null;
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    }).subscribe({
      next: (res) => { this.result = res; this.loading = false; },
      error: () => { this.error = 'Failed to create post'; this.loading = false; }
    });
  }


  isArray(value: unknown): value is any[] { return Array.isArray(value as any); }

  fetch(url: string): void {
    this.loading = true;
    this.error = '';
    this.data = null;
    this.http.get<any[]>(url).subscribe({
      next: (res) => { this.data = res; this.loading = false; },
      error: (err) => {
        const status = err?.status ?? 'unknown';
        this.error = `Request failed (status ${status}). Please try again.`;
        this.loading = false;
      }
    });}
   
    
    loadOk() {
    this.lastAction = 'ok';
    this.fetch('https://jsonplaceholder.typicode.com/users');
  }

  loadFail() {
    this.lastAction = 'fail';
    this.fetch('https://jsonplaceholder.typicode.com/usersx');
  }

  retry() {
    if (this.lastAction === 'ok') this.loadOk();
    else if (this.lastAction === 'fail') this.loadFail();
  }


  
}
