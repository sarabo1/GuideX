import { Injectable } from '@angular/core';
import { ServiceUsersService } from './srv-users';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceAllService {
  
  constructor(public Srv_Users:ServiceUsersService,
    public http : HttpClient,
  ) {}
  getRollName(roleId: number): Observable<string> {
    // switch (roleId) {
    //   case 1:
    //     return 'סגנית';
    //   case 2:
    //     return 'מנהלת';
    //   case 3:
    //     return 'מורה';
    //   case 4:
    //     return 'מזכירה';
    //   case 5:
    //     return 'אחר';
    //   default:
    //     return 'אחר';
    // }
    return this.http.get<string>(`https://localhost:7098/Roll_${roleId}`)
        .pipe(map(response => response ? response : 'אחר'));
  }
  


getReligiousName(religiousId: number): Observable<string | undefined> {
    return this.http.get<string>(`https://localhost:7098/Religious_${religiousId}`)
        .pipe(map(response => response ? response : 'אחר'));
}
 
  getTypeSchoolName(typeSchoolId: number): Observable<string | undefined> {
    return this.getReligiousName(typeSchoolId)
    // switch (typeSchoolId) {
    //   case 1:
    //     return 'חסידי';
    //   case 2:
    //     return 'ספרדי';
    //   case 3:
    //     return 'אשכנזי';
    //   default:
    //     return 'אחר';
    // }
  }

  getAgeSchoolName(ageSchoolId: number): string | undefined {
    switch (ageSchoolId) {
      case 1:
        return 'יסודי';
      case 2:
        return 'חט"ב';
      case 3:
        return 'תיכון';
      default:
        return 'אחר';
    }
  }
  GetRegions(regionId: number): Observable<string> {


    return this.http.get<string>(`https://localhost:7098/region_${regionId}`)
        .pipe(map(response => response ? response : 'אחר'));
    

  }


  getRegionsArray() {
    const baseUrl = 'https://localhost:7098/All_Regions';
    return this.http.get<any>(baseUrl).pipe(
      tap((data: any) => console.log('regions types aaa:', data)), // לוג של המידע המוחזר
    );
  }


  // GetKashrutName(kashrutId: number): string {
  //   const item = this.getKashrutArray().find((k) => k.id === kashrutId);
  //   return item ? item.name : 'יש לברר כשרות';
  // }
GetKashrutName(kashrutId: number): Observable<string | undefined> {
  console.log("kashrutId: ", kashrutId)
    return this.http.get<string>(`https://localhost:7098/Kashrut_${kashrutId}`)
    
        .pipe(map(response => response ? response : 'אחר'));
}

  // GetKashrutName(kashrutId: number): Observable<string> { // שיניתי את סוג החזרה ל-string בלבד, כי ה-map מטפל ב-undefined והופך אותו ל-string
  //   console.log("GetKashrutName called with kashrutId:", kashrutId);

  //   return this.http.get<string>(`https://localhost:7098/Kashrut_${kashrutId}`)
  //     .pipe(
  //       // הוספנו tap כדי לראות את התגובה הגולמית מה-API (לפני ה-map)
  //       tap(response => console.log('API Raw Response (tap):', response)),
        
  //       // ה-map הזה לוקח את התגובה (שהיא הסטרינג שחוזר מה-API)
  //       // ובודק אם היא קיימת. אם לא, מחזיר 'אחר'.
  //       map(response => {
  //         console.log('Mapping response:', response); // לוג של הערך שה-map מקבל
  //         return response ? response : 'אחר';
  //       }),
        
  //       // טיפול בשגיאות: אם הבקשה נכשלה (למשל, 404, 500, בעיית רשת)
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('Error fetching Kashrut name for ID', kashrutId, ':', error);
  //         // במקרה של שגיאה, נחזיר Observable שמכיל את הסטרינג 'אחר'
  //         // חשוב להחזיר Observable מכיוון שהפונקציה מצפה ל-Observable.
  //         return of('אחר'); 
  //       })
  //     );
  // }
  /** רשימת הכשרויות הקבועות — משמשת לפונקציות שדורשות ערך string מיידי. */
  // getKashrutArrayLocal() {
  //   return [
  //     { id: 1, name: 'בד"ץ העדה החרדית ירושלים' },
  //     { id: 2, name: 'בד"ץ הרב לנדא (בני ברק)' },
  //     { id: 3, name: 'בד"ץ בית יוסף' },
  //     { id: 4, name: 'בד"ץ שארית ישראל' },
  //     { id: 5, name: 'בד"ץ מהדרין - הרב רובין' },
  //     { id: 6, name: 'בד"ץ מחזיקי הדת (בעלזא)' },
  //     { id: 7, name: 'הרבנות הראשית - מהדרין' },
  //     { id: 8, name: 'בד"ץ חתם סופר בני ברק' },
  //     { id: 9, name: 'בד"ץ חתם סופר פתח תקווה' },
  //     { id: 10, name: 'בד"ץ מהדרין - הרב גרוס' },
  //     { id: 11, name: 'בד"ץ אגודת ישראל' },
  //   ];
  // }

  getKashrutArray() {
    const baseUrl = 'https://localhost:7098/All_Kashruts';
    return this.http.get<any>(baseUrl).pipe(
      tap((data: any) => console.log('סוגי הכשרויות:', data)), // לוג של המידע המוחזר
    );
//   return [
//     { id: 1, name: 'בד"ץ העדה החרדית ירושלים' },
//     { id: 2, name: 'בד"ץ הרב לנדא (בני ברק)' },
//     { id: 3, name: 'בד"ץ בית יוסף' },
//     { id: 4, name: 'בד"ץ שארית ישראל' },
//     { id: 5, name: 'בד"ץ מהדרין - הרב רובין' },
//     { id: 6, name: 'בד"ץ מחזיקי הדת (בעלזא)' },
//     { id: 7, name: 'הרבנות הראשית - מהדרין' },
//     { id: 8, name: 'בד"ץ חתם סופר בני ברק' },
//     { id: 9, name: 'בד"ץ חתם סופר פתח תקווה' },
//     { id: 10, name: 'בד"ץ מהדרין - הרב גרוס' },
//     { id: 11, name: 'בד"ץ אגודת ישראל' },
//   ];
// }

}
  getreligiousArray() {
    const baseUrl = 'https://localhost:7098/All_Religious';
    return this.http.get<any>(baseUrl).pipe(
      tap((data: any) => console.log('סוגי ההשתיכות הדתית:', data)), // לוג של המידע המוחזר
    );
}

getRolesArray() {
    const baseUrl = 'https://localhost:7098/All_Roles';
    return this.http.get<any>(baseUrl).pipe(
      tap((data: any) => console.log('סוגי התפקידים:', data)), // לוג של המידע המוחזר
    );
}

}
