import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ServiceUsersService } from '../../../Services/srv-users';
import { AuthService } from '../../../Services/auth-service.service';
import { AdminUser, PermissionDef } from '../../../Interfaces/interface-users';

/**
 * דף ניהול — ניהול הרשאות משתמשים.
 * מציג את כל המשתמשים באתר, ועבור כל אחד את שמו המלא ואת רשימת ההרשאות שלו.
 * בלחיצה על הרשאה — היא מתהפכת (on/off) ונשלח עדכון לשרת.
 */
@Component({
  selector: 'app-user-permissions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './user-permissions.component.html',
  styleUrl: './user-permissions.component.scss',
})
export class UserPermissionsComponent implements OnDestroy {
  /** כל המשתמשים שנטענו מהשרת. */
  users: AdminUser[] = [];

  /** המשתמשים שמוצגים בטבלה, לאחר הסינון לפי הרשאת המשתמש המחובר. */
  visibleUsers: AdminUser[] = [];

  isLoading = true;
  errorMessage = '';
  savingKey: string | null = null;
  errorKey: string | null = null;
  updateError = '';
  fading = false;

  private errorTimer: any = null;

  readonly permissions: PermissionDef[] = [
    { key: 'userManagement', label: 'ניהול משתמשים', icon: 'manage_accounts' },
    { key: 'editRoutes', label: 'ניהול מסלולים', icon: 'edit_road' },
    { key: 'editAttractions', label: 'ניהול אטרקציות', icon: 'attractions' },
    { key: 'editHostels', label: 'ניהול מקומות לינה', icon: 'hotel' },
    { key: 'respondInGeneralForum', label: 'הגבה בפורום כללי', icon: 'forum' },
    { key: 'respondInSafetyForum', label: 'הגבה בפורום בטיחות', icon: 'shield' },
  ];

  /**
   * נכון רק למנהל ראשי (superAdmin).
   * מי שיש לו הרשאת "ניהול משתמשים" בלבד (ולא superAdmin) לא רואה
   * בכלל את עמודת "ניהול משתמשים" בטבלה — אינו רשאי לנהל את ההרשאה הזו של אחרים.
   */
  showUserManagementColumn = false;

  constructor(
    public serviceUsers: ServiceUsersService,
    private authService: AuthService,
  ) {
    // העמודה "ניהול משתמשים" מוצגת רק למנהל ראשי (superAdmin).
    this.showUserManagementColumn = this.authService.hasPermission('superAdmin');
    this.loadData();
  }

  /** טוען את כל המשתמשים מהשרת ומסנן אותם לפי הרשאת המשתמש המחובר. */
  loadData() {
    this.isLoading = true;
    this.errorMessage = '';

    this.serviceUsers.GetAllUsers().subscribe({
      next: (users: any[]) => {
        this.users = (users ?? []).map((u) => u as AdminUser);
        this.visibleUsers = this.filterUsers(this.users);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('שגיאה בשליפת המשתמשים:', err);
        this.errorMessage = 'אירעה שגיאה בטעינת המשתמשים. נא לנסות שוב.';
        this.isLoading = false;
      },
    });
  }

  /**
   * מסנן את רשימת המשתמשים לפי הרשאת המשתמש המחובר:
   * - אם המחובר הוא SuperAdmin — מציג את כל המשתמשים, חוץ מאלה שגם הם SuperAdmin.
   * - אחרת (UserManagement בלבד) — מציג רק משתמשים שאצלם userManagement = false.
   */
  private filterUsers(users: AdminUser[]): AdminUser[] {
    const currentIsSuperAdmin = this.authService.hasPermission('superAdmin');

    if (currentIsSuperAdmin) {
      return users.filter((u) => !u.superAdmin);
    }
    return users.filter((u) => !u.userManagement);
  }

  /** שם מלא של משתמש. */
  fullName(user: AdminUser): string {
    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  }

  /** ערך הרשאה נוכחי של משתמש. */
  getValue(user: AdminUser, key: keyof AdminUser): boolean {
    return Boolean(user[key]);
  }

  /** מפתח ייחודי למעקב אחר עדכון הרשאה מסוימת. */
  buildKey(user: AdminUser, permKey: keyof AdminUser): string {
    return `${user.userId}-${String(permKey)}`;
  }

  /**
   * מציגה הודעת שגיאה עדינה ליד הכפתור, והיא נעלמת מעצמה
   * אחרי מספר שניות עם אפקט דהייה.
   */
  showUpdateError(key: string, message: string) {
    this.errorKey = key;
    this.updateError = message;
    this.fading = false;

    // איפוס טיימרים קודמים כדי שהניסיון החדש יאריך את התצוגה מההתחלה.
    clearTimeout(this.errorTimer);
    this.errorTimer = setTimeout(() => {
      this.fading = true; // מתחיל את הדהייה
      this.errorTimer = setTimeout(() => {
        this.errorKey = null;
        this.updateError = '';
        this.fading = false;
      }, 900);
    }, 3000);
  }

  ngOnDestroy() {
    clearTimeout(this.errorTimer);
  }

  /**
   * הפוך הרשאת משתמש: משנה את הערך המקומי ושולח עדכון לשרת.
   * עם הצלחה — נשאר הערך החדש; עם שגיאה — חוזרים לערך הקודם.
   */
  toggle(user: AdminUser, perm: PermissionDef) {
    const key = this.buildKey(user, perm.key);
    if (this.savingKey !== null) return; // כבר מתבצע עדכון אחר
    this.savingKey = key;

    const newValue = !this.getValue(user, perm.key);
    const previousValue = this.getValue(user, perm.key);

    // עדכון אופטימי בתצוגה.
    (user as any)[perm.key] = newValue;
    this.errorKey = null;
    this.updateError = '';

    this.serviceUsers
      .UpdatePermission(user.userId, String(perm.key))
      .subscribe({
        next: (res: any) => {
          this.savingKey = null;
          // catchError החזיר null במקרה של שגיאה — נשחזר את הערך הקודם.
          if (res === null) {
            (user as any)[perm.key] = previousValue;
            this.showUpdateError(key, 'לא הצלחנו לשמור את השינוי. נסו שוב.');
          }
        },
        error: (err: any) => {
          this.savingKey = null;
          (user as any)[perm.key] = previousValue;
          console.error(`שגיאה בעדכון ההרשאה ${String(perm.key)}:`, err);
          this.showUpdateError(key, 'לא הצלחנו לשמור את השינוי. נסו שוב.');
        },
      });
  }
}
