package com.authentication.userAuthentication.Entity;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class ForgotCodeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String forgotCode;

    @Column(name = "forgot_expiration_time_in_millis")
    private long forgotExpirationTimeInMillis;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Instant forgotExpirationTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public ForgotCodeEntity() {
        // Default constructor
    }

    // Updated constructor to include user, verification code, and expiration time
    public ForgotCodeEntity(User user, String forgotCode, long forgotExpirationTimeInMillis) {
        this.user = user;
        this.forgotCode = forgotCode;
        this.forgotExpirationTimeInMillis = forgotExpirationTimeInMillis;
        this.forgotExpirationTime = Instant.ofEpochMilli(forgotExpirationTimeInMillis);
    }


    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getForgotCode() {
        return forgotCode;
    }

    public void setForgotCode(String forgotCode) {
        this.forgotCode = forgotCode;
    }

    public long getForgotExpirationTimeInMillis() {
        return forgotExpirationTimeInMillis;
    }

    public void setForgotExpirationTimeInMillis(long forgotExpirationTimeInMillis) {
        this.forgotExpirationTimeInMillis = forgotExpirationTimeInMillis;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Instant getForgotExpirationTime() {
        return forgotExpirationTime;
    }
}
