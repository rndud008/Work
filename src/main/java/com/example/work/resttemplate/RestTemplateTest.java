package com.example.work.resttemplate;

import com.example.work.resttemplate.domain.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class RestTemplateTest {

    private static String apikey = "";
    // 디코딩된 apiKey 가 아니라 인코딩된 apiKey를 사용해야함
    private static String BASE_URL = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1?" +
            "numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&"
            + "serviceKey=%s&contentTypeId=%d";

    private static String DETAIL_COMMON = "https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=%s&MobileOS=ETC&MobileApp=AppTest&_type=json" +
            "&defaultYN=Y&firstImageYN=N&areacodeYN=N&catcodeYN=N&addrinfoYN=N&mapinfoYN=N&overviewYN=Y&numOfRows=10&pageNo=1&contentId=%s&contentTypeId=%d";

    private static String DETAIL_INTRO = "https://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=%s&MobileOS=ETC&MobileApp=AppTest&_type=json" +
            "&numOfRows=10&pageNo=1&contentId=%s&contentTypeId=%d";

    private static String DETAIL_INFO = "https://apis.data.go.kr/B551011/KorService1/detailInfo1?serviceKey=%s&MobileOS=ETC&MobileApp=AppTest&_type=json" +
            "&numOfRows=10&pageNo=1&contentId=%s&contentTypeId=%d";


    public static void main(String[] args) {

        int id = 12;

        String apiUrl = String.format(BASE_URL, apikey, id);

        System.out.println(apikey);

        String apiTest = apiService(apiUrl);

        System.out.println("테스트 : " + apiTest.toString());
        System.out.println("* ".repeat(60));

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        // 빈 문자열("")을 null로 처리하여 객체 생성을 시도하지 않도록함

        List<Item> items = new ArrayList<>();

        try {
            ResponseWrapper responseWrapper = objectMapper.readValue(apiTest, ResponseWrapper.class);
            List<ResponseWrapper.ResponseDto.Body.Items.Item> itemList = responseWrapper.getResponse().getBody().getItems().getItem();

            itemList.forEach(System.out::println);

            System.out.println("* ".repeat(60));

            for (ResponseWrapper.ResponseDto.Body.Items.Item item : itemList) {
                items.add(new Item(item));
            }


//            List<Item> items = itemList.stream().map(Item::new).collect(Collectors.toList());
//            위와 같은 방식으로 Stream 으로 사용 가능.
//            items.forEach(System.out::println);

        } catch (JsonProcessingException e) {
            System.out.println("BASE_URL objectMapper 실패");
            throw new RuntimeException(e);
        }

        for (Item item : items) {
            apiUrl = String.format(DETAIL_COMMON, apikey, item.getContentid(), id);
            apiTest = apiService(apiUrl);

            try {
                DetailCommon detailCommon = objectMapper.readValue(apiTest, DetailCommon.class);
                List<DetailCommon.ResponseDto.Body.Items.Item> itemList = detailCommon.getResponse().getBody().getItems().getItem();

                itemList.forEach(System.out::println);

                System.out.println("* ".repeat(60));

                for (DetailCommon.ResponseDto.Body.Items.Item item2 : itemList) {
                    item2.setHomepage(extraUrl(item2.getHomepage()));
                    item.detailCommonItem(item2);
                }

            } catch (JsonProcessingException e) {
                System.out.println("DETAIL_COMMON objectMapper 실패");
                throw new RuntimeException(e);
            }

            System.out.println("테스트 : " + apiTest.toString());
            System.out.println("* ".repeat(60));

        }

        items.forEach(System.out::println);
        System.out.println("* ".repeat(60));

        for (Item item : items) {
            apiUrl = String.format(DETAIL_INTRO, apikey, item.getContentid(), id);
            apiTest = apiService(apiUrl);

            try {
                DetailIntro detailIntro = objectMapper.readValue(apiTest, DetailIntro.class);
                List<DetailIntro.ResponseDto.Body.Items.Item> itemList = detailIntro.getResponse().getBody().getItems().getItem();

                itemList.forEach(System.out::println);

                System.out.println("* ".repeat(60));

                for (DetailIntro.ResponseDto.Body.Items.Item item2 : itemList) {
                    item.detailIntroItem(item2);
                }

            } catch (JsonProcessingException e) {
                System.out.println("DETAIL_INTRO objectMapper 실패");
                throw new RuntimeException(e);
            }

            System.out.println("테스트 : " + apiTest.toString());
            System.out.println("* ".repeat(60));
        }

        items.forEach(System.out::println);
        System.out.println("* ".repeat(60));

        for (Item item : items) {
            apiUrl = String.format(DETAIL_INFO, apikey, item.getContentid(), id);
            apiTest = apiService(apiUrl);

            try {
                DetailInfo detailInfo = objectMapper.readValue(apiTest, DetailInfo.class);

                List<DetailInfo.ResponseDto.Body.Items.Item> itemList = detailInfo.getResponse().getBody().getItems() != null ? detailInfo.getResponse().getBody().getItems().getItem() : new ArrayList<>();

                itemList.forEach(System.out::println);

                System.out.println("* ".repeat(60));
                List<DetailItem> detailItems = new ArrayList<>();

                if (!itemList.isEmpty()) {
                    for (DetailInfo.ResponseDto.Body.Items.Item item2 : itemList) {
                        DetailItem detailItem = new DetailItem();
                        detailItems.add(detailItem.detailItem(item2));

                    }
                } else {
                    System.out.println("없음.");
                }

                    item.detailItems(detailItems);

            } catch (JsonProcessingException e) {
                System.out.println("DETAIL_INFO objectMapper 실패");
                throw new RuntimeException(e);
            }

            System.out.println("테스트 : " + apiTest.toString());
            System.out.println("* ".repeat(60));

        }

        items.forEach(System.out::println);
        System.out.println("* ".repeat(60));

    }

    public static String apiService(String apiUrl) {
        URI uri = null;

        try {
            uri = new URI(UriComponentsBuilder.fromUriString(apiUrl).build().toUriString());
        } catch (URISyntaxException e) {
            System.out.println("uri 작성 실패.");
            throw new RuntimeException(e);
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-type", "application/json; charset=UTF-8");

        HttpEntity<Map<String, String>> httpEntity = new HttpEntity<>(httpHeaders);

        ResponseEntity<String> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, String.class);

        return responseEntity.getBody();
    }

    public static String extraUrl(String homepage) {
        if (homepage == null || homepage.isEmpty()) {
            return "";
        }

        Pattern pattern = Pattern.compile("\"(http[^\"]*)\"");
        Matcher matcher = pattern.matcher(homepage);

        if (matcher.find()) {
            return matcher.group(1);
        }

        return "";
    }


}
