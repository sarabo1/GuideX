import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { ShowAttractionComponent } from '../show-attraction/show-attraction.component';
import { int_Attractions } from '../../../Interfaces/int_Attractions';
import { srv_Attractions } from '../../../Services/srv_Attractions';
import { ServiceAllService } from '../../../Services/service-all.service';

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss'],
})
export class AttractionsComponent {
  displayedColumns: string[] = [
    'AttractionsName',
    'Description',
    'RegionId',
    'AttractionsTypeId',
    'ShomerShabat',
    'DetailsButton',
  ];
  dataSource!: MatTableDataSource<int_Attractions>;
  
  showSearch: Boolean = false;
 RegionsArrayData: any;
 AttractionsArrayData: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
    originalData: int_Attractions[] = [];
   selectedRegion: number = 0; // ברירת המחדל
  selectedAttractionType: number = 0;

  constructor(
    public Attractions: srv_Attractions,
    paginator: MatPaginatorIntl,
    public srv_all: ServiceAllService,
    public dialog: MatDialog,
  ) {
    paginator.itemsPerPageLabel = 'מסלולים בעמוד:';
    paginator.nextPageLabel = 'העמוד הבא';
    paginator.previousPageLabel = 'העמוד הקודם';
    paginator.firstPageLabel = 'העמוד הראשון';
    paginator.lastPageLabel = 'העמוד האחרון';


        this.RegionsArrayData = this.srv_all.getRegionsArray();
        this.AttractionsArrayData = this.Attractions.getAttractionTypes();
      this.loadData();
  }
  loadData() {
      const rawData: int_Attractions[] = this.Attractions.GetAttractions();
      this.originalData = rawData; // שמור את הנתונים המקוריים
  
      const ELEMENT_DATA: int_Attractions[] = rawData.map(
      (attraction, index) => ({
        AttractionsId: attraction.AttractionsId,
        AttractionsName: attraction.AttractionsName,
        RegionId: attraction.RegionId,
        Address: attraction.Address,
        AttractionsTypeId: attraction.AttractionsTypeId,
        Description: attraction.Description,
        ShomerShabat: attraction.ShomerShabat,
        Phone: attraction.Phone,
        // ImageUrl : attraction.ImageUrl
      }),
      );
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator; // עדכון הפאג'ינטור אם קיים
      }
    }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }


  openDialogRegistrations(element: int_Attractions) {
    console.log('הצליח', element); // לוג עבור בדיקה
    const dialogRef = this.dialog.open(ShowAttractionComponent, {
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
      const AttractionTypeSelect = document.getElementById(
        'AttractionTypeSelect',
      ) as HTMLSelectElement | null;

      if (regionSelect && AttractionTypeSelect) {
        const regionValue = Number(regionSelect.value); // קבלת הערך שנבחר ב-regionSelect
        const AttractionTypeValue = Number(AttractionTypeSelect.value); // קבלת הערך שנבחר ב-lengthSelect
        let filteredData: int_Attractions[] = this.originalData;
  
        if (regionValue !== 0) {
          filteredData = filteredData.filter((x) => x.RegionId === regionValue);
        }
        if (AttractionTypeValue !== 0) {
          filteredData = filteredData.filter(
            (x) =>
              x.AttractionsTypeId === AttractionTypeValue,
          );
        }
        
        this.dataSource.data = filteredData;
        console.log(this.dataSource.data.length);
                this.paginator?.firstPage();

      }
    }
  
    resetFilters() {
      this.selectedRegion = 0;
      const selectElementElement = document.getElementById(
        'regionSelect',
      ) as HTMLSelectElement;
      selectElementElement.value = '0';
  
  
      this.selectedAttractionType = 0;
      const selectedLengthElement = document.getElementById(
        'AttractionTypeSelect',
      ) as HTMLSelectElement;
      selectedLengthElement.value = '0';
  
      this.dataSource.data = this.originalData;

              this.paginator?.firstPage();

    }
}
