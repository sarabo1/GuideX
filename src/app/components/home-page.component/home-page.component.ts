import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MatIcon } from '@angular/material/icon';
import { WalkingTrailComponent } from '../tables/walking-trail/walking-trail.component';
import { AttractionsComponent } from '../tables/attractions/attractions.component';
import { HostelsComponent } from '../tables/hostels/hostels.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    HeaderComponent,
    WalkingTrailComponent,
    AttractionsComponent,
    HostelsComponent,
    ScrollTopModule,
    MatIcon,
    RouterOutlet
],
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
})
export class HomePageComponent {
  openTrail: boolean;
  openAttraction: boolean;
  openHostels: boolean;
  openGuide: boolean;
  constructor(
    private router: Router,
  ) {
    this.openTrail = false;
    this.openAttraction = false;
    this.openHostels = false;
    this.openGuide = false;
  }
  openTable(tableNum: number) {
    switch (tableNum) {
      case 1:
        this.openTrail = !this.openTrail;
        break;
      case 2:
        this.openAttraction = !this.openAttraction;
        break;
      case 3:
        this.openHostels = !this.openHostels;
        break;
      case 4:
        this.openGuide = !this.openGuide;
        break;
    }
  }

  openTipsForum(){
    console.log("הגעתי")
    this.router.navigate(['welcome/forum/community']);
       

  }
}
