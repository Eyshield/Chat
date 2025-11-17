package dz.chat.apiChat.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Messages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    private Date dateStamp;
    private Boolean read;
    @ManyToOne
    @JoinColumn(name = "sender_id")
    @JsonIgnoreProperties("messagesSent")
    private Users sender ;
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    @JsonIgnoreProperties("messagesReceived")
    private Users receiver;
}
