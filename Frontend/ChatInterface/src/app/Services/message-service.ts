import { Injectable, signal } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private stompClient!: Client;
  private pendingMessages: any[] = [];

  messages = signal<any[]>([]);
  isConnected = signal<boolean>(false);

  connect(userId: number) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:9000/ws'),
      reconnectDelay: 5000,
      debug: (str) => console.log('🔧 STOMP:', str),
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

    this.messages.update((old) => [
      ...old,
      { senderId, receiverId, message, self: true },
    ]);
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}
