import { Injectable } from '@angular/core';
import { int_ForumMessage } from '../Interfaces/int_ForumMessage';

@Injectable({
  providedIn: 'root'
})
export class SrvForumMessageService {



  mock_ForumMessage: int_ForumMessage[] = [
{
  ForumId: 1,
  UserId: 1,
  Date: new Date("2026-06-20"),
  ParentForumId: 0,
  Title: "אירוח מוצלח באכסניה לקבוצת סמינר",
  Message: "יצאנו עם כ-80 תלמידות לשני ימי טיול בצפון והתארחנו באכסניה מותאמת לציבור החרדי. החדרים היו נקיים, אזורי ההתכנסות מרווחים, והצוות היה זמין לכל בקשה. היה חדר אוכל מסודר לקבוצות גדולות ואפשרות לקיום פעילות ערב באולם סגור. ממליצה מאוד למנהלות טיולים שמחפשות פתרון לינה מאורגן ונוח.",
  ForumTypeId: 1
},
{
  ForumId: 2,
  UserId: 2,
  Date: new Date("2026-06-21"),
  ParentForumId: 1,
  Title: "תגובה - גם אנחנו התארחנו שם",
  Message: "גם אנחנו היינו במקום עם קבוצת בנות. במיוחד התרשמנו מההתארגנות המהירה בקבלת החדרים ומהיחס המכבד לצרכים של המוסד. מומלץ לתאם מראש את זמני הארוחות כדי למנוע עומסים.",
  ForumTypeId: 1
},
{
  ForumId: 3,
  UserId: 3,
  Date: new Date("2026-06-10"),
  ParentForumId: 0,
  Title: "מדריכה מצוינת לטיולים חינוכיים",
  Message: "שכרנו מדריכה מקצועית ליום סיור בירושלים. היא שילבה תוכן ערכי, סיפורים מרתקים והפעלות מותאמות לגיל התלמידות. הקבוצה הייתה מרותקת לאורך כל היום והצוות החינוכי קיבל משוב חיובי מאוד מהמשתתפות.",
  ForumTypeId: 1
},
{
  ForumId: 4,
  UserId: 4,
  Date: new Date("2026-05-15"),
  ParentForumId: 0,
  Title: "פארק גדול שמתאים לפעילות מוסדות",
  Message: "קיימנו יום גיבוש בפארק רחב ידיים עם מדשאות, הצללות ושולחנות ישיבה. המקום אפשר חלוקה לקבוצות לצורך תחנות פעילות והיה נוח מאוד גם מבחינת הגעה לאוטובוסים וחניה.",
  ForumTypeId: 1
},
{
  ForumId: 5,
  UserId: 5,
  Date: new Date("2026-04-18"),
  ParentForumId: 4,
  Title: "שאלה לגבי הפארק",
  Message: "האם יש במקום אזור מקורה למקרה של מזג אוויר חם במיוחד? אנחנו מתכננים להגיע עם כ-120 תלמידות ומחפשים מקום שיש בו גם אפשרות לכינוס גדול.",
  ForumTypeId: 1
},
{
  ForumId: 6,
  UserId: 6,
  Date: new Date("2026-06-02"),
  ParentForumId: 0,
  Title: "מרכז מבקרים שהפתיע אותנו",
  Message: "במסגרת טיול שנתי ביקרנו במרכז מבקרים שהציע סיור מודרך, מצגות אינטראקטיביות ופעילויות לקבוצות. הארגון היה ברמה גבוהה מאוד והזמן עבר במהירות. מומלץ להזמין מקום מספר שבועות מראש.",
  ForumTypeId: 1
},
{
  ForumId: 7,
  UserId: 7,
  Date: new Date("2026-03-20"),
  ParentForumId: 0,
  Title: "מחפשת מסלול מתאים ל-50 תלמידות",
  Message: "אשמח להמלצות על מסלול קל יחסית עם צל, מקומות ישיבה ואפשרות לשלב תוכן חינוכי במהלך ההליכה. חשוב שתהיה גישה נוחה לאוטובוסים.",
  ForumTypeId: 2
},
{
  ForumId: 8,
  UserId: 8,
  Date: new Date("2026-03-21"),
  ParentForumId: 7,
  Title: "תגובה - מסלול שהתאים לנו",
  Message: "אנחנו היינו במסלול מעגלי באורך כשעתיים שכלל פינות עצירה רבות. השילוב של הליכה קלה ותצפיות מעניינות עבד מצוין עם תלמידות חטיבה ותיכון.",
  ForumTypeId: 2
},
{
  ForumId: 9,
  UserId: 9,
  Date: new Date("2026-05-12"),
  ParentForumId: 0,
  Title: "כיצד לבחור חברת הסעות לטיול?",
  Message: "אשמח לשמוע מניסיון של מוסדות אחרים אילו פרטים חשוב לבדוק מול חברת ההסעות לפני סגירת הזמנה. האם אתם מקפידים על פגישת תיאום מוקדמת?",
  ForumTypeId: 2
},
{
  ForumId: 10,
  UserId: 10,
  Date: new Date("2026-05-30"),
  ParentForumId: 0,
  Title: "רעיונות לפעילות ערב באכסניה",
  Message: "מחפשת רעיונות לפעילות ערכית ומהנה שניתן להעביר לאחר יום טיול ארוך. רצוי פעילות שאינה דורשת ציוד מורכב ומתאימה לקבוצה גדולה.",
  ForumTypeId: 2
},
{
  ForumId: 11,
  UserId: 1,
  Date: new Date("2026-06-01"),
  ParentForumId: 10,
  Title: "תגובה - ערב תחנות",
  Message: "אנחנו קיימנו ערב תחנות עם משימות קבוצתיות, חידונים ותחרויות. הפעילות יצרה שיתוף פעולה מצוין בין התלמידות ודרשה ציוד מינימלי בלבד.",
  ForumTypeId: 2
},
{
  ForumId: 12,
  UserId: 2,
  Date: new Date("2026-04-22"),
  ParentForumId: 0,
  Title: "התנהלות מול אתר הדורש הרשמה מוקדמת",
  Message: "כמה זמן מראש מומלץ לבצע הרשמה לקבוצות גדולות? נתקלנו במספר מקומות שבהם לא נשארו מקומות פנויים בגלל הרשמה מאוחרת.",
  ForumTypeId: 2
},
{
  ForumId: 13,
  UserId:3,
  Date: new Date("2026-06-23"),
  ParentForumId: 0,
  Title: "נהלי בטיחות לקבוצה גדולה",
  Message: "בטיול האחרון חילקנו את המשתתפות לקבוצות משנה כאשר לכל קבוצה אחראית קבועה. בנוסף ביצענו ספירת נוכחות בכל נקודת עצירה. ההתנהלות הזו תרמה רבות לסדר ולבטיחות.",
  ForumTypeId: 3
},
{
  ForumId: 14,
  UserId: 4,
  Date: new Date("2026-06-24"),
  ParentForumId: 13,
  Title: "תגובה - שיטת הזיהוי שלנו",
  Message: "אנחנו משתמשים בצמידים בצבעים שונים לכל קבוצה. הדבר מסייע מאוד בזיהוי מהיר של משתתפות ובשמירה על מסגרת מסודרת לאורך היום.",
  ForumTypeId: 3
},
{
  ForumId: 15,
  UserId: 5,
  Date: new Date("2026-04-03"),
  ParentForumId: 0,
  Title: "בדיקת מזג אוויר לפני יציאה",
  Message: "חשוב לבדוק תחזיות עדכניות גם בערב שלפני הטיול וגם בבוקר היציאה. במקרים של עומס חום או תנאי מזג אוויר חריגים כדאי לשקול התאמות במסלול.",
  ForumTypeId: 3
},
{
  ForumId: 16,
  UserId: 6,
  Date: new Date("2026-04-14"),
  ParentForumId: 0,
  Title: "התנהלות נכונה ביום חם",
  Message: "מומלץ להתחיל מוקדם, לתכנן עצירות שתייה קבועות, להקפיד על כובעים ולצמצם הליכה בשעות החמות. בטיולים גדולים חשוב למנות אחראית שתפקידה לוודא שכולם שותים באופן מסודר.",
  ForumTypeId: 3
},
{
  ForumId: 17,
  UserId: 7,
  Date: new Date("2026-05-05"),
  ParentForumId: 0,
  Title: "ציוד עזרה ראשונה לקבוצה",
  Message: "מהניסיון שלנו כדאי להחזיק מספר ערכות עזרה ראשונה ולא להסתפק בערכה אחת בלבד. כך ניתן לתת מענה מהיר גם כאשר הקבוצה מפוזרת לאורך המסלול.",
  ForumTypeId: 3
},
{
  ForumId: 18,
  UserId: 8,
  Date: new Date("2026-05-06"),
  ParentForumId: 17,
  Title: "תגובה - חלוקת ציוד בין הצוות",
  Message: "אצלנו כל מדריכה נושאת ציוד בסיסי, בנוסף לערכה מרכזית שנמצאת אצל האחראית הראשית. הדבר חוסך זמן במקרה של צורך במענה מהיר.",
  ForumTypeId: 3
},
{
  ForumId: 19,
  UserId: 9,
  Date: new Date("2026-06-11"),
  ParentForumId: 0,
  Title: "לינה לקבוצות גדולות באזור הצפון",
  Message: "חיפשנו מקום שיכול להכיל מעל 100 משתתפות. מצאנו מתחם מסודר עם חדרי אירוח, שטחי כינוס ומרחבים לפעילות חברתית. היתרון הגדול היה שכל הקבוצה נשארה במתחם אחד ללא פיצול.",
  ForumTypeId: 1
},
{
  ForumId: 20,
  UserId: 2,
  Date: new Date("2026-06-12"),
  ParentForumId: 19,
  Title: "שאלה לגבי המתחם",
  Message: "האם המקום מאפשר שימוש באולמות לפעילות ערב? בנוסף אשמח לדעת אם יש אזור מוצל מספיק להתכנסות במהלך שעות היום.",
  ForumTypeId: 1
},
{
  ForumId: 21,
  UserId: 1,
  Date: new Date("2026-06-18"),
  ParentForumId: 0,
  Title: "המלצה על יום גיבוש משולב אטרקציות",
  Message: "שילבנו בטיול תחנות אתגר, סיור מודרך ופעילות קבוצתית מסכמת. המבנה הזה שמר על עניין לאורך כל היום והתאים מאוד לקבוצות גדולות של תלמידות.",
  ForumTypeId: 1
},
{
  ForumId: 22,
  UserId: 2,
  Date: new Date("2026-06-19"),
  ParentForumId: 21,
  Title: "תגובה - מבנה יום דומה",
  Message: "גם אצלנו יום שמחולק למספר פעילויות קצרות הצליח הרבה יותר מאשר פעילות אחת ארוכה. התלמידות נשארו מעורבות וקשובות לאורך כל המסלול.",
  ForumTypeId: 1
}
];


getAllMessages(){
  return this.mock_ForumMessage;
}
  getAllMessageByForumType(type : number){
    return this.mock_ForumMessage.filter(f => f.ForumTypeId == type)
  }
   GetLastForumId(): number {
    const forumIds = this.mock_ForumMessage.map((f) => f.ForumId);
    return Math.max(...forumIds);
  }
 getTitleByForumId(forumId: number): string | undefined {
    const forum = this.mock_ForumMessage.find(f => f.ForumId === forumId);
    return forum?.Title;
}
addNewForumMsg(userId: number, parentForumId: number, title: string, message: string, forumTypeId: number){
  const lastForum = this.GetLastForumId() + 1;
  this.mock_ForumMessage.push({
    ForumId: lastForum,
    UserId: userId,
    Date: new Date(),
    ParentForumId: parentForumId,
    Title: title,
    Message: message,
    ForumTypeId: forumTypeId,
  });
  console.log("ForumId: "+lastForum,
    "UserId:"+ userId,
    "Date: "+new Date(),
    "ParentForumId: "+ parentForumId,
    "Title: "+title ,
    "Message:"+ message,
    "ForumTypeId: "+forumTypeId,)
}

}
