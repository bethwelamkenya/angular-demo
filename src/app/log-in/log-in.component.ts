import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  username = '';
  password = '';
  username_signup = '';
  password_signup = '';
  email = '';
  phone: number = 0;
  name = '';
  login() {
    // Perform login validation
    if (this.username === 'username' && this.password === 'password') {
      // Store user information in session/local storage
      sessionStorage.setItem('currentUser', this.username);
      // Redirect to desired page or perform other actions
    } else {
      // Handle login error
      alert('hi');
    }
  }

  signUp() {
    if (
      this.username_signup === 'username' &&
      this.password_signup === 'password'
    ) {
      // Store user information in session/local storage
      sessionStorage.setItem('currentUser', this.username);
      // Redirect to desired page or perform other actions
    } else {
      // Handle login error
      alert('hi');
    }
  }
}
