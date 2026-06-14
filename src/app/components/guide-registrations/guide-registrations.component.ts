import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdIsraelValidator } from '../../Services/israel_ID';
import { MatIcon } from "@angular/material/icon";
import { MultiSelectModule } from 'primeng/multiselect'; // ייבוא קומפוננט ה-multiselect
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guide-registrations',
  imports: [MatIcon, ReactiveFormsModule, MultiSelectModule, FormsModule, 
            CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './guide-registrations.component.html',
  styleUrl: './guide-registrations.component.scss',
  standalone: true
})
export class GuideRegistrationsComponent {

  selectedOrigins!: [] | null;
    Origins: { name: string; code: string }[] = [];
     constructor(private router: Router) {this.Origins = [
      { name: 'רמת הגולן ועמק החולה', code: '1' },
      { name: 'גליל עליון', code: '2' },
      { name: 'גליל תחתון ועמקים', code: '3' },
      { name: 'כרמל ורמות מנשה', code: '4' },
      { name: 'מישור החוף והשרון', code: '5' },
      { name: 'הרי שומרון, הרי יהודה ושפלת יהודה', code: '6' },
      { name: 'ירושלים', code: '7' },
      { name: 'מדבר יהודה וים המלח', code: '8' },
      { name: 'הנגב', code: '9' },
      { name: 'אילת והערבה', code: '10' },
    ];}
  private IdIsrael = inject(IdIsraelValidator);

 IsraelIdValidator = this.IdIsrael.idValidator();
   formGuide = new FormGroup({
       selectedOrigins: new FormControl([], Validators.required), // ודא שזה מחזיר מערך
      UserPassword: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_^+=-])[A-Za-z\d@$!%*?&.#_^+=-]{8,}$/)]),
      FirstName: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      LastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      IdNumber: new FormControl('',  [Validators.required, this.IsraelIdValidator]),
      CityId: new FormControl(''),
      PhoneNumber: new FormControl('',  [Validators.required, Validators.minLength(2)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Origin: new FormControl('', [Validators.required]),
      ReligiousId: new FormControl('', [Validators.required]),

  })
 religiousData = [{id: 1, name: 'חסידי' },
       { id: 2, name: 'ספרדי' }, 
       { id: 3, name: 'אשכנזי' }, 
       { id: 4,  name: 'אחר' }];
       selectedFiles: File[] = [];
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
                this.router.navigate(["/Home_Page"]);

            this.formGuide.reset();
          }
        }
        showPassword = false;
        PasswordVisibility() {
          this.showPassword = !this.showPassword;
        }
  
        onFileSelected(event: Event) {
         const input = event.target as HTMLInputElement;
         if (input.files) {
           this.selectedFiles = Array.from(input.files);
           console.log(this.selectedFiles); // כאן תוכל לראות את הקבצים שנבחרו
         }
       }
      }
      
      
      