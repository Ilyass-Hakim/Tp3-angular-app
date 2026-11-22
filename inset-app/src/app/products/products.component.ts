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
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
      }
    });
  }

  handleDelete(p: any) {
    let conf = confirm('Voulez-vous vraiment supprimer ' + p.name + ' ?');
    if (conf) {
      this.productService.deleteProduct(p).subscribe({
        next: () => {
          this.getProducts(); // Rechargement de la liste après suppression HTTP
        },
        error: (err) => {
          console.error('Erreur de suppression :', err);
        }
      });
    }
  }
}
