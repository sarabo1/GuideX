import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Int_Guide } from '../../../Interfaces/int-guide';
import { ServiceAllService } from '../../../Services/service-all.service';

@Component({
  selector: 'app-show-guide',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './show-guide.component.html',
  styleUrl: './show-guide.component.scss',
})
export class ShowGuideComponent {
  /** כל אזורי ההתמחות שנטענו מהשרת — להצגת שמות האזורים של המדריכה. */
  availableAreas: { id: number; name: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<ShowGuideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Int_Guide,
    public srv_all: ServiceAllService,
  ) {
    this.srv_all.getRegionsArray().subscribe((areas: any[]) => {
      this.availableAreas = (areas ?? []).map((a) => ({
        id: Number(a.regionId),
        name: a.regionName ?? '',
      }));
    });
  }

  /** שם מלא: שם פרטי + שם משפחה. */
  fullName(g: Int_Guide): string {
    return `${g.firstName ?? ''} ${g.lastName ?? ''}`.trim();
  }

  /** שם אזור התמחות לפי regionId; ריק אם לא ידוע. */
  getRegionName(id: number): string {
    const found = this.availableAreas.find((a) => a.id === id);
    return found ? found.name : '';
  }

  /** שמות אזורי ההתמחות של המדריכה (מופרדים בפסיק). */
  getRegionsNames(ids: number[]): string {
    return (ids ?? []).map((id) => this.getRegionName(id)).join(', ');
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
