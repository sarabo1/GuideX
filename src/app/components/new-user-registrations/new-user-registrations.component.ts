import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { GuideRegistrationsComponent } from '../guide-registrations/guide-registrations.component';
import { CoordinatorRegistrationsComponent } from '../coordinator-registrations/coordinator-registrations.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-registrations',
  templateUrl: './new-user-registrations.component.html',
  imports: [MatTabsModule, GuideRegistrationsComponent, CoordinatorRegistrationsComponent],
  styleUrls: ['./new-user-registrations.component.scss'],
  standalone: true
})
export class NewUserRegistrationsComponent {
      // userNameForm = new FormGroup({
      //    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      //    lastName: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      //    numberID: new FormControl('', [Validators.required, Validators.minLength(9)]),
      //    titleName: new FormControl('',  [Validators.required, Validators.minLength(3)])
      // })
   
}


