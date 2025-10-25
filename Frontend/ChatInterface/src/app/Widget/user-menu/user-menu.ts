import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  imports: [RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  dropDownMenu: boolean = false;
  dropdown() {
    this.dropDownMenu = !this.dropDownMenu;
  }
}
