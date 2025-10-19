package dz.chat.apiChat.controller;

import dz.chat.apiChat.entity.AuthResponse;
import dz.chat.apiChat.entity.Users;
import dz.chat.apiChat.enums.Role;
import dz.chat.apiChat.services.implementation.AuthentificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthentificationController {


        private AuthentificationService authentificationService;
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> signUp(
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("role") Role role,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Users user = new Users();
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        if (image != null && !image.isEmpty()) {
            try {
                String uploadDir = "uploads/";
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                String imageUrl = "http://localhost:9000/uploads/" + fileName;
                user.setImageUrl(imageUrl);

            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'upload de l'image", e);
            }
        }

        AuthResponse response = authentificationService.signUp(user);
        return ResponseEntity.ok(response);
    }

        @PostMapping("/login")
        public ResponseEntity<AuthResponse> login(@RequestBody Users user){
            AuthResponse authResponse = authentificationService.Login(user);
            return ResponseEntity.ok(authResponse);
        }
    }

