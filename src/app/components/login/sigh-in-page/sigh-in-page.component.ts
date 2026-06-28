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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  private PasswordvalidatorSrv = inject(PasswordvalidatorService);
  passwordValidator = this.PasswordvalidatorSrv.passwordValidator;

  onClose(): void {
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
  login() {

    const foundUser = this.users_service
      .GetUsers()
      .find(
        (u) =>
          u.Email == this.formLogIn.get('Email')?.value &&
          u.UserPassword == this.formLogIn.get('UserPassword')?.value,
      );

    if (foundUser) {
      //הכנסת הנתונים בLOCAL SToreNGE
      const userObj = {
        email: foundUser.Email,
        userId: foundUser.UserId,
      };
      localStorage.setItem('user_data', JSON.stringify(userObj));
           this.userNotFount = false 
      this.formLogIn.reset();
      this.onClose(); 
      this.router.navigate(['welcome/Home_Page']);
    }
    else{
      this.userNotFount = true
    }

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
