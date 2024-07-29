package com.example.work.mailauth.service;

import com.example.work.mailauth.domain.EmailDTO;
import com.example.work.mailauth.domain.EmailToken;


public interface EmailTokenService {

    int save (EmailDTO emailDTO);

    EmailToken update(EmailDTO emailDTO);

    int delete(EmailDTO emailDTO);
}
