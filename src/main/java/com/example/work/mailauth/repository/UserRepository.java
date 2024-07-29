package com.example.work.mailauth.repository;

import com.example.work.mailauth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

    // 사용자 username 올 조회
    User findByUsername(String username);

    User findByEmail(String email);
}
