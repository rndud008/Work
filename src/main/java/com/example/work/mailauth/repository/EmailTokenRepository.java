package com.example.work.mailauth.repository;

import com.example.work.mailauth.domain.EmailToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailTokenRepository extends JpaRepository<EmailToken,Long> {
    EmailToken findByEmail(String email);
}
