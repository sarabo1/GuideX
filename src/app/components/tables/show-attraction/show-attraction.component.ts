import { Component, Inject } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { SucceededAlertComponent } from '../succeeded-alert/succeeded-alert.component';
import { int_Attractions } from '../../../Interfaces/int_Attractions';
import { ServiceAllService } from '../../../Services/service-all.service';
import { srv_Attractions } from '../../../Services/srv_Attractions';
import { srv_Favorite } from '../../../Services/srv_Favorite';
import { AttractionTypeNamePipe } from '../../../Pipes/attractionTypeName';
import { regionNamePipe } from '../../../Pipes/regionName';

@Component({
  selector: 'app-show-attraction',
  imports: [CommonModule, MatIcon, AttractionTypeNamePipe, regionNamePipe],
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
  ) {
    // this.imageUrl = data.ImageUrl; // הכנס את הנתיב לתמונה שלך
    this.RegionsArrayData = this.srv_all.getRegionsArray().subscribe(
      (data) => {
        this.RegionsArrayData = data;
      },
      (error) => {
        console.error('בעיה בהבאת האזורים', error);
      },
    );
    this.AttractionsArrayData = this.Attractions.getAttractionTypes().subscribe(
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
    this.data.shomerShabat = Number(
      (document.getElementById('ShomerShabat') as HTMLInputElement).value,
    );
  }
  // saveEdit() {
  //   this.data.AttractionsName = (
  //     document.getElementById('AttractionsName') as HTMLInputElement
  //   ).value;
  //   this.data.Description = (
  //     document.getElementById('Description') as HTMLInputElement
  //   ).value;
  //   this.data.Address = (
  //     document.getElementById('Address') as HTMLInputElement
  //   ).value;
  //   this.data.Phone = (
  //     document.getElementById('Phone') as HTMLInputElement
  //   ).value;
  //   this.data.AttractionsTypeId = Number(
  //     (document.getElementById('AttractionsTypeId') as HTMLInputElement).value,
  //   );
  //   this.data.RegionId =
  //     (document.getElementById('RegionId') as HTMLInputElement).value,

  //   // this.data.ImageUrl =
  //   //   (document.getElementById('ImageUrl') as HTMLInputElement).value,

  //   this.Attractions.UpdateAttraction(this.data);

  //   console.log('נתונים נשמרו', this.data);

  //   this.userCanEdit = false;
  //   this.openDialogRegistrations('האטרקציה');
  // }
  saveEdit() {
    this.data.attractionId = this.data.attractionId;
    this.data.attractionsName = (
      document.getElementById('AttractionsName') as HTMLInputElement
    ).value;

    this.data.description = (
      document.getElementById('Description') as HTMLInputElement
    ).value;

    this.data.address = (
      document.getElementById('Address') as HTMLInputElement
    ).value;

    this.data.phone = (
      document.getElementById('Phone') as HTMLInputElement
    ).value;

    this.data.attractionTypeId = Number(
      (document.getElementById('AttractionsTypeId') as HTMLInputElement).value,
    );

    this.data.reigionId = Number(
      (document.getElementById('RegionId') as HTMLInputElement).value,
    );

    this.data.shomerShabat = Number(
      (document.getElementById('ShomerShabat') as HTMLInputElement).value,
    );

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

        },
        error: (err) => {
          console.error('שגיאה בהוספת האטרקציה:', err);
          // כאן תוכל להציג הודעה למשתמש על השגיאה
        },
      });
    } else {
      console.log(this.isAddNew, 'עדכון');

      // this.Attractions.UpdateAttraction(this.data);
      this.Attractions.UpdateAttraction(this.data).subscribe({
        next: () => {
          console.log('עודכן בהצלחה');
          this.userCanEdit = false;
          this.openDialogRegistrations('האטרקציה עודכנה בהצלחה');
        },
        error: (err) => {
          console.error('שגיאה בעדכון:', err);
          // כאן תוכל להציג הודעה למשתמש על השגיאה
        },
      });
      // console.log('נתונים נשמרו', this.data);

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
