import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { ServiceCoordinatorService } from '../../Services/service-coordinator.service';
import { InterfaceCoordinator } from '../../Interfaces/interface-coordinator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { IdIsraelValidator} from '../../Services/israel_ID';
import { MatRadioModule } from '@angular/material/radio';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-coordinator-registrations',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatOptionModule, MatRadioModule, MatIcon],
  templateUrl: './coordinator-registrations.component.html',
  styleUrls: ['./coordinator-registrations.component.scss'],
  standalone: true
})
export class CoordinatorRegistrationsComponent {
  constructor(public listOfCoordinators: ServiceCoordinatorService){}
  private IdIsrael = inject(IdIsraelValidator);
    religiousData = [{id: 1, name: 'חסידי' },
       { id: 2, name: 'ספרדי' }, 
       { id: 3, name: 'אשכנזי' }, 
       { id: 4,  name: 'אחר' }];
       RoleIdData = [
       { id: 1, name: 'סגנית' }, 
       { id: 2, name: 'מנהלת' }, 
       { id: 3, name: 'מורה' }, 
       { id: 4, name: 'מזכירה' }, 
       { id: 5,  name: 'אחר' }];
       AgeSchoolIdData = [
       { id: 1, name: 'יסודי' }, 
       { id: 2, name: 'חט"ב' }, 
       { id: 3, name: 'תיכון' }, 
       { id: 4,  name: 'אחר' }];
      
    IsraelIdValidator = this.IdIsrael.idValidator();
  formCoordinator = new FormGroup({

      UserPassword: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_^+=-])[A-Za-z\d@$!%*?&.#_^+=-]{8,}$/)]),
      FirstName: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      LastName: new FormControl('', [Validators.required]),
      IdNumber: new FormControl('',  [Validators.required, this.IdIsrael.idValidator()]),
      CityId: new FormControl('', [Validators.required, Validators.minLength(2)]),
      PhoneNumber: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      RoleId: new FormControl('',  [Validators.required, Validators.minLength(3)]),
      SchoolName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      IsBoys: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      PrincipalName: new FormControl('', [Validators.required]),
      PhoneSecretary: new FormControl('',  [Validators.required, Validators.minLength(3)]),
      TypeSchoolId: new FormControl('', [Validators.required, Validators.minLength(2)]),
      AgeSchoolId: new FormControl('',  [Validators.required, Validators.minLength(2)]),
  })

  newCoordinator(){
    this.listOfCoordinators.mock_Coordinators.push(this.formCoordinator.value as unknown as InterfaceCoordinator);
    this.formCoordinator.reset()
  }
   hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
    
     
}
