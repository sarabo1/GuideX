import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ServiceUsersService } from '../../Services/service-users.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkObserveContent } from '@angular/cdk/observers';

@Component({
  selector: 'app-sigh-in-page',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLink,
    MatDialogModule,
    CdkObserveContent,
  ],
  templateUrl: './sigh-in-page.component.html',
  styleUrl: './sigh-in-page.component.scss',
  standalone: true,
})
export class SighInPageComponent {
  constructor(
    public dialogRef: MatDialogRef<SighInPageComponent>,
    public users_service: ServiceUsersService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  onClose(): void {
    this.dialogRef.close();
  }

  formLogIn = new FormGroup({
    UserPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_^+=-])[A-Za-z\d@$!%*?&.#_^+=-]{8,}$/,
      ),
    ]),
    Email: new FormControl('', [Validators.required, Validators.email]),
  });

  showPassword = false;
  PasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  //    login(){
  //     for (const user of this.users_service.GetUsers() || []) {
  //     if (user && user.user.Email === this.formLogIn.value.Email && user.user.UserPassword === this.formLogIn.value.UserPassword) {
  //         console.log(user.user.Email + ' ' + user.user.UserPassword);
  //             this.router.navigate(["/Home_Page"]);

  //     } else {
  //         console.log('User data is invalid:');
  //     }
  // }
  //      this.formLogIn.reset();
  //    }

  //יש פה בעיה חייבים לסדר זאת!!!!!
  login() {
    console.log(this.formLogIn.value); // בדוק מה המידע שאתה מקבל ממילוי הטופס
    if (this.formLogIn.invalid) {
      console.error('הטופס אינו תקין');
      return;
    }
    const foundUser = this.users_service
      .GetUsers()
      ?.find(
        (u) =>
          u.user.Email === this.formLogIn.value.Email &&
          u.user.UserPassword === this.formLogIn.value.UserPassword,
      );

    if (foundUser) {
      console.log(foundUser);
      this.router.navigate(['/Home_Page']);
    }

    // for (const user of this.users_service.GetUsers() || []) {
    //     if (user && user.user.Email === this.formLogIn.value.Email && user.user.UserPassword === this.formLogIn.value.UserPassword) {
    //         console.log(user.user.Email + ' ' + user.user.UserPassword);
    //         this.router.navigate(["/Home_Page"]);
    //         return; // הוסף return כאן כדי לצאת מהרצף אם נמצא משתמש
    //     }
    // }
    console.log('User data is invalid:');
  }
}
