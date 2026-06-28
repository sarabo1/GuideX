import { Component } from '@angular/core';
import { SrvForumMessageService } from '../../../Services/srv-forum-message.service';
import { int_ForumMessage } from '../../../Interfaces/int_ForumMessage';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SrvDateService } from '../../../Services/srv_Date.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageTipsForumComponent } from '../new-message-tips-forum/new-message-tips-forum.component';
import { ForumMessageStoreService } from '../../../Services/forum-message-store.service';
import { ServiceUsersService } from '../../../Services/service-users.service';

@Component({
  selector: 'app-tips-forum',
  imports: [MatIcon, CommonModule],
  templateUrl: './tips-forum.component.html',
  styleUrl: './tips-forum.component.scss',
})
export class TipsForumComponent {
  allTheMessage: int_ForumMessage[] | undefined;

  constructor(
    public srv_forum: SrvForumMessageService,
    public Srv_Date: SrvDateService,
    public dialog: MatDialog,
    private forumMessageStore: ForumMessageStoreService,
    public srv_user : ServiceUsersService,
  ) {
    this.forumMessageStore.getMessages().subscribe((messages) => {
      console.log('Messages received from store:', messages);

      const filteredMessages = messages.filter(
        (message) => message.ForumTypeId === 1,
      );

      this.allTheMessage = filteredMessages;
    });
    //  this.allTheMessage = srv_forum.getAllMessageByForumType(1);
  }

  openDialogAddMessage(parent: number, typeForum: number) {
    console.log('הצליח', parent, typeForum); // לוג עבור בדיקה
    const dialogRef = this.dialog.open(NewMessageTipsForumComponent, {
      width: '850px',
      data: { parent, typeForum }, // העברת הנתונים לדיאלוג
    });
  }


  maskEmail(email : string) {
     const atIndex = email.indexOf('@');
    if (atIndex === -1) return email; // במידה ואין סימן '@', מחזירים את המייל כפי שהוא

    const name = email.substring(0, atIndex);
    const domain = email.substring(atIndex); // הופך את הדומיין לאותיות גדולות

    // אם המייל קצר מ-5 אותיות, מחזירים אותו כפי שהוא
    if (name.length <= 4) {
        return email;
    }

    const maskedName = name.substring(0, 4) + '*'.repeat(name.length - 4);
    return maskedName + domain;
}
}
