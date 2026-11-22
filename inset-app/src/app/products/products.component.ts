import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any;

  ngOnInit(): void {
    // Les données seront initialisées ici
    this.products = [
      { id: 1, name: 'Ordinateur Portable', price: 1300, selected: true },
      { id: 2, name: 'Imprimante Multifonction', price: 300, selected: false },
      { id: 3, name: 'Smartphone 5G', price: 800, selected: true }
    ];
  }

  handleDelete(p: any) {
    let conf = confirm('Êtes-vous sûr de vouloir supprimer le produit ' + p.name + ' ?');
    if (conf) {
      this.products = this.products.filter((product: any) => product.id !== p.id);
    }
  }
}
