package dz.chat.apiChat.repository;

import dz.chat.apiChat.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UsersRepo extends JpaRepository<Users,Long> {
    Optional<Users>findByEmail(String email);
    Page<Users>findByNomContainingIgnoreCase(String nom, Pageable pageable);
    Page<Users>findAll(Pageable pageable);
}
