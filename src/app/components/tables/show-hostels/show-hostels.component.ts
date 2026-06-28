import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SucceededAlertComponent } from '../succeeded-alert/succeeded-alert.component';
import { Int_Hostels } from '../../../Interfaces/Int_Hostels';
import { ServiceAllService } from '../../../Services/service-all.service';
import { srv_Hostels } from '../../../Services/srv_Hostels';

@Component({
  selector: 'app-show-hostels',
  imports: [MatIcon],
  templateUrl: './show-hostels.component.html',
  styleUrl: './show-hostels.component.scss',
})
export class ShowHostelsComponent {
  userCanEdit = false;
  RegionsArrayData: any;
  KashrutArrayData: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ShowHostelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Int_Hostels,
    public srv_all: ServiceAllService,
    public hostels: srv_Hostels, 
  ) {
    this.RegionsArrayData = this.srv_all.getRegionsArray();
    this.KashrutArrayData = this.srv_all.getKashrutArray();
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
    this.data.RegionId = Number(
      (document.getElementById('RegionId') as HTMLInputElement).value,
    );
    this.data.kashrutId = Number(
      (document.getElementById('kashrutId') as HTMLInputElement).value,
    );
    this.hostels.UpdateHostel(this.data)

    console.log('נתונים נשמרו', this.data);

    this.userCanEdit = false;
    this.openDialogRegistrations("האכסניה")
  }
    openDialogRegistrations(element: string) {
      const dialogRef = this.dialog.open(SucceededAlertComponent, {
        width: '160px',
        
        data: element, // העברת הנתונים לדיאלוג
      });}
}
