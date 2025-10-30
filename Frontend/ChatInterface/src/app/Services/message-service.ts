import { Injectable, signal } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private stompClient!: Client;

  messages = signal<any[]>([]);

  connect(userId: number) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:9000/ws'),
      reconnectDelay: 5000,
    });

    this.stompClient.onConnect = () => {
      console.log('✅ Connected to WebSocket');

      this.stompClient.subscribe(
        `/user/${userId}/queue/messages`,
        (msg: Message) => {
          const message = JSON.parse(msg.body);
          console.log('📩 Received:', message);

          this.messages.update((old) => [...old, message]);
        }
      );
    };

    this.stompClient.activate();
  }

  sendMessage(senderId: number, receiverId: number, message: string) {
    this.stompClient.publish({
      destination: '/app/sendMessage',
      body: JSON.stringify({ senderId, receiverId, message }),
    });

    this.messages.update((old) => [
      ...old,
      { senderId, receiverId, message, self: true },
    ]);
  }
}
