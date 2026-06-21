import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { SrvWalkingTrailService } from '../../Services/srv-WalkingTrail.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Int_WalkingTrail } from '../../Interfaces/Int_WalkingTrail';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServiceAllService } from '../../Services/service-all.service';
import { DecimalPipe } from '@angular/common';
import { RoundDownPipe } from '../../Pipes/round-down.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ShowWalkingTrailComponent } from '../show-walking-trail/show-walking-trail.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-walking-trail',
  templateUrl: './walking-trail.component.html',
  styleUrls: ['./walking-trail.component.scss'],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    DecimalPipe,
    RoundDownPipe,
    MatIcon,
    PaginatorModule,
  ],
  standalone: true,
})
export class WalkingTrailComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'WalkingTrailName',
    'Description',
    'RegionId',
    'RouteDuration',
    'Difficulty',
    'IsWet',
    'DetailsButton',
  ];
  dataSource!: MatTableDataSource<Int_WalkingTrail>;
  RegionsArrayData: any;
  showSearch: Boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null; // עדיף להקצות null
  originalData: Int_WalkingTrail[] = [];

  selectedRegion: number = 0; // ברירת המחדל
  selectedDifficulty: number = 0;
  selectedLength: number = 0;

  constructor(
    public walkingTrailId: SrvWalkingTrailService,
    paginator: MatPaginatorIntl,
    public srv_all: ServiceAllService,
    public dialog: MatDialog,
    public walkingTrails: SrvWalkingTrailService,
  ) {
    paginator.itemsPerPageLabel = 'מסלולים בעמוד:';
    paginator.nextPageLabel = 'העמוד הבא';
    paginator.previousPageLabel = 'העמוד הקודם';
    paginator.firstPageLabel = 'העמוד הראשון';
    paginator.lastPageLabel = 'העמוד האחרון';

    this.loadData();
    
    this.RegionsArrayData = this.srv_all.getRegionsArray();
  }
  loadData() {
    const rawData: Int_WalkingTrail[] = this.walkingTrailId.GetWalkingTrails();
    this.originalData = rawData; // שמור את הנתונים המקוריים

    const ELEMENT_DATA: Int_WalkingTrail[] = rawData.map((trail) => ({
      WalkingTrailId: trail.WalkingTrailId,
      WalkingTrailName: trail.WalkingTrailName,
      Description: trail.Description,
      RegionId: trail.RegionId,
      Directions: trail.Directions,
      LengthInKm: trail.LengthInKm,
      RouteDuration: trail.RouteDuration,
      Difficulty: trail.Difficulty,
      MinAge: trail.MinAge,
      MaxAge: trail.MaxAge,
      IsWet: trail.IsWet,
    }));
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // עדכון הפאג'ינטור אם קיים
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogRegistrations(element: Int_WalkingTrail) {
    console.log('הצליח', element); // לוג עבור בדיקה
    const dialogRef = this.dialog.open(ShowWalkingTrailComponent, {
      width: '850px',
      
      data: element, // העברת הנתונים לדיאלוג
    });
  }

  ToShowSearch() {
    this.showSearch = !this.showSearch;
  }

  filterTable() {
    const regionSelect = document.getElementById(
      'regionSelect',
    ) as HTMLSelectElement | null;
    const lengthSelect = document.getElementById(
      'lengthSelect',
    ) as HTMLSelectElement | null;
    const difficultySelect = document.getElementById(
      'difficultySelect',
    ) as HTMLSelectElement | null;
    if (regionSelect && lengthSelect && difficultySelect) {
      const regionValue = Number(regionSelect.value); // קבלת הערך שנבחר ב-regionSelect
      const lengthValue = Number(lengthSelect.value); // קבלת הערך שנבחר ב-lengthSelect
      const difficultyValue = Number(difficultySelect.value); // קבלת הערך שנבחר ב-difficultySelect
      let filteredData: Int_WalkingTrail[] = this.originalData;

      // filteredData = this.originalData
      if (regionValue !== 0) {
        filteredData = filteredData.filter((x) => x.RegionId === regionValue);
      }
      if (lengthValue !== 0) {
        filteredData = filteredData.filter(
          (x) =>
            this.walkingTrailId.GetLengthToFilter(x.LengthInKm) === lengthValue,
        );
      }
      if (difficultyValue !== 0) {
        filteredData = filteredData.filter(
          (x) => x.Difficulty == difficultyValue,
        );
      }
      this.dataSource.data = filteredData;
      console.log(this.dataSource.data.length);
    }
    //this.loadData();
  }

  resetFilters() {
    this.selectedRegion = 0;
    const selectElementElement = document.getElementById(
      'regionSelect',
    ) as HTMLSelectElement;
    selectElementElement.value = '0';

    this.selectedDifficulty = 0;
    const selectedDifficultyElement = document.getElementById(
      'lengthSelect',
    ) as HTMLSelectElement;
    selectedDifficultyElement.value = '0';

    this.selectedLength = 0;
    const selectedLengthElement = document.getElementById(
      'difficultySelect',
    ) as HTMLSelectElement;
    selectedLengthElement.value = '0';

    this.dataSource.data = this.originalData; // החזר לנתונים המקוריים
    
  }
  //לעשות מיון
  
  sortByTime: boolean = false;

  sortByNumOFPlaces() {
    if (this.sortByTime) {
      this.sortByTime = !this.sortByTime;
      console.log('down');
      if (this.dataSource && this.dataSource.data) {
        this.dataSource.data = this.dataSource.data.sort(
          (a, b) => b.RouteDuration - a.RouteDuration,
        );
        return this.dataSource;
      } else {
        console.error('dataSource or data is null');
        return [];
      }
    } else {
      this.sortByTime = !this.sortByTime;
      console.log('up');
      if (this.dataSource && this.dataSource.data) {
        this.dataSource.data = this.dataSource.data.sort(
          (a, b) => a.RouteDuration - b.RouteDuration,
        );
        return this.dataSource;
      } else {
        console.error('dataSource or data is null');
        return [];
      }
    }
  }

}


  // resetFilters() {
  //   // לשנות את הSELECTים
  //   this.selectedRegion = 0; // החזרת ברירות מחדל
  //   const selectElementElement = document.getElementById(
  //     'regionSelect',
  //   ) as HTMLSelectElement;
  //   selectElementElement.value = '0'; // מחזירים את הבחירה לשורה הראשונה

  //   this.selectedDifficulty = 0; // החזרת ברירות מחדל
  //   const selectedDifficultyElement = document.getElementById(
  //     'lengthSelect',
  //   ) as HTMLSelectElement;
  //   selectedDifficultyElement.value = '0';

  //   this.selectedLength = 0;
  //   const selectedLengthElement = document.getElementById(
  //     'difficultySelect',
  //   ) as HTMLSelectElement;
  //   selectedLengthElement.value = '0';

  //   this.dataSource.data = this.originalData;
  //   console.log(this.dataSource.data.length);

  //    // עדכון ה-paginator
  //   if (this.paginator) {
  //     console.log(this.originalData.length)
  //       this.paginator.length = this.originalData.length; // עדכון מספר הפריטים בפאג'ינטור
  //             console.log(this.paginator.length)

  //       this.dataSource.paginator = this.paginator; // חיבור מחדש
  //       console.log(this.dataSource.paginator)
  //   }
  // }