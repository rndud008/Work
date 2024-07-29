package com.example.work.mailauth.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Entity(name = "t8_user")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id; //    회원 번호.

    @Column(nullable = false, unique = true)
    private String username; //    회원 아이디

    @JsonIgnore // json에 표시하지 않음.
    @Column(nullable = false)
    private String password; //    회원 비밀번호

    @JsonIgnore
    @ToString.Exclude
    @Transient // entity 에 반영하지 않음.
    private String re_password;
//    회원 비밀번호 확인 입력, db저장 X

    @Column(nullable = false)
    private String name;
//    회원 이름

    private String email;
//    회원 이메일

    // fetch 기본값
    // @oneToMany, @ManyToMany -> FetchType.Lazy
    // @ManyToOne, @OneToOne -> FetchType.EAGER
    @ManyToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    @JsonIgnore
    @Builder.Default
    private List<Authority> authorities = new ArrayList<>();

    public void addAuthority(Authority... authorities) {
        Collections.addAll(this.authorities, authorities);
    }

    // OAuth2 Client
    private String provider;
    private String providerId;


}
