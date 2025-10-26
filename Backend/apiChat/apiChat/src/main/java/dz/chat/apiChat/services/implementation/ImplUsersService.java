package dz.chat.apiChat.services.implementation;

import dz.chat.apiChat.dto.PageResponse;
import dz.chat.apiChat.entity.Users;
import dz.chat.apiChat.repository.UsersRepo;
import dz.chat.apiChat.services.interfaces.UsersService;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImplUsersService implements UsersService {
    private UsersRepo usersRepo;
    private PasswordEncoder passwordEncoder;
    @Override
    public PageResponse<Users> findAllUsers(Pageable pageable) {
        Page<Users>users = usersRepo.findAll(pageable);
        PageResponse<Users> response= new PageResponse<>(
                users.getContent(),
                users.getNumber(),
                users.getSize(),
                users.getTotalElements(),
                users.getTotalPages(),
                users.isFirst(),
                users.isLast()
        );
        return response;
    }

    @Override
    public Users addUsers(Users users) {
        users.setPassword(passwordEncoder.encode(users.getPassword()));

        return usersRepo.save(users) ;
    }

    @Override
    public Users getUsers(Long id) {
        return usersRepo.findById(id).orElseThrow(()-> new RuntimeException("No user found"));
    }

    @Override
    public Users updateUsers(Long id, Users users) {
        users.setId(id);
        return usersRepo.save(users);
    }

    @Override
    public String deleteUsers(Long id) {
        try {
            getUsers(id);
            usersRepo.deleteById(id);
            return "User Deleted";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
    @Override
    public  PageResponse<Users> findFollowersByUserId(Long userId,Pageable pageable){
        Page<Users> users= usersRepo.findFollowersByUserId(userId,pageable);
        PageResponse<Users>response=new PageResponse<>(
                users.getContent(),
                users.getNumber(),
                users.getSize(),
                users.getTotalElements(),
                users.getTotalPages(),
                users.isFirst(),
                users.isLast()
        );
     return response;
    }

   @Override
    public PageResponse<Users> findFollowedByUserId( Long userId,Pageable pageable){
        Page<Users>users= usersRepo.findFollowedByUserId(userId,pageable);
       PageResponse<Users>response=new PageResponse<>(
               users.getContent(),
               users.getNumber(),
               users.getSize(),
               users.getTotalElements(),
               users.getTotalPages(),
               users.isFirst(),
               users.isLast()
       );
       return response;

   }

    @Override
    public String followUser(Long userId, Long targetId) {
        Users user = usersRepo.findById(userId).orElseThrow();
        Users target = usersRepo.findById(targetId).orElseThrow();

        user.getUsers().add(target);
        usersRepo.save(user);

        return user.getUsername() + " suit maintenant " + target.getUsername();
    }

    @Override
    public String unFollowUser(Long userId, Long targetId) {
        Users user = usersRepo.findById(userId).orElseThrow();
        Users target = usersRepo.findById(targetId).orElseThrow();

        user.getUsers().remove(target);
        usersRepo.save(user);

        return user.getUsername() + " ne suit plus " + target.getUsername();

    }

    @Override
    public PageResponse<Users> searchUsers(String nom, Pageable pageable) {
        Page<Users> users= usersRepo.findByNomContainingIgnoreCase(nom,pageable);
        PageResponse<Users> response= new PageResponse<>(
                users.getContent(),
                users.getNumber(),
                users.getSize(),
                users.getTotalElements(),
                users.getTotalPages(),
                users.isFirst(),
                users.isLast()
        );
        return response;
    }
    }

