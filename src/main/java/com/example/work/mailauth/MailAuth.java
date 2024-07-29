package com.example.work.mailauth;



import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class MailAuth {

    public static void main(String[] args) {
        // 발신자
        String from = "rndud2208@gmail.com"; // 발신: email.
        String password = "wzsqlmffifjeqfae"; // app-password.

        // 수신자
        String to = "rndud008@gmail.com"; // 수신할 : email.

        Properties properties = new Properties();
        properties.put("mail.smtp.auth","true");
        properties.put("mail.smtp.starttls.enable","true");
        properties.put("mail.smtp.host","smtp.gmail.com");
        properties.put("mail.smtp.port","587");

        // 세션 설정.
        Session session = Session.getInstance(properties, new javax.mail.Authenticator(){
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from,password);
            }
        });

        Message message = new MimeMessage(session);
        try {
            message.setFrom(new InternetAddress(from));
            message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));
            message.setSubject("Test 제목");
            message.setText("내용물");

            Transport.send(message);

            System.out.println("Email sent succesfully");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
