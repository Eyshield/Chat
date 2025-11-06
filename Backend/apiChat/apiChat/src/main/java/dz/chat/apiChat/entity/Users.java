package dz.chat.apiChat.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import dz.chat.apiChat.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@Data
@Entity
@NoArgsConstructor
@Table(name = "Users")
public class Users implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private String username;
    private String nom;
    private String prenom;
    @Column(nullable = false,unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String imageUrl;

    @ManyToMany
    @JsonIgnoreProperties("followers")
    @JoinTable(
            name = "abonnement",
            joinColumns = @JoinColumn(name = "abonner_id"),
            inverseJoinColumns = @JoinColumn(name = "suivi_id")
    )
    private Collection<Users> users= new ArrayList<>();

@ManyToMany(mappedBy = "users")
@JsonIgnoreProperties("users")
private Collection<Users> followers= new ArrayList<>();

@OneToMany(mappedBy = "sender")
private Collection<Messages>messagesSent= new ArrayList<>();
@OneToMany(mappedBy = "receiver")
private  Collection<Messages>messagesReceived= new ArrayList<>();

    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
