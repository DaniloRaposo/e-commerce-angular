import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../product';
import { ModalComponent } from '../modal/modal.component';
import { Modal } from '../../modal';
import { ProductService } from '../../services/product.service';
import { SessionsService } from '../../services/sessions.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products: Product[] = [];
  modalData!: Modal;
  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(private router: Router, private productService: ProductService, private session: SessionsService) {}

  ngOnInit() {
    this.getProducts();
  }

  logout() {
    this.session.logoutHandler();
  }

  createProduct() {
    this.router.navigate(["/product"]);
  }

  async getProducts() {
    const fetchProducts = await this.productService.getProducts();

    if (typeof fetchProducts === "boolean") {
      this.modalData = {
        title: "Error",
        type: "error",
        content: "An error occur",
      }
      this.modal.open();
      return;
    }

    this.products = fetchProducts;
  }
}
