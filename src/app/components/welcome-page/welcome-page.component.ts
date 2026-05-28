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
   
    dialogRef.afterClosed().subscribe(result => {

      // כאן תוכל לקבל את התוצאה של הבחירה (מדריכה או רכזת) ולבצע את הפעולות המתאימות 
      // למחוק אחרי זה!!!!
      console.log('בחירה:', result);

      if (result === 'guide') {
        console.log('נבחרה מדריכה');
      }

      if (result === 'coordinator') {
        console.log('נבחרה רכזת');
      }
    });
  }
}
