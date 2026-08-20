import { Component, inject, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkObserveContent } from '@angular/cdk/observers';
import { ServiceUsersService } from '../../../Services/service-users.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { PasswordvalidatorService } from '../../../Services/Password_validator';
import { CheckerGuideOrCoordinatorComponent } from '../checker-guide-or-coordinator/checker-guide-or-coordinator.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sigh-in-page',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './sigh-in-page.component.html',
  styleUrl: './sigh-in-page.component.scss',
  standalone: true,
})
export class SighInPageComponent {

 userNotFount = false

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SighInPageComponent>,
    public users_service: ServiceUsersService,
    private router: Router,
    public http : HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  private PasswordvalidatorSrv = inject(PasswordvalidatorService);
  passwordValidator = this.PasswordvalidatorSrv.passwordValidator;

  ngOnInit(){
    this.users_service.aaa()
  }

  onClose() {
    this.dialogRef.close();
  }

  formLogIn = new FormGroup({
    UserPassword: new FormControl('', [
      Validators.required,
      this.passwordValidator,
    ]),
    Email: new FormControl('', [Validators.required, Validators.email]),
  });

  showPassword = false;
  PasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  //יש פה בעיה חייבים לסדר זאת!!!!!
//   login() {
// const aaa = 'https://localhost:7098/api/Login/login';
//    const userCredentials = {
//     Email: this.formLogIn.get('Email')?.value,
//     UserPassword: this.formLogIn.get('UserPassword')?.value
// };
// const foundUser;
// this.http.post<any>(aaa, userCredentials).subscribe(
//     response => {
//         console.log('User found:', response);
//         this.foundUser = response;
//     },
//     error => {
//         console.error('Error:', error);
//     }
// ); // const foundUser = this.users_service
    
//       // .GetUsers()
//       // .find(
//       //   (u) =>
//       //     u.Email == this.formLogIn.get('Email')?.value &&
//       //     u.UserPassword == this.formLogIn.get('UserPassword')?.value,
//       // );

//     if (foundUser) {
//       //הכנסת הנתונים בLOCAL SToreNGE
//       const userObj = {
//         email: foundUser.Email,
//         userId: foundUser.UserId,
//       };
//       localStorage.setItem('user_data', JSON.stringify(userObj));
//            this.userNotFount = false 
//       this.formLogIn.reset();
//       this.onClose(); 
//       this.router.navigate(['welcome/Home_Page']);
//     }
//     else{
//       this.userNotFount = true
//     }

//   }

login() {
    const aaa = 'https://localhost:7098/api/Login/login';
    const userInput = {
        Email: this.formLogIn.get('Email')?.value,
        UserPassword: this.formLogIn.get('UserPassword')?.value
    };

    this.http.post<any>(aaa, userInput).subscribe(
        response => {
            console.log('User found:', response);
            
            // בדוק אם נמצא משתמש
            if (response) { // כאן אתה בודק אם response קיים
                // הכנסת הנתונים ב-Local Storage
                const userObj = {
                  // response
                    email: response.email,
                    userId: response.userId,
                };
                console.log(userObj)
                localStorage.setItem('user_data', JSON.stringify(userObj));
                this.userNotFount = false; 
                this.formLogIn.reset();
                this.onClose(); 
                this.router.navigate(['welcome/Home_Page']);
            } else {
                this.userNotFount = true; // במקרה שהמשתמש לא נמצא
            }
        },
        error => {
            // console.error('Error:', error);
            this.userNotFount = true; // אם הייתה שגיאה בבקשה
        }
    );
}


  changeInput(){
    this.userNotFount = false 
  }

  openReset() {
    this.onClose();
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '950px',
      data: {},
    });
  }


  openDialogRegistrations() {
    this.onClose();
      const dialogRef = this.dialog.open(CheckerGuideOrCoordinatorComponent, {
        width: '950px',
        data: {},
      });
    }
}
