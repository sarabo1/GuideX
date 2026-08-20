import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MatIcon } from '@angular/material/icon';
import { WalkingTrailComponent } from '../tables/walking-trail/walking-trail.component';
import { AttractionsComponent } from '../tables/attractions/attractions.component';
import { HostelsComponent } from '../tables/hostels/hostels.component';
import { Router, RouterOutlet } from '@angular/router';
import { FevoriteComponent } from "../fevorite/fevorite.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    WalkingTrailComponent,
    AttractionsComponent,
    HostelsComponent,
    ScrollTopModule,
    MatIcon,
    FevoriteComponent
],
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
})
export class HomePageComponent {
  openTrail: boolean;
  openAttraction: boolean;
  openHostels: boolean;
  openGuide: boolean;
  showBtnTable: boolean = false;
  constructor(private router: Router) {
    this.openTrail = false;
    this.openAttraction = false;
    this.openHostels = false;
    this.openGuide = false;
  }
  // openBtnTable() {
  //   this.showBtnTable = !this.showBtnTable;
  //   this.scroll()
  // }
openBtnTable() {
  this.showBtnTable = !this.showBtnTable;
  if(this.showBtnTable){
  setTimeout(() => {
    this.scroll();
  }, 100); // עיכוב קטן כדי לוודא שהרכיבים הוצגו
}
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

  // openTipsForum(){
  //   // console.log("הגעתי")
  //   this.router.navigate(['welcome/forum/community']);

  // }

  openTipsForum(forumType: number) {
    this.showBtnTable = false;
    this.router.navigate(['welcome/forum'], {
      queryParams: { ForumType: forumType },
    });
  }
  scroll() {
    const section = document.getElementById('search-section');
    section?.scrollIntoView({ behavior: 'smooth' });
    
  }
}
