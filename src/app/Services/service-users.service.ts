import { Injectable } from '@angular/core';
import { ServiceCoordinatorService } from './service-coordinator.service';
import { InterfaceUsers } from '../Interfaces/interface-users';

@Injectable({
  providedIn: 'root',
})
export class ServiceUsersService {
  public mock_Users: InterfaceUsers[];

  //   constructor(public serviceCoordinator: ServiceCoordinatorService, public serviceGuide: ServiceUsersService) {
  constructor(public serviceCoordinator: ServiceCoordinatorService) {
    this.mock_Users = [
      {
        UserId: 1,
        UserPassword: 'securePassword123!',
        FirstName: 'חיה',
        LastName: 'מאירוביץ',
        IdNumber: '123456789',
        CityId: 101,
        PhoneNumber: '050-1234567',
        Email: 'haya.meirovitz@example.com',
      },
      {
        UserId: 2,
        UserPassword: 'anotherSecurePassword456!',
        FirstName: 'מרים',
        LastName: 'ברסלב',
        IdNumber: '987654321',
        CityId: 102,
        PhoneNumber: '052-7654321',
        Email: 'miriam.breslav@example.com',
      },
      {
        UserId: 3,
        UserPassword: 'thirdPassword789!',
        FirstName: 'שפרה',
        LastName: 'רבינוביץ',
        IdNumber: '456123789',
        CityId: 103,
        PhoneNumber: '053-1234567',
        Email: 'shifra.rabinovitz@example.com',
      },
      {
        UserId: 4,
        UserPassword: 'fourthPassword012!',
        FirstName: 'נחמה',
        LastName: 'אלשיך',
        IdNumber: '321654987',
        CityId: 104,
        PhoneNumber: '054-9876543',
        Email: 'nechama.elshich@example.com',
      },
      {
        UserId: 5,
        UserPassword: 'securePassword123!',
        FirstName: 'חיה',
        LastName: 'עדרי',
        IdNumber: '123456789',
        CityId: 101,
        PhoneNumber: '050-1234567',
        Email: 'haya@example.com',
      },
      {
        UserId: 6,
        UserPassword: 'anotherSecurePassword456!',
        FirstName: 'מנוחה',
        LastName: 'עדרי',
        IdNumber: '123456789',
        CityId: 101,
        PhoneNumber: '050-9876543',
        Email: 'menucha@example.com',
      },
      {
        UserId: 7,
        UserPassword: 'anotherSecurePassword456!',
        FirstName: 'מנוחה',
        LastName: 'ברזילי',
        IdNumber: '987654321',
        CityId: 102,
        PhoneNumber: '050-6543210',
        Email: 'menuchab@example.com',
      },
      {
        UserId: 8,
        UserPassword: 'thirdPassword789!',
        FirstName: 'שפרה',
        LastName: 'שולמן',
        IdNumber: '456123789',
        CityId: 103,
        PhoneNumber: '050-3216549',
        Email: 'shifrah@example.com',
      },
      {
        UserId: 9,
        UserPassword: 'fourthPassword012!',
        FirstName: 'אסתר',
        LastName: 'ברוך',
        IdNumber: '321654987',
        CityId: 104,
        PhoneNumber: '050-9876540',
        Email: 'esther@example.com',
      },
    ];
  }
  GetUsers(): any[] {
    return this.mock_Users;
  }
  GetLastUserId() {
    const userIds = this.mock_Users.map((user) => user.UserId);
    return Math.max(...userIds);
  }

  InsertUser(
    UserId: number,
    UserPassword: string,
    FirstName: string,
    LastName: string,
    IdNumber: string,
    CityId: number,
    PhoneNumber: string,
    Email: string,
  ) {
    const newUser: InterfaceUsers = {
      UserId: UserId,
      UserPassword: UserPassword,
      FirstName: FirstName,
      LastName: LastName,
      IdNumber: IdNumber,
      CityId: CityId,
      PhoneNumber: PhoneNumber,
      Email: Email,
    };
    this.mock_Users.push(newUser);
  }
}
