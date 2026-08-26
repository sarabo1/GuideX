import { Injectable } from '@angular/core';
import { int_ForumMessage } from '../Interfaces/int_ForumMessage';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SrvForumMessageService {
  private allMessagesUrl = 'https://localhost:7098/forum/messesges';
  private forumTypeUrl = 'https://localhost:7098/forum/type';
  private addForum = 'https://localhost:7098/forum/new';
  private deleteUrl = 'https://localhost:7098/forum/'
  constructor(public http: HttpClient) {}

  getAllMessagesFromServer(): Observable<int_ForumMessage[]> {
    return this.http.get<int_ForumMessage[]>(this.allMessagesUrl);
  }

  getAllMessagesByForumType(type: number): Observable<int_ForumMessage[]> {
    console.log(Number)
    return this.http.get<int_ForumMessage[]>(`${this.forumTypeUrl}/${type}`).pipe(
      tap((data) => {
        console.log('Forum messages by type:', data);
      
      }),
    );
}

  getMessageById(forumId: number): Observable<int_ForumMessage> {
    return this.http.get<int_ForumMessage>(`${this.allMessagesUrl}/${forumId}`);
  }


  postMessage(msg: int_ForumMessage): Observable<int_ForumMessage> {
    return this.http.post<int_ForumMessage>(this.addForum, msg);
  }
  // deletePost(forumId: number){
  //   console.log('sss: ',forumId)
  //   return this.http.delete(`${this.deleteUrl}/${forumId}`);
  // }

deletePost(forumId: number) {
     console.log('sss: ', forumId);
     return this.http.delete(`${this.deleteUrl}${forumId}`).subscribe(
       response => {
         console.log('Post deleted successfully:', response);
       },
       error => {
         console.error('Error deleting post:', error);
       }
     );
   }
 

}
