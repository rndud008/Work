package com.example.work.mailauth.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class EmailToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String token;

    private LocalDateTime createAt;
    private LocalDateTime endAt;

    private String status;

    @PrePersist
    @PreUpdate
    public void prePersist(){
        this.createAt = LocalDateTime.now();
        this.endAt = LocalDateTime.now().plusMinutes(3l);
    }


}
