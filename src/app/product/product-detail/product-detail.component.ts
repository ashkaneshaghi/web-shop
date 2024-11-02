import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
    product!: Product;

    constructor(
        private productService: ProductService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        let productId = this.activatedRoute.snapshot.paramMap.get('id');
        let convertedId = Number(productId);
        this.productService.getProductById(convertedId).subscribe(
            (data) => {
                if (data) {
                    this.product = data;
                }
            }
        );
    }
}
