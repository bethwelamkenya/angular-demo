import {Component, Injector} from '@angular/core';
import {HttpBackend, HttpClient, HttpParams} from "@angular/common/http";
import axios from "axios";
import {Router} from "@angular/router";

// import mysql from "mysql2";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  username = '';
  password = '';
  username_signup = '';
  password_signup = '';
  email = '';
  phone = 0;
  name = '';

  constructor(private router: Router) { }

  login() {
    this.checkUser();
  }

  signUp() {
    this.insertUser();
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
    axios.get(`http://localhost:3000/api/users/${this.username}?password=${this.password}`)
      .then(response => {
        console.log('Server is running');
        alert(response)
        sessionStorage.setItem('currentUser', this.username);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Failed to ping the server:', error);
        alert(error)
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

    axios.post('http://localhost:3000/api/users', data)
      .then(response => {
        console.log('Server is running');
        alert(response)
        sessionStorage.setItem('currentUser', this.username_signup);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Failed to ping the server:', error);
        alert(error)
      });
  }
}
