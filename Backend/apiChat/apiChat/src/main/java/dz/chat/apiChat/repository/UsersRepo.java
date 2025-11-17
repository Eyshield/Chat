package dz.chat.apiChat.repository;

import dz.chat.apiChat.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UsersRepo extends JpaRepository<Users,Long> {
    Optional<Users>findByEmail(String email);
    Page<Users>findByNomContainingIgnoreCase(String nom, Pageable pageable);
    Page<Users>findAll(Pageable pageable);
    @Query("SELECT u FROM Users u JOIN u.users f WHERE f.id = :userId")
    Page<Users> findFollowersByUserId(@Param("userId") Long userId,Pageable pageable);

    @Query("SELECT f FROM Users u JOIN u.users f WHERE u.id = :userId")
    Page<Users> findFollowedByUserId(@Param("userId") Long userId,Pageable pageable);

    @Query("""
SELECT u FROM Users u
WHERE u.id IN (
    SELECT CASE 
             WHEN m.sender.id = :userId THEN m.receiver.id 
             ELSE m.sender.id 
           END
    FROM Messages m
    WHERE m.sender.id = :userId OR m.receiver.id = :userId
)
ORDER BY (
    SELECT MAX(m2.dateStamp) 
    FROM Messages m2 
    WHERE (m2.sender.id = :userId AND m2.receiver.id = u.id) 
       OR (m2.sender.id = u.id AND m2.receiver.id = :userId)
) DESC
""")
    Page<Users> findChatUsersOrderByLastMessage(@Param("userId") Long userId,Pageable pageable);


}
