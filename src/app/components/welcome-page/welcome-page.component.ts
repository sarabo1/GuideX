import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckerGuideOrCoordinatorComponent } from '../checker-guide-or-coordinator/checker-guide-or-coordinator.component';
@Component({
  selector: 'app-welcome-page',
  imports: [],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone : true
})
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {

    const dialogRef = this.dialog.open(
      CheckerGuideOrCoordinatorComponent,
      {
        width: '650px',
        data: {}
      }
    );
   
     
  }
}
