import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class ProductModule { }
