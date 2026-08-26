import { Injectable } from '@angular/core';
import { int_Attractions } from '../Interfaces/int_Attractions';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class srv_Attractions {
  constructor(public http: HttpClient) {}
  mock_Attractions: int_Attractions[] = [
    {
      attractionId: 1,
      attractionsName: 'מעלית הזמן ירושלים',
      reigionId: 7,
      address: 'נחלת שבעה, ירושלים',
      attractionTypeId: 1,
      description: 'מיצג אינטראקטיבי היסטורי חווייתי לקבוצות וכיתות',
      shomerShabat: 2,
      phone: '02-6248383',
    },
    {
      attractionId: 2,
      attractionsName: 'בריכות צפת',
      reigionId: 1,
      address: 'צפת',
      attractionTypeId: 2,
      description: 'מתחם בריכות עירוני נפרד',
      shomerShabat: 2,
      phone: '04-6972411',
    },
    {
      attractionId: 3,
      attractionsName: 'מסלול נחל כזיב',
      reigionId: 1,
      address: '',
      attractionTypeId: 3,
      description: 'מסלול הליכה בטבע הגלילי',
      shomerShabat: 0,
      phone: '',
    },
    {
      attractionId: 4,
      attractionsName: 'רכיבה על סוסים חוות השפלה',
      reigionId: 6,
      address: 'מושב ישעי',
      attractionTypeId: 4,
      description: 'טיולי סוסים בנופים המרהיבים של השפלה',
      shomerShabat: 1,
      phone: '02-9913344',
    },
    {
      attractionId: 5,
      attractionsName: 'מרכז המבקרים של בנק ישראל',
      reigionId: 7,
      address: 'קריית הממשלה, ירושלים',
      attractionTypeId: 8,
      description: 'סיור מרתק ומותאם לכיתות על תולדות המטבע והכלכלה',
      shomerShabat: 2,
      phone: '02-6552211',
    },
    {
      attractionId: 6,
      attractionsName: 'חוף נפרד טבריה',
      reigionId: 2,
      address: 'טבריה',
      attractionTypeId: 5,
      description: 'חוף רחצה נפרד ומסודר בכנרת',
      shomerShabat: 2,
      phone: '04-6721155',
    },
    {
      attractionId: 7,
      attractionsName: 'איי קלימבו קיר טיפוס',
      reigionId: 5,
      address: 'קניון איילון, רמת גן',
      attractionTypeId: 6,
      description: 'מתחם קירות טיפוס אתגרי לכל הגילאים',
      shomerShabat: 1,
      phone: '03-5704455',
    },
    {
      attractionId: 8,
      attractionsName: 'חריש על גלגלים',
      reigionId: 3,
      address: 'חריש',
      attractionTypeId: 7,
      description: "טיולי ג'יפים ושטח למשפחות וקבוצות",
      shomerShabat: 2,
      phone: '052-7162233',
    },
  ];
  
  GetAttractions() {
    // return this.mock_Attractions;
    const baseUrl = 'https://localhost:7098/Attractions';
    return this.http.get<int_Attractions[]>(baseUrl);
  }

  // GetTypeByNumber(AttractionsTypeId: number): string {
  //   const baseUrl = `https://localhost:7098/Attractions/${AttractionsTypeId}`;
  //   return this.http.get<string>(baseUrl);

  // }

  //  GetTypeByNumber(AttractionsTypeId: number): Observable<string> {
  //       const baseUrl = `https://localhost:7098/Attractions/${AttractionsTypeId}`;
  //       return this.http.get<string>(baseUrl);
  //   }

  getAttractionTypes() {
    const baseUrl = 'https://localhost:7098/Attractions/types';
    return this.http.get<any>(baseUrl).pipe(
      tap((data: any) => console.log('Attraction types:', data)), // לוג של המידע המוחזר
    );
  }

  // UpdateAttraction(Attraction: int_Attractions) {
  //   var atrc = this.mock_Attractions.find(
  //     a => a.attractionId == Attraction.attractionId,
  //   );
  //   if (atrc) {
  //     atrc.address = Attraction.address;
  //     atrc.description = Attraction.description;
  //     atrc.attractionsName = Attraction.attractionsName;
  //     atrc.attractionTypeId = Attraction.attractionTypeId;
  //     // atrc.ImageUrl = Attraction.ImageUrl;
  //     atrc.phone = Attraction.phone;
  //     atrc.reigionId = Attraction.reigionId;
  //     atrc.shomerShabat = Attraction.shomerShabat;
  //   }
  // }

  UpdateAttraction(attraction: int_Attractions): Observable<void> {
    console.log(attraction);
    return this.http
      .put<void>(
        `https://localhost:7098/Attractions/${attraction.attractionId}`,
        attraction,
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating attraction:', error);
          // פה תוכל להראות שגיאה למשתמש או לעשות משהו אחר
          return of(); // מחזיר Observable ריק במקרה של שגיאה
        }),
      );
  }
    AddNewAttraction(attraction: int_Attractions): Observable<void> {
    console.log(attraction);
    return this.http
      .post<void>(
        `https://localhost:7098/Attractions/new`,
        attraction,
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating attraction:', error);
          // פה תוכל להראות שגיאה למשתמש או לעשות משהו אחר
          return of(); // מחזיר Observable ריק במקרה של שגיאה
        }),
      );
  }


  deleteAttraction(atractionId : number){
        return this.http
      .delete<void>(
        `https://localhost:7098/Attractions/${atractionId}`,
        
      )
      .pipe(
        catchError((error) => {
          console.error('בעיה במחיקת אטרקציה:', error);
          // פה תוכל להראות שגיאה למשתמש או לעשות משהו אחר
          return of(); // מחזיר Observable ריק במקרה של שגיאה
        }),
      );
  }

  //   UpdateAttraction(attraction: int_Attractions): Observable<void> {
  //     console.log(attraction)
  //    return this.http.put<void>(`https://localhost:7098/Attractions/${attraction.attractionId}`, attraction);
  // }

  getAttractionById(AttractionsId: number) {
    var a = this.mock_Attractions.find((a) => a.attractionId == AttractionsId);
    console.log(a);
    return a;
  }
}
