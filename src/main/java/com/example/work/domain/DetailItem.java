package com.example.work.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailItem {
    private String serialnum;
    private String infoname;
    private String infotext;
    private String fldgubun;


}
