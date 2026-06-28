import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SrvForumMessageService } from '../../../Services/srv-forum-message.service';
import { MatIcon } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../Services/auth-service.service';
import { NoWhitespaceValidatorService } from '../../../Services/noWhitespace_validator';
import { int_ForumMessage } from '../../../Interfaces/int_ForumMessage';
import { ForumMessageStoreService } from '../../../Services/forum-message-store.service';

@Component({
  selector: 'app-new-message-tips-forum',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './new-message-tips-forum.component.html',
  styleUrl: './new-message-tips-forum.component.scss',
})
export class NewMessageTipsForumComponent {
  userDetails: any;
  // forumMessageStore?: any;
  private noSpace_validSrv = inject(NoWhitespaceValidatorService);

  constructor(
    public dialogRef: MatDialogRef<NewMessageTipsForumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { parent: number; typeForum: number },
    public srv_forum: SrvForumMessageService,
    public authService: AuthService,
    private forumMessageStore: ForumMessageStoreService
  ) {}
  ngOnInit() {
    this.userDetails = this.authService.getUserData();
    console.log(this.userDetails);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  formNewMesagge = new FormGroup({
    titleName: new FormControl('', [
      Validators.required,
      this.noSpace_validSrv.valid_espace,
    ]),
    message: new FormControl('', [
      Validators.required,
      this.noSpace_validSrv.valid_espace,
    ]),
  });

  send() {
    if (!this.userDetails) {
      return;
    }
    const userId = this.userDetails.userId;
    console.log('user id: ' + userId);
    const parent = this.data.parent;
    const forumType = this.data.typeForum;

    const date = new Date();
    const forumId = this.srv_forum.GetLastForumId() + 1;
    const title = this.formNewMesagge.get('titleName')?.value?.trim() ?? '';
    console.log(title);
    const message = this.formNewMesagge.get('message')?.value?.trim() ?? '';
    const newMessage: int_ForumMessage = {
      ForumId: forumId,
      UserId: userId,
      Date: date,
      ParentForumId: parent,
      Title: title,
      Message: message,
      ForumTypeId: forumType,
    };
    this.srv_forum.addNewForumMsg(userId, parent, title, message, forumType);
    this.forumMessageStore.addMessage(newMessage); // הוסף את ההודעה לסטור
 
      this.formNewMesagge.reset();
    this.onClose();
    
  }
}

