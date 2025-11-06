package dz.chat.apiChat.services.interfaces;

import dz.chat.apiChat.dto.MessageDto;
import dz.chat.apiChat.dto.PageResponse;
import dz.chat.apiChat.entity.Messages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MessagesService {
    PageResponse<Messages>findAllMessages(Pageable pageable);
    MessageDto sendMessages(MessageDto messageDto);
    Messages updateMessages(Long id ,Messages messages);
    Messages getMessages(Long id);
    String deleteMessages(Long id);
    PageResponse<Messages> searchMessages(String messages, Pageable pageable);
}
