package dz.chat.apiChat.controller;

import dz.chat.apiChat.dto.MessageDto;
import dz.chat.apiChat.services.interfaces.MessagesService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class ChatController {
    private final MessagesService messagesService;
    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload MessageDto dto) {
        messagesService.sendMessages(dto);
    }
}
