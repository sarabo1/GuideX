import { Injectable } from '@angular/core';
import { Int_Guide } from '../Interfaces/int-guide';

@Injectable({
  providedIn: 'root'
})
export class Ser_Guide {

  constructor() { }
 
 mock_Guides: Int_Guide[] = [
    {
            UserId: 5,
      
        GuideId: 201,
        Origin: 'ישראל',
        ReligiousId: 301
    },
    {
            UserId: 6,
     
        GuideId: 201,
        Origin: 'ישראל',
        ReligiousId: 301
    },
    {
            UserId: 7,
    
        GuideId: 202,
        Origin: 'ישראל',
        ReligiousId: 302
    },
    {
        UserId:8,
       
        GuideId: 203,
        Origin: 'ישראל',
        ReligiousId: 303
    },
    {
            UserId: 9,
            
        GuideId: 204,
        Origin: 'ישראל',
        ReligiousId: 304
    }];
    GetGuides(){
        return this.mock_Guides;
    }
}