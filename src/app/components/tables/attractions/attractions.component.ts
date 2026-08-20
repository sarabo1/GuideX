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
import { MatSortHeader, MatSortModule } from '@angular/material/sort';

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

  // loadData() {
  //   this.Attractions.GetAttractions().subscribe((rawData: int_Attractions[]) => {
  //     this.areasofexpertisealData = rawData;

  //     const ELEMENT_DATA: int_Attractions[] = rawData.map((attraction) => ({
  //       AttractionsId: attraction.AttractionsId,
  //       AttractionsName: attraction.AttractionsName,
  //       RegionId: attraction.RegionId,
  //       Address: attraction.Address,
  //       AttractionsTypeId: attraction.AttractionsTypeId,
  //       Description: attraction.Description,
  //       ShomerShabat: attraction.ShomerShabat,
  //       Phone: attraction.Phone,
  //     }));

  // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  // const rawData: int_Attractions[] = this.Attractions.GetAttractions();
  // this.areasofexpertisealData = rawData;

  // const ELEMENT_DATA: int_Attractions[] = rawData.map((attraction) => ({
  //   AttractionsId: attraction.AttractionsId,
  //   AttractionsName: attraction.AttractionsName,
  //   RegionId: attraction.RegionId,
  //   Address: attraction.Address,
  //   AttractionsTypeId: attraction.AttractionsTypeId,
  //   Description: attraction.Description,
  //   ShomerShabat: attraction.ShomerShabat,
  //   Phone: attraction.Phone,
  // }));

  // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  //   this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  //   });
  // }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
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

  newAttraction(){
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
      data : element
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

  // ngOnInit() {
  //   this.dataSource = new MatTableDataSource(users);

  //   // Define the filter predicate
  //   this.dataSource.filterPredicate = (data: UserData, filter: string) => {
  //     const dataStr = data.id.toString().toLowerCase() +
  //                      data.name.toLowerCase() +
  //                      data.progress.toString().toLowerCase() +
  //                      data.fruit.toLowerCase();
  //     return dataStr.indexOf(filter) !== -1; // return true if filter matches any field
  //   };
  // }

  // filterTable() {
  //   const anyWord = document.getElementById(
  //     'searchControl',
  //   ) as HTMLInputElement | null;
  //   const AttractionTypeSelect = document.getElementById(
  //     'AttractionTypeSelect',
  //   ) as HTMLSelectElement | null;
  //   const regionSelect = document.getElementById(
  //     'regionSelect',
  //   ) as HTMLSelectElement | null;

  //   if (!regionSelect || !AttractionTypeSelect) return;

  //   const AttractionTypeValue = Number(AttractionTypeSelect.value);
  //   const searchText = anyWord?.value.trim() ?? '';

  //   const regionValues = Array.from(regionSelect.selectedOptions).map(
  //     (option) => Number(option.value),
  //   );

  //   let filteredData: int_Attractions[] = this.areasofexpertisealData;

  //   if (searchText) {
  //     filteredData = filteredData.filter((x) => {
  //       const regionValue = this.srv_all.GetRegions(Number(x.RegionId));

  //       const regionText = Array.isArray(regionValue)
  //         ? regionValue.join(', ')
  //         : String(regionValue);

  //       return (
  //         x.description.includes(searchText) ||
  //         x.address.includes(searchText) ||
  //         x.attractionName.includes(searchText) ||
  //         this.Attractions.GetTypeByNumber(x.AttractionTypeId).includes(
  //           searchText,
  //         ) ||
  //         x.Phone.includes(searchText) ||
  //         regionText.includes(searchText)
  //       );
  //     });
  //   }

  //   // if (regionValues.length > 0 && !regionValues.includes(0)) {
  //   //   filteredData = filteredData.filter((x) =>
  //   //     regionValues.includes(x.RegionId),
  //   //   );
  //   // }

  //   if (AttractionTypeValue !== 0) {
  //     filteredData = filteredData.filter(
  //       (x) => x.AttractionsTypeId === AttractionTypeValue,
  //     );
  //   }

  //   this.dataSource.data = filteredData;
  //   this.paginator?.firstPage();
  // }

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

  // resetFilters() {
  //   this.selectedRegion = 0;
  //   this.selectedAttractionType = 0;

  //   const regionSelect = document.getElementById(
  //     'regionSelect',
  //   ) as HTMLSelectElement;
  //   const typeSelect = document.getElementById(
  //     'AttractionTypeSelect',
  //   ) as HTMLSelectElement;

  //   if (regionSelect) regionSelect.value = '0';
  //   if (typeSelect) typeSelect.value = '0';

  //   this.dataSource.data = this.areasofexpertisealData;
  //   this.paginator?.firstPage();
  // }

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

  // getAttractionType(AttractionsTypeId: number) {
  //   let attractionTypeName = null;
  //   if (AttractionsTypeId !== undefined) {
  //     this.Attractions.GetTypeByNumber(AttractionsTypeId).subscribe(
  //       (data) => {
  //         console.log('Attraction Type Name:', data);
  //         attractionTypeName = data;
  //       },
  //       (error) => {
  //         console.error('Error fetching attraction type:', error);
  //       },
  //     );
  //   } else {
  //     console.error('AttractionsTypeId is undefined');
  //   }
  //   return attractionTypeName;
  // }
}
