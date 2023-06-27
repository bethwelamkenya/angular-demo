import {Component, Input} from '@angular/core';
import {AppComponent} from "../app.component";
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() title: string = "";
}
