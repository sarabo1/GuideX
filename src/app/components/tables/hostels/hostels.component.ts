import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';

import { ShowHostelsComponent } from '../show-hostels/show-hostels.component';
import { Int_Hostels } from '../../../Interfaces/Int_Hostels';
import { srv_Hostels } from '../../../Services/srv_Hostels';
import { ServiceAllService } from '../../../Services/service-all.service';
import { srv_Favorite } from '../../../Services/srv_Favorite';
import { AuthService } from '../../../Services/auth-service.service';
import { AttractionTypeNamePipe } from "../../../Pipes/attractionTypeName";
import { CommonModule } from '@angular/common';
import { regionNamePipe } from "../../../Pipes/regionName";

@Component({
  selector: 'app-hostels',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatSortHeader,
    CommonModule,
    regionNamePipe
],
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss'],
})
export class HostelsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'like',
    'HostelsName',
    'Description',
    'RegionId',
    'NumberOfPlaces',
    'kashrutId',
    'DetailsButton',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Int_Hostels>;
  areasofexpertisealData: Int_Hostels[] = [];

  showSearch: Boolean = false;

  RegionsArrayData: any;
  KashrutArrayData: any;

  selectedRegion: number = 0;
  selectedKashrut: number = 0;

  userDetails: any;

  // 🔥 FIX: like state לפי key ולא לפי id בלבד
  isLiked: { [key: string]: boolean } = {};
  constructor(
    public Hostels: srv_Hostels,
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
    this.KashrutArrayData = this.srv_all.getKashrutArray();

    this.loadData();
    this.initLikedState(); // 🔥 חשוב מאוד
  }

  ngOnInit() {
    //  this.dataSource = new MatTableDataSource(yourDataArray);

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'RegionId': // אזור
          return item.RegionId; // מתאים לשם בעמודה
        case 'HostelsName': // שם מקום הלינה
          return item.HostelsName; // מתאים לשם בעמודה
        case 'Description': // תיאור
          return item.Description; // מתאים לשם בעמודה
        case 'NumberOfPlaces': // מספר מקומות
          return item.NumberOfPlaces; // מתאים לשם בעמודה
        case 'kashrutId': // כשרות
          return item.kashrutId; // מתאים לשם בעמודה
        default:
          return (item as any)[property]; // כל שאר המאפיינים
      }
    };
  }

  // 🔥 KEY ייחודי
  getKey(type: string, id: number): string {
    return `${type}-${id}`;
  }

  // 🔥 אתחול לייקים מה-service
  initLikedState() {
    const userId = this.userDetails?.userId;
    if (!userId) return;

    const favs = this.srv_favorite.getFavoriteByCoordinatorId(userId);

    favs.forEach((f) => {
      if (f.HostelsId) {
        this.isLiked[this.getKey('hostel', f.HostelsId)] = true;
      }
      if (f.AttractionsId) {
        this.isLiked[this.getKey('attraction', f.AttractionsId)] = true;
      }
      if (f.WalkingTrailId) {
        this.isLiked[this.getKey('trail', f.WalkingTrailId)] = true;
      }
    });
  }

  loadData() {
    const rawData: Int_Hostels[] = this.Hostels.GetHostels();
    this.areasofexpertisealData = rawData;

    const ELEMENT_DATA: Int_Hostels[] = rawData.map((hostel) => ({
      HostelsId: hostel.HostelsId,
      HostelsName: hostel.HostelsName,
      RegionId: hostel.RegionId,
      Address: hostel.Address,
      Description: hostel.Description,
      NumberOfPlaces: hostel.NumberOfPlaces,
      kashrutId: hostel.kashrutId,
      Phone: hostel.Phone,
    }));

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  //  ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;

  // }

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

  openDialogRegistrations(element: Int_Hostels) {
    this.dialog.open(ShowHostelsComponent, {
      width: '850px',
      data: element,
    });
  }

  sortByPlaces: boolean = false;

  sortByNumOFPlaces() {
    this.sortByPlaces = !this.sortByPlaces;

    if (!this.dataSource?.data) return [];

    this.dataSource.data = this.dataSource.data.sort((a, b) =>
      this.sortByPlaces
        ? b.NumberOfPlaces - a.NumberOfPlaces
        : a.NumberOfPlaces - b.NumberOfPlaces,
    );

    return this.dataSource;
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
    const KashrutSelect = document.getElementById(
      'KashrutSelect',
    ) as HTMLSelectElement | null;

    if (!regionSelect || !KashrutSelect) return;

    const regionValue = Number(regionSelect.value);
    const kashrutValue = Number(KashrutSelect.value);
    const searchText = anyWordElement?.value.trim() ?? '';

    let filteredData: Int_Hostels[] = this.areasofexpertisealData;

    if (searchText) {
      filteredData = filteredData.filter(
        (x) =>
          String(x.Description).includes(searchText) ||
          String(x.Address).includes(searchText) ||
          String(x.HostelsName).includes(searchText) ||
          String(x.NumberOfPlaces).includes(searchText) ||
          String(x.Phone).includes(searchText) ||
          String(this.srv_all.GetRegions(x.RegionId)).includes(searchText) ||
          String(this.srv_all.GetKashrutName(x.kashrutId)).includes(searchText),
      );
    }

    if (regionValue !== 0) {
      filteredData = filteredData.filter((x) => x.RegionId === regionValue);
    }

    if (kashrutValue !== 0) {
      filteredData = filteredData.filter((x) => x.kashrutId === kashrutValue);
    }

    this.dataSource.data = filteredData;
    this.paginator?.firstPage();
  }

  resetFilters() {
    this.selectedRegion = 0;
    this.selectedKashrut = 0;

    const regionSelect = document.getElementById(
      'regionSelect',
    ) as HTMLSelectElement;
    const kashrutSelect = document.getElementById(
      'KashrutSelect',
    ) as HTMLSelectElement;

    if (regionSelect) regionSelect.value = '0';
    if (kashrutSelect) kashrutSelect.value = '0';

    this.dataSource.data = this.areasofexpertisealData;
    this.paginator?.firstPage();
  }
}
