import { Component, Inject, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ServiceUsersService } from '../../Services/srv-users';
import { Srv_Guide } from '../../Services/srv-guide.service';
import { ServiceAllService } from '../../Services/service-all.service';
import { SrvCities } from '../../Services/srv-cities.service';
import { SrvSchoolService } from '../../Services/srv-school.service';
import { PhoneValidatorService } from '../../Services/phone_validator';

@Component({
  selector: 'app-edit-user-detail',
  imports: [ReactiveFormsModule, MatIcon, CommonModule],
  templateUrl: './edit-user-detail.component.html',
  styleUrl: './edit-user-detail.component.scss',
})
export class EditUserDetailComponent {
  // ── נתוני המשתמש והפרופיל ──
  userId: number | string | null = null;
  profile: any = null;
  profileType: '' | 'guide' | 'coordinator' = '';

  loading = true;
  saving = false;
  error = '';

  // ── רשימות מילוי ──
  cities: string[] = [];
  filteredCities: string[] = [];
  religiousData: any[] = [];
  AreasOfExpertises: any[] = [];
  RoleIdData: any[] = [];
  schools: any[] = [];
  filteredSchools: any[] = [];
  AgeSchoolIdData = [
    { id: 1, name: 'יסודי' },
    { id: 2, name: 'חט"ב' },
    { id: 3, name: 'תיכון' },
    { id: 4, name: 'אחר' },
  ];

  // ── קבצים (מדריכה) ──
  CertificatesFiles: File[] = [];
  resumeFiles: File | null = null;

  private phoneValidatorSrv = inject(PhoneValidatorService);
  phoneValidator = this.phoneValidatorSrv.phoneValidator;

  constructor(
    public dialogRef: MatDialogRef<EditUserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public srv_user: ServiceUsersService,
    public srv_guide: Srv_Guide,
    public srv_all: ServiceAllService,
    private srvCities: SrvCities,
    private srvSchools: SrvSchoolService,
  ) {
    this.userId = data?.userId ?? null;
  }

  // ── טופס מדריכה ──
  formGuide = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    IdNumber: new FormControl({ value: '', disabled: true }),
    PhoneNumber: new FormControl('', [
      Validators.required,
      this.phoneValidator,
    ]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    UserPassword: new FormControl({ value: '', disabled: true }),
    CityId: new FormControl('', [Validators.required]),
    ReligiousId: new FormControl('', [Validators.required]),
    selectedAreasOfExpertises: new FormControl<number[]>(
      [],
      [Validators.required],
    ),
  });

  // ── טופס רכזת/מוסד ──
  formCoordinator = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    IdNumber: new FormControl({ value: '', disabled: true }),
    PhoneNumber: new FormControl('', [
      Validators.required,
      this.phoneValidator,
    ]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    UserPassword: new FormControl({ value: '', disabled: true }),
    RoleId: new FormControl('', [Validators.required]),
    SchoolName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    IsBoys: new FormControl('', [Validators.required]),
    CityId: new FormControl('', [Validators.required]),
    PrincipalName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    PhoneSecretary: new FormControl('', [
      Validators.required,
      this.phoneValidator,
    ]),
    TypeSchoolId: new FormControl('', [Validators.required]),
    AgeSchoolId: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    // טעינת רשימות העזר
    this.srv_all.getreligiousArray().subscribe((religious: any[]) => {
      this.religiousData = religious;
    });
    this.srv_all.getRegionsArray().subscribe((areas: any[]) => {
      this.AreasOfExpertises = areas;
    });
    this.srv_all.getRolesArray().subscribe((roles: any[]) => {
      this.RoleIdData = roles;
    });
    this.srvCities.getData().subscribe((cities: string[]) => {
      this.cities = cities;
      this.filteredCities = cities;
    });
    this.schools = this.srvSchools.GetSchools();
    this.filteredSchools = this.schools;

    this.loadProfile();
  }

  /** שולף את הפרופיל מהשרת לפי UserId וממלא את הטופס. */
  private loadProfile() {
    if (this.userId == null) {
      this.error = 'לא נמצא משתמש מחובר לעריכה.';
      this.loading = false;
      return;
    }

    this.srv_user.getProfile(this.userId).subscribe((profile) => {
      this.loading = false;
      if (!profile || (profile.type !== 'guide' && profile.type !== 'coordinator')) {
        this.error = 'לא ניתן לטעון את הפרטים לעריכה.';
        return;
      }

      this.profile = profile;
      this.profileType = profile.type;
      this.fillForm();
    });
  }

  /** ממלא את הטופס לפי הסוג בנתוני הפרופיל. */
  fillForm() {
    if (this.profileType === 'guide') {
      const u = this.profile.user;
      const g = this.profile.guide;
      this.formGuide.patchValue({
        FirstName: u.firstName,
        LastName: u.lastName,
        IdNumber: u.idNumber,
        PhoneNumber: u.phoneNumber || '',
        Email: u.email,
        CityId: u.city || '',
        ReligiousId: g.religiousId ? String(g.religiousId) : '',
        selectedAreasOfExpertises: g.regionId ?? [],
      });
    } else if (this.profileType === 'coordinator') {
      const u = this.profile.user;
      const c = this.profile.coordinator;
      const s = c.school;
      this.formCoordinator.patchValue({
        FirstName: u.firstName,
        LastName: u.lastName,
        IdNumber: u.idNumber,
        PhoneNumber: u.phoneNumber || '',
        Email: u.email,
        RoleId: c.roleId ? String(c.roleId) : '',
        SchoolName: s?.schoolName || '',
        IsBoys: s ? String(s.isBoys ? 1 : 0) : '',
        CityId: s?.city || u.city || '',
        PrincipalName: s?.principalName || '',
        PhoneSecretary: s?.phoneSecretary || '',
        TypeSchoolId: s?.typeSchoolId ? String(s.typeSchoolId) : '',
        AgeSchoolId: s?.ageSchoolId ? String(s.ageSchoolId) : '',
      });
    }
  }

  // ── אירועי טופס משותפים ──
  filterCity(event: Event) {
    const input = event.target as HTMLInputElement;
    const cityToFilter = input.value.toLowerCase();
    this.filteredCities = this.cities.filter((city) =>
      city.toLowerCase().includes(cityToFilter),
    );
  }

  filterSchool(event: Event) {
    const input = event.target as HTMLInputElement;
    const schoolToFilter = input.value.toLowerCase();
    this.filteredSchools = this.schools.filter((school: any) =>
      school.SchoolName.toLowerCase().includes(schoolToFilter),
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
  }

  isChecked(num: number): boolean {
    const selected = this.formGuide.get('selectedAreasOfExpertises')?.value ?? [];
    return selected.includes(num);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      this.CertificatesFiles = files;
    }
  }

  onOneFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.resumeFiles = input.files[0];
    }
  }

  // ── שליחה ושמירה ──
  onSubmit() {
    if (this.saving) return;

    if (this.profileType === 'guide') {
      if (this.formGuide.invalid) {
        this.formGuide.markAllAsTouched();
        return;
      }
      this.saveGuide();
    } else if (this.profileType === 'coordinator') {
      if (this.formCoordinator.invalid) {
        this.formCoordinator.markAllAsTouched();
        return;
      }
      this.saveCoordinator();
    }
  }

  private saveGuide() {
    this.saving = true;
    const v = this.formGuide.getRawValue(); // חשוב: כולל שדות disabled (ת.ז. וסיסמה)
    const selectedCity = v.CityId || this.profile.user.city;
    const regionIds = (v.selectedAreasOfExpertises as number[]) || [];

    const payload = {
      FirstName: v.FirstName || '',
      LastName: v.LastName || '',
      IdNumber: v.IdNumber || this.profile.user.idNumber || '',
      City: selectedCity,
      PhoneNumber: v.PhoneNumber || '',
      Email: v.Email || '',
      UserPassword: v.UserPassword || this.profile.user.userPassword || '',
      ReligiousId: Number(v.ReligiousId) || 0,
      RegionIds: regionIds,
      ResumeFile: this.resumeFiles,
      CertificateFiles: this.CertificatesFiles,
    };

    this.srv_guide.addGuide(payload).subscribe((res) => {
      this.saving = false;
      if (!res) {
        this.error = 'אירעה שגיאה בשמירת הפרטים. נא לנסות שוב.';
        return;
      }
      this.dialogRef.close(true);
    });
  }

  private saveCoordinator() {
    this.saving = true;
    const v = this.formCoordinator.getRawValue();
    const coord = this.profile.coordinator;
    const schoolCity = v.CityId || this.profile.user.city || '';

    const payload = {
      userId: Number(this.userId),
      firstName: v.FirstName || '',
      lastName: v.LastName || '',
      city: schoolCity,
      phoneNumber: v.PhoneNumber || '',
      email: v.Email || '',
      roleId: Number(v.RoleId) || 0,
      schoolId: coord?.schoolId || null,
      schoolName: v.SchoolName || '',
      isBoys: v.IsBoys === '1',
      schoolCity: schoolCity,
      principalName: v.PrincipalName || '',
      phoneSecretary: v.PhoneSecretary || '',
      typeSchoolId: Number(v.TypeSchoolId) || 0,
      ageSchoolId: Number(v.AgeSchoolId) || 0,
    };

    this.srv_user.updateCoordinator(payload).subscribe((res) => {
      this.saving = false;
      if (!res) {
        this.error = 'אירעה שגיאה בשמירת הפרטים. נא לנסות שוב.';
        return;
      }
      this.dialogRef.close(true);
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
