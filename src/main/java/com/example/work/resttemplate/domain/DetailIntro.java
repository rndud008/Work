package com.example.work.resttemplate.domain;

import lombok.Data;

import java.util.List;

@Data
public class DetailIntro {
    public ResponseDto response;

    @Data
    public static class ResponseDto {
        public Header header;
        public Body body;

        @Data
        public static class Header {
            public String resultCode;
            public String resultMsg;
        }

        @Data
        public static class Body {
            public Items items;
            public int numOfRows;
            public int pageNo;
            public int totalCount;

            @Data
            public static class Items {
                public List<Item> item;

                @Data
                public static class Item {
                    public String contentid;
                    public String contenttypeid;
                    public String heritage1;
                    public String heritage2;
                    public String heritage3;
                    public String infocenter;
                    public String opendate;
                    public String restdate;
                    public String expguide;
                    public String expagerange;
                    public String accomcount;
                    public String useseason;
                    public String usetime;
                    public String parking;
                    public String chkbabycarriage;
                    public String chkpet;
                    public String chkcreditcard;
                }
            }
        }
    }
}
