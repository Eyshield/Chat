import { Component, EventEmitter, Output } from '@angular/core';
import { Users } from '../../Services/users';
import { User } from '../../Models/Users.models';
import { Page } from '../../Models/Page.models';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat-bar',
  imports: [],
  templateUrl: './chat-bar.html',
  styleUrl: './chat-bar.css',
})
export class ChatBar {
  @Output() userSelected = new EventEmitter<any>();

  constructor(private userService: Users, private cookie: CookieService) {}
  users: User[] = [];
  pageUsers: Page<User> = {
    content: [],
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
  };

  ngOnInit() {
    const id = Number(this.cookie.get('user_Id'));
    this.userService
      .getFollowers(this.pageUsers.size, this.pageUsers.number, id)
      .subscribe((data) => {
        this.pageUsers = data;
        this.users = data.content;
      });
  }

  selectUser(user: any) {
    this.userSelected.emit(user);
  }
}
