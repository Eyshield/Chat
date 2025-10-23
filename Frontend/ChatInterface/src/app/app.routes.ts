import { Routes } from '@angular/router';
import { LandingPage } from './Widget/landing-page/landing-page';
import { LogIn } from './Widget/log-in/log-in';
import { SignUp } from './Widget/sign-up/sign-up';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'LogIn', component: LogIn },
  { path: 'SignUp', component: SignUp },
];
