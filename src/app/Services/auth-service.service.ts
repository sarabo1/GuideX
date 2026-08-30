import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export interface UserData {
  email: string;
  userId: string;
  firstName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(token: string) {
    const decoded: any = jwtDecode(token);
 console.log("decoded: ", decoded)
    const userObj: UserData = {
      email: decoded.Email,          // שים לב למפתחות בפועל!
      userId: decoded.UserId,        // תיקנתי מ-UserId ל-userId
      firstName: decoded.FirstName,  // תיקנתי מ-FirstName ל-firstName
    };
     console.log("userObj: ", userObj)


    localStorage.setItem('token', token);        // שמירת הטוקן לשימוש עתידי
    localStorage.setItem('user_data', JSON.stringify(userObj));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    if (!decoded.exp) return false;              // אם אין תאריך תפוגה - מניח שתקין
    return Date.now() >= decoded.exp * 1000;     // exp בשניות
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  getUserData(): UserData | null {
    try {
      const savedData = localStorage.getItem('user_data');
      return savedData ? JSON.parse(savedData) as UserData : null;
    } catch (error) {
      console.error('שגיאה בהמרת המשתמש מה-LOCALSTORAGE:', error);
      return null;
    }
  }
}
