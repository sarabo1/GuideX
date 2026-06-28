import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { IdIsraelValidator } from '../../../Services/israel_ID';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceUsersService } from '../../../Services/service-users.service';
import { PhoneValidatorService } from '../../../Services/phone_validator';
import { PasswordvalidatorService } from '../../../Services/Password_validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: true,
})
export class ResetPasswordComponent {
  private IdIsrael = inject(IdIsraelValidator);

  IsraelIdValidator = this.IdIsrael.idValidator();

  findUserInList: boolean = false;
  notExistsUser: boolean = false;
  findUser: any;

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    public srv_users: ServiceUsersService,
    public router: Router,
  ) {}

  private PasswordvalidatorSrv = inject(PasswordvalidatorService);
  passwordValidator = this.PasswordvalidatorSrv.passwordValidator;

  private phoneValidatorSrv = inject(PhoneValidatorService);
  phoneValidator = this.phoneValidatorSrv.phoneValidator;

  ResetPassword = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    PhoneNumber: new FormControl('', [
      Validators.required,
      this.phoneValidator,
    ]),

    IdNumber: new FormControl('', [
      Validators.required,
      this.IsraelIdValidator,
    ]),
    UserPassword: new FormControl('', [
      Validators.required,
      this.passwordValidator,
    ]),
    UserRepeatPassword: new FormControl('', [
      Validators.required,
      this.passwordValidator,
    ]),
  });

  showPasswordFirst = false;
  PasswordFVisibility() {
    this.showPasswordFirst = !this.showPasswordFirst;
  }
  showPasswordSecond = false;
  PasswordSVisibility() {
    this.showPasswordSecond = !this.showPasswordSecond;
  }

  onClose(): void {
    this.dialogRef.close();
  }
  reset() {
    const email = this.ResetPassword.get('Email')?.value;
    const phoneNumber = this.ResetPassword.get('PhoneNumber')?.value;
    const idNumber = this.ResetPassword.get('IdNumber')?.value;
    this.findUser = this.srv_users
      .GetUsers()
      .find(
        (u) =>
          u.Email == email &&
          u.IdNumber == idNumber &&
          u.PhoneNumber == phoneNumber,
      );
    console.log(this.findUser);
    if (this.findUser) {
      this.findUserInList = true;
    } else {
      this.notExistsUser = true;
      this.findUser = null;
    }
  }

  isAnyFieldValid(): boolean {
    return (
      !!this.ResetPassword.get('Email')?.valid &&
      !!this.ResetPassword.get('PhoneNumber')?.valid &&
      !!this.ResetPassword.get('IdNumber')?.valid
    );
  }

  isSamePassword(): boolean {
    const userPassword = this.ResetPassword.get('UserPassword')?.value;
    const userRepeatPassword =
      this.ResetPassword.get('UserRepeatPassword')?.value;

    return userPassword === userRepeatPassword;
  }

  resetUserPassword() {
    if (this.findUser) {
       const userEmail = this.findUser.email;
       const userId = this.findUser.userId;
      this.findUser.UserPassword =
        this.ResetPassword.get('UserPassword')?.value;

      //הכנסת הנתונים בLOCAL SToreNGE
      const userObj = {
        email: userEmail,
        userId: userId,
      };
      localStorage.setItem('user_data', JSON.stringify(userObj));
      this.findUser = null;
      this.ResetPassword.reset();
      this.dialogRef.close(); // סגור את הדיאלוג
      this.router.navigate(['welcome/Home_Page']);
    } else {
      this.notExistsUser = true;
    }
  }
  userNotExists() {
    this.notExistsUser = false;
  }
}
