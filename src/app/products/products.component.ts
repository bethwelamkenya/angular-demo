import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {style} from "@angular/animations";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private router: Router) {
  }

  isLoggedIn = false;
  isAdminLoggedIn = false;
// addProd = document.getElementById('addProduct');
  addProd = document.getElementsByClassName('add-product');

  ngOnInit() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      // User is not logged in, redirect to login page or show appropriate message
      // this.router.navigate(['/accounts']);
      this.isLoggedIn = false;
    } else {
      // User is logged in, continue with component initialization
      console.log(currentUser)
      this.isLoggedIn = true;
      // ...
    }
    const currentAdmin = sessionStorage.getItem('currentAdmin');
    if (!currentAdmin) {
      // User is not logged in, redirect to login page or show appropriate message
      // this.router.navigate(['/accounts']);
      this.isAdminLoggedIn = false;
    } else {
      // User is logged in, continue with component initialization
      console.log(currentAdmin)
      this.isAdminLoggedIn = true;
      // ...
    }
    for (let i = 0; i < this.addProd.length; i++) {
      if (this.isAdminLoggedIn) {
        this.addProd[i].classList.add('visible');
      } else {
        this.addProd[i].classList.remove('visible');
      }
    }
  }

  addProduct() {
    if (this.isAdminLoggedIn) {
      this.router.navigate(['/add-product']);
    }
  }

}
