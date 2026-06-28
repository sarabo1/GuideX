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
import { ServiceUsersService } from '../../../Services/service-users.service';
import { MatDialogRef } from '@angular/material/dialog';

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
  ],
  templateUrl: './guide-registrations.component.html',
  styleUrl: './guide-registrations.component.scss',
  standalone: true,
})
export class GuideRegistrationsComponent {
  selectedOrigins: number[] = [];
  Origins: any;
  cities: string[] = [];
  filteredCities: string[] = [];
  showPassword = false;
  CertificatesFiles: File[] = [];
  resumeFile: File | null = null;

  LastGuideId: number;
  lastUserId: number;

  constructor(
    private dialogRef: MatDialogRef<GuideRegistrationsComponent>,
    private router: Router,
    public srv_all: ServiceAllService,
    private srvCities: SrvCities,
    public srv_guides: Srv_Guide,
    public srv_user: ServiceUsersService,
  ) {
    this.Origins = srv_all.getRegionsArray();
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
    Email: new FormControl('', [
      Validators.required,
       Validators.email
      ]),
    UserPassword: new FormControl('', [
      Validators.required,
      this.passwordValidator,
    ]),
    CityId: new FormControl('', [
      Validators.required
    ]),
    ReligiousId: new FormControl('', [
      Validators.required
    ]),
    selectedOrigins: new FormControl<number[]>([], [Validators.required]),
    CertificatesFiles: new FormControl<File[]>([],[Validators.required]), // קבצי תעודות (מרובים)
    resumeFile: new FormControl<File | null>(null,[Validators.required]), // קורות חיים (קובץ אחד)
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
      const userData = {
        userId: this.lastUserId,
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
        userData.userPassword,
        userData.firstName,
        userData.idNumber,
        userData.cityId,
        userData.phoneNumber,
        userData.email,
      );
      const resumeFile = this.formGuide.value.resumeFile as File;
      const certificatesFiles = this.formGuide.value.CertificatesFiles as File[];
      const guideData = {
        userId: this.lastUserId,
        guideId: this.LastGuideId,
        origin: this.selectedOrigins,
        religiousId: Number(this.formGuide.value.ReligiousId) || 0,
        certificatesFiles,
        resumeFile,
      };
      console.log(guideData.resumeFile);
      this.srv_guides.addGuide(
        guideData.userId,
        guideData.guideId,
        guideData.origin,
        guideData.religiousId,
        guideData.certificatesFiles,
        guideData.resumeFile,
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const filesArray = Array.from(input.files);
      this.formGuide.patchValue({ CertificatesFiles: filesArray });
    }

    console.log("קבציפ רבים");
  }

  onOneFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0]; // קובץ אחד בלבד
      this.formGuide.patchValue({ resumeFile: file });
    }
    console.log('Selected file:', File);
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

    if (checkbox.checked) {
      this.selectedOrigins.push(Number(checkbox.value));
    } else {
      const index = this.selectedOrigins.indexOf(Number(checkbox.value));

      if (index > -1) {
        this.selectedOrigins.splice(index, 1);
      }
    }

    this.formGuide.patchValue({
      selectedOrigins: [...this.selectedOrigins],
    });

    this.formGuide.get('selectedOrigins')?.markAsTouched();
    this.formGuide.get('selectedOrigins')?.updateValueAndValidity();

    console.log(
      'selectedOrigins:',
      this.formGuide.get('selectedOrigins')?.value,
    );

    // עדכון ה-FormControl
    this.formGuide.patchValue({
      selectedOrigins: [...this.selectedOrigins],
    });

    console.log('selectedOrigins:', this.selectedOrigins); // לוג להראות את הערכים הנוכחיים
  }

  isChecked(code: number): boolean {
    return this.selectedOrigins.includes(code);
  }
}
