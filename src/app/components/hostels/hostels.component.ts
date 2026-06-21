import { Component, ViewChild } from '@angular/core';
import { Int_Hostels } from '../../Interfaces/Int_Hostels';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { srv_Hostels } from '../../Services/srv_Hostels';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ServiceAllService } from '../../Services/service-all.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ShowHostelsComponent } from '../show-hostels/show-hostels.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-hostels',
  imports: [MatPaginator, MatTableModule, MatIcon, MatFormField, MatLabel],
  templateUrl: './hostels.component.html',
  styleUrl: './hostels.component.scss',
})
export class HostelsComponent {
  displayedColumns: string[] = [
    'HostelsName',
    'Description',
    'RegionId',
    'NumberOfPlaces',
    'kashrutId',
    'DetailsButton',
  ];
  dataSource!: MatTableDataSource<Int_Hostels>;
  showSearch: Boolean = false;
  originalData: Int_Hostels[] = [];
 RegionsArrayData: any;
 KashrutArrayData: any;
selectedRegion: number = 0; 
  selectedKashrut: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null; // עדיף להקצות null

  constructor(
    public Hostels: srv_Hostels,
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
        this.KashrutArrayData = this.srv_all.getKashrutArray();

    this.loadData();
    // המרת Int_WalkingTrail ל-PeriodicElement




  }
  loadData() {
    const rawData: Int_Hostels[] = this.Hostels.GetHostels();
      this.originalData = rawData; // שמור את הנתונים המקוריים
  
     const ELEMENT_DATA: Int_Hostels[] = rawData.map((Hostels, index) => ({
             HostelsId: Hostels.HostelsId,
      HostelsName: Hostels.HostelsName,
      RegionId: Hostels.RegionId,
      Address: Hostels.Address,
      Description: Hostels.Description,
      NumberOfPlaces: Hostels.NumberOfPlaces,
      kashrutId: Hostels.kashrutId,
      Phone: Hostels.Phone,
    }));
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator; // עדכון הפאג'ינטור אם קיים
      }
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  openDialogRegistrations(element: Int_Hostels) {
    console.log('הצליח', element); // לוג עבור בדיקה
    const dialogRef = this.dialog.open(ShowHostelsComponent, {
      width: '850px',
      data: element, // העברת הנתונים לדיאלוג
    });
  }
  //לעשות מיון

  sortByPlaces: boolean = false;

  sortByNumOFPlaces() {
    if (this.sortByPlaces) {
      this.sortByPlaces = !this.sortByPlaces;
      console.log('down');
      if (this.dataSource && this.dataSource.data) {
        this.dataSource.data = this.dataSource.data.sort(
          (a, b) => b.NumberOfPlaces - a.NumberOfPlaces,
        );
        return this.dataSource;
      } else {
        console.error('dataSource or data is null');
        return [];
      }
    } else {
      this.sortByPlaces = !this.sortByPlaces;
      console.log('up');
      if (this.dataSource && this.dataSource.data) {
        this.dataSource.data = this.dataSource.data.sort(
          (a, b) => a.NumberOfPlaces - b.NumberOfPlaces,
        );
        return this.dataSource;
      } else {
        console.error('dataSource or data is null');
        return [];
      }
    }
  }

  ToShowSearch() {
    this.showSearch = !this.showSearch;
  }
  filterTable() {
      const regionSelect = document.getElementById(
        'regionSelect',
      ) as HTMLSelectElement | null;
     
      const KashrutSelect = document.getElementById(
        'KashrutSelect',
      ) as HTMLSelectElement | null;

      if (regionSelect && KashrutSelect) {
        const regionValue = Number(regionSelect.value); // קבלת הערך שנבחר ב-regionSelect
        const kashrutValue = Number(KashrutSelect.value); // קבלת הערך שנבחר ב-difficultySelect
        let filteredData: Int_Hostels[] = this.originalData;
  
        // filteredData = this.originalData
        if (regionValue !== 0) {
          filteredData = filteredData.filter((x) => x.RegionId === regionValue);
        }
    
        if (kashrutValue !== 0) {
          filteredData = filteredData.filter(
            (x) => x.kashrutId == kashrutValue,
          );
        }
        this.dataSource.data = filteredData;
        console.log(this.dataSource.data.length);
        this.paginator?.firstPage();
      }
      
      //this.loadData();
    }
  
    resetFilters() {
      this.selectedRegion = 0;
      const selectElementElement = document.getElementById(
        'regionSelect',
      ) as HTMLSelectElement;
      selectElementElement.value = '0';
  
      this.selectedKashrut = 0;
      const selectedKashrutElement = document.getElementById(
        'KashrutSelect',
      ) as HTMLSelectElement;
      selectedKashrutElement.value = '0';
  
      this.dataSource.data = this.originalData; // החזר לנתונים המקוריים
            this.paginator?.firstPage();

    }
}
