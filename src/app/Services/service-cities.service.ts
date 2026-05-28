import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceCitiesService {

 
  private cities_url = 'https://data.gov.il/dataset/driving_shcool/resource/3f06e2f2-e2ad-41ac-9665-37d0625537f2';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.cities_url);
  }

}
