import { Component,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-forms',
  imports: [],
  templateUrl: './forms.html',
  styleUrl: './forms.css',
})
export class Forms {
 name = '';
 model = { name: '', email: '' };
  submitted = false;
  onSubmit() { this.submitted = true; }

  fb = new FormBuilder();



  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    newsletter: [false],
  });

  onSubmited() { this.submitted = true; }
}
