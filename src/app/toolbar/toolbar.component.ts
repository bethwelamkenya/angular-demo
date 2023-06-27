import {Component, Input, Renderer2} from '@angular/core';
import {AppComponent} from "../app.component";

// let body = document.getElementById('mainBody');

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() title = "";
  // constructor(private renderer: Renderer2) { }
  imagePath = 'assets/icons/sun.svg';
  darkMode = false;
  profileOpen = false;
  body = document.getElementById('mainBody');
  account = document.getElementsByClassName('account');

  themeChanged() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.imagePath = 'assets/icons/moon_symbol.svg';
      // @ts-ignore
      this.body.classList.add('dark');
    } else {
      this.imagePath = 'assets/icons/sun.svg';
      // @ts-ignore
      this.body.classList.remove('dark');
    }
  }
  profileClicked() {
    this.profileOpen = !this.profileOpen;
    for (let i = 0; i < this.account.length; i++) {
      this.account[i].classList.toggle('visible');
      // if (this.profileOpen) {
      //   // @ts-ignore
      //   this.account[i].classList.add('visible');
      // } else {
      //   // @ts-ignore
      //   this.account[i].classList.remove('visible');
      // }
    }
  }
}

