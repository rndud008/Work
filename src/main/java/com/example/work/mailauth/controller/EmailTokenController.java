package com.example.work.mailauth.controller;

import com.example.work.mailauth.domain.EmailDTO;
import com.example.work.mailauth.service.EmailTokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/email")
public class EmailTokenController {

    private final EmailTokenService emailTokenService;

    public EmailTokenController(EmailTokenService emailTokenService) {
        this.emailTokenService = emailTokenService;
    }

    @PostMapping("/token")
    public ResponseEntity<?> tokenInsert(@RequestBody EmailDTO emailDTO){

        return new ResponseEntity<>(emailTokenService.save(emailDTO), HttpStatus.OK);
    }

    @DeleteMapping("/token/delete")
    public ResponseEntity<?> tokenDelete(@RequestBody EmailDTO emailDTO){

        return new ResponseEntity<>(emailTokenService.delete(emailDTO), HttpStatus.OK);
    }

    @PostMapping("/token/check")
    public ResponseEntity<?> tokenCheck(@RequestBody EmailDTO emailDTO){

        return new ResponseEntity<>(emailTokenService.update(emailDTO), HttpStatus.OK);
    }


}
