import { Injectable, signal } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import { environment } from '../../environnement/environnement';
import { Page } from '../Models/Page.models';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { message } from '../Models/Message.models';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private stompClient!: Client;
  private pendingMessages: any[] = [];

  messages = signal<any[]>([]);
  isConnected = signal<boolean>(false);

  constructor(private Http: HttpClient, private cookie: CookieService) {}

  connect(userId: number) {
    const token = this.cookie.get('token');
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`http://localhost:9000/ws`),
      reconnectDelay: 5000,
      connectHeaders: { Authorization: `Bearer ${token}` },
    });

    this.stompClient.onConnect = () => {
      this.isConnected.set(true);
      this.stompClient.subscribe(
        `/queue/messages/${userId}`,
        (message: Message) => {
          const msg = JSON.parse(message.body);
          this.messages.update((old) => [...old, msg]);
        }
      );
      this.pendingMessages.forEach((msg) =>
        this._send(msg.senderId, msg.receiverId, msg.message)
      );
      this.pendingMessages = [];
    };

    this.stompClient.onWebSocketClose = () => {
      this.isConnected.set(false);
    };

    this.stompClient.onStompError = (frame) => {
      this.isConnected.set(false);
    };

    this.stompClient.activate();
  }

  sendMessage(senderId: number, receiverId: number, message: string) {
    if (!this.isConnected()) {
      this.pendingMessages.push({ senderId, receiverId, message });
      return;
    }
    this._send(senderId, receiverId, message);
  }

  private _send(senderId: number, receiverId: number, message: string) {
    this.stompClient.publish({
      destination: '/app/sendMessage',
      body: JSON.stringify({ senderId, receiverId, message }),
    });
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }

  public loadMessages(
    id1: number,
    id2: number,
    size: number,
    page: number
  ): Observable<Page<message>> {
    const token = this.cookie.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.Http.get<Page<message>>(
      environment.apiUrl +
        `/message/conv/${id1}/${id2}?page=${page}&size=${size}`,
      { headers }
    );
  }
}
