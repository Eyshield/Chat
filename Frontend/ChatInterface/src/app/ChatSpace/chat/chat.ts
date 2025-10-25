import { Component } from '@angular/core';
import { ChatBar } from '../../Widget/chat-bar/chat-bar';
import { UserMenu } from '../../Widget/user-menu/user-menu';

@Component({
  selector: 'app-chat',
  imports: [ChatBar, UserMenu],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  selectedUser: any = null;

  onUserSelected(user: any) {
    this.selectedUser = user;
  }
}
