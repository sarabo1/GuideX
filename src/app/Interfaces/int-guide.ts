/**
 * תשובת GET /all_guide מהשרת (GuideDetailDTO) — פרטי מדריכה מלאים.
 * השדות תואמים ל-GuideDetailDTO שבצד השרת.
 */
export interface Int_Guide {
  GuideId: number;
  UserId: number;
  FirstName: string;
  LastName: string;
  IdNumber: string;
  City: string;
  PhoneNumber: string;
  Email: string;
  ReligiousId: number;
  /** אזורי ההתמחות של המדריכה (RegionId). */
  RegionId: number[];
}

/** פריט קובץ בתשובת השרת — המטא-דאטה בלבד (שם, סוג, מזהה, גודל). */
export interface GuideFileDto {
  GuideFileId: number;
  FileName: string;
  ContentType: string;
  /** "Cv" / "Certificate". */
  Kind: string;
  Size: number;
}

/**
 * תוכן טופס ההרשמה שנשלח ל-POST /all_guide/register (multipart/form-data).
 * השדות תואמים ל-GuideUploadDto שבצד השרת. השרת מקבל כאן את ALL הנתונים —
 * פרטי המשתמש + פרטי המדריך (עדה, אזורי התמחות) + קבצים — ויוצר/מעדכן
 * את ה-User וה-Guide ב-SQL.
 */
export interface GuideRegistrationPayload {
  /** מזהה העדה (ReligiousId). */
  ReligiousId: number;

  /**
   * "המקומות שהיא מדריכה בהם" — אזורי ההתמחות (RegionIds), ערכים מרובים.
   * תואם לשדה RegionIds שב-GuideUploadDto.
   */
  RegionIds: number[];

  /** ── פרטי המשתמש (מהם השרת יוצר/מעדכן את ה-User) ── */
  FirstName: string;
  LastName: string;
  IdNumber: string;
  /** שם העיר (string) — תואם ל-User.City. */
  City: string;
  PhoneNumber: string;
  Email: string;
  UserPassword: string;

  /** קורות חיים (קובץ אחד אופציונלי). */
  ResumeFile?: File | null;

  /** קבצי תעודות (קובצים מרובים אופציונליים). */
  CertificateFiles?: File[];
}
