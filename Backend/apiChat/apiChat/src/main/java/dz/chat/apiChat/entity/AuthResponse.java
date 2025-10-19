package dz.chat.apiChat.entity;

import dz.chat.apiChat.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AuthResponse {
    private String token;
    private boolean isAuthenticated;
    private String nom;
    private Long id;
    private Role role;
}
