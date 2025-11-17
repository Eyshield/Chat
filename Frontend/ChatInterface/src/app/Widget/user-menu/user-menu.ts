import { Component, HostListener, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../Services/auth';
import { User } from '../../Models/Users.models';
import { Users } from '../../Services/users';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-menu',
  imports: [RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  user = signal<User>({} as User);
  dropDownMenu: boolean = false;
  id: number = 0;
  constructor(
    private auth: Auth,
    private router: Router,
    private userService: Users,
    private cookie: CookieService
  ) {}
  dropdown() {
    this.dropDownMenu = !this.dropDownMenu;
  }
  ngOnInit() {
    this.id = Number(this.cookie.get('user_Id'));
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user.set(data);
    });
  }
  logout() {
    this.auth.logOut();
    this.router.navigate(['/landingPage']);
  }
}
