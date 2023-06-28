import { Component } from '@angular/core';
import axios from "axios";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent {
  username = '';
  password = '';
  username_signup = '';
  password_signup = '';
  email = '';
  phone = 0;
  name = '';
  validityStatus = '';

  constructor(private router: Router) { }

  login() {
    this.checkUser();
  }

  signUp() {
    this.insertUser();
  }

  toggleDiv() {
    const register = document.getElementById('admin-register');
    const login = document.getElementById('admin-login');

    // @ts-ignore
    register.classList.toggle('active');
    // @ts-ignore
    login.classList.toggle('active');
  }

  checkConnection() {
    axios.get('http://localhost:3000/ping')
      .then(response => {
        console.log('Server is running');
        alert(response)
      })
      .catch(error => {
        console.error('Failed to ping the server:', error);
        alert(error)
      });
  }

  checkUser() {
    axios.get(`http://localhost:3000/api/admins/${this.username}?password=${this.password}`)
      .then(response => {
        // console.log('Server is running');
        // alert(response)
        sessionStorage.setItem('currentAdmin', this.username);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Failed to ping the server:', error);
        this.validityStatus = "Username or password is incorrect. Please check and try again or REGISTER"
        // alert(error)
      });
  }

  insertUser() {
    let data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      username: this.username_signup,
      password: this.password_signup
    };
    console.log("hello", data)

    axios.post('http://localhost:3000/api/admins', data)
      .then(response => {
        console.log('Server is running');
        alert(response)
        sessionStorage.setItem('currentAdmin', this.username_signup);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Failed to ping the server:', error);
        alert(error)
      });
  }

}
