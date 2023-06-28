import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {NgOptimizedImage} from "@angular/common";
import { ProductComponent } from './product/product.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsComponent } from './products/products.component';
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { AccountsComponent } from './accounts/accounts.component';
import { AdminsComponent } from './admins/admins.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    ProductComponent,
    ProductItemComponent,
    ProductsComponent,
    AccountsComponent,
    AdminsComponent,
    AddProductComponent,
    HelpPageComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    RouterOutlet,
    RouterLink,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'admins', component: AdminsComponent},
      {path: 'help', component: HelpPageComponent},
      {path: 'cart', component: CartComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'add-product', component: AddProductComponent},
      {path: 'products/:productId', component: ProductComponent},
    ]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
