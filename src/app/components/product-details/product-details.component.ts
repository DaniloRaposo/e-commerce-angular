import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product?: Product;

  constructor(
    private activateRoute: ActivatedRoute,
    private prodService: ProductService
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    const id = this.activateRoute.snapshot.params['id'];

    this.prodService
      .getProduct(id)
      .then((product) => {
        if (typeof product === "boolean") {
          throw new Error("Error when fetch product detail");
        }

        this.product = product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
