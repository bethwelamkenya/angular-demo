import {Component} from '@angular/core';
import {Router} from "@angular/router";
import axios from "axios";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private router: Router) {
  }

  isAdminLoggedIn = false;
  addProd = document.getElementsByClassName('add-product');
  items: any[] = [];

  ngOnInit() {
    // get whether the current session is logged in to admin account
    const currentAdmin = sessionStorage.getItem('currentAdmin');
    if (!currentAdmin) {
      // User is not logged in, redirect to login page or show appropriate message
      // this.router.navigate(['/accounts']);
      this.isAdminLoggedIn = false;
    } else {
      // User is logged in, continue with component initialization
      console.log(currentAdmin)
      this.isAdminLoggedIn = true;
    }
    for (let i = 0; i < this.addProd.length; i++) {
      if (this.isAdminLoggedIn) {
        this.addProd[i].classList.add('visible');
      } else {
        this.addProd[i].classList.remove('visible');
      }
    }
    this.getProducts()
  }

  // get the products from the server side
  getProducts() {
    // axios.get('http://10.130.14.162:3000/api/products')
    axios.get('http://localhost:3000/api/products')
      .then(results => {
        this.items = results.data
      })
      .catch(error => {
        console.log('An Error Occurred: ' + error)
      })
  }

}
