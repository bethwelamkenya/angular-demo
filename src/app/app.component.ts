import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SharedServices} from "./shared.services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'e-commerce site';
  constructor(private router: Router, private sharedService: SharedServices) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Set the refreshFlag to true whenever the route changes
        this.sharedService.setRefreshFlag(true);
      }
    });
  }
}
