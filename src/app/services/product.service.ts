import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  async getProducts(): Promise<Product[] | boolean> {
    return fetch('http://localhost:8080/shop/products', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(`Error ${response.status}`);
        }

        return response.json();
      }).then((content: {products: Product[]}) => {
        return content.products;
      })
      .catch((err) => {
        return false;
      });
  }

  async createProduct(name: string, price: string, description: string, image: File): Promise<boolean> {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("userId", localStorage.getItem("userId") ?? "");// change later to use token

    return fetch("http://localhost:8080/shop/product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }).then(response => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("error");
      }

      return true;
    }).catch(() => {
      return false;
    })
  }
}
