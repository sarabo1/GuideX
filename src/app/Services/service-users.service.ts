import { Injectable } from '@angular/core';
import { ServiceCoordinatorService } from './service-coordinator.service';
import { InterfaceUsers } from '../Interfaces/interface-users';
import { Srv_Guide } from './srv-guide.service';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceUsersService {
  public mock_Users: InterfaceUsers[];

  //   constructor(public serviceCoordinator: ServiceCoordinatorService, public serviceGuide: ServiceUsersService) {
  constructor(
    public serviceCoordinator: ServiceCoordinatorService,
    public srv_guide: Srv_Guide,
    public  http: HttpClient
  ) {
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
        IdNumber: '333191690',
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
        CityId: 4,
        PhoneNumber: '0583268518',
        Email: 'hhh@gmail.com',
      },
    {
      UserId:11,
      UserPassword: 'sarabo1@gmail.com',
        FirstName: '4',
        LastName: 'בורודיאנסקי',
        IdNumber: '040862047',
        CityId: 1,
        PhoneNumber: '0548468518',
        Email: 'sarabo@gmail.com',

    }
    ];

  }
  GetUsers(): any[] {
    return this.mock_Users;
    
  }
  aaa(){
    const base = 'https://localhost:7098/api/Login/hi'
       this.http.get<any>(base).subscribe(    response => {
            console.log('Response:', response);
        },
        error => {
            console.error('Error:', error);
        });
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
    const findUser =this.mock_Users.find(a => a.UserId == UserId)?.UserId
    if(!findUser){
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
  }else{
    this.updateUserData(findUser,UserPassword,
    FirstName,
    LastName,
    // IdNumber,
    CityId,
    PhoneNumber,
    Email)
    
  }

  }

  updateUserData(userId : number, UserPassword: string,
    FirstName: string,
    LastName: string,
    // IdNumber: string,
    CityId: number,
    PhoneNumber: string,
    Email: string,){
      const findUser = this.mock_Users.find(u => u.UserId==userId)
      if(!findUser)return
        findUser.CityId = CityId;
      findUser.Email = Email;
      findUser.FirstName = FirstName;
      findUser.LastName = LastName;
      findUser.PhoneNumber = PhoneNumber;
      findUser.UserPassword = UserPassword

  }

  getNameByUserId(userId: number): string {
    const user = this.mock_Users.find((u) => u.UserId === userId);
    return user ? user.FirstName : '';
  }
  getEmailByUserId(userId: number): string {
    const user = this.mock_Users.find((u) => u.UserId === userId);
    return user ? user.Email : '';
  }
  getUserById(userId: number) {
    const user = this.mock_Users.find((u) => u.UserId === userId);
    return user ? user : '';
  }
  searchByIdNumber(idNumber: string) {
    var findByIdNumber =
      this.mock_Users.find((u) => u.IdNumber === idNumber) || null;
    if (findByIdNumber) {
      if (this.srv_guide.searchByUserId(findByIdNumber.UserId)) {
        return this.srv_guide.searchByUserId(findByIdNumber.UserId)
      }
      return null
    }
    return null;
  }

getUserByEmailIdNumberPhone(EmPhId: JSON) {
    const baseUrl = 'https://localhost:7098/api/Login/resetFirst';
    return this.http.post<any>(baseUrl, EmPhId).pipe(
        tap(response => {
            console.log('User found:', response);
            if (!response) {
                console.log("לא מצאתי משתמש");
            }
        }),
        catchError(error => {
            console.log("לא הצלחתי לבצע קריאת שרת");
            // console.error('Error:', error);
            return of(null); // מחזיר Observable עם ערך null במקרה של שגיאה
        })
    );
  }
}
