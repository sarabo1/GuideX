import { Injectable } from '@angular/core';
import { InterfaceCoordinator } from '../Interfaces/interface-coordinator';

@Injectable({
  providedIn: 'root'
})
export class ServiceCoordinatorService {

  constructor() { }
    mock_Coordinators: InterfaceCoordinator[] = [
    {
        user: {
            UserId: 1,
            UserPassword: 'securePassword123!',
            FirstName: 'חיה',
            LastName: 'מאירוביץ',
            IdNumber: '123456789',
            CityId: 101,
            PhoneNumber: '050-1234567',
            Email: 'haya.meirovitz@example.com'
        },
        TourCoordinatorId: 202,
        RoleId: 303,
        School: {
            SchoolId: 404,
            SchoolName: 'בית יעקב מאירות',
            IsBoys: 0,
            CityId: 101,
            PrincipalName: 'מרכז רבקה',
            PhoneSecretary: '050-0000001',
            TypeSchoolId: 1,
            AgeSchoolId: 1
        }
    },
    {
        user: {
            UserId: 2,
            UserPassword: 'anotherSecurePassword456!',
            FirstName: 'מרים',
            LastName: 'ברסלב',
            IdNumber: '987654321',
            CityId: 102,
            PhoneNumber: '052-7654321',
            Email: 'miriam.breslav@example.com'
        },
        TourCoordinatorId: 203,
        RoleId: 304,
        School: {
            SchoolId: 405,
            SchoolName: 'בית יעקב נשמתי',
            IsBoys: 0,
            CityId: 102,
            PrincipalName: 'גב’ חני',
            PhoneSecretary: '050-0000002',
            TypeSchoolId: 2,
            AgeSchoolId: 2
        }
    },
    {
        user: {
            UserId: 3,
            UserPassword: 'thirdPassword789!',
            FirstName: 'שפרה',
            LastName: 'רבינוביץ',
            IdNumber: '456123789',
            CityId: 103,
            PhoneNumber: '053-1234567',
            Email: 'shifra.rabinovitz@example.com'
        },
        TourCoordinatorId: 204,
        RoleId: 305,
        School: {
            SchoolId: 406,
            SchoolName: 'בית יעקב חן',
            IsBoys: 0,
            CityId: 103,
            PrincipalName: 'מרה’ אסתר',
            PhoneSecretary: '050-0000003',
            TypeSchoolId: 1,
            AgeSchoolId: 1
        }
    },
    {
        user: {
            UserId: 4,
            UserPassword: 'fourthPassword012!',
            FirstName: 'נחמה',
            LastName: 'אלשיך',
            IdNumber: '321654987',
            CityId: 104,
            PhoneNumber: '054-9876543',
            Email: 'nechama.elshich@example.com'
        },
        TourCoordinatorId: 205,
        RoleId: 306,
        School: {
            SchoolId: 407,
            SchoolName: 'בית יעקב תפארת',
            IsBoys: 0,
            CityId: 104,
            PrincipalName: 'מר יעקב',
            PhoneSecretary: '050-0000004',
            TypeSchoolId: 3,
            AgeSchoolId: 3
        }
    }];
    GetCoordinators(){
        return this.mock_Coordinators;
    }
 }