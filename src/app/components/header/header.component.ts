import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../Services/auth-service.service';
import { ServiceUsersService } from '../../Services/srv-users';
import { MatDialog } from '@angular/material/dialog';
import { HebrewDateConverterPipe } from '../../Pipes/hebrewDateConverter ';
import { CommonModule } from '@angular/common';
import { GreetingPipe } from '../../Pipes/GreetingPipe';
import { EditUserDetailComponent } from '../edit-user-detail/edit-user-detail.component';
import { SidebarModule } from 'primeng/sidebar';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-header',
  imports: [
    MatIconModule,
    MatMenuModule,
    HebrewDateConverterPipe,
    CommonModule,
    GreetingPipe,
    NgbTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {


  constructor(
    private route: Router,
    private authService: AuthService,
    public srv_user: ServiceUsersService,
    public dialog: MatDialog,
  ) {}

 

  dateToHeader: Date = new Date();
  openMenu: boolean = false;
  username = 'אנונימית';
  ngOnInit() {
    const userD = localStorage.getItem('user_data');
    let userData: any = null;
    if (userD) {
      userData = JSON.parse(userD);
    }
    // אם אין נתוני משתמש, השם יישאר כברירת מחדל
    if (userData && userData.userId) {
      this.username = this.srv_user.getNameByUserId(userData.userId);
    }
  }

  logo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.route.navigate(['welcome/Home_Page']);
  }

  logout() {
    this.authService.logout();
    // this.route.navigate([""]);
    this.route.navigate(['']).then(() => {
      // לאחר החזרה לדף הראשי, תוודא מה המצב של המשתמש
      if (this.authService.isLoggedIn()) {
        // אם המשתמש עדיין מחובר, תכנס לדף הנכון
        this.route.navigate(['welcome/Home_Page']);
      }
    });
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
    const menu = document.getElementById('menu');
    if (menu) {
      // בדוק אם menu לא null
      menu.classList.toggle('show'); // אם התפריט פתוח, הוא ייסגר ולהפך
    }
  }

  openDialogEditD() {
    const dialogRef = this.dialog.open(EditUserDetailComponent, {
      width: '950px',
      data: {},
    });
  }

  goToFevorite(){
        this.route.navigate(['welcome/Favorites'])

  
}
}
