import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { ServiceCoordinatorService } from '../../Services/service-coordinator.service';
import { InterfaceCoordinator } from '../../Interfaces/interface-coordinator';
import { IdIsraelValidator} from '../../Services/israel_ID';
import {  MatIconModule } from "@angular/material/icon";
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coordinator-registrations',
  imports: [ReactiveFormsModule,  MatIconModule, DropdownModule, CardModule ],
  templateUrl: './coordinator-registrations.component.html',
  styleUrls: ['./coordinator-registrations.component.scss'],
  standalone: true
})
export class CoordinatorRegistrationsComponent {
  lastUserId : number | undefined;
  lastCoordinatorId : number | undefined;
   


  constructor(private listOfCoordinators: ServiceCoordinatorService, private router: Router) {
   
  }
  private IdIsrael = inject(IdIsraelValidator);

  ngOnInit(){
    this.lastUserId = this.listOfCoordinators.GetLastUserId() + 1;
    this.lastCoordinatorId = this.listOfCoordinators.GetLastTourCoordinatorId()+1;
  }
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
      LastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      IdNumber: new FormControl('',  [Validators.required, this.IsraelIdValidator]),
      CityId: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      RoleId: new FormControl('',  [Validators.required]),
      SchoolName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      IsBoys: new FormControl('',  [Validators.required]),
      PrincipalName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      PhoneSecretary: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      TypeSchoolId: new FormControl('', [Validators.required]),
      AgeSchoolId: new FormControl('',  [Validators.required]),
  })

 // newCoordinator(){
  //    if (this.formCoordinator.valid) {
  //       console.log(this.formCoordinator.errors);
  //   this.listOfCoordinators.mock_Coordinators.push(
  //     User:this.lastUserId,
  //     UserPassword =this.formCoordinator.UserPassword.value, 
  //     FirstName = this.formCoordinator.FirstName.value, 
  //     LastName = this.formCoordinator.LastName.value, 
  //     IdNumber = this.formCoordinator.IdNumber.value, 
  //     CityId = this.formCoordinator.CityId.value, 
  //     PhoneNumber = this.formCoordinator.PhoneNumber.value, 
  //     Email = this.formCoordinator.Email.value, 
  //     tourCoordinatorId = this.LastCoordinatorId;
  //     RoleId= this.formCoordinator.RoleId.value, 
  //     SchoolName = this.formCoordinator.SchoolName.value, 
  //     IsBoys = this.formCoordinator.IsBoys.value, 
  //     PrincipalName = this.formCoordinator.PrincipalName.value, 
  //     PhoneSecretary = this.formCoordinator.PhoneSecretary.value, 
  //     TypeSchoolId = this.formCoordinator.TypeSchoolId.value, 
  //     AgeSchoolId = this.formCoordinator.AgeSchoolId.value);
  //   this.formCoordinator.reset()
  // }
 newCoordinator() {
    if (this.formCoordinator.valid) {
        const newCoordinator: InterfaceCoordinator = {
            user: {
                UserId: this.lastUserId || 0, // בהנחה שזה לא יכול להיות ריק
                UserPassword: this.formCoordinator.get('UserPassword')?.value || '', // בהנחה שזה לא יכול להיות ריק
                FirstName: this.formCoordinator.get('FirstName')?.value || '',
                LastName: this.formCoordinator.get('LastName')?.value || '',
                IdNumber: this.formCoordinator.get('IdNumber')?.value || '',
                CityId: Number(this.formCoordinator.get('CityId')?.value), // המרה למספר
                PhoneNumber: this.formCoordinator.get('PhoneNumber')?.value || '',
                Email: this.formCoordinator.get('Email')?.value || ''
            },
            TourCoordinatorId: this.lastCoordinatorId || 0,
            RoleId: Number(this.formCoordinator.get('RoleId')?.value), // המרה למספר
            School: {
                SchoolId: this.lastUserId || 0, // הכנס כאן את מזהה בית הספר המתאים
                SchoolName: this.formCoordinator.get('SchoolName')?.value || '',
                IsBoys: Number(this.formCoordinator.get('IsBoys')?.value), // המרה למספר
                CityId: Number(this.formCoordinator.get('CityId')?.value), // המרה למספר
                PrincipalName: this.formCoordinator.get('PrincipalName')?.value || '',
                PhoneSecretary: this.formCoordinator.get('PhoneSecretary')?.value || '', // כאן הוספת ברירת מחדל
                TypeSchoolId: Number(this.formCoordinator.get('TypeSchoolId')?.value), // המרה למספר
                AgeSchoolId: Number(this.formCoordinator.get('AgeSchoolId')?.value) // המרה למספר
            }
        };

        this.listOfCoordinators.mock_Coordinators.push(newCoordinator);
        console.log("רכזת חדשה נוספה:", newCoordinator);
        this.formCoordinator.reset();

        this.router.navigate(["/Home_Page"]);
       
    } else {
        console.error("טופס לא תקין:", this.formCoordinator.errors);
    }
    
}
 
  
  showPassword = false;
  PasswordVisibility() {
   this.showPassword = !this.showPassword;
   
}


}    

