import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServiceAllService } from '../../Services/service-all.service';
import { srv_Attractions } from '../../Services/srv_Attractions';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { int_Attractions } from '../../Interfaces/int_Attractions';

@Component({
  selector: 'app-attractions',
  imports: [MatPaginator, MatTableModule],
  templateUrl: './attractions.component.html',
  styleUrl: './attractions.component.scss'
})
export class AttractionsComponent {

  displayedColumns: string[] = [ 'AttractionsName','Description',
                           'RegionId', 'AttractionsTypeId', 'ShomerShabat'];
  dataSource: MatTableDataSource<int_Attractions>;

    @ViewChild(MatPaginator) paginator: MatPaginator | null = null; // עדיף להקצות null


    constructor(public Attractions: srv_Attractions, paginator: MatPaginatorIntl, public srv_all: ServiceAllService) {
    paginator.itemsPerPageLabel = 'מסלולים בעמוד:';
    paginator.nextPageLabel = 'העמוד הבא';
    paginator.previousPageLabel = 'העמוד הקודם';
    paginator.firstPageLabel = 'העמוד הראשון';
    paginator.lastPageLabel = 'העמוד האחרון';
    
    
    // המרת Int_WalkingTrail ל-PeriodicElement
    const rawData: int_Attractions[] = this.Attractions.GetAttractions();
    const ELEMENT_DATA: int_Attractions[] = rawData.map((attraction, index) => ({
      AttractionsId: attraction.AttractionsId,
      AttractionsName: attraction.AttractionsName,
      RegionId: attraction.RegionId,
      Address: attraction.Address,
      AttractionsTypeId: attraction.AttractionsTypeId,
      Description: attraction.Description,
      ShomerShabat: attraction.ShomerShabat,
      Phone : attraction.Phone
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
