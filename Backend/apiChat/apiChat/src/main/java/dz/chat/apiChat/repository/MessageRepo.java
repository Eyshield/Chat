package dz.chat.apiChat.repository;

import dz.chat.apiChat.entity.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepo extends JpaRepository<Messages,Long> {
}
