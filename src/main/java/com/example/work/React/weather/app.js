// import { useState, useEffect, useMemo } from "react";
// import "./App.css";
// import WeatherButton from "./component/WeatherButton";
// import * as XLSX from "xlsx";
// import sampleFile from "./assets/sample.xlsx";
// import WeatherInfo from "./component/WeatherInfo";
//
// let url;
//
// function App() {
//     const apiKey =
//         "mcw7keMXaCfirqxNz26s6jfbbhIQavF0pTNbArIUT1RLEdHm%2BYx92V%2FJswNwZJJvPhglAPqs%2BAMGMzcqDsuLEQ%3D%3D";
//
//     const [data, setData] = useState([]);
//     const [ultraSrtNcst, setUltraSrtNcst] = useState([]);
//     const [ultraSrtFcst, setUltraSrtFcst] = useState([]);
//     const [vilageFcst, setVilageFcst] = useState([]);
//     const [area, setArea] = useState("");
//     const [midWeather, setMidWeather] = useState([]);
//     const [tmn, setTmn] = useState([]);
//     const [tmx, setTmx] = useState([]);
//
//     const fetchExcelFile = async () => {
//         try {
//             const response = await fetch(sampleFile);
//             const arrayBuffer = await response.arrayBuffer();
//             const workbook = XLSX.read(arrayBuffer, { type: "array" });
//
//             const firstSheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[firstSheetName];
//
//             const jsonData = XLSX.utils.sheet_to_json(worksheet);
//             setData(jsonData);
//         } catch (error) {
//             console.log(error);
//         }
//     };
//
//     useEffect(() => {
//         fetchExcelFile();
//     }, []);
//
//     let createDate = (date) => {
//         let year = date.getFullYear();
//         let month =
//             date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
//         let day = date.getDate();
//
//         return year + "" + month + "" + day;
//     };
//
//     const srtNcst = async (item) => {
//         let date = new Date();
//         if (date.getHours() === 0 || date.getMinutes() <= 40)
//             date.setTime(date.getTime() - 60 * 60 * 1000);
//         let baseTime =
//             date.getHours() <= 9
//                 ? "0" + date.getHours() + "00"
//                 : date.getHours() + "00";
//
//         let baseDate = createDate(date);
//
//         // 초단기 실황. (매 시 1시간마다 발표 -> 적용시간은 40분.)
//         url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?numOfRows=10&pageNo=1&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=${item.nx}&ny=${item.ny}&serviceKey=${apiKey}`;
//
//         let response = await fetch(url);
//         let data = await response.json();
//         let itemList = data.response.body.items.item;
//         // PTY : 강수형태, REH : 습도, RN1 : 1시간 강수량, T1H : 기온, UUU : 동서바람성분, VEC : 풍향, VVV : 남북바람성분, WSD : 풍속
//
//         itemList = Object.values(itemList).filter((item) =>
//             ["PTY", "REH", "RN1", "T1H"].some((category) =>
//                 item.category.includes(category)
//             )
//         );
//
//         let result = {
//             baseDate: itemList[0].baseDate,
//             PTY: itemList[0].obsrValue,
//             REH: itemList[1].obsrValue,
//             RN1: itemList[2].obsrValue,
//             T1H: itemList[3].obsrValue,
//         };
//
//         return result;
//         // 특정 값 만 추출해서 가져오기 ==> PTY : 강수형태, REH : 습도, RN1 : 1시간 강수량, T1H : 기온
//     };
//
//     const srtFcst = async (item) => {
//         // 초단기 예보 baseTime 잡기.
//         let date = new Date();
//         if (date.getHours() === 0 || date.getMinutes() <= 45)
//             date.setTime(date.getTime() - 60 * 60 * 1000);
//
//         let baseTime =
//             date.getHours() <= 9
//                 ? "0" + date.getHours() + "30"
//                 : date.getHours() + "30";
//
//         let baseDate = createDate(date);
//
//         // 초단기 예보. (매 시 30분 발표 -> 적용시간은 45분.)
//         url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?numOfRows=60&pageNo=1&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=${item.nx}&ny=${item.ny}&serviceKey=${apiKey}`;
//
//         let response = await fetch(url);
//         let data = await response.json();
//         let itemList = data.response.body.items.item;
//
//         itemList = Object.values(itemList).filter((item) =>
//             ["PTY", "REH", "RN1", "T1H", "SKY"].some((category) =>
//                 item.category.includes(category)
//             )
//         );
//
//         const groupByFcstTime = itemList.reduce((acc, item) => {
//             if (!acc[item.fcstTime]) {
//                 acc[item.fcstTime] = [];
//             }
//             acc[item.fcstTime].push(item);
//             return acc;
//         }, []);
//
//         const result = Object.keys(groupByFcstTime).map((fcstTime) => {
//             return {
//                 fcstTime: fcstTime,
//                 PTY: groupByFcstTime[fcstTime][0].fcstValue,
//                 RN1: groupByFcstTime[fcstTime][1].fcstValue,
//                 SKY: groupByFcstTime[fcstTime][2].fcstValue,
//                 T1H: groupByFcstTime[fcstTime][3].fcstValue,
//                 REH: groupByFcstTime[fcstTime][4].fcstValue,
//             };
//         });
//         result.sort((a, b) => parseInt(a.fcstTime) - parseInt(b.fcstTime));
//
//         return result;
//         // LGT = 낙뢰, PTY : 강수형태, RN1 : 1시간 강수량, SKY : 하늘상태, T1H : 기온, REH : 습도, UUU : 동서바람성분, VVV : 남북바람성분, VEC : 풍향, WSD : 풍속
//         // => PTY : 강수형태, RN1 : 1시간 강수량, SKY : 하늘상태, T1H : 기온, REH : 습도  추출해서 사용.
//     };
//
//     const vilfcst2 = (itemList) => {
//         itemList = Object.values(itemList).filter((item) =>
//             ["TMN", "TMX", "TMP", "SKY", "PTY", "POP", "PCP", "REH", "SNO"].some(
//                 (category) => item.category.includes(category)
//             )
//         );
//
//         const groupByFcstTime = itemList.reduce((acc, item) => {
//             if (!acc[item.fcstDate]) {
//                 acc[item.fcstDate] = {};
//             }
//             if (!acc[item.fcstDate][item.fcstTime]) {
//                 acc[item.fcstDate][item.fcstTime] = [];
//             }
//             acc[item.fcstDate][item.fcstTime].push(item);
//             return acc;
//         }, {});
//
//         console.log(groupByFcstTime);
//
//         const result = Object.keys(groupByFcstTime).map((fcstDate) =>
//             Object.keys(groupByFcstTime[fcstDate]).map((fcstTime) => {
//                 return {
//                     fcstDate: fcstDate,
//                     fcstTime: fcstTime,
//                     TMP: groupByFcstTime[fcstDate][fcstTime][0].fcstValue,
//                     SKY: groupByFcstTime[fcstDate][fcstTime][1].fcstValue,
//                     PTY: groupByFcstTime[fcstDate][fcstTime][2].fcstValue,
//                     POP: groupByFcstTime[fcstDate][fcstTime][3].fcstValue,
//                     PCP: groupByFcstTime[fcstDate][fcstTime][4].fcstValue,
//                     REH: groupByFcstTime[fcstDate][fcstTime][5].fcstValue,
//                     SNO: groupByFcstTime[fcstDate][fcstTime][6].fcstValue,
//                     TMN:
//                         groupByFcstTime[fcstDate][fcstTime]?.[7]?.category === "TMN"
//                             ? groupByFcstTime[fcstDate][fcstTime][7].fcstValue
//                             : null,
//                     TMX:
//                         groupByFcstTime[fcstDate][fcstTime]?.[7]?.category === "TMX"
//                             ? groupByFcstTime[fcstDate][fcstTime][7].fcstValue
//                             : null,
//                 };
//             })
//         );
//
//         result.forEach((innerArray) => {
//             innerArray.sort((a, b) => parseInt(a.fcstTime) - parseInt(b.fcstTime));
//         });
//         // fcstTime 순서가 정렬되어 있지 않아서 sort로 정렬.
//
//         return result;
//     };
//
//     const vilFcst = async (item) => {
//         // 단기예보 baseTime 잡기.
//         let date = new Date();
//         let baseTime;
//         if (date.getHours() <= 2) {
//             if (date.getHours() === 2 && date.getMinutes() > 10) {
//                 baseTime = "0200";
//             } else {
//                 date.setTime(date.getTime() - 60 * 60 * 1000 * (date.getHours() + 1));
//                 baseTime = "2300";
//             }
//         } else if (date.getHours() <= 5)
//             date.getHours() === 5 && date.getMinutes() > 10
//                 ? (baseTime = "0500")
//                 : (baseTime = "0200");
//         else if (date.getHours() <= 8)
//             date.getHours() === 8 && date.getMinutes() > 10
//                 ? (baseTime = "0800")
//                 : (baseTime = "0500");
//         else if (date.getHours() <= 11)
//             date.getHours() === 11 && date.getMinutes() > 10
//                 ? (baseTime = "1100")
//                 : (baseTime = "0800");
//         else if (date.getHours() <= 14)
//             date.getHours() === 14 && date.getMinutes() > 10
//                 ? (baseTime = "1400")
//                 : (baseTime = "1100");
//         else if (date.getHours() <= 17)
//             date.getHours() === 17 && date.getMinutes() > 10
//                 ? (baseTime = "1700")
//                 : (baseTime = "1400");
//         else if (date.getHours() <= 20)
//             date.getHours() === 20 && date.getMinutes() > 10
//                 ? (baseTime = "2000")
//                 : (baseTime = "1700");
//         else if (date.getHours() <= 23)
//             date.getHours() === 23 && date.getMinutes() > 10
//                 ? (baseTime = "2300")
//                 : (baseTime = "2000");
//
//         let baseDate = createDate(date);
//
//         // 단기 예보(0200,0500,0800,1100,1400,1700,2000,2300 / 해당시간에 10분후  적용)
//         url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?numOfRows=1000&pageNo=1&dataType=json&base_date=${baseDate}&base_time=${baseTime}&nx=${item.nx}&ny=${item.ny}&serviceKey=${apiKey}`;
//         let response = await fetch(url);
//         console.log(url);
//
//         let data = await response.json();
//
//         let itemList = data.response.body.items.item;
//
//         return vilfcst2(itemList);
//
//         // TMP = 1시간 기온, UUU = 풍속(동서성분), VVV = 풍속(남북성분), VEC = 풍향, WSD = 풍속, TMN = 일 최저기온, TMX = 일 최고기온
//         // SKY = 하늘상태, PTY = 강수형태, POP = 강수확률, WAV = 파고, PCP = 1시간 강수량, REH = 습도, SNO = 1시간 신적설
//     };
//
//     const midweather = async (item) => {
//         // 중기 육상예보
//         let date = new Date();
//         let baseDate;
//         let baseTime;
//         if (date.getHours() < 6) {
//             date.setTime(date.getTime() - 60 * 60 * 1000 * (date.getHours() + 1));
//             baseTime = "1800";
//         } else date.getHours() < 18 ? (baseTime = "0600") : (baseTime = "1800");
//
//         baseDate = createDate(date) + "" + baseTime;
//         url = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?numOfRows=10&pageNo=1&dataType=json&regId=${item.athletics}&tmFc=${baseDate}&serviceKey=${apiKey}`;
//         let response = await fetch(url);
//
//         let data = await response.json();
//
//         let itemList = data.response.body.items.item;
//
//         const MidLandFcst = {
//             3: {
//                 rnStAm: itemList[0].rnSt3Am,
//                 rnStPm: itemList[0].rnSt3Pm,
//                 wfAm: itemList[0].wf3Am,
//                 wfPm: itemList[0].wf3Pm,
//             },
//             4: {
//                 rnStAm: itemList[0].rnSt4Am,
//                 rnStPm: itemList[0].rnSt4Pm,
//                 wfAm: itemList[0].wf4Am,
//                 wfPm: itemList[0].wf4Pm,
//             },
//             5: {
//                 rnStAm: itemList[0].rnSt5Am,
//                 rnStPm: itemList[0].rnSt5Pm,
//                 wfAm: itemList[0].wf5Am,
//                 wfPm: itemList[0].wf5Pm,
//             },
//             6: {
//                 rnStAm: itemList[0].rnSt6Am,
//                 rnStPm: itemList[0].rnSt6Pm,
//                 wfAm: itemList[0].wf6Am,
//                 wfPm: itemList[0].wf6Pm,
//             },
//             7: {
//                 rnStAm: itemList[0].rnSt7Am,
//                 rnStPm: itemList[0].rnSt7Pm,
//                 wfAm: itemList[0].wf7Am,
//                 wfPm: itemList[0].wf7Pm,
//             },
//         };
//
//         //rnSt?AM = ?일 후 오전 강수확률, rnSt?PM = ?일 후 오후 강수확률, wf?Am = ?일 후 오전 날씨예보, wf?Pm = ?일 후 오후 날씨예보
//
//         // 중기 기온예보.
//         url = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?numOfRows=10&pageNo=1&dataType=json&regId=${item.temperature}&tmFc=${baseDate}&serviceKey=${apiKey}`;
//         response = await fetch(url);
//
//         data = await response.json();
//
//         itemList = data.response.body.items.item;
//
//         const MidTa = {
//             3: {
//                 taMax: itemList[0].taMax3,
//                 taMin: itemList[0].taMin3,
//             },
//             4: {
//                 taMax: itemList[0].taMax4,
//                 taMin: itemList[0].taMin4,
//             },
//             5: {
//                 taMax: itemList[0].taMax5,
//                 taMin: itemList[0].taMin5,
//             },
//             6: {
//                 taMax: itemList[0].taMax6,
//                 taMin: itemList[0].taMin6,
//             },
//             7: {
//                 taMax: itemList[0].taMax7,
//                 taMin: itemList[0].taMin7,
//             },
//         };
//         // taMax? = ?일후 최고기온, taMin? = ?일후 최저기온
//
//         let result = { ...MidLandFcst };
//
//         for (let key in MidTa) {
//             if (result.hasOwnProperty(key)) {
//                 result[key] = { ...MidTa[key], ...result[key] };
//             } else {
//                 result = MidTa[key];
//             }
//         }
//
//         return result;
//     };
//
//     const beforeTmn = async (item, tmnCheck) => {
//         url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?numOfRows=60&pageNo=1&dataType=json&base_date=${tmnCheck}&base_time=0200&nx=${item.nx}&ny=${item.ny}&serviceKey=${apiKey}`;
//         let response = await fetch(url);
//         let data = await response.json();
//         let itemList = data.response.body.items.item;
//
//         console.log(itemList, "beforeTmn");
//
//         console.log(
//             itemList.filter((item) => item.fcstTime === "0600"),
//             "beforeTmn2"
//         );
//
//         console.log(
//             vilfcst2(itemList.filter((item) => item.fcstTime === "0600")),
//             "beforeTmn3"
//         );
//         console.log(
//             vilfcst2(itemList.filter((item) => item.fcstTime === "0600")).flatMap(
//                 (item) => item
//             ),
//             "beforeTmn4"
//         );
//         return vilfcst2(
//             itemList.filter((item) => item.fcstTime === "0600")
//         ).flatMap((item) => item);
//     };
//
//     const beforeTmx = async (item, tmxCheck) => {
//         url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?numOfRows=60&pageNo=1&dataType=json&base_date=${tmxCheck}&base_time=1100&nx=${item.nx}&ny=${item.ny}&serviceKey=${apiKey}`;
//         let response = await fetch(url);
//         let data = await response.json();
//         let itemList = data.response.body.items.item;
//
//         console.log(
//             itemList.filter((item) => item.fcstTime === "1500"),
//             "beforeTmx2"
//         );
//
//         return vilfcst2(
//             itemList.filter((item) => item.fcstTime === "1500")
//         ).flatMap((item) => item);
//     };
//
//     const areaClick = async (item) => {
//         setArea(item.area);
//
//         const srtncst = await srtNcst(item);
//         setUltraSrtNcst(srtncst);
//
//         let date = new Date();
//         let month =
//             date.getMonth() >= 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
//         let tmnAndTmxCheck = date.getFullYear() + "" + month + date.getDate();
//
//         if (date.getHours() >= 5) {
//             const tmnC = await beforeTmn(item, tmnAndTmxCheck);
//             setTmn(tmnC);
//         }
//
//         if (date.getHours() >= 14) {
//             const tmxC = await beforeTmx(item, tmnAndTmxCheck);
//             setTmx(tmxC);
//         }
//
//         const srtfcst = await srtFcst(item);
//         setUltraSrtFcst(srtfcst);
//
//         const vilfcst = await vilFcst(item);
//         setVilageFcst(vilfcst);
//
//         const midfcst = await midweather(item);
//         setMidWeather(midfcst);
//     };
//
//     return (
//         <>
//             <div className="container">
//                 <WeatherButton buttonList={data} areaClick={areaClick} />
//             </div>
//             <div className="container">
//                 <WeatherInfo
//                     ulNcst={ultraSrtNcst}
//                     area={area}
//                     ulFcst={ultraSrtFcst}
//                     vilFcst={vilageFcst}
//                     midWeather={midWeather}
//                     tmn={tmn}
//                     tmx={tmx}
//                 />
//             </div>
//         </>
//     );
// }
//
// export default App;
