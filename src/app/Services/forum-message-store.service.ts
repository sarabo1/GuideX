
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; // זהו הממשק של ההודעה
import { int_ForumMessage } from '../Interfaces/int_ForumMessage';
import { SrvForumMessageService } from './srv-forum-message.service';

@Injectable({
  providedIn: 'root'
})
export class ForumMessageStoreService {
  private messagesSubject: BehaviorSubject<int_ForumMessage[]>;

  constructor(public srv_forum : SrvForumMessageService ) {   
   
    const initialMessages: int_ForumMessage[] = this.srv_forum.getAllMessages()
    this.messagesSubject = new BehaviorSubject<int_ForumMessage[]>(initialMessages); }

  // פונקציה להוסיף הודעה
  addMessage(message: int_ForumMessage): void {
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, message]);
  }

  // פונקציה לחכות למסרים
  getMessages(): Observable<int_ForumMessage[]> {
      return this.messagesSubject.asObservable();
  }

  // פונקציה לקבל את ההודעות הנוכחיות
  getCurrentMessages(): int_ForumMessage[] {
    return this.messagesSubject.getValue();
  }

  // פונקציה להגדיר הודעות חדשות (למשל, לאחר טעינה מהשרת)
  setMessages(messages: int_ForumMessage[]): void {
    this.messagesSubject.next(messages);
  }
}