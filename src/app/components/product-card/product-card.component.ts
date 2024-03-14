import { Component, Input } from '@angular/core';
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

  seeDetails() {
    console.log(this.product);
  }
}
