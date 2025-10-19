package dz.chat.apiChat.repository;

import dz.chat.apiChat.entity.Messages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepo extends JpaRepository<Messages,Long> {
    Page<Messages> findByMessageIgnoreContainingCase(String message, Pageable pageable);
    Page<Messages>getAllMessages(Pageable pageable);
}
