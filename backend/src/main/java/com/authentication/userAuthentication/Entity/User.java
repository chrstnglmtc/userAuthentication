package com.authentication.userAuthentication.Entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.authentication.userAuthentication.Entity.Enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name="user")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "user_id")
public class User implements UserDetails {

  @Id
  @Column(name="user_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long user_id;

  @Column(unique = true) // Make sure emails are unique
  private String email;

  @Column(unique = true) // Make sure usernames are unique
  private String userName;  

  private String password;

  private String firstName;

  private String lastName;

  @Enumerated(EnumType.STRING)
  private Role role;

  public User(String email, String userName, String password, String firstName, String lastName, Role role) {
    this.email = email;
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
}

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    if (this.role == Role.ADMIN) {
      return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_STUDENT"));
    }
    return List.of(new SimpleGrantedAuthority("ROLE_STUDENT"));
  }

  @Override
  public String getUsername() {
    return userName;
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