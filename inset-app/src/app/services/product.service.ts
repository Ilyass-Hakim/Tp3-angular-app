import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host: string = 'http://localhost:8083';

  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<any> {
    return this.http.get(`${this.host}/products`);
  }

  public deleteProduct(p: any): Observable<any> {
    return this.http.delete(`${this.host}/products/${p.id}`);
  }

  public saveProduct(product: any): Observable<any> {
    return this.http.post(`${this.host}/products`, product);
  }

  public checkProduct(p: any): Observable<any> {
    return this.http.patch(`${this.host}/products/${p.id}`, { selected: !p.selected });
  }
}
