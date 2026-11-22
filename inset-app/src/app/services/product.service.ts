import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    { id: 1, name: 'Ordinateur Portable', price: 1300, selected: true },
    { id: 2, name: 'Imprimante Multifonction', price: 300, selected: false },
    { id: 3, name: 'Smartphone 5G', price: 800, selected: true }
  ];

  getAllProducts() {
    return this.products;
  }

  deleteProduct(product: any) {
    this.products = this.products.filter(p => p.id !== product.id);
  }
}
