import { Component } from '@angular/core';
import { ChatBar } from '../../Widget/chat-bar/chat-bar';

@Component({
  selector: 'app-chat',
  imports: [ChatBar],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  selectedUser: any = null;

  onUserSelected(user: any) {
    this.selectedUser = user;
  }
}
