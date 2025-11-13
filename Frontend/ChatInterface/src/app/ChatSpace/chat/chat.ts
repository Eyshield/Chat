import { Component, computed, signal } from '@angular/core';
import { ChatBar } from '../../Widget/chat-bar/chat-bar';
import { UserMenu } from '../../Widget/user-menu/user-menu';
import { MessageService } from '../../Services/message-service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Page } from '../../Models/Page.models';
import { message } from '../../Models/Message.models';

@Component({
  selector: 'app-chat',
  imports: [ChatBar, UserMenu, CommonModule, ReactiveFormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  selectedUser: any = null;
  currentUserId!: number;
  newMessage = new FormControl('', [Validators.required]);

  messages: any;
  filteredMessages: any;
  messageConv = signal<Page<message>>({
    content: [],
    number: 0,
    size: 5,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
  });

  constructor(
    private messageService: MessageService,
    private cookieService: CookieService
  ) {
    // Signal ou observable venant du MessageService
    this.messages = this.messageService.messages;

    // Filtrage des messages selon utilisateur courant et sélectionné
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

  ngOnInit() {
    const id = this.cookieService.get('user_Id');
    this.currentUserId = Number(id);

    if (this.currentUserId) {
      this.messageService.connect(this.currentUserId);
    }
  }

  onUserSelected(user: any) {
    this.selectedUser = user;
    this.LoadConv();
  }

  LoadConv() {
    this.messageService
      .loadMessages(this.currentUserId, this.selectedUser.id)
      .subscribe((data) => {
        this.messageConv.set(data);

        console.log('currentUserId:', this.currentUserId);
        console.log(
          'first msg senderId:',
          this.messageConv().content[0]?.senderId
        );
      });
  }

  sendMessage() {
    if (!this.newMessage.value?.trim() || !this.selectedUser) return;

    this.messageService.sendMessage(
      this.currentUserId,
      this.selectedUser.id,
      this.newMessage.value.trim()
    );
    this.LoadConv();
    this.newMessage.setValue('');
  }
}
