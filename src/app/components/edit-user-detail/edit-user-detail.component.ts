import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-edit-user-detail',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './edit-user-detail.component.html',
  styleUrl: './edit-user-detail.component.scss'
})
export class EditUserDetailComponent {



     form: FormGroup; // קבוצת טופס
  fields: FieldConfig[] = []; // מערך השדות

  constructor(public dialogRef: MatDialogRef<EditUserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) {
    this.form = this.fb.group({}); // יוצר קבוצת טופס ריקה
    // כאן אנו מגדירים את השדות
    this.fields = [
      { type: 'text', key: 'FirstName', label: 'שם פרטי', required: true, minLength: 2 },
      { type: 'text', key: 'LastName', label: 'שם משפחה', required: true, minLength: 2 },
      { type: 'text', key: 'IdNumber', label: 'מספר זהות', required: true },
      { type: 'text', key: 'PhoneNumber', label: 'מספר טלפון', required: true },
      { type: 'email', key: 'Email', label: 'אימייל', required: true },
      { type: 'text', key: 'CityId', label: 'עיר', required: true },
      { type: 'select', key: 'ReligiousId', label: 'השתייכות דתית', options: [], required: true }, // צריך למלא את options
      { type: 'radio', key: 'IsBoys', label: 'מגדר', options: ['1', '0'], required: true }, // מוסד לבנים ו לבנות
      { type: 'text', key: 'PrincipalName', label: 'שם מנהל', required: true, minLength: 2 },
      { type: 'text', key: 'PhoneSecretary', label: 'מספר טלפון נייד מוסד', required: true },
      { type: 'select', key: 'TypeSchoolId', label: 'סוג מוסד', options: [], required: true }, // צריך למלא את options
      { type: 'select', key: 'AgeSchoolId', label: 'גיל מוסד', options: [], required: true } // צריך למלא את options
    ];
  }

  ngOnInit() {
    this.buildForm(); // בונה את הטופס לפי השדות
  }

  private buildForm() {
    this.fields.forEach(field => {
      const control = this.fb.control('', field.required ? Validators.required : null);
      if (field.minLength) {
        control.setValidators([Validators.minLength(field.minLength)]);
      }
      this.form.addControl(field.key, control);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value); // מדפיס את הערכים אם הטופס תקין
    } else {
      this.form.markAllAsTouched(); // מסמן את כל השדות כ-touched אם הטופס לא תקין
    }
  }
  
    onClose(){
    this.dialogRef.close();
  }
}


export interface FieldConfig {
  type: 'text' | 'select' | 'checkbox' | 'number' | 'email' | 'radio'; // סוג השדה
  key: string; // שם פנימי של השדה
  label: string; // טקסט תצוגה
  required?: boolean; // האם השדה חובה
  options?: string[]; // אפשרויות רלוונטיות רק לסוג select
  minLength?: number; // מינימום תווים
}
