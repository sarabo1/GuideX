import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  // שמירת המייל ב-localStorage
  login(email: string, userId : string) {
       const userObj = { email: email, userId : userId  };
       localStorage.setItem('user_data', JSON.stringify(userObj));
       console.log(JSON.stringify(userObj))
      
   }

  // בדיקה האם יש משתמש מחובר
  isLoggedIn(): boolean {
    return this.getUserData() !== null;
  }
  // מחיקת המייל (התנתקות)
  logout() {

    localStorage.removeItem('user_data');
    this.router.navigate(['']);
  }

 
 // שליפת הנתונים מה-localStorage
getUserData() {
  try {
        

    const savedData = localStorage.getItem('user_data');
    if (savedData) {
      const user = JSON.parse(savedData);
      console.log(user.email);
      console.log(user.userId);
      
      return user;
    }
  } catch (error) {
    
    console.error('Error parsing user data from localStorage:', error);
  }
  return null; // במקרה של שגיאה או אם אין נתונים
}
}
