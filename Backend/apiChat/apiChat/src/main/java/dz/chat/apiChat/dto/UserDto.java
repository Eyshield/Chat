package dz.chat.apiChat.dto;

import dz.chat.apiChat.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;
    private String nom;
    private String prenom;
    private String imageUrl;
    private String username;
    private String email;
    private boolean isFollowed;
}
