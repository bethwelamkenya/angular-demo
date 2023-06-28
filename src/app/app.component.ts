import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SharedServices} from "./shared.services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce site';
  theme = '';
  body = document.getElementById('mainBody');

  constructor(private router: Router, private sharedService: SharedServices) {
  }

  // executed on component load
  ngOnInit(): void {
    // get the current session theme
    // @ts-ignore
    this.theme = sessionStorage.getItem('theme');
    if (this.theme == null){
      this.theme = 'light'
      sessionStorage.setItem('theme', 'light');
      // @ts-ignore
      this.body.classList.remove('dark');
    } else if (this.theme == 'light'){
      // @ts-ignore
      this.body.classList.remove('dark');
    } else {
      // @ts-ignore
      this.body.classList.add('dark');
    }
    // detect route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Set the refreshFlag to true whenever the route changes
        this.sharedService.setRefreshFlag(true);
      }
    });
  }
}
