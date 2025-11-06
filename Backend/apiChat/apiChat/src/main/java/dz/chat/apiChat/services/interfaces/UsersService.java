package dz.chat.apiChat.services.interfaces;

import dz.chat.apiChat.dto.PageResponse;
import dz.chat.apiChat.dto.UserDto;
import dz.chat.apiChat.entity.Users;
import lombok.extern.java.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UsersService {
    PageResponse<Users> findAllUsers(Pageable pageable);
    Users addUsers(Users users);
    Users getUsers(Long id);
    Users updateUsers(Long id,Users users);
    String deleteUsers(Long id);
    PageResponse<Users> searchUsers(String nom,Pageable pageable);
    PageResponse<UserDto> searchUsers(String nom, Long userId, Pageable pageable);

    PageResponse<UserDto> findFollowersByUserId(Long userId,Pageable pageable);

    PageResponse<Users> findFollowedByUserId( Long userId,Pageable pageable);

    String followUser(Long userId,Long targetId);
    String unFollowUser(Long userId, Long targetId);
}
