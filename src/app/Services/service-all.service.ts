import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceAllService {
  getRegionsArray() {
    return [
      { id: 1, name: 'גליל עליון' },
      { id: 2, name: 'צפון' },
      { id: 3, name: 'גליל תחתון ועמקים' },
      { id: 4, name: 'כרמל ורמות מנשה' },
      { id: 5, name: 'מישור החוף והשרון' },
      { id: 6, name: 'הרי שומרון, הרי יהודה ושפלת יהודה' },
      { id: 7, name: 'ירושלים' },
      { id: 8, name: 'מדבר יהודה וים המלח' },
      { id: 9, name: 'הנגב' },
      { id: 10, name: 'אילת והערבה' },
    ];
  }
  constructor() {}
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

  getReligiousName(religiousId: number): string | undefined {
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
  GetRegions(RegionId: number): string {
    switch (RegionId) {
      case 1:
        return 'גליל עליון';
      case 2:
        return 'צפון';
      case 3:
        return 'גליל תחתון ועמקים';
      case 4:
        return 'כרמל ורמות מנשה';
      case 5:
        return 'מישור החוף והשרון';
      case 6:
        return 'הרי שומרון, הרי יהודה ושפלת יהודה';
      case 7:
        return 'ירושלים';
      case 8:
        return 'מדבר יהודה וים המלח';
      case 9:
        return 'הנגב';
      default:
        return 'אילת והערבה';
    }
  }

  GetKashrutName(kashrutId: number): string {
    switch (kashrutId) {
      case 1:
        return 'בד"ץ העדה החרדית ירושלים';
      case 2:
        return 'בד"ץ הרב לנדא (בני ברק)';
      case 3:
        return 'בד"ץ בית יוסף';
      case 4:
        return 'בד"ץ שארית ישראל';
      case 5:
        return 'בד"ץ מהדרין - הרב רובין';
      case 6:
        return 'בד"ץ מחזיקי הדת (בעלזא)';
      case 7:
        return 'הרבנות הראשית - מהדרין';
      case 8:
        return 'בד"ץ חתם סופר בני ברק';
      case 9:
        return 'בד"ץ חתם סופר פתח תקווה';
      case 10:
        return 'בד"ץ מהדרין - הרב גרוס';
      case 11:
        return 'בד"ץ אגודת ישראל';
      default:
        return 'יש לברר כשרות';
    }
  }

  getKashrutArray() {
  return [
    { id: 1, name: 'בד"ץ העדה החרדית ירושלים' },
    { id: 2, name: 'בד"ץ הרב לנדא (בני ברק)' },
    { id: 3, name: 'בד"ץ בית יוסף' },
    { id: 4, name: 'בד"ץ שארית ישראל' },
    { id: 5, name: 'בד"ץ מהדרין - הרב רובין' },
    { id: 6, name: 'בד"ץ מחזיקי הדת (בעלזא)' },
    { id: 7, name: 'הרבנות הראשית - מהדרין' },
    { id: 8, name: 'בד"ץ חתם סופר בני ברק' },
    { id: 9, name: 'בד"ץ חתם סופר פתח תקווה' },
    { id: 10, name: 'בד"ץ מהדרין - הרב גרוס' },
    { id: 11, name: 'בד"ץ אגודת ישראל' },
  ];
}
}
