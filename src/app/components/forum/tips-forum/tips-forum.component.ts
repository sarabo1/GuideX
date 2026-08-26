import { Component } from '@angular/core';
import { int_ForumMessage } from '../../../Interfaces/int_ForumMessage';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageTipsForumComponent } from '../new-message-tips-forum/new-message-tips-forum.component';
import { ForumMessageStoreService } from '../../../Services/forum-message-store.service';
import { ServiceUsersService } from '../../../Services/srv-users';
import { HebrewDateConverterPipe } from '../../../Pipes/hebrewDateConverter ';
import { ActivatedRoute } from '@angular/router';
import { SrvForumMessageService } from '../../../Services/srv-forum-message.service';

@Component({
  selector: 'app-tips-forum',
  imports: [MatIcon, CommonModule, HebrewDateConverterPipe],
  templateUrl: './tips-forum.component.html',
  styleUrl: './tips-forum.component.scss',
})
export class TipsForumComponent {
  allTheMessage: int_ForumMessage[] | undefined;
  forumType: number = 0;

  constructor(
    public dialog: MatDialog,
    public forumMessageStore: ForumMessageStoreService,
    public srv_user: ServiceUsersService,
    private route: ActivatedRoute,
    public Srv_Forum: SrvForumMessageService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.forumType = Number(params['ForumType']);

      this.forumMessageStore.fetchMessagesByForumType(this.forumType);
    });

this.forumMessageStore.getMessages().subscribe((messages) => {
  const sorted = [...messages].sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return this.forumType === 3 ? diff : -diff;
  });
  this.allTheMessage = sorted.map(message => ({
    ...message,
    date: new Date(message.date) 
  }));
  this.allTheMessage = this.allTheMessage.filter(mess => mess.forumTypeId = this.forumType)

  console.log("הגיע לפה: ", this.allTheMessage); 
    this.allTheMessage = this.allTheMessage.filter(mess => mess.forumTypeId = this.forumType)

});

  }

  openDialogAddMessage(parent: number, typeForum: number) {
    console.log('הצליח', parent, typeForum); // לוג עבור בדיקה
    const dialogRef = this.dialog.open(NewMessageTipsForumComponent, {
      width: '850px',
      data: { parent, typeForum }, // העברת הנתונים לדיאלוג
    });
  }

  maskEmail(email: string) {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return email; // במידה ואין סימן '@', מחזירים את המייל כפי שהוא

    const name = email.substring(0, atIndex);
    const domain = email.substring(atIndex); // הופך את הדומיין לאותיות גדולות

    // אם המייל קצר מ-5 אותיות, מחזירים אותו כפי שהוא
    if (name.length <= 4) {
      return email;
    }

    const maskedName = name.substring(0, 3) + '*'.repeat(name.length - 3);
    return maskedName + domain;
  }

  DeletePost(forumId: number ){
    this.Srv_Forum.deletePost(forumId)
    this.forumMessageStore.fetchMessagesByForumType(this.forumType);

  }
}
