import { Injectable } from '@angular/core';
import { Int_WalkingTrail } from '../Interfaces/Int_WalkingTrail';

@Injectable({
  providedIn: 'root'
})
export class SrvWalkingTrailService {

public mock_WalkingTrails: Int_WalkingTrail[] = [

  // 1 - גליל עליון
  {
    WalkingTrailId: 1,
    WalkingTrailName: "נחל חרמון (בניאס)",
    Description: "מסלול מים בגליל העליון עם מפלים ונחלים זורמים.",
    RegionId: 1,
    Directions: "שמורת הבניאס",
    LengthInKm: 3.5,
    RouteDuration: 100,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 80,
    IsWet: true
  },
  {
    WalkingTrailId: 2,
    WalkingTrailName: "נחל עיון",
    Description: "מסלול מפלים מרהיב ליד מטולה.",
    RegionId: 1,
    Directions: "שמורת נחל עיון",
    LengthInKm: 2.0,
    RouteDuration: 90,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 85,
    IsWet: true
  },
  {
    WalkingTrailId: 3,
    WalkingTrailName: "נחל שניר (חצבאני)",
    Description: "נחל זורם וצל בגליל העליון.",
    RegionId: 1,
    Directions: "שמורת שניר",
    LengthInKm: 4.5,
    RouteDuration: 120,
    Difficulty: 2,
    MinAge: 4,
    MaxAge: 85,
    IsWet: true
  },
  {
    WalkingTrailId: 4,
    WalkingTrailName: "תל דן",
    Description: "מסלול קצר בין פלגי מים ואתר ארכיאולוגי.",
    RegionId: 1,
    Directions: "שמורת תל דן",
    LengthInKm: 2.0,
    RouteDuration: 60,
    Difficulty: 1,
    MinAge: 0,
    MaxAge: 100,
    IsWet: true
  },
  {
    WalkingTrailId: 5,
    WalkingTrailName: "אגמון החולה",
    Description: "מסלול טבע וצפרות סביב אגם החולה.",
    RegionId: 1,
    Directions: "אגמון החולה",
    LengthInKm: 5.0,
    RouteDuration: 120,
    Difficulty: 1,
    MinAge: 0,
    MaxAge: 100,
    IsWet: true
  },
  {
    WalkingTrailId: 6,
    WalkingTrailName: "הר חרמון (שבילי שלג)",
    Description: "מסלולים גבוהים באזור החרמון.",
    RegionId: 1,
    Directions: "אתר החרמון",
    LengthInKm: 3.0,
    RouteDuration: 90,
    Difficulty: 2,
    MinAge: 6,
    MaxAge: 80,
    IsWet: false
  },

  // 2 - צפון
  {
    WalkingTrailId: 7,
    WalkingTrailName: "הר ארבל",
    Description: "תצפית מרהיבה על הכנרת.",
    RegionId: 2,
    Directions: "גן לאומי ארבל",
    LengthInKm: 4.0,
    RouteDuration: 180,
    Difficulty: 4,
    MinAge: 10,
    MaxAge: 75,
    IsWet: false
  },
  {
    WalkingTrailId: 8,
    WalkingTrailName: "הר מירון",
    Description: "מסלול פסגה בגליל.",
    RegionId: 2,
    Directions: "חניון פסגת מירון",
    LengthInKm: 3.5,
    RouteDuration: 120,
    Difficulty: 2,
    MinAge: 6,
    MaxAge: 85,
    IsWet: false
  },
  {
    WalkingTrailId: 9,
    WalkingTrailName: "נחל כזיב",
    Description: "נחל מים בגליל המערבי.",
    RegionId: 2,
    Directions: "עין זיו",
    LengthInKm: 8.5,
    RouteDuration: 300,
    Difficulty: 3,
    MinAge: 10,
    MaxAge: 75,
    IsWet: true
  },
  {
    WalkingTrailId: 10,
    WalkingTrailName: "נחל עמוד",
    Description: "נחל זורם בגליל התחתון.",
    RegionId: 2,
    Directions: "שמורת נחל עמוד",
    LengthInKm: 6.0,
    RouteDuration: 240,
    Difficulty: 3,
    MinAge: 8,
    MaxAge: 75,
    IsWet: true
  },
  {
    WalkingTrailId: 11,
    WalkingTrailName: "הר תבור",
    Description: "מסלול על הר עצמאי בגליל התחתון.",
    RegionId: 2,
    Directions: "הר תבור",
    LengthInKm: 3.0,
    RouteDuration: 120,
    Difficulty: 3,
    MinAge: 8,
    MaxAge: 80,
    IsWet: false
  },
  {
    WalkingTrailId: 12,
    WalkingTrailName: "נחל ציפורי",
    Description: "מסלול מים בעמק יזרעאל.",
    RegionId: 2,
    Directions: "אזור רמת ישי",
    LengthInKm: 4.0,
    RouteDuration: 120,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 85,
    IsWet: true
  },
  {
    WalkingTrailId: 13,
    WalkingTrailName: "נחל בצת",
    Description: "נחל ירוק בגליל המערבי.",
    RegionId: 2,
    Directions: "אזור שלומי",
    LengthInKm: 3.5,
    RouteDuration: 110,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 85,
    IsWet: true
  },
  {
    WalkingTrailId: 14,
    WalkingTrailName: "נחל דלתון",
    Description: "מסלול בגליל העליון.",
    RegionId: 2,
    Directions: "אזור דלתון",
    LengthInKm: 3.0,
    RouteDuration: 100,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 85,
    IsWet: false
  },

  // 3 - גליל תחתון ועמקים
  {
    WalkingTrailId: 15,
    WalkingTrailName: "נחל השופט",
    Description: "מסלול מים למשפחות.",
    RegionId: 3,
    Directions: "רמות מנשה",
    LengthInKm: 2.5,
    RouteDuration: 75,
    Difficulty: 1,
    MinAge: 0,
    MaxAge: 100,
    IsWet: true
  },
  {
    WalkingTrailId: 16,
    WalkingTrailName: "עין אפק",
    Description: "שמורת ביצות וטבע.",
    RegionId: 3,
    Directions: "קריית ביאליק",
    LengthInKm: 1.5,
    RouteDuration: 45,
    Difficulty: 1,
    MinAge: 0,
    MaxAge: 100,
    IsWet: true
  },
  {
    WalkingTrailId: 17,
    WalkingTrailName: "פארק רמות מנשה",
    Description: "יער טבעי גדול.",
    RegionId: 3,
    Directions: "רמות מנשה",
    LengthInKm: 5.0,
    RouteDuration: 140,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 90,
    IsWet: false
  },
  {
    WalkingTrailId: 18,
    WalkingTrailName: "נחל קישון",
    Description: "מסלול לאורך נחל קישון.",
    RegionId: 3,
    Directions: "עמק יזרעאל",
    LengthInKm: 4.0,
    RouteDuration: 120,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 85,
    IsWet: false
  },
  {
    WalkingTrailId: 19,
    WalkingTrailName: "נחל תבור",
    Description: "מסלול נחל בגליל התחתון.",
    RegionId: 3,
    Directions: "אזור גזית",
    LengthInKm: 8.0,
    RouteDuration: 300,
    Difficulty: 4,
    MinAge: 12,
    MaxAge: 70,
    IsWet: true
  },

  // 4 - כרמל
  {
    WalkingTrailId: 20,
    WalkingTrailName: "נחל כלח",
    Description: "יער קסום בכרמל.",
    RegionId: 4,
    Directions: "פארק הכרמל",
    LengthInKm: 3.5,
    RouteDuration: 120,
    Difficulty: 3,
    MinAge: 8,
    MaxAge: 80,
    IsWet: true
  },
  {
    WalkingTrailId: 21,
    WalkingTrailName: "נחל אורן",
    Description: "מסלול טבע בכרמל.",
    RegionId: 4,
    Directions: "פארק הכרמל",
    LengthInKm: 4.0,
    RouteDuration: 140,
    Difficulty: 2,
    MinAge: 6,
    MaxAge: 85,
    IsWet: false
  },
  {
    WalkingTrailId: 22,
    WalkingTrailName: "נחל שיח",
    Description: "מסלול קצר בחיפה.",
    RegionId: 4,
    Directions: "כרמל מערבי",
    LengthInKm: 2.5,
    RouteDuration: 90,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 90,
    IsWet: false
  },
  {
    WalkingTrailId: 23,
    WalkingTrailName: "נחל מערות",
    Description: "מערות האדם הקדמון.",
    RegionId: 4,
    Directions: "פארק הכרמל",
    LengthInKm: 2.0,
    RouteDuration: 80,
    Difficulty: 2,
    MinAge: 6,
    MaxAge: 90,
    IsWet: false
  },
  {
    WalkingTrailId: 24,
    WalkingTrailName: "נחל לוטם",
    Description: "מסלול עירוני בחיפה.",
    RegionId: 4,
    Directions: "חיפה",
    LengthInKm: 2.5,
    RouteDuration: 70,
    Difficulty: 1,
    MinAge: 0,
    MaxAge: 100,
    IsWet: false
  },

  // 5 - מישור החוף
  {
    WalkingTrailId: 25,
    WalkingTrailName: "נחל אלכסנדר",
    Description: "גשר הצבים.",
    RegionId: 5,
    Directions: "בית ינאי",
    LengthInKm: 3.0,
    RouteDuration: 90,
    Difficulty: 1,
    MinAge: 0,
    MaxAge: 100,
    IsWet: false
  },
  {
    WalkingTrailId: 26,
    WalkingTrailName: "גן לאומי אפולוניה",
    Description: "מצוקי חוף.",
    RegionId: 5,
    Directions: "הרצליה",
    LengthInKm: 2.0,
    RouteDuration: 60,
    Difficulty: 1,
    MinAge: 3,
    MaxAge: 100,
    IsWet: false
  },
  {
    WalkingTrailId: 27,
    WalkingTrailName: "נחל הירקון",
    Description: "פארק הירקון.",
    RegionId: 5,
    Directions: "תל אביב",
    LengthInKm: 5.0,
    RouteDuration: 120,
    Difficulty: 1,
    MinAge: 0,
    MaxAge: 100,
    IsWet: false
  },
  {
    WalkingTrailId: 28,
    WalkingTrailName: "נחל פולג",
    Description: "מסלול ליד נתניה.",
    RegionId: 5,
    Directions: "נתניה",
    LengthInKm: 3.5,
    RouteDuration: 100,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 85,
    IsWet: false
  },
  {
    WalkingTrailId: 29,
    WalkingTrailName: "נחל תנינים",
    Description: "נחל טבעי ליד חוף הכרמל.",
    RegionId: 5,
    Directions: "זכרון יעקב",
    LengthInKm: 4.0,
    RouteDuration: 120,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 85,
    IsWet: true
  },

  // 6 - יהודה
  {
    WalkingTrailId: 30,
    WalkingTrailName: "סטף",
    Description: "מעיינות בהרי ירושלים.",
    RegionId: 6,
    Directions: "ירושלים",
    LengthInKm: 4.0,
    RouteDuration: 120,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 85,
    IsWet: true
  },
  {
    WalkingTrailId: 31,
    WalkingTrailName: "נחל פרת",
    Description: "ואדי קלט.",
    RegionId: 6,
    Directions: "מדבר יהודה",
    LengthInKm: 6.0,
    RouteDuration: 210,
    Difficulty: 3,
    MinAge: 8,
    MaxAge: 75,
    IsWet: true
  },
  {
    WalkingTrailId: 32,
    WalkingTrailName: "נחל קטלב",
    Description: "יער בהרי ירושלים.",
    RegionId: 6,
    Directions: "בר גיורא",
    LengthInKm: 4.5,
    RouteDuration: 150,
    Difficulty: 3,
    MinAge: 8,
    MaxAge: 80,
    IsWet: false
  },
  {
    WalkingTrailId: 33,
    WalkingTrailName: "עין חמד",
    Description: "גן לאומי עם מים.",
    RegionId: 6,
    Directions: "כביש ירושלים–ת״א",
    LengthInKm: 1.5,
    RouteDuration: 60,
    Difficulty: 1,
    MinAge: 0,
    MaxAge: 100,
    IsWet: true
  },
  {
    WalkingTrailId: 34,
    WalkingTrailName: "עין לבן",
    Description: "מעיין ליד ירושלים.",
    RegionId: 6,
    Directions: "גן החיות התנ״כי",
    LengthInKm: 2.0,
    RouteDuration: 70,
    Difficulty: 1,
    MinAge: 0,
    MaxAge: 100,
    IsWet: true
  },

  // 7 - ירושלים
  {
    WalkingTrailId: 35,
    WalkingTrailName: "נחל קדרון",
    Description: "מסלול היסטורי בירושלים.",
    RegionId: 7,
    Directions: "עיר דוד",
    LengthInKm: 3.0,
    RouteDuration: 120,
    Difficulty: 2,
    MinAge: 8,
    MaxAge: 85,
    IsWet: false
  },
  {
    WalkingTrailId: 36,
    WalkingTrailName: "שביל חומות ירושלים",
    Description: "סיור סביב העיר העתיקה.",
    RegionId: 7,
    Directions: "ירושלים העתיקה",
    LengthInKm: 4.0,
    RouteDuration: 180,
    Difficulty: 2,
    MinAge: 6,
    MaxAge: 85,
    IsWet: false
  },

  // 8 - מדבר יהודה
  {
    WalkingTrailId: 37,
    WalkingTrailName: "נחל דוד",
    Description: "עין גדי – מפלים ובריכות.",
    RegionId: 8,
    Directions: "שמורת עין גדי",
    LengthInKm: 2.0,
    RouteDuration: 90,
    Difficulty: 2,
    MinAge: 4,
    MaxAge: 80,
    IsWet: true
  },
  {
    WalkingTrailId: 38,
    WalkingTrailName: "נחל ערוגות",
    Description: "מסלול מים במדבר.",
    RegionId: 8,
    Directions: "עין גדי",
    LengthInKm: 4.0,
    RouteDuration: 180,
    Difficulty: 3,
    MinAge: 8,
    MaxAge: 75,
    IsWet: true
  },
  {
    WalkingTrailId: 39,
    WalkingTrailName: "עין בוקק",
    Description: "מסלול קצר ליד ים המלח.",
    RegionId: 8,
    Directions: "ים המלח",
    LengthInKm: 1.5,
    RouteDuration: 60,
    Difficulty: 1,
    MinAge: 0,
    MaxAge: 100,
    IsWet: true
  },
  {
    WalkingTrailId: 40,
    WalkingTrailName: "מצדה (שביל הנחש)",
    Description: "טיפוס למצדה.",
    RegionId: 8,
    Directions: "מצדה",
    LengthInKm: 2.0,
    RouteDuration: 90,
    Difficulty: 4,
    MinAge: 10,
    MaxAge: 80,
    IsWet: false
  },
  {
    WalkingTrailId: 41,
    WalkingTrailName: "נחל זוהר",
    Description: "נחל במדבר יהודה.",
    RegionId: 8,
    Directions: "ים המלח",
    LengthInKm: 3.0,
    RouteDuration: 120,
    Difficulty: 3,
    MinAge: 8,
    MaxAge: 80,
    IsWet: false
  },
  {
    WalkingTrailId: 42,
    WalkingTrailName: "עין גדי עליון",
    Description: "מסלול טיפוס בעין גדי.",
    RegionId: 8,
    Directions: "עין גדי",
    LengthInKm: 3.5,
    RouteDuration: 150,
    Difficulty: 3,
    MinAge: 8,
    MaxAge: 80,
    IsWet: true
  },
  {
    WalkingTrailId: 43,
    WalkingTrailName: "נחל משמר",
    Description: "קניון במדבר.",
    RegionId: 8,
    Directions: "מדבר יהודה",
    LengthInKm: 4.0,
    RouteDuration: 160,
    Difficulty: 3,
    MinAge: 10,
    MaxAge: 80,
    IsWet: false
  },
  {
    WalkingTrailId: 44,
    WalkingTrailName: "נחל דרגות",
    Description: "מסלול אתגרי במדבר.",
    RegionId: 8,
    Directions: "ים המלח",
    LengthInKm: 5.0,
    RouteDuration: 240,
    Difficulty: 4,
    MinAge: 12,
    MaxAge: 75,
    IsWet: true
  },
  {
    WalkingTrailId: 45,
    WalkingTrailName: "הר סדום",
    Description: "מסלול מלח מדברי.",
    RegionId: 8,
    Directions: "ים המלח",
    LengthInKm: 3.0,
    RouteDuration: 120,
    Difficulty: 2,
    MinAge: 6,
    MaxAge: 85,
    IsWet: false
  },
  {
    WalkingTrailId: 46,
    WalkingTrailName: "נחל פרצים",
    Description: "קניון מלח במדבר.",
    RegionId: 8,
    Directions: "ים המלח",
    LengthInKm: 3.5,
    RouteDuration: 130,
    Difficulty: 3,
    MinAge: 8,
    MaxAge: 80,
    IsWet: false
  },

  // 9 - נגב
  {
    WalkingTrailId: 47,
    WalkingTrailName: "מכתש רמון",
    Description: "מסלול גיאולוגי ענק.",
    RegionId: 9,
    Directions: "מצפה רמון",
    LengthInKm: 5.0,
    RouteDuration: 180,
    Difficulty: 3,
    MinAge: 10,
    MaxAge: 80,
    IsWet: false
  },
  {
    WalkingTrailId: 48,
    WalkingTrailName: "נחל צין",
    Description: "מסלול מדברי בנגב.",
    RegionId: 9,
    Directions: "שדה בוקר",
    LengthInKm: 6.0,
    RouteDuration: 200,
    Difficulty: 3,
    MinAge: 10,
    MaxAge: 80,
    IsWet: false
  },
  {
    WalkingTrailId: 49,
    WalkingTrailName: "פארק תמנע",
    Description: "עמודי שלמה ונוף מדברי.",
    RegionId: 9,
    Directions: "אילת",
    LengthInKm: 4.0,
    RouteDuration: 120,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 90,
    IsWet: false
  },
  {
    WalkingTrailId: 50,
    WalkingTrailName: "עין עבדת",
    Description: "קניון עם מעיינות במדבר.",
    RegionId: 9,
    Directions: "מצפה רמון",
    LengthInKm: 1.6,
    RouteDuration: 90,
    Difficulty: 2,
    MinAge: 5,
    MaxAge: 80,
    IsWet: true
  }
];


GetWalkingTrails(): Int_WalkingTrail[] {
  return this.mock_WalkingTrails;}


}



