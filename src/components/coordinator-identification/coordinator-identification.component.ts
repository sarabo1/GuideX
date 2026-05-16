import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { min } from 'rxjs';


@Component({
  selector: 'app-coordinator-identification',
  imports: [ReactiveFormsModule],
  templateUrl: './coordinator-identification.component.html',
  styleUrl: './coordinator-identification.component.scss',
  standalone : true
})
export class CoordinatorIdentificationComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
   password: new FormControl('', [Validators.required, Validators.pattern(/[a-z]/) ,
    Validators.pattern(/[A-Z]/) ,
    Validators.pattern(/\d/) ,
    Validators.pattern(/[@$!%*?&.#_^+=-]/) ,
    Validators.minLength(8)
    ]),
  })



  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
    }
    this.loginForm.reset()
  }
}
