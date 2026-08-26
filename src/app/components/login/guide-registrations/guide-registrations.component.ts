import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServiceAllService } from '../../../Services/service-all.service';
import { IdIsraelValidator } from '../../../Services/israel_ID';
import { SrvCities } from '../../../Services/srv-cities.service';
import { PhoneValidatorService } from '../../../Services/phone_validator';
import { PasswordvalidatorService } from '../../../Services/Password_validator';
import { Srv_Guide } from '../../../Services/srv-guide.service';
import { ServiceUsersService } from '../../../Services/srv-users';
import { MatDialogRef } from '@angular/material/dialog';
import { regionNamePipe } from "../../../Pipes/regionName";

@Component({
  selector: 'app-guide-registrations',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MultiSelectModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    regionNamePipe
],
  templateUrl: './guide-registrations.component.html',
  styleUrl: './guide-registrations.component.scss',
  standalone: true,
})
export class GuideRegistrationsComponent {
  AreasOfExpertises: any[] = [];
  cities: string[] = [];
  filteredCities: string[] = [];
  showPassword = false;
  CertificatesFiles: File[] = [];
  resumeFiles: File | null = null;
  LastGuideId: number;
  lastUserId: number;
  userIdExist: number = 0;
  guideIdExist: number = 0;


  constructor(
    private dialogRef: MatDialogRef<GuideRegistrationsComponent>,
    private router: Router,
    public srv_all: ServiceAllService,
    private srvCities: SrvCities,
    public srv_guides: Srv_Guide,
    public srv_user: ServiceUsersService,
  ) {
    //this.AreasOfExpertises = srv_all.getRegionsArray();
      this.srv_all.getRegionsArray().subscribe((areas) => {
      this.AreasOfExpertises = areas;
    });
    this.LastGuideId = srv_guides.GetLastGuideId() + 1;
    this.lastUserId = srv_user.GetLastUserId() + 1;
  }
  private phoneValidatorSrv = inject(PhoneValidatorService);

  phoneValidator = this.phoneValidatorSrv.phoneValidator;
  private IdIsrael = inject(IdIsraelValidator);

  private PasswordvalidatorSrv = inject(PasswordvalidatorService);
  passwordValidator = this.PasswordvalidatorSrv.passwordValidator;

  ngOnInit() {
    this.srvCities.getData().subscribe((cities) => {
      this.cities = cities;
      this.filteredCities = this.cities;
    });
  }

  IsraelIdValidator = this.IdIsrael.idValidator();

  formGuide = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    IdNumber: new FormControl('', [
      Validators.required,
      this.IsraelIdValidator,
    ]),
    PhoneNumber: new FormControl('', [
      Validators.required,
      this.phoneValidator,
    ]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    UserPassword: new FormControl('', [
      Validators.required,
      this.passwordValidator,
    ]),
    CityId: new FormControl('', [Validators.required]),
    ReligiousId: new FormControl('', [Validators.required]),
    selectedAreasOfExpertises: new FormControl<number[]>(
      [],
      [Validators.required],
    ),
    CertificatesFiles: new FormControl<File[]>([]), // קבצי תעודות (מרובים)
    resumeFiles: new FormControl<File | null>(null), // קורות חיים (קובץ אחד)
  });

  religiousData = [
    { id: 1, name: 'חסידי' },
    { id: 2, name: 'ספרדי' },
    { id: 3, name: 'אשכנזי' },
    { id: 4, name: 'אחר' },
  ];

  newGuide() {
    const selectedCity = this.formGuide.get('CityId')?.value;
    if (!selectedCity || !this.filteredCities.includes(selectedCity)) {
      alert('אנא בחר עיר מהרשימה.');
      return;
    }

    let CityIdToSave;
    if (this.srvCities.ExistsCity(selectedCity) != 0) {
      CityIdToSave = this.srvCities.ExistsCity(selectedCity);
    } else {
      CityIdToSave = this.srvCities.GetLastCityId() + 1;
      this.srvCities.AddCity(selectedCity);
    }

    if (this.formGuide.valid) {
      let idUserId = 0;
      if (this.userIdExist != 0) {
        idUserId = this.userIdExist;
      } else {
        idUserId = this.lastUserId;
      }

      const userData = {
        userId: idUserId,
        userPassword: this.formGuide.value.UserPassword || '',
        firstName: this.formGuide.value.FirstName || '',
        lastName: this.formGuide.value.LastName || '',
        idNumber: this.formGuide.value.IdNumber || '',
        cityId: CityIdToSave,
        phoneNumber: this.formGuide.value.PhoneNumber || '',
        email: this.formGuide.value.Email || '',
      };

      console.log('User Data:', userData);
      this.srv_user.InsertUser(
        userData.userId,
        userData.userPassword,
        userData.firstName,
        userData.lastName,
        userData.idNumber,
        userData.cityId,
        userData.phoneNumber,
        userData.email,
      );
      // const resumeFiles = this.formGuide.value.resumeFiles as File;
      // const certificatesFiles = this.formGuide.value.CertificatesFiles as File[];

      const certificatesFiles = this.formGuide.value
        .CertificatesFiles as File[];
      const resumeFiles = this.formGuide.value.resumeFiles as File;

      let idGuideId = 0;
      if (this.userIdExist != 0) {
        idGuideId = this.guideIdExist;
      } else {
        idGuideId = this.LastGuideId;
      }
      const guideData = {
        userId: idUserId,
        guideId: idGuideId,
        areasofexpertise: this.formGuide.value.selectedAreasOfExpertises || [],
        religiousId: Number(this.formGuide.value.ReligiousId) || 0,
        certificatesFiles,
        resumeFiles,
      };
      console.log(guideData.resumeFiles);
      this.srv_guides.addGuide(
        guideData.userId,
        guideData.guideId,
        guideData.areasofexpertise,
        guideData.religiousId,
        guideData.certificatesFiles,
        guideData.resumeFiles,
      );

      console.log('Guide Data:', guideData);

      //הכנסת הנתונים בLOCAL STRONGE
      const userObj = { email: userData.email, userId: userData.userId };
      localStorage.setItem('user_data', JSON.stringify(userObj));
      this.formGuide.reset();
      this.dialogRef.close();
      this.router.navigate(['welcome/Home_Page']);
    } else {
      console.error('טופס לא תקין:', this.formGuide.errors);
    }
  }

  PasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     const filesArray = Array.from(input.files);
  //     this.formGuide.patchValue({ CertificatesFiles: filesArray });
  //   }

  // }
  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;

  //   if (input.files) {
  //     this.CertificatesFiles = Array.from(input.files);
  //   }
  // }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = Array.from(input.files);

      // 1. לטופס (ולידציה)
      this.formGuide.get('CertificatesFiles')?.setValue(files);

      // 2. לתצוגה
      this.CertificatesFiles = files;
    }
  }

  // onOneFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     const file = input.files[0]; // קובץ אחד בלבד
  //     this.formGuide.patchValue({ resumeFiles: file });
  //   }
  // }
  // onOneFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;

  //   if (input.files && input.files.length > 0) {
  //     this.resumeFiles = input.files[0];
  //   }
  // }

  onOneFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // 1. לטופס
      this.formGuide.get('resumeFiles')?.setValue(file);

      // 2. לתצוגה
      this.resumeFiles = file;
    }
  }

  filterCity(event: Event) {
    const input = event.target as HTMLInputElement;
    const cityToFilter = input.value.toLowerCase();
    this.filteredCities = this.cities.filter((city) =>
      city.toLowerCase().includes(cityToFilter),
    );
  }


  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const control = this.formGuide.get('selectedAreasOfExpertises');

    let current: number[] = control?.value ?? [];

    if (checkbox.checked) {
      current = [...current, Number(checkbox.value)];
    } else {
      current = current.filter((x) => x !== Number(checkbox.value));
    }

    control?.setValue(current);
    control?.markAsTouched();
    control?.updateValueAndValidity();
  }


  isChecked(num: number): boolean {
    const selected =
      this.formGuide.get('selectedAreasOfExpertises')?.value ?? [];
    return selected.includes(num);
  }

  searchGuide() {
    const numberId = this.formGuide.get('IdNumber');
    if (numberId?.invalid) return;

    const idNumber = String(this.formGuide.value.IdNumber);
    const guideDetails = this.getGuideDetailsByIdNumber(idNumber);

    console.log('idNmber: ', idNumber);
    console.log(guideDetails);

    if (guideDetails == null) {
      this.CertificatesFiles = [];
      this.resumeFiles = null;
      this.formGuide.get('resumeFiles')?.setValue(null);
      this.formGuide.get('CertificatesFiles')?.setValue([]);
      this.formGuide.get('selectedAreasOfExpertises')?.setValue([]);
      this.formGuide.get('ReligiousId')?.setValue('');
      this.guideIdExist = 0;
      this.userIdExist = 0;
      return;
    }

    this.guideIdExist = guideDetails.GuideId;
    this.userIdExist = guideDetails.UserId;
    this.resumeFiles = guideDetails.resumeFiles;
    this.CertificatesFiles = guideDetails.CertificatesFiles;
    this.formGuide
      .get('ReligiousId')
      ?.setValue(String(guideDetails.ReligiousId));
    this.formGuide
      .get('selectedAreasOfExpertises')
      ?.setValue(guideDetails.AreasOfExpertise);
  }

  private getGuideDetailsByIdNumber(idNumber: string): any | null {
    const guideService = this.srv_guides as any;

    if (typeof guideService.getGuideDetailsByIdNumber === 'function') {
      return guideService.getGuideDetailsByIdNumber(idNumber);
    }

    if (typeof guideService.GetGuideByIdNumber === 'function') {
      return guideService.GetGuideByIdNumber(idNumber);
    }

    if (typeof guideService.GetGuideById === 'function') {
      return guideService.GetGuideById(idNumber);
    }

    if (Array.isArray(guideService.guides)) {
      return (
        guideService.guides.find((guide: any) => guide.idNumber === idNumber) ??
        null
      );
    }

    return null;
  }
}
