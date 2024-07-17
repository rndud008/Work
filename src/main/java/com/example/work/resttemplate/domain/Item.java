package com.example.work.resttemplate.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item {
    private String addr1;
    private String addr2;
    private String areacode;
    private String booktour;
    private String cat1;
    private String cat2;
    private String cat3;
    private String contentid;
    private String contenttypeid;
    private String createdtime;
    private String firstimage;
    private String firstimage2;
    private String cpyrhtDivCd;
    private String mapx;
    private String mapy;
    private String mlevel;
    private String modifiedtime;
    private String sigungucode;
    private String tel;
    private String title;
    private String zipcode;
    private String telname;
    private String homepage;
    private String overview;
    private String heritage1;
    private String heritage2;
    private String heritage3;
    private String infocenter;
    private String opendate;
    private String restdate;
    private String expguide;
    private String expagerange;
    private String accomcount;
    private String useseason;
    private String usetime;
    private String parking;
    private String chkbabycarriage;
    private String chkpet;
    private String chkcreditcard;
    private List<DetailItem> detailItems;

    public Item(ResponseWrapper.ResponseDto.Body.Items.Item item) {
        this.addr1 = item.getAddr1();
        this.addr2 = item.getAddr2();
        this.areacode = item.getAreacode();
        this.booktour = item.getBooktour();
        this.cat1 = item.getCat1();
        this.cat2 = item.getCat2();
        this.cat3 = item.getCat3();
        this.contentid = item.getContentid();
        this.contenttypeid = item.getContenttypeid();
        this.createdtime = item.getCreatedtime();
        this.firstimage = item.getFirstimage();
        this.firstimage2 = item.getFirstimage2();
        this.cpyrhtDivCd = item.getCpyrhtDivCd();
        this.mapx = item.getMapx();
        this.mapy = item.getMapy();
        this.mlevel = item.getMlevel();
        this.modifiedtime = item.getModifiedtime();
        this.sigungucode = item.getSigungucode();
        this.tel = item.getTel();
        this.title = item.getTitle();
        this.zipcode = item.getZipcode();
    }

    public void detailCommonItem(DetailCommon.ResponseDto.Body.Items.Item item){
        this.telname = item.getTelname();
        this.homepage = item.getHomepage();
        this.overview = item.getOverview();
    }

    public void  detailIntroItem(DetailIntro.ResponseDto.Body.Items.Item item){
        this.heritage1 = item.getHeritage1();
        this.heritage2 = item.getHeritage2();
        this.heritage3 = item.getHeritage3();
        this.infocenter = item.getInfocenter();
        this.opendate = item.getOpendate();
        this.restdate = item.getRestdate();
        this.expguide = item.getExpguide();
        this.expagerange = item.getExpagerange();
        this.accomcount = item.getAccomcount();
        this.useseason = item.getUseseason();
        this.usetime = item.getUsetime();
        this.parking = item.getParking();
        this.chkbabycarriage = item.getChkbabycarriage();
        this.chkpet = item.getChkpet();
        this.chkcreditcard = item.getChkcreditcard();
    }

    public void detailItems(List<DetailItem> item){
        this.detailItems = item;
    }

}
