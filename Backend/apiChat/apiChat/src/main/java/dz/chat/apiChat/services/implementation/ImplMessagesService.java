package dz.chat.apiChat.services.implementation;

import dz.chat.apiChat.dto.MessageDto;
import dz.chat.apiChat.dto.PageResponse;
import dz.chat.apiChat.entity.Messages;
import dz.chat.apiChat.entity.Users;
import dz.chat.apiChat.repository.MessageRepo;
import dz.chat.apiChat.repository.UsersRepo;
import dz.chat.apiChat.services.interfaces.MessagesService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class ImplMessagesService implements MessagesService {
    private MessageRepo messageRepo;
    private final UsersRepo usersRepo;
    private final SimpMessagingTemplate messagingTemplate;
    @Override
    public PageResponse<Messages> findAllMessages(Pageable pageable) {
        Page<Messages>messages= messageRepo.findAll(pageable);
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
    public MessageDto sendMessages(MessageDto messageDto) {
        Users sender = usersRepo.findById(messageDto.getSenderId()).orElseThrow();
        Users receiver = usersRepo.findById(messageDto.getReceiverId()).orElseThrow();
        Messages message = new Messages();
        message.setMessage(messageDto.getMessage());
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setDateStamp(new Date());
        message.setRead(false);
        message = messageRepo.save(message);
        messageDto.setId(message.getId());
        messageDto.setDateStamp(message.getDateStamp());
        messagingTemplate.convertAndSend(
                "/queue/messages/" + receiver.getId(),
                messageDto
        );

        messagingTemplate.convertAndSend(
                "/queue/messages/" + sender.getId(),
                messageDto
        );

        return messageDto;
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
        Page<Messages>message= messageRepo.findByMessageContainingIgnoreCase(messages,pageable);
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

    @Override
    public PageResponse<MessageDto> findConverssation(Long userId1, Long userId2, Pageable pageable) {
        Page<Messages>message= messageRepo.findConversation(userId1,userId2,pageable);
        Page<MessageDto>dtoPage= message.map(u->{
                MessageDto messageDto = new MessageDto();
                messageDto.setId(u.getId());
                messageDto.setMessage(u.getMessage());
                messageDto.setDateStamp(u.getDateStamp());
                messageDto.setSenderId(u.getSender().getId());
                messageDto.setReceiverId(u.getReceiver().getId());
                return messageDto;});
        PageResponse<MessageDto>response =new PageResponse<>(
                dtoPage.getContent(),
                dtoPage.getNumber(),
                dtoPage.getSize(),
                dtoPage.getTotalElements(),
                dtoPage.getTotalPages(),
                dtoPage.isFirst(),
                dtoPage.isLast());
        return response ;
    }
}
