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
}
