import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SucceededAlertComponent } from '../succeeded-alert/succeeded-alert.component';
import { Int_WalkingTrail } from '../../../Interfaces/Int_WalkingTrail';
import { ServiceAllService } from '../../../Services/service-all.service';
import { SrvWalkingTrailService } from '../../../Services/srv-WalkingTrail.service';
import { srv_Favorite } from '../../../Services/srv_Favorite';
import { regionNamePipe } from "../../../Pipes/regionName";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-walking-trail',
  imports: [MatIcon, regionNamePipe, CommonModule],
  templateUrl: './show-walking-trail.component.html',
  styleUrl: './show-walking-trail.component.scss',
})
export class ShowWalkingTrailComponent {
  userCanEdit = false;
  RegionsArrayData: any
  isLiked: boolean = false;
  userDetails: any = JSON.parse(localStorage.getItem('user_data') || '{}');
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ShowWalkingTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Int_WalkingTrail,
    public srv_all: ServiceAllService,
    public walkingTrails: SrvWalkingTrailService,
    public srv_favorite: srv_Favorite,
  ) {
    this.RegionsArrayData = this.srv_all.getRegionsArray().subscribe(
      (data) => {
        this.RegionsArrayData = data;
      },
      (error) => {
        console.error('בעיה בהבאת האזורים', error);
      },
    );
  }

  ngOnInit() {
    const raw = localStorage.getItem('user_data');
    this.userDetails = raw ? JSON.parse(raw) : null;

    const userId = this.userDetails?.userId;

    if (!userId || !this.data?.WalkingTrailId) {
      this.isLiked = false;
      return;
    }

    this.isLiked = this.srv_favorite.isFavorite(
      userId,
      Number(this.data.WalkingTrailId),
      'trail',
    );
  }
  toggleFavorite() {
    if (
      this.srv_favorite.isFavorite(
        this.userDetails?.userId,
        this.data.WalkingTrailId,
        'trail',
      )
    ) {
      this.srv_favorite.removeFavorite(
        this.userDetails?.userId,
        this.data.WalkingTrailId,
        'trail',
      );
      this.isLiked = false;
    } else {
      this.srv_favorite.addFavorite(
        this.userDetails?.userId,
        this.data.WalkingTrailId,
        'trail',
      );
      this.isLiked = true;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  canEdit() {
    this.userCanEdit = true;
  }
  saveEdit() {
    console.log('saveEdit');
      const seasons = [
    document.getElementById('Summer') as HTMLInputElement,
    document.getElementById('Winter') as HTMLInputElement,
    document.getElementById('Spring') as HTMLInputElement,
    document.getElementById('Autumn') as HTMLInputElement
  ];
  
  const isAtLeastOneChecked = seasons.some(season => season.checked);
  
  if (!isAtLeastOneChecked) {
    alert("אנא בחר לפחות עונה אחת.");
    return;
  }
  
  const trailData = this.data as any;
  trailData.Seasons = {
    Summer: seasons[0].checked,
    Winter: seasons[1].checked,
    Spring: seasons[2].checked,
    Autumn: seasons[3].checked,
  };

    // שמירה של הערכים מה-inputים אל האובייקט data
    this.data.WalkingTrailName = (
      document.getElementById('WalkingTrailName') as HTMLInputElement
    ).value;
    this.data.Description = (
      document.getElementById('Description') as HTMLInputElement
    ).value;
    this.data.reigionId = Number(
      (document.getElementById('reigionId') as HTMLInputElement).value,
    );
    this.data.Difficulty = Number(
      (document.getElementById('Difficulty') as HTMLInputElement).value,
    );
    this.data.MinAge = Number(
      (document.getElementById('MinAge') as HTMLInputElement).value,
    );
    this.data.MaxAge = Number(
      (document.getElementById('MaxAge') as HTMLInputElement).value,
    );
    ((this.data.Directions = (
      document.getElementById('Directions') as HTMLInputElement
    ).value),
      (this.data.LengthInKm = Number(
        (document.getElementById('LengthInKm') as HTMLInputElement).value,
      )),
      (this.data.RouteDuration = Number(
        (document.getElementById('RouteDuration') as HTMLInputElement).value,
      )));
    this.data.IsWet = (
      document.getElementById('IsWet') as HTMLInputElement
    ).checked;
    // this.data.Seasons.Autumn = (document.getElementById('Autumn') as HTMLInputElement).checked;
    //     this.data.Seasons.Spring = (document.getElementById('Spring') as HTMLInputElement).checked;
    //         this.data.Seasons.Summer = (document.getElementById('Summer') as HTMLInputElement).checked;
    // this.data.Seasons.Winter= (document.getElementById('Autumn') as HTMLInputElement).checked;

    this.walkingTrails.UpdateTrail(this.data);


    console.log('נתונים נשמרו', this.data);

    this.userCanEdit = false;
    this.openDialogRegistrations('מסלול ההליכה עודכן בהצלחה');
  }

  openDialogRegistrations(element: string) {
    const dialogRef = this.dialog.open(SucceededAlertComponent, {
      width: '160px',

      data: element, // העברת הנתונים לדיאלוג
    });
  }
}
