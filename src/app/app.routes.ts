import { Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { HomePageComponent } from './components/home-page.component/home-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
     {path: '', component: WelcomePageComponent},
     {path: 'welcome', component: WelcomePageComponent},
     {path: 'Home_Page', component: HomePageComponent},
     {path: 'Login/reset', component: ResetPasswordComponent},
          {path: '**', component: WelcomePageComponent},

       
    
];
