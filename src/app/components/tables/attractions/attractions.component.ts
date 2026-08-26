import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { srv_Favorite } from '../../../Services/srv_Favorite';
import { AuthService } from '../../../Services/auth-service.service';
import { AttractionTypeNamePipe } from "../../../Pipes/attractionTypeName";
import { regionNamePipe } from "../../../Pipes/regionName";
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatExpansionModule,
    NzSelectModule,
    FormsModule,
    AttractionTypeNamePipe,
    regionNamePipe,
    MatSortModule,
    MatSortHeader,
    CommonModule,
  ],
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss'],
})
export class AttractionsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'like',
    'AttractionsName',
    'Description',
    'RegionId',
    'AttractionsTypeId',
    'ShomerShabat',
    'DetailsButton',
  ];

  isLoading = true;

  // dataSource!: MatTableDataSource<int_Attractions>;
  dataSource = new MatTableDataSource<int_Attractions>([]);
  areasofexpertisealData: int_Attractions[] = [];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userDetails: any;
  RegionsArrayData: any;
  AttractionsArrayData: any;
  showSearch: Boolean = false;
  selectedRegion: number = 0;
  selectedAttractionType: number = 0;
  // 🔥 FIX: key-based liked state (לא לפי ID בלבד)
  isLiked: { [key: string]: boolean } = {};

  constructor(
    public Attractions: srv_Attractions,
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

    this.RegionsArrayData = this.srv_all.getRegionsArray().subscribe(
      (data) => {
        this.RegionsArrayData = data;
      },
      (error) => {
        console.error('בעיה בהבאת האזורים', error);
      },
    );
    this.AttractionsArrayData = this.Attractions.getAttractionTypes();

    this.loadData();
    this.initLikedState();
  }


  //  יצירת KEY ייחודי
  getKey(type: string, id: number): string {
    return `${type}-${id}`;
  }

  // אתחול לייקים מהשרת (mock)
  initLikedState() {
    const userId = this.userDetails?.userId;

    if (!userId) return;

    const favs = this.srv_favorite.getFavoriteByCoordinatorId(userId);

    favs.forEach((f) => {
      if (f.AttractionsId) {
        this.isLiked[this.getKey('attraction', f.AttractionsId)] = true;
      }
      if (f.HostelsId) {
        this.isLiked[this.getKey('hostel', f.HostelsId)] = true;
      }
      if (f.WalkingTrailId) {
        this.isLiked[this.getKey('trail', f.WalkingTrailId)] = true;
      }
    });
  }
  loadData() {
    this.isLoading = true;
    this.Attractions.GetAttractions().subscribe({
      next: (rawData: int_Attractions[]) => {
        this.areasofexpertisealData = rawData;
        this.dataSource.data = rawData;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  ngOnInit() {
    //  this.dataSource = new MatTableDataSource(yourDataArray);
  
    this.dataSource.sortingDataAccessor = (item, property) => {
      console.log(item)

      switch (property) {
        case 'AttractionsName':
          return item.attractionsName; 
        case 'Description': 
          return item.description; 
        case 'RegionId':
          return item.reigionId; 
        case 'AttractionsTypeId': 
          return item.attractionTypeId; 
        case 'ShomerShabat': 
          return item.shomerShabat; 
       default:
          return (item as any)[property]; 
      }
    };
  }

  ngAfterViewInit() {
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  // הוספת שורת קוד זו
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

  openDialogRegistrations(element: int_Attractions) {
    this.dialog.open(ShowAttractionComponent, {
      width: '850px',
      data: element,
    });
  }

  newAttraction() {
    const element: int_Attractions = {
      attractionId: 0,
      attractionsName: "",
      reigionId: 0,
      address: "",
      attractionTypeId: 0,
      description: "",
      shomerShabat: 2,
      phone: ""
    };

    this.dialog.open(ShowAttractionComponent, {
      width: '850px',
      data: element
    });
  }


  ToShowSearch() {
    this.showSearch = !this.showSearch;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterTable() {
    const anyWord = document.getElementById(
      'searchControl',
    ) as HTMLInputElement | null;

    const attractionTypeSelect = document.getElementById(
      'AttractionTypeSelect',
    ) as HTMLSelectElement | null;

    const regionSelect = document.getElementById(
      'regionSelect',
    ) as HTMLSelectElement | null;

    if (!regionSelect || !attractionTypeSelect) return;

    const attractionTypeValue = Number(attractionTypeSelect.value);
    const searchText = anyWord?.value.trim().toLowerCase() ?? '';

    let filteredData: int_Attractions[] = [...this.areasofexpertisealData];

    if (searchText) {
      filteredData = filteredData.filter((x) => {
        const regionValue = this.srv_all.GetRegions(Number(x.reigionId));

        const regionText = String(regionValue).toLowerCase();

        return (
          (x.description ?? '').toLowerCase().includes(searchText) ||
          (x.address ?? '').toLowerCase().includes(searchText) ||
          (x.attractionsName ?? '').toLowerCase().includes(searchText) ||
          // this.Attractions
          //   .GetTypeByNumber(Number(x.attractionTypeId))
          //   .toLowerCase()
          //   .includes(searchText)

          // ||

          (x.phone ?? '').toLowerCase().includes(searchText) ||
          regionText.includes(searchText)
        );
      });
    }

    if (attractionTypeValue !== 0) {
      filteredData = filteredData.filter(
        (x) => Number(x.attractionTypeId) === attractionTypeValue,
      );
    }

    this.dataSource.data = filteredData;

    this.paginator?.firstPage();
  }



  resetFilters() {
    this.selectedRegion = 0;
    this.selectedAttractionType = 0;

    const regionSelect = document.getElementById(
      'regionSelect',
    ) as HTMLSelectElement | null;
    const typeSelect = document.getElementById(
      'AttractionTypeSelect',
    ) as HTMLSelectElement | null;

    if (regionSelect) regionSelect.value = '0';

    if (typeSelect) typeSelect.value = '0';

    this.dataSource.data = this.areasofexpertisealData;
    this.paginator?.firstPage();
  }


}
