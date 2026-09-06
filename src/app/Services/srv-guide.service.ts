import { Injectable } from '@angular/core';
import { GuideRegistrationPayload, Int_Guide } from '../Interfaces/int-guide';
import { HttpClient } from '@angular/common/http';
import { Observable, of, lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Srv_Guide {
  // המשתנה הבא נשמר לשם תאימות של מנגנוני חיפוש שבנויים כיום סביב mock בזיכרון.
  private mock_Guides: Int_Guide[] = [];

  // מסלול ה-API של הבק-אנד (GuideX, פורט 7098).
  // שים לב: ה-GuideController בשרת מוגדר עם Route("/all_[controller]") —
  // לכן הנתיב הוא /all_guide (ולא /api/Guide).
  private readonly baseUrl = 'https://localhost:7098/all_guide';

  constructor(private http: HttpClient) {}

  /** מחזיר את כל המדריכים מהשרת (GuideResponseDto). */
  GetGuides(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(catchError(() => of([])));
  }

  /** מחזיר את המספר הגבוה ביותר של GuideId שנשמר + 1 (ללא קריאה כשהשרת לא זמין → 1). */
  async GetLastGuideId(): Promise<number> {
    try {
      const guides: any[] = (await lastValueFrom(this.http.get<any[]>(this.baseUrl))) ?? [];
      const ids = guides.map((g) => g.GuideId);
      return ids.length ? Math.max(...ids) + 1 : 1;
    } catch {
      return 1;
    }
  }

  /**
   * שומר הרשמת מדריכה (User + Guide + קבצים) דרך POST /all_guide/register.
   * בונה FormData (multipart/form-data) לפי GuideUploadDto: פרטי משתמש +
   * ReligiousId + RegionIds ("המקומות שהיא מדריכה בהם") + ResumeFile +
   * CertificateFiles. מחזיר Observable של התשובה הכוללת guideId וגם regionIds.
   */
  addGuide(payload: GuideRegistrationPayload): Observable<any> {
    const p = payload || ({} as GuideRegistrationPayload);
    const formData = new FormData();

    // ── פרטי משתמש (מהם השרת יוצר/מעדכן את ה-User) ──
    if (p.FirstName) formData.append('FirstName', p.FirstName);
    if (p.LastName) formData.append('LastName', p.LastName);
    if (p.IdNumber) formData.append('IdNumber', p.IdNumber);
    if (p.City) formData.append('City', p.City);
    if (p.PhoneNumber) formData.append('PhoneNumber', p.PhoneNumber);
    if (p.Email) formData.append('Email', p.Email);
    if (p.UserPassword) formData.append('UserPassword', p.UserPassword);

    // ── פרטי מדריך ──
    if (p.ReligiousId) formData.append('ReligiousId', String(p.ReligiousId));
    // "מקומות שהיא מדריכה בהם" — אזורי התמחות (ערכים מרובים)
    (p.RegionIds || []).forEach((r) =>
      formData.append('RegionIds', String(r)),
    );

    // ── קבצים ──
    if (p.ResumeFile) {
      formData.append('ResumeFile', p.ResumeFile, p.ResumeFile.name);
    }
    (p.CertificateFiles || []).forEach((file) =>
      formData.append('CertificateFiles', file, file.name),
    );

    return this.http.post<any>(`${this.baseUrl}/register`, formData).pipe(
      catchError((err) => {
        console.error('שגיאה בשמירת המדריך', err);
        return of(null);
      }),
    );
  }

  /** בודק אם קיים מדריך עבור userId (תאימות לתבנית הקיימת). */
  userExist(userId: number): boolean {
    return this.mock_Guides.some((g) => g.UserId === userId);
  }

  /** מחזיר (Observable) את המדריך שנמצא לפי userId — דרך השרת. */
  searchByUserId(userId: number): Observable<any | null> {
    return this.GetGuides().pipe(
      map((guides: any[]) => guides.find((g) => Number(g.UserId) === Number(userId)) ?? null),
    );
  }

  /** מחזיר את קבצי המדריך מהשרת לפי GuideId (Observable). */
  getGuideFiles(guideId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/files/${guideId}`).pipe(
      catchError(() => of([])),
    );
  }
}
