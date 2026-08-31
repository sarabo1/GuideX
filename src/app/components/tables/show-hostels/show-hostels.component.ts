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
import { FormsModule } from '@angular/forms';
import { RefreshService } from '../../../Services/RefreshService';

@Component({
  selector: 'app-show-hostels',
  imports: [MatIcon, regionNamePipe, CommonModule, FormsModule],
  templateUrl: './show-hostels.component.html',
  styleUrl: './show-hostels.component.scss',
})
export class ShowHostelsComponent {
  userCanEdit = false;
  RegionsArrayData: any;
  KashrutArrayData: any;
  isLiked: boolean = false;
  isAddNew = false;
  userDetails: any = JSON.parse(localStorage.getItem('user_data') || '{}');

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ShowHostelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Int_Hostels,
    public srv_all: ServiceAllService,
    public hostels: srv_Hostels,
    public srv_favorite: srv_Favorite,
    public refreshService: RefreshService,
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
    this.checkIfAddNew();
  }

  checkIfAddNew() {
    if (
      this.data &&
      this.data.HostelsId == 0 &&
      this.data.HostelsName == '' &&
      this.data.Description == '' &&
      this.data.Address == '' &&
      this.data.Phone == '' &&
      this.data.NumberOfPlaces == 0 &&
      this.data.reigionId == 0 &&
      this.data.kashrutId == 0
    ) {
      this.isAddNew = true;
      this.userCanEdit = true;
      console.log('this.isAddNew', this.isAddNew);
    }
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
    // הערכים נקראים ישירות מ- this.data דרך [(ngModel)] בטמפלייט,
    // כך שכל דיאלוג עובד עם אובייקט הנתונים שלו.
    this.data.HostelsName = (this.data.HostelsName ?? '').trim();
    this.data.Description = (this.data.Description ?? '').trim();
    this.data.Address = (this.data.Address ?? '').trim();
    this.data.Phone = (this.data.Phone ?? '').trim();
    this.data.NumberOfPlaces = Number(this.data.NumberOfPlaces) || 0;
    this.data.reigionId = Number(this.data.reigionId) || 0;
    this.data.kashrutId = Number(this.data.kashrutId) || 0;

    console.log('data: ', this.data);

    if (this.isAddNew) {
      if (
        this.data.Description.trim() == '' ||
        this.data.HostelsName.trim() == '' ||
        this.data.reigionId == 0 ||
        this.data.kashrutId == 0
      ) {
        return;
      }
      this.hostels.AddNewHostel(this.data).subscribe({
        next: () => {
          console.log('הוספת מקום לינה');
          this.onClose();
          this.openDialogRegistrations('מקום הלינה נוסף בהצלחה');
          this.refreshService.triggerRefresh(); // רענון הטבלה אחרי שהוספה
        },
        error: (err) => {
          console.error('שגיאה בהוספת מקום הלינה:', err);
        },
      });
    } else {
      this.hostels.UpdateHostel(this.data).subscribe({
        next: () => {
          console.log('נתונים נשמרו', this.data);
          this.userCanEdit = false;
          this.openDialogRegistrations('נתוני האכסניה עודכנו בהצלחה');
          this.refreshService.triggerRefresh(); // רענון הטבלה אחרי שהעדכון הסתיים
        },
        error: (err) => {
          console.error('שגיאה בעדכון האכסניה:', err);
        },
      });
    }
  }

  deleteHostel() {
    this.hostels.deleteHostel(this.data.HostelsId).subscribe({
      next: () => {
        console.log('מחיקת מקום לינה');
        this.onClose();
        this.openDialogRegistrations('מקום הלינה נמחק בהצלחה');
        this.refreshService.triggerRefresh(); // רענון הטבלה אחרי שהמחיקה הסתיימה
      },
      error: (err) => {
        console.error('שגיאה במחיקת מקום הלינה:', err);
      },
    });
  }


  openDialogRegistrations(element: string) {
    const dialogRef = this.dialog.open(SucceededAlertComponent, {
      width: '160px',

      data: element, // העברת הנתונים לדיאלוג
    });
  }
}
