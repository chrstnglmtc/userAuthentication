package com.authentication.userAuthentication.Repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.authentication.userAuthentication.Entity.User;

@EnableJpaRepositories
@Repository

public interface UserRepo extends JpaRepository<User, Long>{
    User findOneByEmailAndPassword(String email, String password);
    User findByEmail(String email);
}
