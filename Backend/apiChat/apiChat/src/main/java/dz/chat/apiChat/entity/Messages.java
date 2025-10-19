package dz.chat.apiChat.entity;

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
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Users sender ;
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private Users receiver;
}
