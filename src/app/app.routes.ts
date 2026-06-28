import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page.component/home-page.component';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { WelcomePageComponent } from './components/login/welcome-page/welcome-page.component';
import { TipsForumComponent } from './components/forum/tips-forum/tips-forum.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  //   { path: 'welcome', component: WelcomePageComponent },
  { path: 'Login/reset', component: ResetPasswordComponent },
  {
    path: 'welcome',
    component: HomeComponent,
    children: [
      { path: 'forum/community', component: TipsForumComponent },
      { path: 'Home_Page', component: HomePageComponent },
    ],
  },

  { path: '**', component: WelcomePageComponent },
];
