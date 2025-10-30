import { Component, computed } from '@angular/core';
import { ChatBar } from '../../Widget/chat-bar/chat-bar';
import { UserMenu } from '../../Widget/user-menu/user-menu';
import { MessageService } from '../../Services/message-service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [ChatBar, UserMenu, CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  selectedUser: any = null;
  currentUserId!: number;
  newMessage = '';

  constructor(
    private messageService: MessageService,
    private cookieService: CookieService
  ) {
    this.messages = this.messageService.messages;
    this.filteredMessages = computed(() =>
      this.messages().filter(
        (m: any) =>
          (m.senderId === this.currentUserId &&
            m.receiverId === this.selectedUser?.id) ||
          (m.senderId === this.selectedUser?.id &&
            m.receiverId === this.currentUserId)
      )
    );
  }
  messages: any;

  filteredMessages: any;

  ngOnInit() {
    const id = this.cookieService.get('userId');
    this.currentUserId = Number(id);

    if (this.currentUserId) {
      this.messageService.connect(this.currentUserId);
    }
  }

  onUserSelected(user: any) {
    this.selectedUser = user;
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedUser) return;

    this.messageService.sendMessage(
      this.currentUserId,
      this.selectedUser.id,
      this.newMessage
    );

    this.newMessage = '';
  }
}
