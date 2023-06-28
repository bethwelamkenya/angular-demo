import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {
  }

  isLoggedIn = false;

  // executed on component load
  ngOnInit() {
    // get session user
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
      // User is not logged in, redirect to login page or show appropriate message
      this.isLoggedIn = false;
    } else {
      // User is logged in, continue with component initialization
      console.log(currentUser)
      this.isLoggedIn = true;
    }
  }

}
