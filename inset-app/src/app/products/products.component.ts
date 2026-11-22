import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any;
  keyword: string = '';

  constructor(private productService: ProductService) {}

  get filteredProducts() {
    return this.products.filter((p: any) =>
      p.name.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

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

  handleCheckProduct(p: any) {
    this.productService.checkProduct(p).subscribe({
      next: (updatedProduct) => {
        p.selected = updatedProduct.selected;
      },
      error: (err) => {
        console.error('Erreur de mise à jour :', err);
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
