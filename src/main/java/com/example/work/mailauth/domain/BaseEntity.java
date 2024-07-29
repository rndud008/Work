package com.example.work.mailauth.domain;

import com.example.work.mailauth.listener.Auditable;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@MappedSuperclass // 상속받는 entity  쪽에 포함을 시켜줌
@EntityListeners(value = AuditingEntityListener.class) // 기본적으로 스프링에서 제공해주는 entitiy 리스너.
public class BaseEntity implements Auditable {

    @CreatedDate // entity 생성시점에 리스너 동작.
    // java.time.*  객체 변환을 위한 annotation
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @JsonProperty("regdate")
    private LocalDateTime regDate;
}
