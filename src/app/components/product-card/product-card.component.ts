import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private router: Router) {}

  seeDetails(id: string) {
    this.router.navigate([`/product/${id}`]);
  }
}
