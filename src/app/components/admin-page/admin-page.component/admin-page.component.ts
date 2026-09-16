import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { Srv_Guide } from '../../../Services/srv-guide.service';
import { ServiceAllService } from '../../../Services/service-all.service';
import {
  Int_Guide,
  GuideFileDto,
  GuideWithFiles,
} from './int-guide';

/**
 * דף ניהול — אישור מדריכות חדשות.
 * מציג בכרטיסים את המדריכות שטרם אושרו (ערך אישור = false),
 * עם כל הנתונים שלהן כולל קורות חיים ותעודות, וכפתור אישור לכל אחת.
 * בלחיצה על הקובץ — הוא נפתח/מורד מהשרת (GET api/Guide/file/{id}).
 */
@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {
  /** המדריכות הממתינות לאישור + הקבצים שלהן. */
  data: GuideWithFiles[] = [];

  isLoading = true;
  /** הודעה במקרה של שגיאה בטעינה. */
  errorMessage = '';

  /** מזהה המדריכה שתהליך האישור שלה נמצא כעת בעיצומו (מונע לחיצות כפולות). */
  approvingGuideId: number | null = null;

  /** כל אזורי התמחות — להצגת שמות האזורים. */
  private availableAreas: { id: number; name: string }[] = [];
  /** שמות העדות לפי religiousId (מוטענים עד דרישה). */
  private religiousNames = new Map<number, string>();

  /** מפתח תשובת השרת שאוגר את מטא-הקבצים (GuideResponseDto.Files). */
  private readonly filesKey = 'Files';

  constructor(
    public srv_guide: Srv_Guide,
    public srv_all: ServiceAllService,
  ) {
    this.loadAreas();
    this.loadData();
  }

  /** שולף את שמות אזורי ההתמחות מהשרת. */
  private loadAreas() {
    this.srv_all.getRegionsArray().subscribe({
      next: (areas: any[]) => {
        this.availableAreas = (areas ?? []).map((a) => ({
          id: Number(a.regionId),
          name: a.regionName ?? '',
        }));
      },
      error: (err: any) => console.error('שגיאה בשליפת אזורי התמחות:', err),
    });
  }

  /** טוען את המדריכות שטרם אושרו, עם מטא-הקבצים שכבר מגיע בתשובה. */
  loadData() {
    this.isLoading = true;
    this.errorMessage = '';

    // false = רק מי שטרם אושרה (RetrieveApprovals=false — הקונטרולר מסנן לא-מאושרות).
    this.srv_guide.GetGuides(false).subscribe({
      next: (guides: any[]) => {
        this.data = (guides ?? []).map((g) => {
          const files = this.filesFromGuide(g);
          return { guide: g as Int_Guide, files };
        });
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('שגיאה בשליפת המדריכות הממתינות:', err);
        this.errorMessage = 'אירעה שגיאה בטעינת המדריכות. נא לנסות שוב.';
        this.isLoading = false;
      },
    });
  }

  /**
   * מחלץ את מטא-הקבצים (GuideFileDto) מתוך תשובת המדריכה.
   * השרת (GuideResponseDto) מחזיר את הקבצים בשדה "Files" עבור כל מדריכה,
   * כך שאין צורך בקריאה נפרדת — הקישורים נבנים ישירות מהמטא הזה.
   */
  private filesFromGuide(g: any): { fileName: string; kind: 'Cv' | 'Certificate'; url: string }[] {
    const files: GuideFileDto[] = Array.isArray(g?.[this.filesKey])
      ? (g[this.filesKey] as GuideFileDto[])
      : [];
    return files.map((f) => ({
      fileName: f.FileName ?? '',
      kind: f.Kind === 'Cv' ? 'Cv' : 'Certificate',
      url: this.fileUrl(f.GuideFileId),
    }));
  }

  /**
   * קישור לפתיחה/הורדה של קובץ — לפי המסלול האמיתי שקיים בשרת:
   * GuideController → GET api/Guide/file/{guideFileId}.
   */
  private fileUrl(guideFileId: number): string {
    return `https://localhost:7098/api/Guide/file/${guideFileId}`;
  }

  /** שם מלא של מדריכה. */
  fullName(g: Int_Guide): string {
    return `${g.firstName ?? ''} ${g.lastName ?? ''}`.trim();
  }

  /** שם אזור התמחות לפי regionId. */
  private getRegionName(id: number): string {
    const found = this.availableAreas.find((a) => a.id === id);
    return found ? found.name : '';
  }

  /** שמות אזורי ההתמחות של המדריכה (מופרדים בפסיק). */
  getRegionsNames(ids: number[] | null | undefined): string {
    return (ids ?? [])
      .map((id) => this.getRegionName(id))
      .filter((n) => n !== '')
      .join(', ');
  }

  /** שם העדה לפי religiousId — נטען מהשרת עד דרישה. */
  getReligiousName(religiousId: number): string {
    if (!this.religiousNames.has(religiousId)) {
      this.religiousNames.set(religiousId, 'בטעינה…');
      this.srv_all.getReligiousName(religiousId).subscribe((name) => {
        this.religiousNames.set(religiousId, name ?? 'אחר');
      });
    }
    return this.religiousNames.get(religiousId) ?? 'בטעינה…';
  }

  /** כל הקבצים של המדריכה. */
  allFiles(entry: GuideWithFiles) {
    return entry.files;
  }

  /**
   * מאשר מדריכה: משנה את ערך האישור בשרת (false→true).
   * עם הצלחה — המדריכה יורדת מהמסך (כבר לא ממתינה לאישור).
   */
  approve(guideId: number) {
    if (this.approvingGuideId !== null) return; // כבר מתבצע אישור אחר
    this.approvingGuideId = guideId;

    this.srv_guide.approveGuide(guideId).subscribe({
      next: () => {
        this.approvingGuideId = null;
        // הצלחה — הסרת המדריכה מהרשימה המקומית (יורדת מהמסך).
        this.data = this.data.filter((d) => d.guide.guideId !== guideId);
      },
      error: (err: any) => {
        this.approvingGuideId = null;
        console.error(`שגיאה באישור מדריכה ${guideId}:`, err);
        alert('אירעה שגיאה באישור המדריכה. נא לנסות שוב.');
      },
    });
  }
}
