import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { Srv_Guide } from '../../../Services/srv-guide.service';
import { ServiceAllService } from '../../../Services/service-all.service';
import { RefreshService } from '../../../Services/RefreshService';
import { Int_Guide } from '../../../Interfaces/int-guide';

@Component({
  selector: 'app-table-guide',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './table-guide.component.html',
  styleUrl: './table-guide.component.scss',
})
export class TableGuideComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'FullName',
    'IdNumber',
    'City',
    'PhoneNumber',
    'Email',
    'ReligiousId',
    'RegionId',
  ];

  isLoading = true;
  dataSource = new MatTableDataSource<Int_Guide>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    public Guides: Srv_Guide,
    public srv_all: ServiceAllService,
    public refreshService: RefreshService,
    paginatorIntl: MatPaginatorIntl,
  ) {
    paginatorIntl.itemsPerPageLabel = 'מדריכות בעמוד:';
    paginatorIntl.nextPageLabel = 'העמוד הבא';
    paginatorIntl.previousPageLabel = 'העמוד הקודם';
    paginatorIntl.firstPageLabel = 'העמוד הראשון';
    paginatorIntl.lastPageLabel = 'העמוד האחרון';

    this.loadData();
  }

  ngOnInit() {
    // טעינה מחדש אחרי שינוי בנתוני הטבלה (הוספה/עדכון/מחיקה)
    this.refreshService.refresh$.subscribe(() => this.loadData());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.paginator) this.dataSource.paginator = this.paginator;
    });
  }

  loadData() {
    this.isLoading = true;
    this.Guides.GetGuides().subscribe({
      next: (guides: Int_Guide[]) => {
        this.dataSource.data = guides;
        this.isLoading = false;
        setTimeout(() => {
          if (this.paginator) this.dataSource.paginator = this.paginator;
        });
      },
      error: (err) => {
        console.error('שגיאה בשליפת המדריכות:', err);
        this.isLoading = false;
      },
    });
  }

  /** שם מלא: שם פרטי + שם משפחה. */
  getFullName(g: Int_Guide): string {
    return `${g.FirstName ?? ''} ${g.LastName ?? ''}`.trim();
  }

  /** שם העדה לפי ReligiousId. */
  getReligiousName(id: number): string {
    return this.srv_all.getReligiousName(id) ?? 'אחר';
  }

  /** שמות אזורי ההתמחות מתוך מערך ה-RegionId (מופרדים בפסיק). */
  getRegionsNames(ids: number[]): string {
    return (ids ?? []).map((id) => this.srv_all.GetRegions(id)).join(', ');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.paginator) this.paginator.firstPage();
  }
}
