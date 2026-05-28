import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceAllService {

  constructor() { }
  getRollName(roleId: number): string | undefined {
    switch (roleId) {
      case 1:
        return 'סגנית';
      case 2:
        return 'מנהלת';
      case 3:
        return 'מורה';
      case 4:
        return 'מזכירה';
      case 5:
        return 'אחר';
      default:
        return 'אחר';
    }
  }

  getReligiousName(religiousId: number): string | undefined 
  {
    switch (religiousId) {
      case 1:
        return 'חסידי';  
      case 2:
        return 'ספרדי';   
      case 3:
        return 'אשכנזי';
      default:
        return 'אחר';
    }
  }
  getTypeSchoolName(typeSchoolId: number): string | undefined {
    switch (typeSchoolId) {
      case 1:
        return 'חסידי';  
      case 2:
        return 'ספרדי';   
      case 3:
        return 'אשכנזי';
      default:
        return 'אחר';
    }
  }

  getAgeSchoolName(ageSchoolId: number): string | undefined {
    switch (ageSchoolId) {
      case 1:
        return 'יסודי';
      case 2:
        return 'חט"ב';
      case 3:
        return 'תיכון';
      default:
        return 'אחר';
    }
  }
}
