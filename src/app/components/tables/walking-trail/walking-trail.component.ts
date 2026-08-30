import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ShowWalkingTrailComponent } from '../show-walking-trail/show-walking-trail.component';
import { Int_WalkingTrail } from '../../../Interfaces/Int_WalkingTrail';
import { SrvWalkingTrailService } from '../../../Services/srv-WalkingTrail.service';
import { ServiceAllService } from '../../../Services/service-all.service';
import { srv_Favorite } from '../../../Services/srv_Favorite';
import { AuthService } from '../../../Services/auth-service.service';
import { CommonModule } from '@angular/common';
import { regionNamePipe } from '../../../Pipes/regionName';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-walking-trail',
  standalone: true,
  templateUrl:'./walking-trail.component.html',
  styleUrls: ['./walking-trail.component.scss'],
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatIcon,
    CommonModule,
    regionNamePipe,
    MatSortModule,
    MatSortHeader,
    CommonModule,
  ],
})
export class WalkingTrailComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'like',
    'WalkingTrailName',
    'Description',
    'reigionId',
    'RouteDuration',
    'Difficulty',
    'DetailsButton',
  ];

  dataSource!: MatTableDataSource<Int_WalkingTrail>;
  areasofexpertisealData: Int_WalkingTrail[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort!: MatSort;

  RegionsArrayData: any;
  showSearch: Boolean = false;

  selectedRegion: number = 0;
  selectedDifficulty: number = 0;
  selectedLength: number = 0;

  userDetails: any;

  isLiked: { [key: string]: boolean } = {};

  constructor(
    public walkingTrail: SrvWalkingTrailService,
    paginatorIntl: MatPaginatorIntl,
    public srv_all: ServiceAllService,
    public dialog: MatDialog,
    public srv_favorite: srv_Favorite,
    public authService: AuthService,
  ) {
    paginatorIntl.itemsPerPageLabel = 'מסלולים בעמוד:';
    paginatorIntl.nextPageLabel = 'העמוד הבא';
    paginatorIntl.previousPageLabel = 'העמוד הקודם';
    paginatorIntl.firstPageLabel = 'העמוד הראשון';
    paginatorIntl.lastPageLabel = 'העמוד האחרון';

    this.userDetails = this.authService.getUserData();

    this.RegionsArrayData = this.srv_all.getRegionsArray();

    this.loadData();
    this.initLikedState();
  }

  //
  getKey(type: string, id: number): string {
    return `${type}-${id}`;
  }

  initLikedState() {
    const userId = this.userDetails?.userId;
    if (!userId) return;

    const favs = this.srv_favorite.getFavoriteByCoordinatorId(userId);

    favs.forEach((f) => {
      if (f.WalkingTrailId) {
        this.isLiked[this.getKey('trail', f.WalkingTrailId)] = true;
      }
      if (f.HostelsId) {
        this.isLiked[this.getKey('hostel', f.HostelsId)] = true;
      }
      if (f.AttractionsId) {
        this.isLiked[this.getKey('attraction', f.AttractionsId)] = true;
      }
    });
  }

  loadData() {
    const rawData: Int_WalkingTrail[] = this.walkingTrail.GetWalkingTrails();

    this.areasofexpertisealData = rawData;

    const ELEMENT_DATA: Int_WalkingTrail[] = rawData.map((trail) => ({
      WalkingTrailId: trail.WalkingTrailId,
      WalkingTrailName: trail.WalkingTrailName,
      Description: trail.Description,
      reigionId: trail.reigionId,
      Directions: trail.Directions,
      LengthInKm: trail.LengthInKm,
      RouteDuration: trail.RouteDuration,
      Difficulty: trail.Difficulty,
      MinAge: trail.MinAge,
      MaxAge: trail.MaxAge,
      IsWet: trail.IsWet,
      SeasonSummer: trail.SeasonSummer,
      SeasonWinter: trail.SeasonWinter,
      SeasonSpring: trail.SeasonSpring,
      SeasonAutumn: trail.SeasonAutumn,
    }));

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
 ngOnInit() {
    //  this.dataSource = new MatTableDataSource(yourDataArray);

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'WalkingTrailName': // אזור
          return item.WalkingTrailName; // מתאים לשם בעמודה
        case 'Description': // שם מקום הלינה
          return item.Description; // מתאים לשם בעמודה
        case 'reigionId': // תיאור
          return item.reigionId; // מתאים לשם בעמודה
        case 'RouteDuration': // מספר מקומות
          return item.RouteDuration; // מתאים לשם בעמודה
        case 'Difficulty': // כשרות
          return item.Difficulty; // מתאים לשם בעמודה
       default:
          return (item as any)[property]; // כל שאר המאפיינים
      }
    };
  }
  ngAfterViewInit() {
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;  // הוסף זאת כאן

    }
  }

  toggleFavorite(
    userId: number,
    id: number,
    type: 'attraction' | 'hostel' | 'trail',
  ): void {
    const key = this.getKey(type, id);

    if (this.srv_favorite.isFavorite(userId, id, type)) {
      this.srv_favorite.removeFavorite(userId, id, type);
      this.isLiked[key] = false;
    } else {
      this.srv_favorite.addFavorite(userId, id, type);
      this.isLiked[key] = true;
    }
  }

  openDialogRegistrations(element: Int_WalkingTrail) {
    this.dialog.open(ShowWalkingTrailComponent, {
      width: '850px',
      data: element,
    });
  }

  ToShowSearch() {
    this.showSearch = !this.showSearch;
  }

  filterTable() {
    const anyWordElement = document.getElementById(
      'searchControl',
    ) as HTMLInputElement | null;
    const regionSelect = document.getElementById(
      'regionSelect',
    ) as HTMLSelectElement | null;
    const lengthSelect = document.getElementById(
      'lengthSelect',
    ) as HTMLSelectElement | null;
    const difficultySelect = document.getElementById(
      'difficultySelect',
    ) as HTMLSelectElement | null;

    if (!regionSelect || !lengthSelect || !difficultySelect) return;

    const regionValue = Number(regionSelect.value);
    const lengthValue = Number(lengthSelect.value);
    const difficultyValue = Number(difficultySelect.value);
    const searchText = anyWordElement?.value.trim() ?? '';

    let filteredData: Int_WalkingTrail[] = this.areasofexpertisealData;

    if (searchText) {
      filteredData = filteredData.filter(
        (x) =>
          String(x.Description).includes(searchText) ||
          String(x.Difficulty).includes(searchText) ||
          String(x.Directions).includes(searchText) ||
          String(x.LengthInKm).includes(searchText) ||
          String(x.RouteDuration).includes(searchText) ||
          String(x.WalkingTrailName).includes(searchText) ||
          String(this.srv_all.GetRegions(x.reigionId)).includes(searchText),
      );
    }

    if (regionValue !== 0) {
      filteredData = filteredData.filter((x) => x.reigionId === regionValue);
    }

    if (lengthValue !== 0) {
      filteredData = filteredData.filter(
        (x) =>
          this.walkingTrail.GetLengthToFilter(x.LengthInKm) === lengthValue,
      );
    }

    if (difficultyValue !== 0) {
      filteredData = filteredData.filter(
        (x) => x.Difficulty === difficultyValue,
      );
    }

    this.dataSource.data = filteredData;
    this.paginator?.firstPage();
  }

  resetFilters() {
    this.selectedRegion = 0;
    this.selectedDifficulty = 0;
    this.selectedLength = 0;

    const regionSelect = document.getElementById(
      'regionSelect',
    ) as HTMLSelectElement;
    const lengthSelect = document.getElementById(
      'lengthSelect',
    ) as HTMLSelectElement;
    const difficultySelect = document.getElementById(
      'difficultySelect',
    ) as HTMLSelectElement;

    if (regionSelect) regionSelect.value = '0';
    if (lengthSelect) lengthSelect.value = '0';
    if (difficultySelect) difficultySelect.value = '0';

    this.dataSource.data = this.areasofexpertisealData;
    this.paginator?.firstPage();
  }

  sortByTime: boolean = false;

  sortByNumOFPlaces() {
    this.sortByTime = !this.sortByTime;

    if (!this.dataSource?.data) return [];

    this.dataSource.data = this.dataSource.data.sort((a, b) =>
      this.sortByTime
        ? b.RouteDuration - a.RouteDuration
        : a.RouteDuration - b.RouteDuration,
    );

    return this.dataSource;
  }
}
