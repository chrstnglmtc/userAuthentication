package com.authentication.userAuthentication.Repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.authentication.userAuthentication.Entity.ForgotCodeEntity;

public interface ForgotCodeRepo extends JpaRepository<ForgotCodeEntity, Long> {
    ForgotCodeEntity findByForgotCode(String forgotCode);
}