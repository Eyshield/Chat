import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  imports: [],
  templateUrl: './chat-bar.html',
  styleUrl: './chat-bar.css',
})
export class ChatBar {
  @Output() userSelected = new EventEmitter<any>();

  users = [
    { name: 'Michael', image: 'assets/michael.jpg' },
    { name: 'Sarah', image: 'assets/sarah.jpg' },
    { name: 'Alex', image: 'assets/alex.jpg' },
  ];

  selectUser(user: any) {
    this.userSelected.emit(user);
  }
}
