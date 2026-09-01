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
import { RefreshService } from '../../../Services/RefreshService';


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
    'reigionId',
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
  // map של סוגי אטרקציות (typeId -> שם) לשם מיון לפי טקסט
  attractionTypesMap: { [id: number]: string } = {};
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
        public refreshService: RefreshService,


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

    // מילוי ה-map של סוגי האטרקציות לשם מיון לפי טקסט
    this.Attractions.getAttractionTypes().subscribe((types: any) => {
      (types || []).forEach((t: any) => {
        const id = t.attractionTypeId ?? t.id;
        const name = t.attractionTypeName ?? t.name;
        if (id != null) this.attractionTypesMap[id] = name ?? String(id);
      });
    });

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
        console.log("נתוני אטרקציות גולמיים:", rawData);
        this.areasofexpertisealData = rawData;
        this.dataSource.data = rawData;
        this.isLoading = false;

        // הטבלה נוצרת עכשיו (@else) — נחבר את ה-sort והפיגינציה
        setTimeout(() => {
          if (this.paginator) this.dataSource.paginator = this.paginator;
          if (this.sort) this.dataSource.sort = this.sort;
        });
      },

      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  
  ngOnInit() {
 //טעינה מחדש לאחר שינוי בנתוני הטבלה
    this.refreshService.refresh$.subscribe(() => {
      this.loadData(); // טען מחדש את הנתונים
    });
 

    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case 'AttractionsName':
          return item.attractionsName;
        case 'Description':
          return item.description;
        case 'reigionId':
          // מיון לפי שם האזור (טקסט) ולא לפי ה-ID
          return this.srv_all.GetRegions(Number(item.reigionId));
        case 'AttractionsTypeId':
          // מיון לפי שם סוג האטרקציה (טקסט) ולא לפי ה-ID
          return (
            this.attractionTypesMap[Number(item.attractionTypeId)] ??
            String(item.attractionTypeId)
          );
        case 'ShomerShabat':
          // מיון לפי הטקסט שמוצג בעמודה
          return item.shomerShabat === 2
            ? 'שומר שבת'
            : item.shomerShabat === 1
              ? 'לא ידוע'
              : 'לא שומר שבת';
        default:
          return item[property];
      }
    };
  }

  

  // ngAfterViewInit() {
  //   // חיבור גיבוי של ה-sort והפיגינציה כשה-view מוכן
  //   setTimeout(() => {
  //     if (this.paginator) this.dataSource.paginator = this.paginator;
  //     if (this.sort) this.dataSource.sort = this.sort;
  //   });
  // }
ngAfterViewInit() {
  console.log('aaa')
  // חיבור ה-paginator וה-sort
  setTimeout(() => {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort; // חיבור ה-sort
    }
  });
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

    const regionSelect = document.getElementById(
      'regionSelect',
    ) as HTMLSelectElement | null;

    // regionSelect קיים רק כשבוחר האזור פתוח (תוך showSearch).
    // אם הוא חסר ב-DOM — מתייחסים אליו כאל "כל האזורים" (0),
    // כדי שהחיפוש החופשי יעבוד גם כשבוחר האזור לא מוצג.
    const selectedRegionValue = regionSelect ? Number(regionSelect.value) : 0;

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
          (x.phone ?? '').toLowerCase().includes(searchText) ||
          regionText.includes(searchText)
        );
      });
    }

    if (selectedRegionValue !== 0) {
      filteredData = filteredData.filter(
        (x) => Number(x.reigionId) === selectedRegionValue,
      );
    }

    this.dataSource.data = filteredData;

    this.paginator?.firstPage();
  }



  resetFilters() {
    console.log('aaa')
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
