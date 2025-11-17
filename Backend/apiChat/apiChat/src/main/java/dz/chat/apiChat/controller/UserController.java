package dz.chat.apiChat.controller;

import dz.chat.apiChat.dto.PageResponse;
import dz.chat.apiChat.dto.UserDto;
import dz.chat.apiChat.entity.Messages;
import dz.chat.apiChat.entity.Users;
import dz.chat.apiChat.services.interfaces.UsersService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private UsersService usersService;
    @PostMapping
    public ResponseEntity<Users> addUsers(@RequestBody Users users) {
        try {
            Users response = usersService.addUsers(users);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @RequestParam("nom") String nom,
            @RequestParam("prenom") String prenom,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        UserDto existingUser = usersService.getUsers(id);
        String newImageUrl = existingUser.getImageUrl();

        if (image != null && !image.isEmpty()) {
            try {
                String uploadDir = System.getProperty("user.dir") + "/uploads/";
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                if (existingUser.getImageUrl() != null) {
                    String oldFileName = existingUser.getImageUrl()
                            .replace("http://localhost:9000/uploads/", "");
                    Path oldFilePath = uploadPath.resolve(oldFileName);
                    Files.deleteIfExists(oldFilePath);
                }
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                newImageUrl = "http://localhost:9000/uploads/" + fileName;

            } catch (IOException e) {
                throw new RuntimeException("Erreur lors de l'upload de l'image", e);
            }
        }
        UserDto updatedUser = usersService.updateUsers(
                id, nom, prenom, username, email, newImageUrl
        );

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsers(@PathVariable Long id) {
        try {
            usersService.deleteUsers(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {

        try {
            UserDto response = usersService.getUsers(id);

            if (response == null) {

                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping
    public ResponseEntity<PageResponse<Users>> getAllUsers(Pageable pageable){
        try {
            PageResponse<Users> response= usersService.findAllUsers(pageable);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }



    @GetMapping("/followers/{userId}")
    public ResponseEntity<PageResponse<UserDto>> getFollowers(@PathVariable Long userId,Pageable pageable){
     try {
         PageResponse<UserDto>response=usersService.findFollowersByUserId(userId,pageable);
         return ResponseEntity.status(HttpStatus.OK).body(response);

     }catch (Exception e){
         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

     }
    }


    @GetMapping("/followed/{userId}")
    public ResponseEntity<PageResponse<UserDto>> getFollowed(@PathVariable Long userId,Pageable pageable){
        try {
            PageResponse<UserDto>response=usersService.findFollowedByUserId(userId,pageable);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }
    @PostMapping("/follow/{userId}/{targetId}")
    public ResponseEntity<Void> followUser(@PathVariable Long userId, @PathVariable Long targetId) {
     try {
         usersService.followUser(userId,targetId);
         return ResponseEntity.status(HttpStatus.OK).build();

     }catch (Exception e){
         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
     }
    }

    @DeleteMapping("/unfollow/{userId}/{targetId}")
    public ResponseEntity<Void> unfollowUser(@PathVariable Long userId, @PathVariable Long targetId) {
        try {
            usersService.unFollowUser(userId,targetId);
            return ResponseEntity.status(HttpStatus.OK).build();

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<Users>> searchUsers(
            @RequestParam(required = false, defaultValue = "") String nom,
            @PageableDefault(size = 5,page = 0) Pageable pageable) {
        try {
            PageResponse<Users>response=usersService.searchUsers(nom, pageable);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/search/{id}")
    public ResponseEntity<PageResponse<UserDto>> searchUsers(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "") String nom,
            @PageableDefault(size = 5,page = 0) Pageable pageable) {
        try {
            PageResponse<UserDto>response=usersService.searchUsers(nom,id,pageable);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/conv/{userId}")
    public ResponseEntity<PageResponse<UserDto>> findChatUsersOrderByLastMessage (
           @PathVariable Long userId,
            @PageableDefault(size = 5,page = 0) Pageable pageable) {
        try {
            PageResponse<UserDto>response=usersService.findChatUsersOrderByLastMessage(userId, pageable);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }





}
