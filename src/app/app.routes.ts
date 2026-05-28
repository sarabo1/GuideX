import { Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { NewUserRegistrationsComponent } from './components/new-user-registrations/new-user-registrations.component';

export const routes: Routes = [
     {path: '', component: WelcomePageComponent},
     {path: 'welcome', component: WelcomePageComponent},
     {path: 'הרשמות למערכת', component: NewUserRegistrationsComponent},
];
