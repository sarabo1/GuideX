import { Component, Inject } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { SucceededAlertComponent } from '../succeeded-alert/succeeded-alert.component';
import { int_Attractions } from '../../../Interfaces/int_Attractions';
import { ServiceAllService } from '../../../Services/service-all.service';
import { srv_Attractions } from '../../../Services/srv_Attractions';

@Component({
  selector: 'app-show-attraction',
  imports: [CommonModule, MatIcon],
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

  constructor(
        public dialog: MatDialog,

    public dialogRef: MatDialogRef<ShowAttractionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: int_Attractions,
    public srv_all: ServiceAllService,
    public Attractions: srv_Attractions,
  ) {
    // this.imageUrl = data.ImageUrl; // הכנס את הנתיב לתמונה שלך
    this.RegionsArrayData = this.srv_all.getRegionsArray();
    this.AttractionsArrayData = this.Attractions.getAttractionTypes();
  }

  onClose(): void {
    this.dialogRef.close();
  }
  canEdit() {
    this.userCanEdit = true;
  }

  changeShomerShabat() {
    this.data.ShomerShabat = Number(
      (document.getElementById('ShomerShabat') as HTMLInputElement).value,
    );
  }
  saveEdit() {
    this.data.AttractionsName = (
      document.getElementById('AttractionsName') as HTMLInputElement
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
    this.data.AttractionsTypeId = Number(
      (document.getElementById('AttractionsTypeId') as HTMLInputElement).value,
    );
    this.data.RegionId = Number(
      (document.getElementById('RegionId') as HTMLInputElement).value,
    );
    // this.data.ImageUrl =
    //   (document.getElementById('ImageUrl') as HTMLInputElement).value,

    this.Attractions.UpdateAttraction(this.data);

    console.log('נתונים נשמרו', this.data);

    this.userCanEdit = false;
    this.openDialogRegistrations("האטרקציה")
    
  }
   openDialogRegistrations(element: string) {
        const dialogRef = this.dialog.open(SucceededAlertComponent, {
          width: '160px',
          
          data: element, // העברת הנתונים לדיאלוג
        });}
}
