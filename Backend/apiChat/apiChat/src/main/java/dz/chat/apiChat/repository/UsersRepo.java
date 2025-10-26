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
}
