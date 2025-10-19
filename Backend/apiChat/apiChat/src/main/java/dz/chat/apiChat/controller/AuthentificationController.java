package dz.chat.apiChat.controller;

import dz.chat.apiChat.entity.AuthResponse;
import dz.chat.apiChat.entity.Users;
import dz.chat.apiChat.services.implementation.AuthentificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthentificationController {


        private AuthentificationService authentificationService;
        @PostMapping("/register")
        public ResponseEntity<AuthResponse> Register(@RequestBody Users user){
            AuthResponse authResponse = authentificationService.signUp(user);
            return ResponseEntity.ok(authResponse);
        }

        @PostMapping("/login")
        public ResponseEntity<AuthResponse> login(@RequestBody Users user){
            AuthResponse authResponse = authentificationService.Login(user);
            return ResponseEntity.ok(authResponse);
        }
    }

