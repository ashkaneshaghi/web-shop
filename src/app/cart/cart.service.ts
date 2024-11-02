import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    addToCart(product: Product): Observable<void> {
        return this.http.post<void>(this.apiUrl + '/cart', product);
    }

    getCartItems(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl + '/cart');
    }

    clearCart(): Observable<void> {
        return this.http.delete<void>(this.apiUrl + '/cart');
    }

    checkout(products: Product[]): Observable<void> {
        return this.http.post<void>(this.apiUrl + '/checkout', products);
    }
}
