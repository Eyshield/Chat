package dz.chat.apiChat.controller;

import dz.chat.apiChat.dto.MessageDto;
import dz.chat.apiChat.dto.PageResponse;
import dz.chat.apiChat.entity.Messages;
import dz.chat.apiChat.services.interfaces.MessagesService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/message")
@AllArgsConstructor
public class MessageController {
    private final MessagesService messagesService;



    @PutMapping("/{id}")
    public ResponseEntity<Messages> updateMessage(@PathVariable Long id, @RequestBody Messages messages) {
        try {
            Messages response = messagesService.updateMessages(id, messages);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        try {
            messagesService.deleteMessages(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Messages> getMessageById(@PathVariable Long id) {
        try {
            Messages response = messagesService.getMessages(id);
            if (response == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<PageResponse<Messages>> searchMessages(
            @RequestParam(required = false, defaultValue = "") String message,
            @PageableDefault(size = 5) Pageable pageable) {
        try {
            PageResponse<Messages> response = messagesService.searchMessages(message, pageable);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/conv/{userId1}/{userId2}")
    public ResponseEntity<PageResponse<MessageDto>> findConversation(
          @PathVariable Long userId1,@PathVariable Long userId2,
            @PageableDefault(size = 5) Pageable pageable) {
        try {
            PageResponse<MessageDto> response = messagesService.findConverssation(userId1,userId2, pageable);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}





