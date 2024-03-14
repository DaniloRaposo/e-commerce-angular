import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Modal } from '../../modal';
import { ModalComponent } from '../modal/modal.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalComponent,
    MatIconModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm!: FormGroup;
  modalData!: Modal;
  file?: File;
  @ViewChild(ModalComponent) modal?: ModalComponent;

  constructor(private router: Router, private product: ProductService) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      price: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  selectFile(event: Event) {
    const inputElement = event?.target as HTMLInputElement;
    if (inputElement.files) {
      this.file = inputElement.files[0];
    }
  }

  async submit() {
    if (this.productForm.invalid || !this.file) {
      return;
    }

    const createProduct = await this.product.createProduct(
      this.name?.value,
      this.price?.value,
      this.description?.value,
      this.file
    );

    if (!createProduct) {
      this.modalData = {
        title: "Error while add product",
        type: "error",
        content: "An error occurred while adding product, try again later",
      }
      this.modal?.open();
    } else {
      this.router.navigate(["/"]);
    }
  }
}
