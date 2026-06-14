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

messages: { sender: string, text: string }[] = [
    { sender: 'חני, רכזת טיולים', text: 'ממליצה על האתר הזה בכל לב!!!' },
    { sender: 'א.ש. המהלת בי"ע', text: 'במקום לעבוד ימים כדי למצוא טיולים ואטרקציות, מצאתי פה תוך כמה דקות' },
    { sender: 'שושי וייס', text: 'אשמח תמיד להשתמש באתר הזה!!' },
    { sender: 'ח. ר.', text: 'אין אתר יותר מוצלח!!' },
    { sender: 'אסתר, מדריכת טיולים', text: 'תמיד אשתמש באתר הזה' },
    { sender: 'מרים', text: 'מה שלוקח לי תמיד מלא זמן פה תוך כמה דקות סיימתי' },
    { sender: 'רחל ט.', text: 'עזר לי בטרוף' },
];
currentMessageIndex: number = 0;
  interval: any;
    numMessages = 1;

  ngOnInit(): void {
    console.log("onInit")
    this.startMessageRotation();

  }

  startMessageRotation() {
    this.interval = setInterval(() => {
      this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
    }, 3000); // להחליף הודעה כל 3 שניות
  }

  ngOnDestroy(): void {
    clearInterval(this.interval); // לנקות את ה-intervalid כאשר רכיב מתפרק
  }
}


