import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        ProductModule,
        CartModule,
        MatSnackBarModule
    ],
    providers: [provideHttpClient(withFetch()), provideAnimationsAsync()],
    bootstrap: [AppComponent]
})
export class AppModule { }
