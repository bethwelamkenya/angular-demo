import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {NgOptimizedImage} from "@angular/common";
import { ProductComponent } from './product/product.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProductsComponent } from './products/products.component';
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { AccountsComponent } from './accounts/accounts.component';
import { AdminsComponent } from './admins/admins.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    ProductComponent,
    ProductItemComponent,
    LogInComponent,
    ProductsComponent,
    AccountsComponent,
    AdminsComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    RouterOutlet,
    RouterLink,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'log-in', component: LogInComponent},
      {path: 'accounts', component: AccountsComponent},
      {path: 'admins', component: AdminsComponent},
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
