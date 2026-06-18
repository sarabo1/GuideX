import { Component, Inject } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { int_Attractions } from '../../Interfaces/int_Attractions';
import { ServiceAllService } from '../../Services/service-all.service';
import { srv_Attractions } from '../../Services/srv_Attractions';
import { MatIcon } from '@angular/material/icon';

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
    imageUrl: string;

  constructor(
    public dialogRef: MatDialogRef<ShowAttractionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: int_Attractions,
    public srv_all: ServiceAllService,
    public Attractions: srv_Attractions,
  ) {
        this.imageUrl = data.ImageUrl; // הכנס את הנתיב לתמונה שלך

  }
  ngOnInit() {
    console.log('Data received in dialog:', this.data);
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
