import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
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
export class Chat implements AfterViewInit {
  selectedUser: any = null;
  currentUserId!: number;
  newMessage = new FormControl('', [Validators.required]);
  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLElement>;

  messages: any;
  filteredMessages: any;
  messageConv = signal<Page<message>>({
    content: [],
    number: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false,
  });
  loadingOlder = false;
  private previousScrollHeight = 0;

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
    effect(() => {
      const allMessages = this.messages();

      if (!this.selectedUser || allMessages.length === 0) return;

      const lastMessage = allMessages[allMessages.length - 1];

      if (
        (lastMessage.senderId === this.currentUserId &&
          lastMessage.receiverId === this.selectedUser.id) ||
        (lastMessage.senderId === this.selectedUser.id &&
          lastMessage.receiverId === this.currentUserId)
      ) {
        const exists = this.messageConv().content.some(
          (m: any) =>
            m.id === lastMessage.id ||
            (m.message === lastMessage.message &&
              m.senderId === lastMessage.senderId &&
              !m.id &&
              !lastMessage.id)
        );

        if (!exists) {
          this.messageConv.update((prev) => ({
            ...prev,
            content: [...prev.content, lastMessage],
          }));

          if (lastMessage.senderId === this.currentUserId) {
            setTimeout(() => this.scrollToBottom(), 100);
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnInit() {
    const id = this.cookieService.get('user_Id');
    this.currentUserId = Number(id);
    this.messageService.connect(this.currentUserId);
  }

  onUserSelected(user: any) {
    this.selectedUser = user;
    this.messageConv.set({
      content: [],
      number: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
      first: false,
      last: false,
    });
    this.LoadConv(0);
  }

  LoadConv(page: number = 0) {
    if (!this.selectedUser) return;
    this.loadingOlder = true;
    if (page > 0 && this.scrollContainer) {
      this.previousScrollHeight =
        this.scrollContainer.nativeElement.scrollHeight;
    }

    this.messageService
      .loadMessages(
        this.currentUserId,
        this.selectedUser.id,
        this.messageConv().size,
        page
      )
      .subscribe((data) => {
        data.content = data.content.reverse();

        if (page === 0) {
          this.messageConv.set(data);
          setTimeout(() => this.scrollToBottom(), 100);
        } else {
          const combined = [...data.content, ...this.messageConv().content];
          this.messageConv.update((prev) => ({
            ...data,
            content: combined,
          }));

          setTimeout(() => {
            if (this.scrollContainer) {
              const container = this.scrollContainer.nativeElement;
              const newScrollHeight = container.scrollHeight;
              container.scrollTop = newScrollHeight - this.previousScrollHeight;
            }
          }, 50);
        }

        this.loadingOlder = false;
      });
  }

  sendMessage() {
    if (!this.newMessage.value?.trim() || !this.selectedUser) return;

    this.messageService.sendMessage(
      this.currentUserId,
      this.selectedUser.id,
      this.newMessage.value.trim()
    );
    this.newMessage.setValue('');
    setTimeout(() => this.scrollToBottom(), 100);
  }

  private scrollToBottom() {
    if (!this.scrollContainer) return;
    const container = this.scrollContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  onScroll() {
    if (!this.scrollContainer || this.loadingOlder) return;

    const container = this.scrollContainer.nativeElement;
    const currentPage = this.messageConv();

    if (container.scrollTop === 0 && !currentPage.last) {
      this.LoadConv(currentPage.number + 1);
    }
  }
}
