import { Component, Inject } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { SucceededAlertComponent } from '../succeeded-alert/succeeded-alert.component';
import { int_Attractions } from '../../../Interfaces/int_Attractions';
import { ServiceAllService } from '../../../Services/service-all.service';
import { srv_Attractions } from '../../../Services/srv_Attractions';
import { srv_Favorite } from '../../../Services/srv_Favorite';
import { AttractionTypeNamePipe } from '../../../Pipes/attractionTypeName';
import { regionNamePipe } from '../../../Pipes/regionName';
import { RefreshService } from '../../../Services/RefreshService';

@Component({
  selector: 'app-show-attraction',
  imports: [CommonModule, MatIcon, AttractionTypeNamePipe, regionNamePipe, FormsModule],
  templateUrl: './show-attraction.component.html',
  styleUrl: './show-attraction.component.scss',
  standalone: true,
})
export class ShowAttractionComponent {
  // public dialogRef!: MatDialogRef<ShowAttractionComponent>;
  //   @Inject(MAT_DIALOG_DATA)
  // public data!: int_Attractions;
  // imageUrl: string;
  userCanEdit = false;
  RegionsArrayData: any;
  AttractionsArrayData: any;
  isLiked: boolean = false;
  isAddNew = false;

  userDetails: any = JSON.parse(localStorage.getItem('user_data') || '{}');

  constructor(
    public dialog: MatDialog,

    public dialogRef: MatDialogRef<ShowAttractionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: int_Attractions,
    public srv_all: ServiceAllService,
    public Attractions: srv_Attractions,
    public srv_favorite: srv_Favorite,
        public refreshService: RefreshService,

  ) {
    // האיברים מאותחלים כמערכים כדי שה-@for בטמפלייט יפעל בצורה בטוחה
    this.RegionsArrayData = [];
    this.AttractionsArrayData = [];

    this.srv_all.getRegionsArray().subscribe(
      (data) => {
        this.RegionsArrayData = data;
      },
      (error) => {
        console.error('בעיה בהבאת האזורים', error);
      },
    );
    this.Attractions.getAttractionTypes().subscribe(
      (data) => {
        this.AttractionsArrayData = data;
      },
      (error) => {
        console.error('בעיה בהבאת סוגי האטרקציות', error);
      },
    );
    this.checkIfAddNew();
  }
  checkIfAddNew() {
    if (
      this.data &&
      this.data.address == '' &&
      this.data.attractionId == 0 &&
      this.data.attractionTypeId == 0 &&
      this.data.attractionsName == '' &&
      this.data.description == '' &&
      this.data.phone == '' &&
      this.data.reigionId == 0 &&
      this.data.shomerShabat == 2
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

    if (!userId || !this.data?.attractionId) {
      this.isLiked = false;
      return;
    }

    this.isLiked = this.srv_favorite.isFavorite(
      userId,
      Number(this.data.attractionId),
      'attraction',
    );
  }

  toggleFavorite() {
    if (
      this.srv_favorite.isFavorite(
        this.userDetails?.userId,
        this.data.attractionId,
        'attraction',
      )
    ) {
      this.srv_favorite.removeFavorite(
        this.userDetails?.userId,
        this.data.attractionId,
        'attraction',
      );
      this.isLiked = false;
    } else {
      this.srv_favorite.addFavorite(
        this.userDetails?.userId,
        this.data.attractionId,
        'attraction',
      );
      this.isLiked = true;
    }
  }
  deleteAttraction(){
     this.Attractions.deleteAttraction(this.data.attractionId).subscribe({
        next: () => {
          console.log('מחיקת מסלול');
          this.onClose();
          this.openDialogRegistrations('האטרקציה נמחקה בהצלחה');
          this.refreshService.triggerRefresh(); // רענון הטבלה אחרי שהמחיקה הסתיימה

        },
        error: (err) => {
          console.error('שגיאה במחיקת האטרקציה:', err);
          // כאן תוכל להציג הודעה למשתמש על השגיאה
        },
      });

  }

  onClose(): void {
    this.dialogRef.close();
  }
  canEdit() {
    this.userCanEdit = true;
  }

  changeShomerShabat() {
    // הערך מתעדכן אוטומטית מה-[(ngModel)] של ה-select; נרמול למספר בלבד
    this.data.shomerShabat = Number(this.data.shomerShabat);
  }

  saveEdit() {
    // הערכים נקראים ישירות מ- this.data דרך [(ngModel)] בטמפלייט,
    // כך שכל דיאלוג עובד עם אובייקט הנתונים שלו ולא עם getElementById גלובלי.
    // נרמול לשם ערכים בטוחים:
    this.data.attractionsName = (this.data.attractionsName ?? '').trim();
    this.data.description = (this.data.description ?? '').trim();
    this.data.address = (this.data.address ?? '').trim();
    this.data.phone = (this.data.phone ?? '').trim();
    this.data.attractionTypeId = Number(this.data.attractionTypeId) || 0;
    this.data.reigionId = Number(this.data.reigionId) || 0;
    this.data.shomerShabat = Number(this.data.shomerShabat);

    console.log('data: ', this.data);

    if (this.isAddNew) {
      if (
        this.data.description.trim() == '' ||
        this.data.attractionTypeId == 0 ||
        this.data.reigionId == 0
      ){
        return
      }
      this.Attractions.AddNewAttraction(this.data).subscribe({
        next: () => {
          console.log('הוספת מסלול');
          this.onClose();
          this.openDialogRegistrations('האטרקציה נוספה בהצלחה');
          this.refreshService.triggerRefresh(); // רענון הטבלה אחרי שהוספה

        },
        error: (err) => {
          console.error('שגיאה בהוספת האטרקציה:', err);
        },
      });
    } else {
      console.log(this.isAddNew, 'עדכון');

      this.Attractions.UpdateAttraction(this.data).subscribe({
        next: () => {
          console.log('עודכן בהצלחה');
          this.userCanEdit = false;
          this.openDialogRegistrations('האטרקציה עודכנה בהצלחה');
          this.refreshService.triggerRefresh(); // רענון הטבלה אחרי שהעדכון הסתיים

        },
        error: (err) => {
          console.error('שגיאה בעדכון:', err);
        },
      });

      this.userCanEdit = false;
    }

  }
  openDialogRegistrations(element: string) {
    const dialogRef = this.dialog.open(SucceededAlertComponent, {
      width: '160px',

      data: element, // העברת הנתונים לדיאלוג
    });
  }
}
