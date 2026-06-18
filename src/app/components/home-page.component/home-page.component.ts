import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { WalkingTrailComponent } from '../walking-trail/walking-trail.component';
import { AttractionsComponent } from '../attractions/attractions.component';
import { HostelsComponent } from '../hostels/hostels.component';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    HeaderComponent,
    WalkingTrailComponent,
    AttractionsComponent,
    HostelsComponent,
    ScrollTopModule,
  ],
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
})
export class HomePageComponent {}
