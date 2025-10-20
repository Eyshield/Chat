package dz.chat.apiChat.controller;

import dz.chat.apiChat.dto.PageResponse;
import dz.chat.apiChat.entity.Messages;
import dz.chat.apiChat.entity.Users;
import dz.chat.apiChat.services.interfaces.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Users> updateUsers(@PathVariable Long id, @RequestBody Users users) {
        try {
            Users response = usersService.updateUsers(id, users);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
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
    public ResponseEntity<Users> getMessageById(@PathVariable Long id) {
        try {
            Users response = usersService.getUsers(id);
            if (response == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<PageResponse<Users>> searchUsers(
            @RequestParam(required = false, defaultValue = "") String nom,
            @PageableDefault(size = 5) Pageable pageable) {
        try {
            PageResponse<Users>response=usersService.searchUsers(nom, pageable);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
