import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Pipe({
  name: 'regionName',
})
export class regionNamePipe implements PipeTransform {

  constructor(private http: HttpClient) {}

  transform(regionId: number): Observable<string> {
      const url = `https://localhost:7098/region_${regionId}`;
      return this.http.get<string>(url).pipe(
        map(response => {
          console.log('Received response:', response); 
          return response;
        }),
        catchError(() => {
          console.log('Error fetching attraction type for ID:', regionId);
          return of('האטרקציה לא נמצאה'); 
        })
      );
  }
}