package dz.chat.apiChat.repository;

import dz.chat.apiChat.entity.Messages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepo extends JpaRepository<Messages,Long> {
    Page<Messages> findByMessageContainingIgnoreCase(String message, Pageable pageable);
    Page<Messages>findAll(Pageable pageable);
    @Query("SELECT m FROM Messages m WHERE (m.sender.id = :u1 AND m.receiver.id = :u2) OR (m.sender.id = :u2 AND m.receiver.id = :u1) ORDER BY m.dateStamp ASC")
    Page<Messages> findConversation(@Param("u1") Long user1Id, @Param("u2") Long user2Id, Pageable pageable);
}
