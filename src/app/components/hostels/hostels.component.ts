import { Component, ViewChild } from '@angular/core';
import { Int_Hostels } from '../../Interfaces/Int_Hostels';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { srv_Hostels } from '../../Services/srv_Hostels';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { ServiceAllService } from '../../Services/service-all.service';

@Component({
  selector: 'app-hostels',
  imports: [MatPaginator, MatTableModule],
  templateUrl: './hostels.component.html',
  styleUrl: './hostels.component.scss'
})
export class HostelsComponent {

 displayedColumns: string[] = [ 'HostelsName','Description',
                           'RegionId',  'NumberOfPlaces', 'kashrutId'];
  dataSource: MatTableDataSource<Int_Hostels>;

    @ViewChild(MatPaginator) paginator: MatPaginator | null = null; // עדיף להקצות null


    constructor(public Hostels: srv_Hostels, paginator: MatPaginatorIntl, public srv_all: ServiceAllService) {
    paginator.itemsPerPageLabel = 'מסלולים בעמוד:';
    paginator.nextPageLabel = 'העמוד הבא';
    paginator.previousPageLabel = 'העמוד הקודם';
    paginator.firstPageLabel = 'העמוד הראשון';
    paginator.lastPageLabel = 'העמוד האחרון';
   
    
    
    // המרת Int_WalkingTrail ל-PeriodicElement
    const rawData: Int_Hostels[] = this.Hostels.GetHostels();
    const ELEMENT_DATA: Int_Hostels[] = rawData.map((Hostels, index) => ({
      HostelsId: Hostels.HostelsId,
      HostelsName: Hostels.HostelsName,
      RegionId: Hostels.RegionId,
      Address: Hostels.Address,
      Description: Hostels.Description,
      NumberOfPlaces :Hostels.NumberOfPlaces,
      kashrutId: Hostels.kashrutId,
      Phone : Hostels.Phone
    }));
  
 
    
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

