import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-header',
  imports: [MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor (private route : Router){}
  username = 'הני';

  logo(){
    this.route.navigate(["/Home_Page"]);
  }

  logout(){
    this.route.navigate(["/welcome"]);
  }
}
