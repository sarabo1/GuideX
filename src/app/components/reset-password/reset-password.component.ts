import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdIsraelValidator } from '../../Services/israel_ID';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-reset-password',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
private IdIsrael = inject(IdIsraelValidator);
   value!: string;
  IsraelIdValidator = this.IdIsrael.idValidator();
  
   ResetPassword = new FormGroup({
      Email: new FormControl('',  [Validators.required, Validators.email]),
            PhoneNumber: new FormControl('',  [Validators.required, Validators.minLength(2)]),

            IdNumber: new FormControl('',  [Validators.required, this.IsraelIdValidator]),
   });
reset(){

}
}
