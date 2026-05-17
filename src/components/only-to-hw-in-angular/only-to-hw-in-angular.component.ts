import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth-service.service';


@Component({
  selector: 'app-only-to-hw-in-angular',
  imports: [],
  templateUrl: './only-to-hw-in-angular.component.html',
  styleUrls: ['./only-to-hw-in-angular.component.scss'],
  standalone : true
})
export class OnlyToHwInAngularComponent {
  constructor(private authService: AuthService) { }
  logout() {
    this.authService.logout();
  }
}
