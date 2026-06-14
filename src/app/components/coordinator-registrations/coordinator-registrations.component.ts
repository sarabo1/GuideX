import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { ServiceCoordinatorService } from '../../Services/service-coordinator.service';
import { InterfaceCoordinator } from '../../Interfaces/int-coordinator';
import { IdIsraelValidator} from '../../Services/israel_ID';
import {  MatIconModule } from "@angular/material/icon";
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { ServiceUsersService } from '../../Services/service-users.service';
import { SrvSchoolService } from '../../Services/srv-school.service';
import { MatDialogRef } from '@angular/material/dialog';


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
  lastSchoolId : number | undefined;
   


  constructor(private srvUsers:ServiceUsersService , 
                private srv_Coordinators:ServiceCoordinatorService , 
                private srvSchools: SrvSchoolService,
                private router: Router,
            private dialogRef: MatDialogRef<CoordinatorRegistrationsComponent>) {
   
  }
 private IdIsrael = inject(IdIsraelValidator);

 IsraelIdValidator = this.IdIsrael.idValidator();
  ngOnInit(){
    this.lastUserId = this.srvUsers.GetLastUserId() + 1;
    this.lastCoordinatorId = this.srv_Coordinators.GetLastTourCoordinatorId()+1;
    this.lastSchoolId = this.srvSchools.GetLastSchoolId() + 1;
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

 newCoordinator() {
    if (this.formCoordinator.valid) {
        this.srvUsers.InsertUser(
        this.lastUserId||0,
         this.formCoordinator.get('UserPassword')?.value || '',
        this.formCoordinator.get('UserPassword')?.value || '',
        this.formCoordinator.get('FirstName')?.value || '',
        this.formCoordinator.get('IdNumber')?.value || '',
        Number(this.formCoordinator.get('CityId')?.value),
        this.formCoordinator.get('PhoneNumber')?.value ?? '',
        this.formCoordinator.get('Email')?.value || '')

            this.srvSchools.InsertSchool(
                this.lastSchoolId || 0,
                this.formCoordinator.get('SchoolName')?.value || '',
                Number(this.formCoordinator.get('IsBoys')?.value),
                Number(this.formCoordinator.get('CityId')?.value),
                this.formCoordinator.get('PrincipalName')?.value || '',
                this.formCoordinator.get('PhoneSecretary')?.value || '',
                Number(this.formCoordinator.get('TypeSchoolId')?.value),
                Number(this.formCoordinator.get('AgeSchoolId')?.value)
            );

            this.srv_Coordinators.InsertCoordinator(
                this.lastUserId || 0,
                this.lastCoordinatorId || 0,
                Number(this.formCoordinator.get('RoleId')?.value),
                this.lastSchoolId || 0
            );

     
            
            this.formCoordinator.reset();
               this.dialogRef.close(); // סגור את הדיאלוג
            this.router.navigate(["/Home_Page"]);
        } else {
            console.error("טופס לא תקין:", this.formCoordinator.errors);
        }
         
     };
    

     
  
  showPassword = false;
  PasswordVisibility() {
   this.showPassword = !this.showPassword;
   
  }


}    

