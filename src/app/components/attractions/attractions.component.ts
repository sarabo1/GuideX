import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServiceAllService } from '../../Services/service-all.service';
import { srv_Attractions } from '../../Services/srv_Attractions';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { int_Attractions } from '../../Interfaces/int_Attractions';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { ShowAttractionComponent } from '../show-attraction/show-attraction.component';

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatExpansionModule],
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent {

  displayedColumns: string[] = [ 'AttractionsName','Description',
                           'RegionId', 'AttractionsTypeId', 'ShomerShabat','DetailsButton'];
  dataSource: MatTableDataSource<int_Attractions>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;


    constructor(public Attractions: srv_Attractions, 
                paginator: MatPaginatorIntl, 
                public srv_all: ServiceAllService,
              public dialog: MatDialog) 
    {
                  
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
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   
  
 
    
    openDialogRegistrations(element: int_Attractions) {
    console.log("הצליח", element); // לוג עבור בדיקה
    const dialogRef = this.dialog.open(ShowAttractionComponent, {
        width: '850px',
        data: element // העברת הנתונים לדיאלוג
    });
}
  
  
}
