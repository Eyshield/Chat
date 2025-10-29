import { Component, EventEmitter, Output, signal } from '@angular/core';
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
  toggleFollow(_t5: any) {
    throw new Error('Method not implemented.');
  }
  @Output() userSelected = new EventEmitter<any>();
  filteredUsers = signal<Page<User>>({
    content: [],
    number: 0,
    size: 5,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
  });

  constructor(private userService: Users, private cookie: CookieService) {}
  users = signal<User[]>([]);
  pageUsers: Page<User> = {
    content: [],
    number: 0,
    size: 5,
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
        if (data && data.content) {
          this.pageUsers = data;
          this.users.set(data.content);
        } else {
          this.users.set([]);
        }
      });
  }

  selectUser(user: any) {
    this.userSelected.emit(user);
  }
}
