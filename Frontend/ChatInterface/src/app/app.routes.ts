import { Routes } from '@angular/router';
import { LandingPage } from './Widget/landing-page/landing-page';
import { LogIn } from './Widget/log-in/log-in';
import { SignUp } from './Widget/sign-up/sign-up';
import { ChatBar } from './Widget/chat-bar/chat-bar';
import { Chat } from './ChatSpace/chat/chat';
import { ProfileSettings } from './ChatSpace/profile-settings/profile-settings';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'landingPage', component: LandingPage },
  { path: 'LogIn', component: LogIn },
  { path: 'SignUp', component: SignUp },
  { path: 'ChatBar', component: ChatBar },
  { path: 'Chat', component: Chat },
  { path: 'ProfilSettings', component: ProfileSettings },
];
