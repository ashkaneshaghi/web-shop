import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-cart-view',
    templateUrl: './cart-view.component.html',
    styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {

    cartItems: Product[] = [];
    totalPrice: number = 0;

    constructor(
        private cartService: CartService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.getCartItems();
    }

    getCartItems() {
        this.cartService.getCartItems().subscribe(data => {
            if (data) {
                this.cartItems = data;
                this.totalPrice = this.getTotalPrice();
            }
        });
    }

    getTotalPrice(): number {
        let total = 0;
        for (let item of this.cartItems) {
            //total = total + item.price;
            total += item.price;
        }
        return total;
    }

    clearCart(): void {
        this.cartService.clearCart().subscribe({
            next: () => {
                this.showToast('The cart is cleared', '');
            }
        });
    }

    checkout(): void {
        this.cartService.checkout(this.cartItems).subscribe(() => {
            console.log('Checkout was Clicked');
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
}
