package com.example.work.resttemplate.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailItem {
    private String serialnum;
    private String infoname;
    private String infotext;
    private String fldgubun;

    public DetailItem detailItem(DetailInfo.ResponseDto.Body.Items.Item item){

        this.serialnum = item.getSerialnum();
        this.infoname = item.getInfoname();
        this.infotext = item.getInfotext();
        this.fldgubun = item.getFldgubun();

        return DetailItem.this;
    }

}
