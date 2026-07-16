import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  id = '';
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
