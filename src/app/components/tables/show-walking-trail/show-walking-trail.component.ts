import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SucceededAlertComponent } from '../succeeded-alert/succeeded-alert.component';
import { Int_WalkingTrail, Int_WalkingTrailFile } from '../../../Interfaces/Int_WalkingTrail';
import { ServiceAllService } from '../../../Services/service-all.service';
import { SrvWalkingTrailService } from '../../../Services/srv-WalkingTrail.service';
import { srv_Favorite } from '../../../Services/srv_Favorite';
import { regionNamePipe } from "../../../Pipes/regionName";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RefreshService } from '../../../Services/RefreshService';

@Component({
  selector: 'app-show-walking-trail',
  imports: [MatIcon, regionNamePipe, CommonModule, FormsModule],
  templateUrl: './show-walking-trail.component.html',
  styleUrl: './show-walking-trail.component.scss',
})
export class ShowWalkingTrailComponent {
  userCanEdit = false;
  RegionsArrayData: any
  isLiked: boolean = false;
  isAddNew = false;

  /** תמונות שכבר נשמרו בשרת עבור מסלול ההליכה (לתצוגה ולמחיקה). */
  images: Int_WalkingTrailFile[] = [];
  /** קבצי תמונה שנבחרו אך טרם הועלו (למסלול חדש שעדיין אין לו ID). */
  pendingImages: File[] = [];

  userDetails: any = JSON.parse(localStorage.getItem('user_data') || '{}');
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ShowWalkingTrailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Int_WalkingTrail,
    public srv_all: ServiceAllService,
    public walkingTrails: SrvWalkingTrailService,
    public srv_favorite: srv_Favorite,
    public refreshService: RefreshService,
  ) {
    this.RegionsArrayData = this.srv_all.getRegionsArray().subscribe(
      (data) => {
        this.RegionsArrayData = data;
      },
      (error) => {
        console.error('בעיה בהבאת האזורים', error);
      },
    );
    this.checkIfAddNew();
  }

  checkIfAddNew() {
    if (
      this.data &&
      this.data.WalkingTrailId == 0 &&
      this.data.WalkingTrailName == '' &&
      this.data.Description == '' &&
      this.data.Directions == '' &&
      this.data.regionId == 0 &&
      this.data.LengthInKm == 0 &&
      this.data.RouteDuration == 0 &&
      this.data.Difficulty == 0 &&
      this.data.MinAge == 0 &&
      this.data.MaxAge == 0
    ) {
      this.isAddNew = true;
      this.userCanEdit = true;
      console.log('this.isAddNew', this.isAddNew);
    }
  }

  ngOnInit() {
    const raw = localStorage.getItem('user_data');
    this.userDetails = raw ? JSON.parse(raw) : null;

    const userId = this.userDetails?.userId;

    if (!userId || !this.data?.WalkingTrailId) {
      this.isLiked = false;
    } else {
      this.isLiked = this.srv_favorite.isFavorite(
        userId,
        Number(this.data.WalkingTrailId),
        'trail',
      );
    }

    // טעינת התמונות של המסלול שנפתח — שליפה לפי ה-ID שלו מהשרת.
    // (רק אם הוא כבר שמור בשרת; למסלול חדש עדיין אין ID).
    if (this.data?.WalkingTrailId && this.data.WalkingTrailId > 0) {
      this.walkingTrails.GetImages(this.data.WalkingTrailId).subscribe((imgs) => {
        this.images = imgs ?? [];
      });
    }
  }
  toggleFavorite() {
    if (
      this.srv_favorite.isFavorite(
        this.userDetails?.userId,
        this.data.WalkingTrailId,
        'trail',
      )
    ) {
      this.srv_favorite.removeFavorite(
        this.userDetails?.userId,
        this.data.WalkingTrailId,
        'trail',
      );
      this.isLiked = false;
    } else {
      this.srv_favorite.addFavorite(
        this.userDetails?.userId,
        this.data.WalkingTrailId,
        'trail',
      );
      this.isLiked = true;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  canEdit() {
    this.userCanEdit = true;
  }

  // ─────────── תמונות ───────────

  /** כתובת התמונה הפתוחה בתצוגה גדולה (null = פתוחה אין). */
  previewImageUrl: string | null = null;

  /** פותח את התמונה בתצוגה גדולה (lightbox). */
  openImagePreview(url: string) {
    this.previewImageUrl = url;
  }

  /** סוגר את תצוגת התמונה הגדולה. */
  closeImagePreview() {
    this.previewImageUrl = null;
  }

  /** כתובת URL לתצוגת תמונה שמורה לפי ה-FileId שלה בשרת. */
  imageUrl(fileId: number): string {
    return this.walkingTrails.ImageUrl(fileId);
  }

  /** כתובת URL זמנית לתצוגת קובץ מקומי שנבחר (טרם הועלה). */
  pendingImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  /** בחירת קבצי תמונה חדשים. */
  onImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);

    // מסלול קיים — מעלים מיד לשרת.
    if (this.data?.WalkingTrailId && this.data.WalkingTrailId > 0) {
      this.walkingTrails.AddImages(this.data.WalkingTrailId, files).subscribe(
        (imgs) => {
          this.images = imgs ?? [];
        },
      );
    } else {
      // מסלול חדש (אין עדיין ID) — שומרים את הקבצים להעלאה אחרי השמירה.
      this.pendingImages.push(...files);
    }

    // איפוס שדה הבחירה כדי שאפשר יהיה לבחור שוב את אותו קובץ.
    input.value = '';
  }

  /** מחיקת קובץ חדש שטרם הועלה (למסלול חדש). */
  removePendingImage(index: number) {
    this.pendingImages.splice(index, 1);
  }

  /** מחיקת תמונה שמורה מהשרת ומהתצוגה. */
  deleteImage(fileId: number, index: number) {
    this.walkingTrails.DeleteImage(fileId).subscribe(() => {
      this.images.splice(index, 1);
    });
  }

  /** מעלה את הקבצים שנבחרו למסלול חדש, אחרי שזה נשמר (יש כבר ID). */
  uploadPendingImages(newTrailId: number) {
    if (!this.pendingImages.length) return;
    const files = [...this.pendingImages];
    this.pendingImages = [];
    this.walkingTrails.AddImages(newTrailId, files).subscribe((imgs) => {
      this.images = imgs ?? [];
    });
  }

  saveEdit() {
    console.log('saveEdit');
      const seasons = [
    document.getElementById('Summer') as HTMLInputElement,
    document.getElementById('Winter') as HTMLInputElement,
    document.getElementById('Spring') as HTMLInputElement,
    document.getElementById('Autumn') as HTMLInputElement
  ];

  const isAtLeastOneChecked = seasons.some(season => season.checked);

  if (!isAtLeastOneChecked) {
    alert("אנא בחר לפחות עונה אחת.");
    return;
  }

   this.data.SeasonSummer = seasons[0].checked;
    this.data.SeasonWinter = seasons[1].checked;
    this.data.SeasonSpring = seasons[2].checked;
    this.data.SeasonAutumn = seasons[3].checked;
    // שמירה של הערכים מה-inputים אל האובייקט data
    this.data.WalkingTrailName = (
      document.getElementById('WalkingTrailName') as HTMLInputElement
    ).value;
    this.data.Description = (
      document.getElementById('Description') as HTMLInputElement
    ).value;
    this.data.regionId = Number(
      (document.getElementById('regionId') as HTMLInputElement).value,
    );
    this.data.Difficulty = Number(
      (document.getElementById('Difficulty') as HTMLInputElement).value,
    );
    this.data.MinAge = Number(
      (document.getElementById('MinAge') as HTMLInputElement).value,
    );
    this.data.MaxAge = Number(
      (document.getElementById('MaxAge') as HTMLInputElement).value,
    );
    ((this.data.Directions = (
      document.getElementById('Directions') as HTMLInputElement
    ).value),
      (this.data.LengthInKm = Number(
        (document.getElementById('LengthInKm') as HTMLInputElement).value,
      )),
      (this.data.RouteDuration = Number(
        (document.getElementById('RouteDuration') as HTMLInputElement).value,
      )));
    this.data.IsWet = (
      document.getElementById('IsWet') as HTMLInputElement
    ).checked;

    // נרמול לערכים בטוחים
    this.data.WalkingTrailName = (this.data.WalkingTrailName ?? '').trim();
    this.data.Description = (this.data.Description ?? '').trim();
    this.data.Directions = (this.data.Directions ?? '').trim();
    this.data.regionId = Number(this.data.regionId) || 0;
    this.data.Difficulty = Number(this.data.Difficulty) || 0;
    this.data.MinAge = Number(this.data.MinAge) || 0;
    this.data.MaxAge = Number(this.data.MaxAge) || 0;
    this.data.LengthInKm = Number(this.data.LengthInKm) || 0;
    this.data.RouteDuration = Number(this.data.RouteDuration) || 0;
    // this.data.SeasonAutumn = this
    //     this.data.SeasonSpring = this.data.SeasonSpring;
    // this.data.SeasonSummer = this.data.SeasonSummer;
    // this.data.SeasonWinter = this.data.SeasonWinter;


    console.log('data walking trail: ', this.data);

    if (this.isAddNew) {
      if (
        this.data.WalkingTrailName.trim() == '' ||
        this.data.regionId == 0
      ) {
        return;
      }
this.walkingTrails.AddNewTrail(this.data).subscribe({
    next: (response) => {
        console.log('הוספת הליכה', response);
        // המסלול נשמר — עכשיו יש לו ID. אם נבחרו תמונות, מעלים אותם אליו.
        const newId =
            response?.WalkingTrailId ?? response?.walkingTrailId ?? this.data.WalkingTrailId;
        if (this.pendingImages.length && newId) {
            this.uploadPendingImages(newId);
        }
        this.onClose();
        this.openDialogRegistrations('מסלול ההליכה נוסף בהצלחה');
        this.refreshService.triggerRefresh();
    },
    error: (err) => {
        console.error('שגיאה בהוספת מסלול 4444ההליכה:', err.error || err.message || 'שגיאה לא ידועה');
    },
});
    } else {
      this.walkingTrails.UpdateTrail(this.data).subscribe({
        next: () => {
          console.log('נתונים נשמרו', this.data);
          this.userCanEdit = false;
          this.openDialogRegistrations('מסלול ההליכה עודכן בהצלחה');
          this.refreshService.triggerRefresh(); // רענון הטבלה אחרי שהעדכון הסתיים
        },
        error: (err) => {
          console.error('שגיאה בעדכון מסלול ההליכה:', err);
        },
      });
    }
  }

  deleteTrail() {
    this.walkingTrails.deleteTrail(this.data.WalkingTrailId).subscribe({
      next: () => {
        console.log('מחיקת מסלול הליכה');
        this.onClose();
        this.openDialogRegistrations('מסלול ההליכה נמחק בהצלחה');
        this.refreshService.triggerRefresh(); // רענון הטבלה אחרי שהמחיקה הסתיימה
      },
      error: (err) => {
        console.error('שגיאה במחיקת מסלול ההליכה:', err);
      },
    });
  }

  openDialogRegistrations(element: string) {
    const dialogRef = this.dialog.open(SucceededAlertComponent, {
      width: '160px',

      data: element, // העברת הנתונים לדיאלוג
    });
  }
}
