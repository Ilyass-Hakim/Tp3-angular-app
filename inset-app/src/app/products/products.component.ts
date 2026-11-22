import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products = this.productService.getAllProducts();
  }

  handleDelete(p: any) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer le produit ' + p.name + ' ?');
    if (conf) {
      this.productService.deleteProduct(p);
      this.getProducts(); // Actualisation de l'affichage
    }
  }
}
