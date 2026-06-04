import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { SrvWalkingTrailService } from '../../Services/srv-WalkingTrail.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Int_WalkingTrail } from '../../Interfaces/Int_WalkingTrail';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServiceAllService } from '../../Services/service-all.service';
import { DecimalPipe } from '@angular/common';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { RoundDownPipe } from "../../Pipes/round-down.pipe";


@Component({
  selector: 'app-walking-trail',
  templateUrl: './walking-trail.component.html',
  styleUrls: ['./walking-trail.component.scss'],
  imports: [MatPaginatorModule, MatTableModule, DecimalPipe, MatFormField, MatLabel, RoundDownPipe],
    standalone: true

})
export class WalkingTrailComponent implements AfterViewInit {
  displayedColumns: string[] = [ 'WalkingTrailName',  'Description','LengthInKm',
                           'RegionId', 'RouteDuration', 'Difficulty', 'AgeRange', 'IsWet'];
  dataSource: MatTableDataSource<Int_WalkingTrail>;

    @ViewChild(MatPaginator) paginator: MatPaginator | null = null; // עדיף להקצות null


    constructor(public walkingTrailId: SrvWalkingTrailService, 
              paginator: MatPaginatorIntl,  
              public srv_all: ServiceAllService){
              // public roundDown : RoundDownPPipe ) {
    paginator.itemsPerPageLabel = 'מסלולים בעמוד:';
    paginator.nextPageLabel = 'העמוד הבא';
    paginator.previousPageLabel = 'העמוד הקודם';
    paginator.firstPageLabel = 'העמוד הראשון';
    paginator.lastPageLabel = 'העמוד האחרון';
    
    
    // המרת Int_WalkingTrail ל-PeriodicElement
    const rawData: Int_WalkingTrail[] = this.walkingTrailId.GetWalkingTrails();
    const ELEMENT_DATA: Int_WalkingTrail[] = rawData.map((trail, index) => ({
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
      IsWet: trail.IsWet
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