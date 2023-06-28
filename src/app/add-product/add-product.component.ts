import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  constructor(private router: Router) {
  }
  isAdminLoggedIn = false;

  ngOnInit() {
    const currentAdmin = sessionStorage.getItem('currentAdmin');
    if (!currentAdmin) {
      // User is not logged in, redirect to login page or show appropriate message
      this.router.navigate(['/admins']);
      this.isAdminLoggedIn = false;
    } else {
      // User is logged in, continue with component initialization
      console.log(currentAdmin)
      this.isAdminLoggedIn = true;
      // ...
    }
  }




}
