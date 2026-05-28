import { Injectable } from '@angular/core';
import { InterfaceGuide } from '../Interfaces/interface-guide';

@Injectable({
  providedIn: 'root'
})
export class ServicesGuideService {

  constructor() { }
 
 mock_Guides: InterfaceGuide[] = [
    {
        user: {
            UserId: 5,
            UserPassword: 'securePassword123!',
            FirstName: 'חיה',
            LastName: 'עדרי',
            IdNumber: '123456789',
            CityId: 101,
            PhoneNumber: '050-1234567',
            Email: 'haya@example.com' // הוספת כתובת אימייל
        },
        GuideId: 201,
        Origin: 'ישראל',
        ReligiousId: 301
    },
    {
        user: {
            UserId: 2,
            UserPassword: 'anotherSecurePassword456!',
            FirstName: 'מנוחה',
            LastName: 'עדרי',
            IdNumber: '123456789',
            CityId: 101,
            PhoneNumber: '050-9876543', // הוספת טלפון
            Email: 'menucha@example.com' // הוספת כתובת אימייל
        },
        GuideId: 201,
        Origin: 'ישראל',
        ReligiousId: 301
    },
    {
        user: {
            UserId: 2,
            UserPassword: 'anotherSecurePassword456!',
            FirstName: 'מנוחה',
            LastName: 'ברזילי',
            IdNumber: '987654321',
            CityId: 102,
            PhoneNumber: '050-6543210', // הוספת טלפון
            Email: 'menuchab@example.com' // הוספת כתובת אימייל
        },
        GuideId: 202,
        Origin: 'ישראל',
        ReligiousId: 302
    },
    {
        user: {
            UserId: 3,
            UserPassword: 'thirdPassword789!',
            FirstName: 'שפרה',
            LastName: 'שולמן',
            IdNumber: '456123789',
            CityId: 103,
            PhoneNumber: '050-3216549', // הוספת טלפון
            Email: 'shifrah@example.com' // הוספת כתובת אימייל
        },
        GuideId: 203,
        Origin: 'ישראל',
        ReligiousId: 303
    },
    {
        user: {
            UserId: 4,
            UserPassword: 'fourthPassword012!',
            FirstName: 'אסתר',
            LastName: 'ברוך',
            IdNumber: '321654987',
            CityId: 104,
            PhoneNumber: '050-9876540', // הוספת טלפון
            Email: 'esther@example.com' // הוספת כתובת אימייל
        },
        GuideId: 204,
        Origin: 'ישראל',
        ReligiousId: 304
    }];
    GetGuides(){
        return this.mock_Guides;
    }
}