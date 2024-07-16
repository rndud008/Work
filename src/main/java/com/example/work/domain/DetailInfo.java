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
public class DetailInfo {
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
                    public String serialnum;
                    public String infoname;
                    public String infotext;
                    public String fldgubun;
                }
            }
        }
    }
}
