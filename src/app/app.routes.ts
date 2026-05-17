import { Routes } from '@angular/router';
import { WelcomePageComponent } from '../components/welcome-page/welcome-page.component';
import { GuideIdentificationComponent } from '../components/guide-identification/guide-identification.component';
import { CoordinatorIdentificationComponent } from '../components/coordinator-identification/coordinator-identification.component';
import { AuthGuard } from '../guards/auth-guard.guard';
import { OnlyToHwInAngularComponent } from '../components/only-to-hw-in-angular/only-to-hw-in-angular.component';

export const routes: Routes = [
     {path: '', component: WelcomePageComponent},
     {path: 'welcome', component: WelcomePageComponent},
     {path: 'guide-identification', component: GuideIdentificationComponent},
     {path: 'coordinator-identification', component: CoordinatorIdentificationComponent},
     {path: 'Hi_coordinator',component: OnlyToHwInAngularComponent, canActivate: [AuthGuard]}
];
