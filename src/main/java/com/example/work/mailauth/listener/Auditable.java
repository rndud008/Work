package com.example.work.mailauth.listener;

import java.time.LocalDateTime;

public interface Auditable {
    LocalDateTime getRegDate();

    void setRegDate(LocalDateTime regdate);
}
