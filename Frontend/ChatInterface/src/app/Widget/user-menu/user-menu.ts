import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../Services/auth';

@Component({
  selector: 'app-user-menu',
  imports: [RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  dropDownMenu: boolean = false;
  constructor(private auth: Auth, private router: Router) {}
  dropdown() {
    this.dropDownMenu = !this.dropDownMenu;
  }
  logout() {
    this.auth.logOut;
    this.router.navigate(['/landingPage']);
  }
}
