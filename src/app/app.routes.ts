import { Routes } from '@angular/router';
import { WelcomePageComponent } from '../components/welcome-page/welcome-page.component';
import { GuideIdentificationComponent } from '../components/guide-identification/guide-identification.component';
import { CoordinatorIdentificationComponent } from '../components/coordinator-identification/coordinator-identification.component';

export const routes: Routes = [
     {path: '', component: WelcomePageComponent},
     {path: 'welcome', component: WelcomePageComponent},
     {path: 'guide-identification', component: GuideIdentificationComponent},
     {path: 'coordinator-identification', component: CoordinatorIdentificationComponent}
];
