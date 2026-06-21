import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Int_WalkingTrail } from '../../Interfaces/Int_WalkingTrail';
import { ServiceAllService } from '../../Services/service-all.service';
import { MatIcon } from '@angular/material/icon';
import { SrvWalkingTrailService } from '../../Services/srv-WalkingTrail.service';
import { SucceededAlertComponent } from '../succeeded-alert/succeeded-alert.component';

@Component({
  selector: 'app-show-walking-trail',
  imports: [MatIcon],
  templateUrl: './show-walking-trail.component.html',
  styleUrl: './show-walking-trail.component.scss',
})
export class ShowWalkingTrailComponent {
  userCanEdit = false;
  RegionsArrayData: any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ShowWalkingTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Int_WalkingTrail,
    public srv_all: ServiceAllService,
        public walkingTrails: SrvWalkingTrailService,
    
  ) {
    this.RegionsArrayData = this.srv_all.getRegionsArray();
  }
  onClose(): void {
    this.dialogRef.close();
  }

  canEdit() {
    this.userCanEdit = true;
  }
  saveEdit() {
    console.log("saveEdit")
    // שמירה של הערכים מה-inputים אל האובייקט data
    this.data.WalkingTrailName = (
      document.getElementById('WalkingTrailName') as HTMLInputElement
    ).value;
    this.data.Description = (
      document.getElementById('Description') as HTMLInputElement
    ).value;
    this.data.RegionId = Number(
      (document.getElementById('RegionId') as HTMLInputElement).value,
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
    this.data.Directions = 
      (document.getElementById('Directions') as HTMLInputElement).value,
       this.data.LengthInKm =  Number(
      (document.getElementById('LengthInKm') as HTMLInputElement).value),
     this.data.RouteDuration = Number(
      (document.getElementById('RouteDuration') as HTMLInputElement).value,
    );
    this.data.IsWet = (
      document.getElementById('IsWet') as HTMLInputElement
    ).checked;
    this.walkingTrails.UpdateTrail(this.data)

    console.log('נתונים נשמרו', this.data);

    this.userCanEdit = false;
    this.openDialogRegistrations("מסלול ההליכה")
  }

  openDialogRegistrations(element: string) {
    const dialogRef = this.dialog.open(SucceededAlertComponent, {
      width: '160px',
      
      data: element, // העברת הנתונים לדיאלוג
    });}
}