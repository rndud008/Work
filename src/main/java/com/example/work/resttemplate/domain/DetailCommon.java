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
public class DetailCommon {
    private ResponseDto response;

    @Data
    public static class ResponseDto {
        private Header header;
        private Body body;

        @Data
        public static class Header {
            private String resultCode;
            private String resultMsg;

        }

        @Data
        public static class Body {
            private Items items;
            private int numOfRows;
            private int pageNo;
            private int totalCount;

            @Data
            public static class Items {
                private List<Item> item;

                @Data
                public static class Item {
                    private String contentid;
                    private String contenttypeid;
                    private String title;
                    private String createdtime;
                    private String modifiedtime;
                    private String tel;
                    private String telname;
                    private String homepage;
                    private String booktour;
                    private String overview;

                }
            }
        }
    }
}
