import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SrvDateService {
  constructor(private http: HttpClient) {}

  getJewDate(yourDate: Date): Observable<any> {
    const year = yourDate.getFullYear();
    const month = yourDate.getMonth();
    const day = yourDate.getDate()
    // console.log("year: "+year) 
    // console.log("month: "+month) 
    // console.log("day: "+day)

    const formattedMonth = month.toString().padStart(2, '0'); // מבטיח שהחודש יהיה עם אפס מוביל
    const formattedDay = day.toString().padStart(2, '0'); // מבטיח שהיום יהיה עם אפס מוביל

    const dateUrl = `https://www.hebcal.com/converter?cfg=json&date=${year}-${formattedMonth}-${formattedDay}&g2h=1&strict=1`;

    console.log('URL שמשודר:', dateUrl);

    // Return the Observable so callers can subscribe
    return this.http.get<any>(dateUrl);
  }
  

  // GetDateHebrew(): Observable<any> {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, '0');
  //   const day = String(today.getDate()).padStart(2, '0');


  //       const currentDate: string = new Date().toISOString().split('T')[0]; 
  //   return this.httpClient.get<any>(`https://www.hebcal.com/converter?cfg=json&date=${currentDate}&g2h=1&strict=1`)
  // }

}




