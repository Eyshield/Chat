package dz.chat.apiChat.dto;

import lombok.Data;

import java.util.Date;

@Data
public class MessageDto {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String message;
    private Date dateStamp;
}
