import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckerGuideOrCoordinatorComponent } from '../checker-guide-or-coordinator/checker-guide-or-coordinator.component';
import { SighInPageComponent } from '../sigh-in-page/sigh-in-page.component';
import { MatIcon } from "@angular/material/icon";
@Component({
  selector: 'app-welcome-page',
  imports: [MatIcon],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone : true
})
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) {}

  openDialogRegistrations() {

    const dialogRef = this.dialog.open(
      CheckerGuideOrCoordinatorComponent,
      {
        width: '650px',
        data: {}
      }
    );
   
     
  }
  openDialogLogin() {

    const dialogRef = this.dialog.open(
      SighInPageComponent,
      {
        width: '650px',
        data: {}
      }
    );
   
     
  }
}
