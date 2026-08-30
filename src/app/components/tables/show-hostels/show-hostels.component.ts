import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SucceededAlertComponent } from '../succeeded-alert/succeeded-alert.component';
import { Int_Hostels } from '../../../Interfaces/Int_Hostels';
import { ServiceAllService } from '../../../Services/service-all.service';
import { srv_Hostels } from '../../../Services/srv_Hostels';
import { srv_Favorite } from '../../../Services/srv_Favorite';
import { regionNamePipe } from "../../../Pipes/regionName";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-hostels',
  imports: [MatIcon, regionNamePipe, CommonModule],
  templateUrl: './show-hostels.component.html',
  styleUrl: './show-hostels.component.scss',
})
export class ShowHostelsComponent {
  userCanEdit = false;
  RegionsArrayData: any;
  KashrutArrayData: any;
  isLiked: boolean = false;
  userDetails: any = JSON.parse(localStorage.getItem('user_data') || '{}');

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ShowHostelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Int_Hostels,
    public srv_all: ServiceAllService,
    public hostels: srv_Hostels,
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
    this.KashrutArrayData = this.srv_all.getKashrutArray();
  }

  ngOnInit() {
    const raw = localStorage.getItem('user_data');
    this.userDetails = raw ? JSON.parse(raw) : null;

    const userId = this.userDetails?.userId;

    if (!userId || !this.data?.HostelsId) {
      this.isLiked = false;
      return;
    }

    this.isLiked = this.srv_favorite.isFavorite(
      userId,
      Number(this.data.HostelsId),
      'hostel',
    );
  }
  toggleFavorite() {
    if (
      this.srv_favorite.isFavorite(
        this.userDetails?.userId,
        this.data.HostelsId,
        'hostel',
      )
    ) {
      this.srv_favorite.removeFavorite(
        this.userDetails?.userId,
        this.data.HostelsId,
        'hostel',
      );
      this.isLiked = false;
    } else {
      this.srv_favorite.addFavorite(
        this.userDetails?.userId,
        this.data.HostelsId,
        'hostel',
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
    // שמירה של הערכים מה-inputים אל האובייקט data
    this.data.HostelsName = (
      document.getElementById('HostelsName') as HTMLInputElement
    ).value;
    this.data.Description = (
      document.getElementById('Description') as HTMLInputElement
    ).value;
    this.data.Address = (
      document.getElementById('Address') as HTMLInputElement
    ).value;
    this.data.Phone = (
      document.getElementById('Phone') as HTMLInputElement
    ).value;
    this.data.NumberOfPlaces = Number(
      (document.getElementById('NumberOfPlaces') as HTMLInputElement).value,
    );
    this.data.reigionId = Number(
      (document.getElementById('reigionId') as HTMLInputElement).value,
    );
    this.data.kashrutId = Number(
      (document.getElementById('kashrutId') as HTMLInputElement).value,
    );
    this.hostels.UpdateHostel(this.data);

    console.log('נתונים נשמרו', this.data);

    this.userCanEdit = false;
    this.openDialogRegistrations('נתוני האכסניה עודכנו בהצלחה');
  }


  openDialogRegistrations(element: string) {
    const dialogRef = this.dialog.open(SucceededAlertComponent, {
      width: '160px',

      data: element, // העברת הנתונים לדיאלוג
    });
  }
}
