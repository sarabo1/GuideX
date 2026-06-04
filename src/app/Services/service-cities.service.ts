import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // וודא שיבוא זה קיים


@Injectable({
  providedIn: 'root'
})
export class ServiceCitiesService {


private cities_url = 'https://data.gov.il/api/3/action/datastore_search?resource_id=3f06e2f2-e2ad-41ac-9665-37d0625537f2&limit=5';

  constructor(private http: HttpClient) { }
  settlements: { id: number, name: string }[] = [];

  getData(): Observable<any> {
    return this.http.get<any>(this.cities_url).pipe(
        map(response => {
          if (response.success && response.result.records) {
            this.settlements = response.result.records.map((record: { _id: any; שם_ישוב: string; }) => ({
              id: record._id,
              name: record.שם_ישוב.trim()
            }));
            
            return this.settlements; 
          }
          return [];
        })
      );
  }

}


