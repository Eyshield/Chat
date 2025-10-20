package dz.chat.apiChat.services.implementation;

import dz.chat.apiChat.entity.AuthResponse;
import dz.chat.apiChat.entity.Users;
import dz.chat.apiChat.enums.Role;
import dz.chat.apiChat.repository.UsersRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AuthentificationService {
    private UsersRepo usersRepo;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse signUp(Users request){

        Users user= new Users();
        user.setNom(request.getNom());
        user.setPrenom(request.getPrenom());
        user.setEmail(request.getEmail());
        user.setRole(Role.User);
        user.setImageUrl(request.getImageUrl());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        String token= jwtService.generateToken(user);
        usersRepo.save(user);
        return new AuthResponse(token,true, user.getNom(),user.getId(),user.getRole() );
    }
    public AuthResponse Login(Users request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        Users user = usersRepo.findByEmail(request.getEmail()).orElseThrow();
        String nom = user.getNom();
        Role role = user.getRole();
        String token= jwtService.generateToken(user);
        Boolean isAuth = true;
        Long id = user.getId();
        return new AuthResponse(token,isAuth,nom,id,role);
    }
}
