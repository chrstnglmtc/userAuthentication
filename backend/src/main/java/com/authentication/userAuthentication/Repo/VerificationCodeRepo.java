package com.authentication.userAuthentication.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.authentication.userAuthentication.Entity.VerificationCodeEntity;

public interface VerificationCodeRepo extends JpaRepository<VerificationCodeEntity, Long> {

    // Additional methods for retrieving, saving, and deleting verification codes if needed
    // ...
}
