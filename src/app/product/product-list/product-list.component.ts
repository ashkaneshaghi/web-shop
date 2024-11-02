import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

    products: Product[] = [];
    filteredProducts: Product[] = [];
    sortOrder: string = '';

    constructor(
        private productService: ProductService,
        private router: Router,
        private cartService: CartService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(data => {
            if (data) {
                this.products = data;
                this.filteredProducts = data;
            }
        });
    }

    navigateToDetail(productId: number, event: Event): void {
        const card = (event.currentTarget as HTMLElement);
        card.classList.add('clicked');

        setTimeout(() => {
            card.classList.remove('clicked');
            this.router.navigate(['/product/' + productId]);
        }, 300);
    }

    addToCart(product: Product): void {
        this.cartService.addToCart(product).subscribe({
            next: () => {
                this.showToast('The product added to cart successfully!', '');
            }
        });
    }

    showToast(message: string, action: string) {
        let act = action ? action : '';
        this.snackBar.open(
            message,
            act,
            {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            }
        );
    }

    triggerSearch(event: Event): void {
        let searchTerm = (event.target as HTMLInputElement).value;
        searchTerm = searchTerm.toLowerCase();
        this.filteredProducts = this.products.filter(
            product => product.name.toLowerCase().includes(searchTerm)
        );
        this.sortProducts(this.sortOrder);
    }

    sortProducts(sortValue: string): void {
        this.sortOrder = sortValue;
        if (this.sortOrder === 'priceLowHigh') {
            this.filteredProducts.sort(
                (a, b) => a.price - b.price
            );
        } else if (this.sortOrder === 'priceHighLow') {
            this.filteredProducts.sort(
                (a, b) => b.price - a.price
            );
        }
    }
}
