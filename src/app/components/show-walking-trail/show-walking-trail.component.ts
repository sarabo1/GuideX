import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Int_WalkingTrail } from '../../Interfaces/Int_WalkingTrail';
import { ServiceAllService } from '../../Services/service-all.service';
import { MatIcon } from '@angular/material/icon';
import { RoundDownPipe } from '../../Pipes/round-down.pipe';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-show-walking-trail',
  imports: [MatIcon, RoundDownPipe, DecimalPipe],
  templateUrl: './show-walking-trail.component.html',
  styleUrl: './show-walking-trail.component.scss',
})
export class ShowWalkingTrailComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowWalkingTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Int_WalkingTrail,
    public srv_all: ServiceAllService,
  ) {}
  ngOnInit() {
    console.log('Data received in dialog:', this.data);
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
