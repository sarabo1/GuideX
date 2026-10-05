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
import { AuthService } from '../../../Services/auth-service.service';

@Component({
  selector: 'app-tips-forum',
  imports: [MatIcon, CommonModule, HebrewDateConverterPipe],
  templateUrl: './tips-forum.component.html',
  styleUrl: './tips-forum.component.scss',
})
export class TipsForumComponent {
  // כל ההודעות בסדר צפייה: כל תגובה מופיעה מיד לאחר הודעת המקור שלה
  allTheMessage: int_ForumMessage[] | undefined;
  forumType: number = 0;

  constructor(
    public dialog: MatDialog,
    public forumMessageStore: ForumMessageStoreService,
    public srv_user: ServiceUsersService,
    private route: ActivatedRoute,
    public Srv_Forum: SrvForumMessageService,
    public authService: AuthService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.forumType = Number(params['ForumType']);
      this.forumMessageStore.fetchMessagesByForumType(this.forumType);
    });

    this.forumMessageStore.getMessages().subscribe((messages) => {
      this.allTheMessage = this.organizeMessages(messages || []);
    });
  }

  /**
   * מסנן את ההודעות של פורום זה, ממיין אותן בצורה היררכית
   * ומחזיר רשימה מסודרת שבה כל תגובה מופיעה מיד לאחר הודעת המקור שלה.
   */
  private organizeMessages(messages: int_ForumMessage[]): int_ForumMessage[] {
    const forumMessages = messages.filter(
      (mess) => mess.forumTypeId === this.forumType
    );

    const byId = new Map<number, int_ForumMessage>();
    forumMessages.forEach((m) => byId.set(m.forumId, { ...m }));

    // מיין לפי תאריך (עולה לרשומות, יורד ליתר הפורומים)
    forumMessages.sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return this.forumType === 3 ? diff : -diff;
    });

    const roots: int_ForumMessage[] = [];
    const replies: int_ForumMessage[] = [];

    forumMessages.forEach((m) => {
      if (m.parentForumId && byId.has(m.parentForumId)) {
        replies.push(m);
      } else if (m.parentForumId) {
        // תגובה להודעה שנמצאת בפורום אחר/נמחקה — מציגים אותה כהודעה עצמאית
        roots.push(m);
      } else {
        roots.push(m);
      }
    });

    // סדר סופי: הודעות מקור, וכל אחת מופיעה עם התגובות שלה
    const ordered: int_ForumMessage[] = [];
    roots.forEach((root) => {
      ordered.push(root);
      replies.forEach((reply) => {
        if (reply.parentForumId === root.forumId) {
          ordered.push(reply);
        }
      });
    });

    return ordered.map((m) => ({ ...m, date: new Date(m.date) }));
  }

  isReply(message: int_ForumMessage): boolean {
    return !!message.parentForumId;
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

  DeletePost(forumId: number) {
    if (confirm('האם הנכם בטוחים במחיקה?')) {
      this.Srv_Forum.deletePost(forumId);
      this.forumMessageStore.fetchMessagesByForumType(this.forumType);
    } else {
      console.log('מחיקה בוטלה');
      return;
    }
  }

 
}
