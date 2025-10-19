package dz.chat.apiChat.services.implementation;

import dz.chat.apiChat.dto.PageResponse;
import dz.chat.apiChat.entity.Messages;
import dz.chat.apiChat.repository.MessageRepo;
import dz.chat.apiChat.services.interfaces.MessagesService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImplMessagesService implements MessagesService {
    private MessageRepo messageRepo;
    @Override
    public PageResponse<Messages> findAllMessages(Pageable pageable) {
        Page<Messages>messages= messageRepo.getAllMessages(pageable);
        PageResponse<Messages>response= new PageResponse<>(
                messages.getContent(),
                messages.getNumber(),
                messages.getSize(),
                messages.getTotalElements(),
                messages.getTotalPages(),
                messages.isFirst(),
                messages.isLast()
        );
        return response ;
    }

    @Override
    public Messages addMessages(Messages messages) {
        return messageRepo.save(messages);
    }

    @Override
    public Messages updateMessages(Long id, Messages messages) {
        messages.setId(id);
        return messageRepo.save(messages);
    }
    @Override
    public Messages getMessages(Long id){
     return messageRepo.findById(id).orElseThrow(()->new RuntimeException("No message found"));
    };

    @Override
    public String deleteMessages(Long id) {
        try {
            getMessages(id);
            messageRepo.deleteById(id);
            return "Message deleted";
        } catch (Exception e ) {
            return e.getMessage();
        }
    }
    @Override
    public PageResponse<Messages> searchMessages(String messages, Pageable pageable) {
        Page<Messages>message= messageRepo.findByMessageIgnoreContainingCase(messages,pageable);
        PageResponse<Messages>response= new PageResponse<>(
                message.getContent(),
                message.getNumber(),
                message.getSize(),
                message.getTotalElements(),
                message.getTotalPages(),
                message.isFirst(),
                message.isLast()
        );
        return response ;
    }
}
