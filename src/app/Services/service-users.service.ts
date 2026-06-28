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
        PhoneNumber: '0501234567',
        Email: 'haya.meir@gmail.com',
      },
      {
        UserId: 2,
        UserPassword: 'anotherSecurePassword456!',
        FirstName: 'מרים',
        LastName: 'ברסלב',
        IdNumber: '987654321',
        CityId: 102,
        PhoneNumber: '0527654321',
        Email: 'miriam.breslav@gmail.com',
      },
      {
        UserId: 3,
        UserPassword: 'thirdPassword789!',
        FirstName: 'שפרה',
        LastName: 'רבינוביץ',
        IdNumber: '456123789',
        CityId: 103,
        PhoneNumber: '0531234567',
        Email: 'shifra.rabinovitz@gmail.com',
      },
      {
        UserId: 4,
        UserPassword: 'fourthPassword012!',
        FirstName: 'נחמה',
        LastName: 'אלשיך',
        IdNumber: '321654987',
        CityId: 104,
        PhoneNumber: '0549876543',
        Email: 'nechama.elshich@gmail.com',
      },
      {
        UserId: 5,
        UserPassword: 'securePassword123!',
        FirstName: 'חיה',
        LastName: 'עדרי',
        IdNumber: '123456789',
        CityId: 101,
        PhoneNumber: '0501234567',
        Email: 'haya@gmail.com',
      },
      {
        UserId: 6,
        UserPassword: 'anotherSecurePassword456!',
        FirstName: 'מנוחה',
        LastName: 'עדרי',
        IdNumber: '123456789',
        CityId: 101,
        PhoneNumber: '0509876543',
        Email: 'menucha@gmail.com',
      },
      {
        UserId: 7,
        UserPassword: 'anotherSecurePassword456!',
        FirstName: 'מנוחה',
        LastName: 'ברזילי',
        IdNumber: '987654321',
        CityId: 102,
        PhoneNumber: '0506543210',
        Email: 'menuchab@gmail.com',
      },
      {
        UserId: 8,
        UserPassword: 'thirdPassword789!',
        FirstName: 'שפרה',
        LastName: 'שולמן',
        IdNumber: '456123789',
        CityId: 103,
        PhoneNumber: '0503216549',
        Email: 'shifrah@gmail.com',
      },
      {
        UserId: 9,
        UserPassword: 'fourthPassword012!',
        FirstName: 'אסתר',
        LastName: 'ברוך',
        IdNumber: '321654987',
        CityId: 104,
        PhoneNumber: '0509876540',
        Email: 'esther@gmail.com',
      },
      {
        UserId: 10,
        UserPassword: 'Henny!11',
        FirstName: 'הני',
        LastName: 'בורודיאנסקי',
        IdNumber: '216666263',
        CityId: 104,
        PhoneNumber: '0583268518',
        Email: 'hhh@gmail.com',
      }
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
 
  getNameByUserId(userId: number): string {
    const user = this.mock_Users.find((u) => u.UserId === userId);
    return user ? user.FirstName : '';
  }
  getEmailByUserId(userId: number): string {
    const user = this.mock_Users.find((u) => u.UserId === userId);
    return user ? user.Email : '';
  }

}
