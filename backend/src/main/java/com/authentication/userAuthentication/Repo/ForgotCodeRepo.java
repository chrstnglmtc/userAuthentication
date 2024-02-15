package com.authentication.userAuthentication.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.authentication.userAuthentication.Entity.ForgotCodeEntity;
import com.authentication.userAuthentication.Entity.User;

public interface ForgotCodeRepo extends JpaRepository<ForgotCodeEntity, Long> {
    Optional<ForgotCodeEntity> findByUserEmail(String userEmail);
    ForgotCodeEntity findByForgotCode(String forgotCode);
    Optional<ForgotCodeEntity> findByUser(User user);
}
