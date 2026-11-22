import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private router: Router) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      price: this.fb.control(0, [Validators.required, Validators.min(1)]),
      selected: this.fb.control(false)
    });
  }

  saveProduct() {
    let product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next: (data) => {
        alert('Produit ' + data.name + ' enregistré avec succès');
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement :", err);
      }
    });
  }
}
