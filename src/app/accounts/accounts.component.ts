import {Component} from '@angular/core';
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
  validityStatus = '';

  constructor(private router: Router) {
  }

  login() {
    this.checkUser();
  }

  signUp() {
    this.insertUser();
  }

  // check connection to server side
  checkConnection() {
    // axios.get('http://10.130.14.162:3000/ping')
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

  toggleDiv() {
    const register = document.getElementById('user-register');
    const login = document.getElementById('user-login');

    // @ts-ignore
    register.classList.toggle('active');
    // @ts-ignore
    login.classList.toggle('active');
  }

  // check user details validity from server side
  checkUser() {
    // axios.get(`http://10.130.14.162:3000/api/users/${this.username}?password=${this.password}`)
    axios.get(`http://localhost:3000/api/users/${this.username}?password=${this.password}`)
      .then(response => {
        sessionStorage.setItem('currentUser', this.username);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Failed to ping the server:', error);
        this.validityStatus = "Username or password is incorrect. Please check and try again or REGISTER"
      });
  }

  // send user data for registration in the server side
  insertUser() {
    let data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      username: this.username_signup,
      password: this.password_signup
    };
    console.log("hello", data)

    // axios.post('http://10.130.14.162:3000/api/users', data)
    axios.post('http://localhost:3000/api/users', data)
      .then(response => {
        sessionStorage.setItem('currentUser', this.username_signup);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Failed to ping the server:', error);
        alert(error)
      });
  }
}
