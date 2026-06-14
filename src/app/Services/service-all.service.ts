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
  GetRegions(RegionId: number): string {
  switch (RegionId) {
    case 1: return "גליל עליון";
    case 2: return "צפון";
    case 3: return "גליל תחתון ועמקים";
    case 4: return "כרמל ורמות מנשה";
    case 5: return "מישור החוף והשרון";
    case 6: return "הרי שומרון, הרי יהודה ושפלת יהודה";
    case 7: return "ירושלים";
    case 8: return "מדבר יהודה וים המלח";
    case 9: return "הנגב";
    default: return "אילת והערבה";
  }
}

GetKashrutName(kashrutId : number) : string{
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
}
