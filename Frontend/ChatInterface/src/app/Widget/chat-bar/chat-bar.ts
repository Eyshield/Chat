import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Users } from '../../Services/users';
import { User } from '../../Models/Users.models';
import { Page } from '../../Models/Page.models';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './chat-bar.html',
  styleUrl: './chat-bar.css',
})
export class ChatBar {
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
  searchTerm = new FormControl('');

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    const id = Number(this.cookie.get('user_Id'));
    if (this.searchTerm.value && this.searchTerm.value !== null) {
      this.userService.searchUsers(this.searchTerm.value).subscribe((data) => {
        this.filteredUsers.set(data);
      });
    } else {
      this.userService
        .getFollowers(this.pageUsers.size, this.pageUsers.number, id)
        .subscribe((data) => {
          if (data && data.content) {
            this.pageUsers = data;
            console.log(data);
            this.users.set(data.content);
          } else {
            this.users.set([]);
          }
        });
    }
  }

  selectUser(user: any) {
    this.userSelected.emit(user);
  }
  toggleFollow(target_Id: number) {
    const user_Id = Number(this.cookie.get('user_Id'));
    this.userService.follow(user_Id, target_Id).subscribe((data) => {
      this.loadUsers();
    });
  }
}
