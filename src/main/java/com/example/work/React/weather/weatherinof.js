// import React, { useEffect, useRef, useState } from "react";
// import { faSun, faSnowflake } from "@fortawesome/free-regular-svg-icons";
// import {
//     faMoon,
//     faCloud,
//     faCloudRain,
//     faCloudMoon,
//     faCloudSun,
//     faCloudMeatball,
//     faDroplet,
//     faTemperatureHalf,
//     faTemperatureArrowDown,
//     faTemperatureArrowUp,
//     faCloudShowersHeavy,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import LineChart from "./LineChart";
// import Draggable from "react-draggable";
//
// const day = {
//     0: "일요일",
//     1: "월요일",
//     2: "화요일",
//     3: "수요일",
//     4: "목요일",
//     5: "금요일",
//     6: "토요일",
// };
//
// const WeatherInfo = (props) => {
//     let { area, ulNcst, midWeather, ulFcst, vilFcst, tmn, tmx } = props;
//     let date = new Date();
//
//     let chkTmn = vilFcst[0]?.filter((item) => item.TMN);
//     let chkTmx = vilFcst[0]?.filter((item) => item.TMX);
//
//     const containerRef = useRef(null);
//     const [containerWidth, setContainerWidth] = useState(0);
//     const [draggableWidth, setDraggableWidth] = useState(0);
//
//     const draggableElement = document.querySelector(".draggable-item");
//
//     useEffect(() => {
//         if (containerRef.current) {
//             setContainerWidth(containerRef.current.offsetWidth);
//         }
//
//         if (draggableElement) {
//             setDraggableWidth(draggableElement.offsetWidth);
//         }
//     }, []);
//
//     const lastTodayVilfcstAm = chkTmn?.[0]?.TMN ? chkTmn : tmn;
//     const lastTodayVilfcstPm = chkTmx?.[0]?.TMX ? chkTmx : tmx;
//
//     const todayVilfcst = [...lastTodayVilfcstAm, ...lastTodayVilfcstPm];
//
//     const weather = {
//         AM1: <FontAwesomeIcon icon={faSun} beat color="#FFD43B" size="3x" />,
//         PM1: <FontAwesomeIcon icon={faMoon} beat color="#74C0FC" size="3x" />,
//         // 하늘상태 : 1
//         AM3: <FontAwesomeIcon icon={faCloudSun} beat color="#FFD43B" size="3x" />,
//         PM3: <FontAwesomeIcon icon={faCloudMoon} beat color="#2492d6" size="3x" />,
//         // 하늘상태 : 3
//         4: <FontAwesomeIcon icon={faCloud} beat color="#969aa2" size="3x" />, //하늘상태 : 4
//     };
//
//     const rainAndSnow = {
//         1: <FontAwesomeIcon icon={faCloudRain} beat color="#74C0FC" size="3x" />, // 강수형태 : 1
//         2: <FontAwesomeIcon icon={faCloudRain} beat color="#74C0FC" size="3x" />, // 강수형태 : 1 // 비
//         3: (
//             <FontAwesomeIcon icon={faCloudMeatball} beat color="#8ecef5" size="3x" />
//         ), // 강수형태 : 3 // 눈
//         4: (
//             <FontAwesomeIcon
//                 icon={faCloudShowersHeavy}
//                 color="#74C0FC"
//                 beat
//                 size="3x"
//             />
//         ), // 강수형태 :4 소나기
//         5: <FontAwesomeIcon icon={faCloudRain} beat color="#74C0FC" size="3x" />, // 강수형태 : 1 // 비
//         6: (
//             <FontAwesomeIcon icon={faCloudMeatball} beat color="#8ecef5" size="3x" />
//         ), // 강수형태 : 3 // 눈
//         7: (
//             <FontAwesomeIcon icon={faCloudMeatball} beat color="#8ecef5" size="3x" />
//         ), // 강수형태 : 3 // 눈
//     };
//
//     // 맑음, //하늘형태 1
//     // 구름많음, //하늘형태 3
//     // 흐림, //하늘형태 4
//
//     // 흐리고 소나기,구름많고 소나기 // 강수형태 4
//     // 구름많고 비 , 흐리고 비, 구름많고 비/눈, 흐리고 비/눈 // 강수형태 1
//     // 구름많고 눈, 흐리고 눈, // 강수형태 3
//
//     const midSkyAndRainAndSnow = {
//         맑음: <FontAwesomeIcon icon={faSun} beat color="#FFD43B" size="3x" />,
//         구름많음: (
//             <FontAwesomeIcon icon={faCloudSun} beat color="#FFD43B" size="3x" />
//         ),
//         흐림: <FontAwesomeIcon icon={faCloud} beat color="#969aa2" size="3x" />,
//         흐리고소나기: (
//             <FontAwesomeIcon
//                 icon={faCloudShowersHeavy}
//                 color="#74C0FC"
//                 beat
//                 size="3x"
//             />
//         ),
//         구름많고소나기: (
//             <FontAwesomeIcon
//                 icon={faCloudShowersHeavy}
//                 color="#74C0FC"
//                 beat
//                 size="3x"
//             />
//         ),
//         구름많고비: (
//             <FontAwesomeIcon icon={faCloudRain} beat color="#74C0FC" size="3x" />
//         ),
//         흐리고비: (
//             <FontAwesomeIcon icon={faCloudRain} beat color="#74C0FC" size="3x" />
//         ),
//         구름많고비눈: (
//             <FontAwesomeIcon icon={faCloudRain} beat color="#74C0FC" size="3x" />
//         ),
//         흐리고비눈: (
//             <FontAwesomeIcon icon={faCloudRain} beat color="#74C0FC" size="3x" />
//         ),
//         구름많고눈: (
//             <FontAwesomeIcon icon={faCloudMeatball} beat color="#8ecef5" size="3x" />
//         ),
//         흐리고눈: (
//             <FontAwesomeIcon icon={faCloudMeatball} beat color="#8ecef5" size="3x" />
//         ),
//     };
//
//     let hour = date.getMinutes() >= 45 ? date.getHours() + 1 : date.getHours();
//     const weatherFind = ulFcst?.filter((item) => {
//         return parseInt(item.fcstTime.slice(0, 2)) === parseInt(hour);
//     });
//
//     const month =
//         date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
//     const today = date.getFullYear() + "" + month + date.getDate();
//
//     let todayLine = [vilFcst?.[0]];
//
//     todayLine = todayLine.map((item) =>
//         item?.filter(
//             (item2) =>
//                 parseInt(item2.fcstTime.slice(0, 2)) > parseInt(date.getHours())
//         )
//     );
//
//     const todayLineAfter = vilFcst?.map((item) =>
//         item.filter(
//             (item2) => item2.fcstDate.toString().trim() !== today.toString().trim()
//         )
//     );
//
//     let data = [...todayLine, ...todayLineAfter];
//     data = data.flatMap((item) => item);
//     // 2차원 배열을 1차원 배열로 변환.
//
//     const init = {
//         labels: data.map((item) => item?.fcstTime.slice(0, 2) + "시"),
//         datasets: [
//             {
//                 label: "TMP",
//                 data: data.map((item) => item?.TMP),
//             },
//         ],
//     };
//
//     const extraPcp = (item) => {
//         const match = item?.match(/(\d+(\.\d+)?)/);
//         return match ? parseFloat(match[0]) : "-";
//     };
//
//     const options = {
//         responsive: true,
//         maintainAspectRatio: false, // 가로 세로 비율 유지하지 않음
//         scales: {
//             x: {
//                 display: true,
//                 title: {
//                     display: true,
//                     text: "시간",
//                 },
//             },
//             y: {
//                 display: true,
//                 title: {
//                     display: true,
//                     text: "기온",
//                 },
//                 beginAtZero: true,
//                 max: 50,
//             },
//         },
//         plugins: {
//             legend: {
//                 display: true,
//                 position: "top",
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (context) {
//                         return `기온: ${context.raw}℃`;
//                     },
//                 },
//             },
//         },
//     };
//
//     console.log(data);
//
//     const AmAndPm = (time) => {
//         let result;
//
//         if (parseInt(time) <= 5 || parseInt(time) >= 19) {
//             result = "PM";
//         } else if (parseInt(time) >= 6 || parseInt(time) <= 18) {
//             result = "AM";
//         }
//
//         return result;
//     };
//
//     return (
//         <>
//             <div
//                 className="box"
//                 ref={containerRef}
//                 onClick={() => setDraggableWidth(draggableElement.offsetWidth)}
//             >
//                 <div className="box">
//                     <h1>{`지역 : ${area}`}</h1>
//                 </div>
//                 <div className="weatherinfo">
//                     <div>
//                         <div className="item">
//               <span>
//                 <FontAwesomeIcon icon={faTemperatureHalf} color="#ff0000" />
//                   {`${ulNcst.T1H ? ulNcst.T1H : ""} ℃`}
//               </span>
//                             {/* 기온 */}
//                             <span>
//                 <FontAwesomeIcon icon={faDroplet} color="#74C0FC" />
//                                 {` ${ulNcst.REH ? ulNcst.REH : ""} %`}
//               </span>
//                             {/* 습도 */}
//                         </div>
//                         <div className="item">
//               <span>
//                 <FontAwesomeIcon
//                     icon={faTemperatureArrowDown}
//                     color="#74C0FC"
//                 />
//                   {lastTodayVilfcstAm?.[0]?.TMN
//                       ? lastTodayVilfcstAm?.[0]?.TMN
//                       : ""}{" "}
//                   / {/* 최저기온 */}
//                   <FontAwesomeIcon icon={faTemperatureArrowUp} color="#ff0000" />
//                   {lastTodayVilfcstPm?.[0]?.TMX
//                       ? lastTodayVilfcstPm?.[0]?.TMX
//                       : ""}
//               </span>
//                             {/* 최고기온 */}
//                         </div>
//                     </div>
//                     <div className="item">
//                         {ulNcst.PTY === "0"
//                             ? weather[
//                                 weatherFind[0]?.SKY === "4"
//                                     ? weatherFind[0]?.SKY
//                                     : AmAndPm(weatherFind[0]?.fcstTime.slice(0, 2)) +
//                                     "" +
//                                     weatherFind[0]?.SKY
//                                 ]
//                             : rainAndSnow[ulNcst.PTY]}{" "}
//                         {/* 하늘상태 */}
//                         {console.log(weatherFind[0], "하늘")}
//                     </div>
//                 </div>
//                 <Draggable
//                     axis="x"
//                     bounds={{
//                         left: Math.min(0, containerWidth - draggableWidth),
//                         right: 0,
//                     }}
//                 >
//                     <table>
//                         <tbody>
//                         <thead>
//                         <tr>
//                             <td className="item-td"></td>
//                             {data.map((item) => (
//                                 <>
//                                     <td>{item?.fcstTime.slice(0, 2)}</td>
//                                 </>
//                             ))}
//                         </tr>
//                         <tr>
//                             <td className="item-td"></td>
//                             {data?.map((item) => (
//                                 <>
//                                     {
//                                         <td className="item-td">
//                                             {item?.PTY === "0"
//                                                 ? weather[
//                                                     item?.SKY === "4"
//                                                         ? item?.SKY
//                                                         : AmAndPm(item?.fcstTime.slice(0, 2)) +
//                                                         item?.SKY
//                                                     ]
//                                                 : rainAndSnow[item?.PTY]}
//                                         </td>
//                                     }
//                                 </>
//                             ))}
//                         </tr>
//                         </thead>
//                         <tr>
//                             <td className="draggable-item">
//                                 <LineChart chartData={init} options={options} />
//                             </td>
//                         </tr>
//                         <tr className="item">
//                             <td className="item-td">강수확률(%)</td>
//                             {data?.map((item) => (
//                                 <>{<td className="item-td">{extraPcp(item?.POP)}</td>}</>
//                             ))}
//                         </tr>
//                         <tr className="item">
//                             <td className="item-td">강수량(mm)</td>
//                             {data?.map((item) => (
//                                 <>{<td className="item-td">{extraPcp(item?.PCP)}</td>}</>
//                             ))}
//                         </tr>
//                         <tr className="item">
//                             <td className="item-td">습도(%)</td>
//                             {data?.map((item) => (
//                                 <>{<td className="item-td">{item?.REH}</td>}</>
//                             ))}
//                         </tr>
//                         </tbody>
//                     </table>
//                 </Draggable>
//
//                 <div>
//                     {todayVilfcst[0] && todayVilfcst[1] && <div className="weekContainer">
//                         <div>
//                             {todayVilfcst[0].fcstDate.slice(4, 6) +
//                                 "." +
//                                 todayVilfcst[0].fcstDate.slice(6)}
//                             오늘
//                         </div>
//                         <div>
//                             <span>오전 강수확률 : {todayVilfcst[0].POP}%</span>
//                             {todayVilfcst[0].PTY === "0"
//                                 ? weather[
//                                     todayVilfcst[0].SKY === "4"
//                                         ? todayVilfcst[0].SKY
//                                         : AmAndPm(todayVilfcst[0].fcstTime.slice(0, 2)) +
//                                         todayVilfcst[0].SKY
//                                     ]
//                                 : rainAndSnow[todayVilfcst[0].PTY]}
//
//                             <span>오후 강수확률 : {todayVilfcst[1].POP}%</span>
//                             {todayVilfcst[1].PTY === "0"
//                                 ? weather[
//                                     todayVilfcst[1].SKY === "4"
//                                         ? todayVilfcst[1].SKY
//                                         : AmAndPm(todayVilfcst[1].fcstTime.slice(0, 2)) +
//                                         todayVilfcst[1].SKY
//                                     ]
//                                 : rainAndSnow[todayVilfcst[1].PTY]}
//                         </div>
//                         <div>
//                             <span>{Math.floor(todayVilfcst[0].TMN)}°</span>
//                             <span>/</span>
//                             <span>{Math.floor(todayVilfcst[1].TMX)}°</span>
//                         </div>
//                     </div>}
//
//
//                     {todayLineAfter?.map((item, index) => {
//                         date = new Date();
//                         date.setTime(date.getTime() + 60 * 1000 * 60 * 24 * index);
//                         return index === 1 || index === 2 ? (
//                             <div className="weekContainer">
//                                 {item.map((item2) => (
//                                     <>
//                                         {item2.fcstTime === "0600" && (
//                                             <>
//                                                 <div>
//                                                     {item2.fcstDate.slice(4, 6) +
//                                                         "." +
//                                                         item2.fcstDate.slice(6)}
//                                                     {index === 1 ? "내일" : day[date.getDay()]}
//                                                 </div>
//                                                 <div>
//                                                     <span>오전 강수확률 : {item[6].POP}%</span>
//                                                     {item[6].PTY === "0"
//                                                         ? weather[
//                                                             item[6].SKY === "4"
//                                                                 ? item[6].SKY
//                                                                 : AmAndPm(item[6].fcstTime.slice(0, 2)) +
//                                                                 item[6].SKY
//                                                             ]
//                                                         : rainAndSnow[item[6].PTY]}
//
//                                                     <span>오후 강수확률 : {item[15].POP}%</span>
//                                                     {item[15].PTY === "0"
//                                                         ? weather[
//                                                             item[15].SKY === "4"
//                                                                 ? item[15].SKY
//                                                                 : AmAndPm(item[15].fcstTime.slice(0, 2)) +
//                                                                 item[15].SKY
//                                                             ]
//                                                         : rainAndSnow[item[15].PTY]}
//                                                 </div>
//                                                 <div>
//                                                     <span>{Math.floor(item[6].TMN)}°</span>
//                                                     <span>/</span>
//                                                     <span>{Math.floor(item[15].TMX)}°</span>
//                                                 </div>
//                                             </>
//                                         )}
//                                     </>
//                                 ))}
//                             </div>
//                         ) : null;
//                     })}
//
//                     {/*  중기 기온/ 날씨 */}
//                     {Object.values(midWeather).map((item, index) => {
//                         date = new Date();
//                         date.setTime(date.getTime() + 60 * 1000 * 60 * 24 * (index + 3));
//                         return (
//                             <>
//                                 <div className="weekContainer">
//                                     <div>
//                                         {date.getMonth() + 1 <= 9
//                                             ? "0" + (date.getMonth() + 1)
//                                             : date.getMonth() + 1}
//                                         .
//                                         {date.getDate() <= 9
//                                             ? "0" + date.getDate()
//                                             : date.getDate()}
//                                         {day[date.getDay()]}
//                                     </div>
//                                     <div>
//                                         <span>오전강수확률 :{item.rnStAm}%</span>
//                                         {
//                                             midSkyAndRainAndSnow[
//                                                 item.wfAm.replaceAll(" ", "").replaceAll("/", "")
//                                                 ]
//                                         }
//                                         <span>오후강수확률 :{item.rnStPm}%</span>
//                                         {
//                                             midSkyAndRainAndSnow[
//                                                 item.wfPm.replaceAll(" ", "").replaceAll("/", "")
//                                                 ]
//                                         }
//                                     </div>
//                                     <div>
//                                         <span>{item.taMin}°</span>
//                                         <span>/</span>
//                                         <span>{item.taMax}°</span>
//                                     </div>
//                                 </div>
//                             </>
//                         );
//                     })}
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default WeatherInfo;
