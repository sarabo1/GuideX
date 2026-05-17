import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IdentificationServiceService } from '../../Services/identification-service.service';
import { AuthService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';


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
  showPassword: boolean = false;
  toggleShowPassword() {
      this.showPassword = !this.showPassword; 
    }

  ////מכאן והלאה זה רק בשביל בדיקה, לא קשור לשום דבר
  constructor(public mansInSite: IdentificationServiceService, private router: Router, private authService: AuthService) { }
  onSubmit() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    const trueDetails = this.mansInSite.docOfman.some(f => f.username === username && f.password === password);
    if (!trueDetails) {
      alert('השם משתמש או הסיסמה שגויים, אנא נסי שוב');
    }
    else {
      const userValue = this.loginForm.get('username')?.value;
      if (userValue) {
        this.authService.login({ username: userValue });
       this.router.navigate(['/Hi_coordinator']);
      }
      
      this.loginForm.reset();
    }
  }






}
