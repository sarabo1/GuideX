import { Injectable } from '@angular/core';
import { int_Attractions } from '../Interfaces/int_Attractions';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class srv_Attractions {
  constructor(public http: HttpClient) {}
  mock_Attractions: int_Attractions[] = [
    {
      attractionId: 1,
      attractionsName: 'מעלית הזמן ירושלים',
      reigionId: 7,
      address: 'נחלת שבעה, ירושלים',
      attractionTypeId: 1,
      description: 'מיצג אינטראקטיבי היסטורי חווייתי לקבוצות וכיתות',
      shomerShabat: 2,
      phone: '02-6248383',
    },
    {
      attractionId: 2,
      attractionsName: 'בריכות צפת',
      reigionId: 1,
      address: 'צפת',
      attractionTypeId: 2,
      description: 'מתחם בריכות עירוני נפרד',
      shomerShabat: 2,
      phone: '04-6972411',
    },
    {
      attractionId: 3,
      attractionsName: 'מסלול נחל כזיב',
      reigionId: 1,
      address: '',
      attractionTypeId: 3,
      description: 'מסלול הליכה בטבע הגלילי',
      shomerShabat: 0,
      phone: '',
    },
    {
      attractionId: 4,
      attractionsName: 'רכיבה על סוסים חוות השפלה',
      reigionId: 6,
      address: 'מושב ישעי',
      attractionTypeId: 4,
      description: 'טיולי סוסים בנופים המרהיבים של השפלה',
      shomerShabat: 1,
      phone: '02-9913344',
    },
    {
      attractionId: 5,
      attractionsName: 'מרכז המבקרים של בנק ישראל',
      reigionId: 7,
      address: 'קריית הממשלה, ירושלים',
      attractionTypeId: 8,
      description: 'סיור מרתק ומותאם לכיתות על תולדות המטבע והכלכלה',
      shomerShabat: 2,
      phone: '02-6552211',
    },
    {
      attractionId: 6,
      attractionsName: 'חוף נפרד טבריה',
      reigionId: 2,
      address: 'טבריה',
      attractionTypeId: 5,
      description: 'חוף רחצה נפרד ומסודר בכנרת',
      shomerShabat: 2,
      phone: '04-6721155',
    },
    {
      attractionId: 7,
      attractionsName: 'איי קלימבו קיר טיפוס',
      reigionId: 5,
      address: 'קניון איילון, רמת גן',
      attractionTypeId: 6,
      description: 'מתחם קירות טיפוס אתגרי לכל הגילאים',
      shomerShabat: 1,
      phone: '03-5704455',
    },
    {
      attractionId: 8,
      attractionsName: 'חריש על גלגלים',
      reigionId: 3,
      address: 'חריש',
      attractionTypeId: 7,
      description: "טיולי ג'יפים ושטח למשפחות וקבוצות",
      shomerShabat: 2,
      phone: '052-7162233',
    },
  ];
  // mock_Attractions: int_Attractions[] = [
  //   {
  //     AttractionsId: 1,
  //     AttractionsName: 'מעלית הזמן ירושלים',
  //     RegionId: 7,
  //     Address: 'נחלת שבעה, ירושלים',
  //     AttractionsTypeId: 17,
  //     Description: 'מיצג אינטראקטיבי היסטורי חווייתי לקבוצות וכיתות',
  //     ShomerShabat: 2,
  //     Phone: '02-6248383',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?jerusalem,museum',
  //   },
  //   {
  //     AttractionsId: 2,
  //     AttractionsName: 'בריכות צפת',
  //     RegionId: 1,
  //     Address: 'צפת',
  //     AttractionsTypeId: 11,
  //     Description: 'מתחם בריכות עירוני נפרד',
  //     ShomerShabat: 2,
  //     Phone: '04-6972411',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?swimming,pool',
  //   },
  //   {
  //     AttractionsId: 3,
  //     AttractionsName: 'מסלול נחל כזיב',
  //     RegionId: 1,
  //     Address: '',
  //     AttractionsTypeId: 1,
  //     Description: 'מסלול הליכה בטבע הגלילי',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?hiking,river,nature',
  //   },
  //   {
  //     AttractionsId: 4,
  //     AttractionsName: 'רכיבה על סוסים חוות השפלה',
  //     RegionId: 6,
  //     Address: 'מושב ישעי',
  //     AttractionsTypeId: 5,
  //     Description: 'טיולי סוסים בנופים המרהיבים של השפלה',
  //     ShomerShabat: 1,
  //     Phone: '02-9913344',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?horse,riding',
  //   },
  //   {
  //     AttractionsId: 5,
  //     AttractionsName: 'מרכז המבקרים של בנק ישראל',
  //     RegionId: 7,
  //     Address: 'קריית הממשלה, ירושלים',
  //     AttractionsTypeId: 18,
  //     Description: 'סיור על תולדות המטבע והכלכלה',
  //     ShomerShabat: 2,
  //     Phone: '02-6552211',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?museum,finance',
  //   },

  //   {
  //     AttractionsId: 6,
  //     AttractionsName: 'חוף נפרד טבריה',
  //     RegionId: 2,
  //     Address: 'טבריה',
  //     AttractionsTypeId: 13,
  //     Description: 'חוף רחצה נפרד בכנרת',
  //     ShomerShabat: 2,
  //     Phone: '04-6721155',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?beach,sea',
  //   },
  //   {
  //     AttractionsId: 7,
  //     AttractionsName: 'איי קלימבו קיר טיפוס',
  //     RegionId: 5,
  //     Address: 'קניון איילון',
  //     AttractionsTypeId: 25,
  //     Description: 'קיר טיפוס אתגרי',
  //     ShomerShabat: 1,
  //     Phone: '03-5704455',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?climbing,wall',
  //   },
  //   {
  //     AttractionsId: 8,
  //     AttractionsName: 'חריש על גלגלים',
  //     RegionId: 3,
  //     Address: 'חריש',
  //     AttractionsTypeId: 2,
  //     Description: 'טיולי ג׳יפים',
  //     ShomerShabat: 2,
  //     Phone: '052-7162233',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?jeep,offroad',
  //   },
  //   {
  //     AttractionsId: 9,
  //     AttractionsName: 'פארק מים חוף גיא',
  //     RegionId: 2,
  //     Address: '',
  //     AttractionsTypeId: 10,
  //     Description: 'פארק מים',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?waterpark',
  //   },
  //   {
  //     AttractionsId: 10,
  //     AttractionsName: 'מרכז מבקרים רמת הגולן',
  //     RegionId: 2,
  //     Address: 'רמת הגולן',
  //     AttractionsTypeId: 18,
  //     Description: 'מרכז מבקרים ויין',
  //     ShomerShabat: 2,
  //     Phone: '04-6968411',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?winery,vineyard',
  //   },

  //   {
  //     AttractionsId: 11,
  //     AttractionsName: 'טרקטורוני דישון',
  //     RegionId: 1,
  //     Address: 'מושב דישון',
  //     AttractionsTypeId: 3,
  //     Description: 'טיולי שטח',
  //     ShomerShabat: 1,
  //     Phone: '04-6983344',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?atv,offroad',
  //   },
  //   {
  //     AttractionsId: 12,
  //     AttractionsName: 'מוזיאון השעווה היהודי',
  //     RegionId: 7,
  //     Address: 'ירושלים',
  //     AttractionsTypeId: 17,
  //     Description: 'דמויות שעווה',
  //     ShomerShabat: 2,
  //     Phone: '02-5401122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?wax,museum',
  //   },
  //   {
  //     AttractionsId: 13,
  //     AttractionsName: 'סדנת יצירה צפת',
  //     RegionId: 1,
  //     Address: 'צפת',
  //     AttractionsTypeId: 32,
  //     Description: 'סדנת אמנות',
  //     ShomerShabat: 2,
  //     Phone: '050-4123456',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?art,workshop',
  //   },
  //   {
  //     AttractionsId: 14,
  //     AttractionsName: 'גן חיות חיפה',
  //     RegionId: 4,
  //     Address: '',
  //     AttractionsTypeId: 19,
  //     Description: 'גן חיות',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?zoo',
  //   },
  //   {
  //     AttractionsId: 15,
  //     AttractionsName: 'פארק החבלים אלון מורה',
  //     RegionId: 6,
  //     Address: 'אלון מורה',
  //     AttractionsTypeId: 29,
  //     Description: 'פארק חבלים',
  //     ShomerShabat: 2,
  //     Phone: '054-8451122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?ropes,park',
  //   },

  //   {
  //     AttractionsId: 16,
  //     AttractionsName: 'אומגה קו המים',
  //     RegionId: 1,
  //     Address: 'ראש הנקרה',
  //     AttractionsTypeId: 24,
  //     Description: 'אומגה לים',
  //     ShomerShabat: 1,
  //     Phone: '04-9852233',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?zipline,sea',
  //   },
  //   {
  //     AttractionsId: 17,
  //     AttractionsName: 'סדנת שוקולד כפר תבור',
  //     RegionId: 3,
  //     Address: 'כפר תבור',
  //     AttractionsTypeId: 33,
  //     Description: 'שוקולד',
  //     ShomerShabat: 2,
  //     Phone: '04-6761122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?chocolate,workshop',
  //   },
  //   {
  //     AttractionsId: 18,
  //     AttractionsName: "שיט טורנדו חסדי ה'",
  //     RegionId: 2,
  //     Address: 'טבריה',
  //     AttractionsTypeId: 7,
  //     Description: 'שיט מהיר',
  //     ShomerShabat: 2,
  //     Phone: '050-7701144',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?speedboat',
  //   },
  //   {
  //     AttractionsId: 19,
  //     AttractionsName: 'באולינג קניון לב חדרה',
  //     RegionId: 5,
  //     Address: 'חדרה',
  //     AttractionsTypeId: 27,
  //     Description: 'באולינג',
  //     ShomerShabat: 1,
  //     Phone: '04-6325511',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?bowling',
  //   },
  //   {
  //     AttractionsId: 20,
  //     AttractionsName: 'סדנת אפייה בני ברק',
  //     RegionId: 5,
  //     Address: 'בני ברק',
  //     AttractionsTypeId: 34,
  //     Description: 'אפייה',
  //     ShomerShabat: 2,
  //     Phone: '03-5702211',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?baking,bread',
  //   },

  //   {
  //     AttractionsId: 21,
  //     AttractionsName: 'פארק הירקון',
  //     RegionId: 5,
  //     Address: '',
  //     AttractionsTypeId: 39,
  //     Description: 'פארק עירוני',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?park,city',
  //   },
  //   {
  //     AttractionsId: 22,
  //     AttractionsName: 'קטיף קטיפה',
  //     RegionId: 6,
  //     Address: 'גוש עציון',
  //     AttractionsTypeId: 22,
  //     Description: 'קטיף עצמי',
  //     ShomerShabat: 2,
  //     Phone: '02-9933112',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?fruit,orchard',
  //   },
  //   {
  //     AttractionsId: 23,
  //     AttractionsName: 'סיור סגווי נמל יפו',
  //     RegionId: 5,
  //     Address: 'תל אביב',
  //     AttractionsTypeId: 31,
  //     Description: 'סגווי',
  //     ShomerShabat: 1,
  //     Phone: '03-6811122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?segway',
  //   },
  //   {
  //     AttractionsId: 24,
  //     AttractionsName: 'חוף נפרד אשדוד',
  //     RegionId: 5,
  //     Address: 'אשדוד',
  //     AttractionsTypeId: 13,
  //     Description: 'חוף ים',
  //     ShomerShabat: 2,
  //     Phone: '08-8545111',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?beach',
  //   },
  //   {
  //     AttractionsId: 25,
  //     AttractionsName: 'קארטינג מהדרין ירושלים',
  //     RegionId: 7,
  //     Address: 'ירושלים',
  //     AttractionsTypeId: 3,
  //     Description: 'קארטינג',
  //     ShomerShabat: 2,
  //     Phone: '02-6722211',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?karting',
  //   },

  //   {
  //     AttractionsId: 26,
  //     AttractionsName: 'סיור מודרך חברון',
  //     RegionId: 6,
  //     Address: 'חברון',
  //     AttractionsTypeId: 31,
  //     Description: 'סיור היסטורי במערת המכפלה והיישוב היהודי',
  //     ShomerShabat: 2,
  //     Phone: '02-9961122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?hebron,history,tour',
  //   },
  //   {
  //     AttractionsId: 27,
  //     AttractionsName: 'משחקיית פעלטון גבעתיים',
  //     RegionId: 5,
  //     Address: 'גבעתיים',
  //     AttractionsTypeId: 28,
  //     Description: 'משחקייה לילדים',
  //     ShomerShabat: 1,
  //     Phone: '03-7311144',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?indoor,playground,kids',
  //   },
  //   {
  //     AttractionsId: 28,
  //     AttractionsName: 'פארק מים שפיים',
  //     RegionId: 5,
  //     Address: 'שפיים',
  //     AttractionsTypeId: 10,
  //     Description: 'פארק מים גדול',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?waterpark,slides',
  //   },
  //   {
  //     AttractionsId: 29,
  //     AttractionsName: "מרכז המבקרים השל''ה הקדוש",
  //     RegionId: 1,
  //     Address: 'טבריה',
  //     AttractionsTypeId: 18,
  //     Description: 'סיור תורני ומיצג אורקולי',
  //     ShomerShabat: 2,
  //     Phone: '04-6712233',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?museum,history,exhibit',
  //   },
  //   {
  //     AttractionsId: 30,
  //     AttractionsName: 'סדנת סת"ם וקלף בצפת',
  //     RegionId: 1,
  //     Address: 'צפת',
  //     AttractionsTypeId: 32,
  //     Description: 'כתיבת אותיות סת"ם',
  //     ShomerShabat: 2,
  //     Phone: '054-8415566',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?calligraphy,scroll,ink',
  //   },
  //   {
  //     AttractionsId: 31,
  //     AttractionsName: 'חדר בריחה המעבדה',
  //     RegionId: 4,
  //     Address: 'חיפה',
  //     AttractionsTypeId: 26,
  //     Description: 'חדר בריחה טכנולוגי',
  //     ShomerShabat: 1,
  //     Phone: '04-8421155',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?escape-room,laboratory',
  //   },
  //   {
  //     AttractionsId: 32,
  //     AttractionsName: 'פארק אקסטרים עכו',
  //     RegionId: 1,
  //     Address: 'עכו',
  //     AttractionsTypeId: 29,
  //     Description: 'פארק חבלים ואומגות',
  //     ShomerShabat: 2,
  //     Phone: '04-9551144',
  //     ImageUrl:
  //       'https://source.unsplash.com/800x600/?ropes-course,adventure-park',
  //   },
  //   {
  //     AttractionsId: 33,
  //     AttractionsName: 'חדר בריחה קודש וחול',
  //     RegionId: 5,
  //     Address: 'רמת גן',
  //     AttractionsTypeId: 26,
  //     Description: 'חדר בריחה היסטורי',
  //     ShomerShabat: 2,
  //     Phone: '03-6162255',
  //     ImageUrl:
  //       'https://source.unsplash.com/800x600/?escape-room,puzzle,history',
  //   },
  //   {
  //     AttractionsId: 34,
  //     AttractionsName: 'סירות פדלים פארק רעננה',
  //     RegionId: 5,
  //     Address: 'רעננה',
  //     AttractionsTypeId: 9,
  //     Description: 'שייט רגוע באגם',
  //     ShomerShabat: 1,
  //     Phone: '09-7711122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?pedal-boat,lake,park',
  //   },
  //   {
  //     AttractionsId: 35,
  //     AttractionsName: 'מוזיאון חצר הישוב הישן',
  //     RegionId: 7,
  //     Address: 'ירושלים',
  //     AttractionsTypeId: 17,
  //     Description: 'חיי יהודים בירושלים העתיקה',
  //     ShomerShabat: 2,
  //     Phone: '02-6284636',
  //     ImageUrl:
  //       'https://source.unsplash.com/800x600/?old-city,jerusalem,museum',
  //   },

  //   {
  //     AttractionsId: 36,
  //     AttractionsName: 'פינת חי חסדי יוסף',
  //     RegionId: 9,
  //     Address: 'נתיבות',
  //     AttractionsTypeId: 20,
  //     Description: 'פינת ליטוף חיות',
  //     ShomerShabat: 2,
  //     Phone: '08-9941122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?petting-zoo,animals,kids',
  //   },
  //   {
  //     AttractionsId: 37,
  //     AttractionsName: "טיול ריינג'רים בנוף הגליל",
  //     RegionId: 3,
  //     Address: 'נוף הגליל',
  //     AttractionsTypeId: 4,
  //     Description: 'רכבי שטח בנופים',
  //     ShomerShabat: 1,
  //     Phone: '04-6522233',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?atv,offroad,mountain',
  //   },
  //   {
  //     AttractionsId: 38,
  //     AttractionsName: 'מרכז מבקרים לחם תושיה',
  //     RegionId: 5,
  //     Address: 'בני ברק',
  //     AttractionsTypeId: 18,
  //     Description: 'אפיית חלות וסיור',
  //     ShomerShabat: 2,
  //     Phone: '03-6192244',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?bakery,bread,workshop',
  //   },
  //   {
  //     AttractionsId: 39,
  //     AttractionsName: 'טיולי אופניים במירון',
  //     RegionId: 1,
  //     Address: 'מירון',
  //     AttractionsTypeId: 6,
  //     Description: 'מסלולי אופניים',
  //     ShomerShabat: 2,
  //     Phone: '04-6992233',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?bicycle,trail,forest',
  //   },
  //   {
  //     AttractionsId: 40,
  //     AttractionsName: 'חוות התוכים והאטרקציות',
  //     RegionId: 5,
  //     Address: 'כפר הס',
  //     AttractionsTypeId: 20,
  //     Description: 'תוכים וחיות',
  //     ShomerShabat: 1,
  //     Phone: '09-7961122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?parrots,birds',
  //   },

  //   {
  //     AttractionsId: 41,
  //     AttractionsName: 'חוויית השופר קצרין',
  //     RegionId: 2,
  //     Address: 'קצרין',
  //     AttractionsTypeId: 32,
  //     Description: 'סדנת שופרות',
  //     ShomerShabat: 2,
  //     Phone: '054-8412345',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?shofar,ram,horn',
  //   },
  //   {
  //     AttractionsId: 42,
  //     AttractionsName: 'מרכז קוקה קולה',
  //     RegionId: 5,
  //     Address: 'בני ברק',
  //     AttractionsTypeId: 18,
  //     Description: 'סיור מפעל משקאות',
  //     ShomerShabat: 2,
  //     Phone: '03-5771122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?factory,soda,production',
  //   },
  //   {
  //     AttractionsId: 43,
  //     AttractionsName: 'קטיף בוסתן בראשית',
  //     RegionId: 2,
  //     Address: 'עין זיוון',
  //     AttractionsTypeId: 22,
  //     Description: 'קטיף דובדבנים',
  //     ShomerShabat: 1,
  //     Phone: '04-6993355',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?cherry,orchard,fruit',
  //   },
  //   {
  //     AttractionsId: 44,
  //     AttractionsName: 'חוויה תת-ימית באילת',
  //     RegionId: 10,
  //     Address: 'אילת',
  //     AttractionsTypeId: 7,
  //     Description: 'שייט זכוכית',
  //     ShomerShabat: 2,
  //     Phone: '08-6371155',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?glass-boat,coral,reef',
  //   },
  //   {
  //     AttractionsId: 45,
  //     AttractionsName: 'פארק חבלים אשדוד',
  //     RegionId: 5,
  //     Address: 'אשדוד',
  //     AttractionsTypeId: 29,
  //     Description: 'חבלים ואומגות',
  //     ShomerShabat: 1,
  //     Phone: '08-8541155',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?ropes-course,climbing',
  //   },

  //   {
  //     AttractionsId: 46,
  //     AttractionsName: 'מרכז שמן זית',
  //     RegionId: 3,
  //     Address: 'גבעת אבני',
  //     AttractionsTypeId: 18,
  //     Description: 'בית בד',
  //     ShomerShabat: 2,
  //     Phone: '04-6731122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?olive-oil,press',
  //   },
  //   {
  //     AttractionsId: 47,
  //     AttractionsName: 'מוזיאון המדע תל אביב',
  //     RegionId: 5,
  //     Address: 'תל אביב',
  //     AttractionsTypeId: 17,
  //     Description: 'ניסויים מדעיים',
  //     ShomerShabat: 1,
  //     Phone: '03-6401144',
  //     ImageUrl:
  //       'https://source.unsplash.com/800x600/?science,museum,interactive',
  //   },
  //   {
  //     AttractionsId: 48,
  //     AttractionsName: 'סדנת זכוכית אמנותית',
  //     RegionId: 1,
  //     Address: 'צפת',
  //     AttractionsTypeId: 32,
  //     Description: 'עבודת זכוכית',
  //     ShomerShabat: 2,
  //     Phone: '052-6123456',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?glass-art,fire,studio',
  //   },
  //   {
  //     AttractionsId: 49,
  //     AttractionsName: 'באולינג באר שבע',
  //     RegionId: 9,
  //     Address: 'באר שבע',
  //     AttractionsTypeId: 27,
  //     Description: 'באולינג',
  //     ShomerShabat: 1,
  //     Phone: '08-6411122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?bowling,lanes',
  //   },
  //   {
  //     AttractionsId: 50,
  //     AttractionsName: 'פארק המזרקות רמת גן',
  //     RegionId: 5,
  //     Address: 'רמת גן',
  //     AttractionsTypeId: 39,
  //     Description: 'פארק מים',
  //     ShomerShabat: 2,
  //     Phone: '03-6311122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?fountain,park,water',
  //   },

  //   {
  //     AttractionsId: 51,
  //     AttractionsName: 'אקווה כיף',
  //     RegionId: 2,
  //     Address: 'טבריה',
  //     AttractionsTypeId: 10,
  //     Description: 'פארק מים צף',
  //     ShomerShabat: 1,
  //     Phone: '04-6701122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?floating-water-park',
  //   },
  //   {
  //     AttractionsId: 52,
  //     AttractionsName: 'ידיעות אחרונות מרכז מבקרים',
  //     RegionId: 5,
  //     Address: 'ראשון לציון',
  //     AttractionsTypeId: 18,
  //     Description: 'עיתונות והדפסה',
  //     ShomerShabat: 2,
  //     Phone: '03-9522111',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?printing,press,newspaper',
  //   },
  //   {
  //     AttractionsId: 53,
  //     AttractionsName: "איי ג'אמפ",
  //     RegionId: 5,
  //     Address: 'פתח תקווה',
  //     AttractionsTypeId: 25,
  //     Description: 'טרמפולינות',
  //     ShomerShabat: 1,
  //     Phone: '03-9211155',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?trampoline,park',
  //   },
  //   {
  //     AttractionsId: 54,
  //     AttractionsName: 'פארק מים מאליבו',
  //     RegionId: 2,
  //     Address: '',
  //     AttractionsTypeId: 10,
  //     Description: 'מתקני מים',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?water,park',
  //   },
  //   {
  //     AttractionsId: 55,
  //     AttractionsName: 'מורשת גוש עציון',
  //     RegionId: 6,
  //     Address: 'כפר עציון',
  //     AttractionsTypeId: 17,
  //     Description: 'מורשת היסטורית',
  //     ShomerShabat: 2,
  //     Phone: '02-9935111',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?history,center,museum',
  //   },

  //   {
  //     AttractionsId: 56,
  //     AttractionsName: 'לייזר טאג אקסטרים',
  //     RegionId: 5,
  //     Address: 'נתניה',
  //     AttractionsTypeId: 3,
  //     Description: 'לייזר טאג',
  //     ShomerShabat: 1,
  //     Phone: '09-8651122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?laser-tag,arena',
  //   },
  //   {
  //     AttractionsId: 57,
  //     AttractionsName: 'קטאמרן עכו',
  //     RegionId: 1,
  //     Address: 'עכו',
  //     AttractionsTypeId: 7,
  //     Description: 'שייט',
  //     ShomerShabat: 1,
  //     Phone: '04-9911133',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?catamaran,sailing,sea',
  //   },
  //   {
  //     AttractionsId: 58,
  //     AttractionsName: 'מרכז חלב ודבש',
  //     RegionId: 3,
  //     Address: 'עמק יזרעאל',
  //     AttractionsTypeId: 18,
  //     Description: 'דבש וכוורות',
  //     ShomerShabat: 2,
  //     Phone: '04-6511144',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?bees,honey,farm',
  //   },
  //   {
  //     AttractionsId: 59,
  //     AttractionsName: 'פארק חבלים רעננה',
  //     RegionId: 5,
  //     Address: 'רעננה',
  //     AttractionsTypeId: 29,
  //     Description: 'חבלים',
  //     ShomerShabat: 1,
  //     Phone: '09-7411133',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?ropes-course,park',
  //   },
  //   {
  //     AttractionsId: 60,
  //     AttractionsName: 'לונה גל',
  //     RegionId: 2,
  //     Address: '',
  //     AttractionsTypeId: 10,
  //     Description: 'פארק מים',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?waterpark,slides',
  //   },

  //   {
  //     AttractionsId: 61,
  //     AttractionsName: 'סיירת ניווט ירושלים',
  //     RegionId: 7,
  //     Address: 'ירושלים',
  //     AttractionsTypeId: 31,
  //     Description: 'ניווט עירוני',
  //     ShomerShabat: 2,
  //     Phone: '02-5633322',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?navigation,city,team',
  //   },
  //   {
  //     AttractionsId: 62,
  //     AttractionsName: 'סופרלנד',
  //     RegionId: 5,
  //     Address: 'ראשון לציון',
  //     AttractionsTypeId: 29,
  //     Description: 'פארק שעשועים',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?amusement-park,rides',
  //   },
  //   {
  //     AttractionsId: 63,
  //     AttractionsName: 'קארטינג חיפה',
  //     RegionId: 4,
  //     Address: 'חיפה',
  //     AttractionsTypeId: 3,
  //     Description: 'קארטינג',
  //     ShomerShabat: 1,
  //     Phone: '04-8411166',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?go-kart,racing',
  //   },
  //   {
  //     AttractionsId: 64,
  //     AttractionsName: 'מוזיאון השריון',
  //     RegionId: 6,
  //     Address: 'לטרון',
  //     AttractionsTypeId: 17,
  //     Description: 'טנקים',
  //     ShomerShabat: 1,
  //     Phone: '08-9251122',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?tank,museum',
  //   },
  //   {
  //     AttractionsId: 65,
  //     AttractionsName: 'טכנודע',
  //     RegionId: 3,
  //     Address: 'חדרה',
  //     AttractionsTypeId: 32,
  //     Description: 'מדע לילדים',
  //     ShomerShabat: 2,
  //     Phone: '04-6333111',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?science,kids,laboratory',
  //   },

  //   {
  //     AttractionsId: 66,
  //     AttractionsName: 'ימית 2000',
  //     RegionId: 5,
  //     Address: '',
  //     AttractionsTypeId: 10,
  //     Description: 'פארק מים',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?water-slides,pool',
  //   },
  //   {
  //     AttractionsId: 67,
  //     AttractionsName: 'שטראוס מרכז מבקרים',
  //     RegionId: 1,
  //     Address: 'כרמיאל',
  //     AttractionsTypeId: 18,
  //     Description: 'מפעל מזון',
  //     ShomerShabat: 2,
  //     Phone: '04-9888111',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?food,factory,production',
  //   },
  //   {
  //     AttractionsId: 68,
  //     AttractionsName: 'האינפקציה חדר בריחה',
  //     RegionId: 5,
  //     Address: 'תל אביב',
  //     AttractionsTypeId: 26,
  //     Description: 'חדר בריחה קבוצתי',
  //     ShomerShabat: 1,
  //     Phone: '03-6200011',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?escape-room,team',
  //   },
  //   {
  //     AttractionsId: 69,
  //     AttractionsName: 'שייט זכוכית אילת',
  //     RegionId: 10,
  //     Address: 'אילת',
  //     AttractionsTypeId: 7,
  //     Description: 'שייט',
  //     ShomerShabat: 1,
  //     Phone: '08-6333155',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?glass-boat,reef,sea',
  //   },
  //   {
  //     AttractionsId: 70,
  //     AttractionsName: 'פארק חולות',
  //     RegionId: 9,
  //     Address: '',
  //     AttractionsTypeId: 39,
  //     Description: 'פארק טבע',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?desert,sand,nature',
  //   },

  //   {
  //     AttractionsId: 71,
  //     AttractionsName: 'מרכז חלוציות',
  //     RegionId: 9,
  //     Address: 'חבל לכיש',
  //     AttractionsTypeId: 17,
  //     Description: 'פעילות שטח',
  //     ShomerShabat: 2,
  //     Phone: '08-6811144',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?field,students,activity',
  //   },
  //   {
  //     AttractionsId: 72,
  //     AttractionsName: 'ספארי רמת גן',
  //     RegionId: 5,
  //     Address: '',
  //     AttractionsTypeId: 19,
  //     Description: 'ספארי',
  //     ShomerShabat: 0,
  //     Phone: '',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?safari,animals',
  //   },
  //   {
  //     AttractionsId: 73,
  //     AttractionsName: 'קיר טיפוס הסלע',
  //     RegionId: 7,
  //     Address: 'ירושלים',
  //     AttractionsTypeId: 25,
  //     Description: 'טיפוס',
  //     ShomerShabat: 2,
  //     Phone: '02-6711155',
  //     ImageUrl: 'https://source.unsplash.com/800x600/?climbing,bouldering',
  //   }
  //   
  // ];
  GetAttractions() {
    // return this.mock_Attractions;
    const baseUrl = 'https://localhost:7098/Attractions';
    return this.http.get<int_Attractions[]>(baseUrl);
  }

  // GetTypeByNumber(AttractionsTypeId: number): string {
  //   const baseUrl = `https://localhost:7098/Attractions/${AttractionsTypeId}`;
  //   return this.http.get<string>(baseUrl);

  // }

  //  GetTypeByNumber(AttractionsTypeId: number): Observable<string> {
  //       const baseUrl = `https://localhost:7098/Attractions/${AttractionsTypeId}`;
  //       return this.http.get<string>(baseUrl);
  //   }

  getAttractionTypes() {
    const baseUrl = 'https://localhost:7098/Attractions/types';
    return this.http.get<any>(baseUrl).pipe(
      tap((data: any) => console.log('Attraction types:', data)), // לוג של המידע המוחזר
    );
  }

  // UpdateAttraction(Attraction: int_Attractions) {
  //   var atrc = this.mock_Attractions.find(
  //     a => a.attractionId == Attraction.attractionId,
  //   );
  //   if (atrc) {
  //     atrc.address = Attraction.address;
  //     atrc.description = Attraction.description;
  //     atrc.attractionsName = Attraction.attractionsName;
  //     atrc.attractionTypeId = Attraction.attractionTypeId;
  //     // atrc.ImageUrl = Attraction.ImageUrl;
  //     atrc.phone = Attraction.phone;
  //     atrc.reigionId = Attraction.reigionId;
  //     atrc.shomerShabat = Attraction.shomerShabat;
  //   }
  // }

  UpdateAttraction(attraction: int_Attractions): Observable<void> {
    console.log(attraction);
    return this.http
      .put<void>(
        `https://localhost:7098/Attractions/${attraction.attractionId}`,
        attraction,
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating attraction:', error);
          // פה תוכל להראות שגיאה למשתמש או לעשות משהו אחר
          return of(); // מחזיר Observable ריק במקרה של שגיאה
        }),
      );
  }
    AddNewAttraction(attraction: int_Attractions): Observable<void> {
    console.log(attraction);
    return this.http
      .post<void>(
        `https://localhost:7098/Attractions/new`,
        attraction,
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating attraction:', error);
          // פה תוכל להראות שגיאה למשתמש או לעשות משהו אחר
          return of(); // מחזיר Observable ריק במקרה של שגיאה
        }),
      );
  }


  deleteAttraction(atractionId : number){
        return this.http
      .delete<void>(
        `https://localhost:7098/Attractions/${atractionId}`,
        
      )
      .pipe(
        catchError((error) => {
          console.error('בעיה במחיקת אטרקציה:', error);
          // פה תוכל להראות שגיאה למשתמש או לעשות משהו אחר
          return of(); // מחזיר Observable ריק במקרה של שגיאה
        }),
      );
  }

  //   UpdateAttraction(attraction: int_Attractions): Observable<void> {
  //     console.log(attraction)
  //    return this.http.put<void>(`https://localhost:7098/Attractions/${attraction.attractionId}`, attraction);
  // }

  getAttractionById(AttractionsId: number) {
    var a = this.mock_Attractions.find((a) => a.attractionId == AttractionsId);
    console.log(a);
    return a;
  }
}
