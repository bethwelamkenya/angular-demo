import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

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
  phone = 0;
  name = '';

  async login() {

    // // Perform login validation
    // this.user.name = this.username;
    // this.user.password = this.password;
    // if (await this.userRepository.find(this.user)) {
    //   // Store user information in session/local storage
    //   sessionStorage.setItem('currentUser', this.username);
    //   alert("logged in")
    //   // Redirect to desired page or perform other actions
    // } else {
    //   // Handle login error
    //   alert('hi');
    // }
  }

  async signUp() {
    if (this.insertUser()){
        // Store user information in session/local storage
        sessionStorage.setItem('currentUser', this.username);
        alert("signed up in");
    } else  {
      alert("false");
    }
    // Perform login validation
    // this.user.name = this.name;
    // this.user.email = this.email;
    //
    // this.user.phone = this.phone;
    // this.user.username = this.username_signup
    // this.user.password = this.password_signup;
    // if (await this.userRepository.save(this.user)) {
    //   // Store user information in session/local storage
    //   sessionStorage.setItem('currentUser', this.username);
    //   alert("signed up in");
    //   // Redirect to desired page or perform other actions
    // } else {
    //   // Handle login error
    //   alert('hi');
    // }
  }


  // @ts-ignore
  users: any[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('/api/users').subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  insertUser(): boolean {
    let data = {
      name : this.name,
      email : this.email,
      phone : this.phone,
      username : this.username_signup,
      password : this.password_signup
    };
    this.http.post("/api/users", data).subscribe(
      (response) => {
        // Handle the response
        console.log(response);
        alert(response);
        return true;
      },
      (error) => {
        // Handle any errors
        console.error(error);
        return false;
      }
    );
    return false;
  }

  getUser() {
    let params = new HttpParams();
    this.http.get<any[]>('/api/users/' + this.username + '?password=' + this.password, {params: params}).subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
