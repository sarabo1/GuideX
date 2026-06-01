import { Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { SighInPageComponent } from './components/sigh-in-page/sigh-in-page.component';
import { HomePageComponent } from './components/home-page.component/home-page.component';

export const routes: Routes = [
     {path: '', component: WelcomePageComponent},
     {path: 'welcome', component: WelcomePageComponent},
     {path: 'Home_Page', component: HomePageComponent},
     {path: 'Login', component: SighInPageComponent},
];
