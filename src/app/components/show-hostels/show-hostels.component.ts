import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Int_Hostels } from '../../Interfaces/Int_Hostels';
import { ServiceAllService } from '../../Services/service-all.service';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-show-hostels',
  imports: [MatIcon],
  templateUrl: './show-hostels.component.html',
  styleUrl: './show-hostels.component.scss'
})
export class ShowHostelsComponent {
   constructor(
    public dialogRef: MatDialogRef<ShowHostelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Int_Hostels,
    public srv_all: ServiceAllService
  ) { }
    ngOnInit(){
      console.log('Data received in dialog:', this.data);
    }
    onClose(): void {
    this.dialogRef.close(); 
  }
}
