import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../Services/auth-service.service';
import { ServiceUsersService } from '../../Services/service-users.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor (private route : Router,
    private authService:AuthService,
    public srv_user : ServiceUsersService,
  ){}
  username = 'הני';
  ngOnInit(){
    const userD = localStorage.getItem('user_data');
    let userData: any = null;
    if (userD) {
      userData = JSON.parse(userD);
    }
    // אם אין נתוני משתמש, השם יישאר כברירת מחדל
    if (userData && userData.userId) {
      this.username = this.srv_user.getNameByUserId(userData.userId);
    }
    this.getGreeting()
  }
  getGreeting(): string {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return 'בוקר טוב!';
  } else if (hour >= 12 && hour < 17) {
    return 'צהרים טובים!';
  } else if (hour >= 17 && hour < 21) {
    return 'ערב טוב!';
  } else {
    return 'לילה טוב!';
  }
}

  logo(){
          this.route.navigate(['welcome/Home_Page']);

  }

  logout(){
    this.authService.logout()
    // this.route.navigate([""]);
    this.route.navigate([""]).then(() => {
           // לאחר החזרה לדף הראשי, תוודא מה המצב של המשתמש
           if (this.authService.isLoggedIn()) {
               // אם המשתמש עדיין מחובר, תכנס לדף הנכון
               this.route.navigate(['welcome/Home_Page']);
           }
       });
  }


toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu) { // בדוק אם menu לא null
        menu.classList.toggle('show'); // אם התפריט פתוח, הוא ייסגר ולהפך
    }
}

}
