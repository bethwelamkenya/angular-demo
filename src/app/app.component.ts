import {Component, EventEmitter, Output} from '@angular/core';
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce site';
   //@Output()  title: EventEmitter<string> = new EventEmitter<string>();
}
