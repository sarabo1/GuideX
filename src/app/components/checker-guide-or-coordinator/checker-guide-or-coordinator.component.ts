import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewUserRegistrationsComponent } from '../new-user-registrations/new-user-registrations.component';

@Component({
  selector: 'app-checker-guide-or-coordinator',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, NewUserRegistrationsComponent],
  templateUrl: './checker-guide-or-coordinator.component.html',
  styleUrl: './checker-guide-or-coordinator.component.scss',
  standalone : true
})
export class CheckerGuideOrCoordinatorComponent {

 constructor(
    public dialogRef: MatDialogRef<CheckerGuideOrCoordinatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Router: Router
  ) {}

  chooseGuide() {
    this.dialogRef.close('guide');
  //לשנות לקומפוננטות הזיהוי של המדריכה
    this.Router.navigate(['הרשמות למערכת']);
  }

  chooseCoordinator() {
    this.dialogRef.close('coordinator');
    //לשנות לקומפוננטות הזיהוי של הרכזת
    this.Router.navigate(['הרשמות למערכת']);
  }

  onClose(): void {
    this.dialogRef.close(); 
  }
  
}
