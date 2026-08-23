import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../Services/auth-service.service';
import { srv_Favorite } from '../../Services/srv_Favorite';
import { SrvWalkingTrailService } from '../../Services/srv-WalkingTrail.service';
import { srv_Attractions } from '../../Services/srv_Attractions';
import { srv_Hostels } from '../../Services/srv_Hostels';
import { ShowAttractionComponent } from '../tables/show-attraction/show-attraction.component';
import { int_Attractions } from '../../Interfaces/int_Attractions';
import { MatDialog } from '@angular/material/dialog';
import { ShowHostelsComponent } from '../tables/show-hostels/show-hostels.component';
import { Int_Hostels } from '../../Interfaces/Int_Hostels';
import { ShowWalkingTrailComponent } from '../tables/show-walking-trail/show-walking-trail.component';
import { Int_WalkingTrail } from '../../Interfaces/Int_WalkingTrail';

@Component({
  selector: 'app-fevorite',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './fevorite.component.html',
  styleUrl: './fevorite.component.scss',
})
export class FevoriteComponent {
  isLiked: boolean[] = [];
  userDetails: any;

  allTheFavorite: any[] = [];

  numberId: number[] = [];

  typeName: ('attraction' | 'hostel' | 'trail')[] = [];

  constructor(
    public authService: AuthService,
    public srv_favorite: srv_Favorite,
    public srv_walkingTrail: SrvWalkingTrailService,
    public srv_attractions: srv_Attractions,
    public srv_hostels: srv_Hostels,
    public dialog: MatDialog,
  ) {
    this.userDetails = this.authService.getUserData();

    this.allTheFavorite = this.srv_favorite.getFavoriteByCoordinatorId(
      this.userDetails.userId,
    );

    this.setData();
  }

  openDialogShowAttraction(element: int_Attractions) {
    console.log("אטרקציה")
    this.dialog.open(ShowAttractionComponent, {
      width: '850px',
      data: element,
    });
  }

  openDialogShowHostels(element: Int_Hostels) {
        console.log("מקום לינה")

    this.dialog.open(ShowHostelsComponent, {
      width: '850px',
      data: element,
    });
  }

  openDialogWalkingTrail(element: Int_WalkingTrail) {
        console.log("מסלול הליכה")

    this.dialog.open(ShowWalkingTrailComponent, {
      width: '850px',
      data: element,
    });
  }

  setData() {
    this.allTheFavorite.forEach((item) => {
      this.isLiked.push(true);

      if (item.attractionId != null) {
        this.numberId.push(item.attractionId);
        this.typeName.push('attraction');
      } else if (item.HostelsId != null) {
        this.numberId.push(item.HostelsId);
        this.typeName.push('hostel');
      } else if (item.WalkingTrailId != null) {
        this.numberId.push(item.WalkingTrailId);
        this.typeName.push('trail');
      }
    });
  }

  changeLikeStatus(item: any) {
    const index = this.allTheFavorite.indexOf(item);
console.log("vvvv")
    if (this.isLiked[index]) {
      this.srv_favorite.removeByFavoriteId(item.FavoriteId);

      this.isLiked[index] = false;
    } else {
      this.srv_favorite.addFavorite(
        this.userDetails.userId,
        this.numberId[index],
        this.typeName[index],
      );

      this.isLiked[index] = true;
    }
  }
}
