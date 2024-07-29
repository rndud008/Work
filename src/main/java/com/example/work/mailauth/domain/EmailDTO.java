package com.example.work.mailauth.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmailDTO {
    private String email;
    private String token;
}
