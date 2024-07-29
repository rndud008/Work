package com.example.work.mailauth.service;

import com.example.work.mailauth.domain.EmailDTO;
import com.example.work.mailauth.domain.EmailToken;
import com.example.work.mailauth.repository.EmailTokenRepository;

import com.example.work.mailauth.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Properties;

@Service
public class EmailTokenServiceImpl implements EmailTokenService {

    private final EmailTokenRepository emailTokenRepository;
    private final UserRepository userRepository;

    public EmailTokenServiceImpl(EmailTokenRepository emailTokenRepository, UserRepository userRepository) {
        this.emailTokenRepository = emailTokenRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public int save(EmailDTO emailDTO) {

        if(userRepository.findByEmail(emailDTO.getEmail()) != null){
            return 0;
        }


        EmailToken emailToken =
                emailTokenRepository.findByEmail(emailDTO.getEmail()) != null ?
                        emailTokenRepository.findByEmail(emailDTO.getEmail()):
                        new EmailToken();

        // 발신자
        String from = ""; // 발신: email.
        String password = ""; // app-password.

        // 수신자
        String to = emailDTO.getEmail(); // 수신할 : email.

        Properties properties = new Properties();
        properties.put("mail.smtp.auth","true");
        properties.put("mail.smtp.starttls.enable","true");
        properties.put("mail.smtp.host","smtp.gmail.com");
        properties.put("mail.smtp.port","587");

        // 세션 설정.
        Session session = Session.getInstance(properties, new Authenticator(){
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from,password);
            }
        });

        int random = (int) (Math.random() * 899999) +100000;

        Message message = new MimeMessage(session);
        try {
            message.setFrom(new InternetAddress(from));
            message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));
            message.setSubject("Test 제목");
            message.setText(String.valueOf(random));

            Transport.send(message);

            System.out.println("Email sent succesfully");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        emailToken.setEmail(to);
        emailToken.setToken(String.valueOf(random));
        emailToken.setStatus("인증전");

        emailTokenRepository.save(emailToken);
        System.out.println("email Token 저장완료");

        return 1;
    }

    @Transactional
    @Override
    public EmailToken update(EmailDTO emailDTO) {
        EmailToken emailToken =
                emailTokenRepository.findByEmail(emailDTO.getEmail()) != null ?
                        emailTokenRepository.findByEmail(emailDTO.getEmail()):
                        null;

        if(emailToken ==null){
            return null;
        }
        String dateTimeString = emailToken.getEndAt().toString();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSSSS");
        LocalDateTime dateTime = LocalDateTime.parse(dateTimeString,formatter);

        LocalDateTime now = LocalDateTime.now();

        if(now.isBefore(dateTime) && emailToken.getToken().equals(String.valueOf(emailDTO.getToken()))){
           emailToken.setStatus("인증완료");
        }else {
            return null;
        }

        return emailToken;
    }

    @Transactional
    @Override
    public int delete(EmailDTO emailDTO) {
        int result = 0;

        if(emailTokenRepository.findByEmail(emailDTO.getEmail()) != null){
            EmailToken emailToken = emailTokenRepository.findByEmail(emailDTO.getEmail());
            emailTokenRepository.delete(emailToken);
            result = 1;
        }

        return result;
    }

}
