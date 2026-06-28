import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Int_Guide } from '../../../Interfaces/int-guide';
import { ServiceAllService } from '../../../Services/service-all.service';
import { Srv_Guide } from '../../../Services/srv-guide.service';

@Component({
  selector: 'app-table-guide',
  imports: [MatTableModule, MatPaginator],
  templateUrl: './table-guide.component.html',
  styleUrl: './table-guide.component.scss',
})
export class TableGuideComponent {
  displayedColumns: string[] = [
    'HostelsName',
    'Description',
    'RegionId',
    'NumberOfPlaces',
    'kashrutId',
  ];
  // dataSource: MatTableDataSource<Int_Guide>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null; // עדיף להקצות null

  constructor(
    public Guides: Srv_Guide,
    paginator: MatPaginatorIntl,
    public srv_all: ServiceAllService,
  ) {
    paginator.itemsPerPageLabel = 'מסלולים בעמוד:';
    paginator.nextPageLabel = 'העמוד הבא';
    paginator.previousPageLabel = 'העמוד הקודם';
    paginator.firstPageLabel = 'העמוד הראשון';
    paginator.lastPageLabel = 'העמוד האחרון';

    // המרת Int_WalkingTrail ל-PeriodicElement
    const rawData: Int_Guide[] = this.Guides.GetGuides();
    // const ELEMENT_DATA: Int_Guide[] = rawData.map((Guides, index) => ({
    //   HostelsId: Guides.HostelsId,
    //   HostelsName: Guides.HostelsName,
    //   RegionId: Guides.RegionId,
    //   Address: Guides.Address,
    //   Description: Guides.Description,
    //   NumberOfPlaces: Guides.NumberOfPlaces,
    //   kashrutId: Guides.kashrutId,
    //   Phone: Guides.Phone,
    // }));

    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
