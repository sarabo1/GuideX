import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdIsraelValidator } from '../../Services/israel_ID';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-guide-registrations',
  imports: [MatIcon, ReactiveFormsModule ],
  templateUrl: './guide-registrations.component.html',
  styleUrl: './guide-registrations.component.scss'
})
export class GuideRegistrationsComponent {

  private IdIsrael = inject(IdIsraelValidator);
  IsraelIdValidator = this.IdIsrael.idValidator();
   formGuide = new FormGroup({

      UserPassword: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_^+=-])[A-Za-z\d@$!%*?&.#_^+=-]{8,}$/)]),
      FirstName: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      LastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      IdNumber: new FormControl('',  [Validators.required, this.IsraelIdValidator]),
      CityId: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Origin: new FormControl('', [Validators.required]),
      ReligiousId: new FormControl('', [Validators.required]),
  })

  newGuide() {
    if (this.formGuide.valid) { 
        const newGuide = {
            user: {
                UserId: 0, // יש להגדיר את ה-UserId בהתאם ללוגיקה של האפליקציה
                UserPassword: this.formGuide.value.UserPassword || '',
                FirstName: this.formGuide.value.FirstName || '',
                LastName: this.formGuide.value.LastName || '',
                IdNumber: this.formGuide.value.IdNumber || '',
                CityId: this.formGuide.value.CityId || 0,
                PhoneNumber: this.formGuide.value.PhoneNumber || '',
                Email: this.formGuide.value.Email || ''
            },
            GuideId: 0,
            Origin: this.formGuide.value.Origin || '',
            ReligiousId: this.formGuide.value.ReligiousId || 0
  }
  this.formGuide.reset();
}
  }
   showPassword = false;
  PasswordVisibility() {
   this.showPassword = !this.showPassword;
}
}
