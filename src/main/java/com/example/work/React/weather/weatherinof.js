// import React from "react";
//
// const WeatherInfo = (props) => {
//
//     let {area, ulNcst, midWeather, ulFcst, vilFcst, tmn, tmx} = props
//     let date = new Date();
//
//     console.log(tmx, 'info tmx');
//
//
//     return (
//         <>
//             {/* 초단기 실황 */}
//             <div className="box">
//                 <div className="box">
//                     <h1>{`지역 : ${area}`}</h1>
//                 </div>
//                 <div className="box">
//                     {
//                         <>
//                             <span>{`기온 : ${ulNcst.T1H ? ulNcst.T1H : ''} ℃`}</span>
//                             <span>{`습도 : ${ulNcst.REH ? ulNcst.REH : ''} %`}</span>
//                             <span>{`강수량 : ${ulNcst.RN1 ? ulNcst.RN1 : ''} mm`}</span>
//                             <span>{`강수형태 : ${ulNcst.PTY ? ulNcst.PTY : ''}`}</span>
//                         </>
//                     }
//                 </div>
//                 {/* first테이블-> 초단기실황에서 기온, 습도 */}
//                 {/* first테이블-> 초단기예보에서 하늘상태 가장최근 시간으로 출력 */}
//                 {/* first테이블-> 단기예보에서 최저기온/최고기온 출력 */}
//
//                 {/* 초단기 예보 */}
//                 <div className="box">
//                     {ulFcst?.map((item) => (
//                         <div>
//                             <span>{parseInt(item.fcstTime.slice(0, 2))} 시 =></span>
//                             <span> 강수형태: {item.PTY}</span>
//                             <span> 강수량: {item.RN1}</span>
//                             <span> 하늘상태: {item.SKY}</span>
//                             <span> 기온: {item.T1H} ℃</span>
//                             <span> 습도: {item.REH} %</span>
//                         </div>
//                     ))}
//                 </div>
//
//                 {/* 단기 예보 */}
//                 <div className="box">
//                     {vilFcst?.map((item,index) =>
//                         item.map((item2, index2) => (
//                             <>
//                                 {index2 === 0 && <h1>예보날짜 : {item2.fcstDate}</h1>}
//                                 <span>예보 시각: {item2.fcstTime.slice(0, 2)}시</span>
//                                 <span>기온 : {item2.TMP} ℃</span>
//                                 <span>하늘상태 : {item2.SKY}</span>
//                                 <span>강수형태 : {item2.PTY}</span>
//                                 <span>강수확률 : {item2.POP}</span>
//                                 <span>강수량 : {item2.PCP}</span>
//                                 <span>습도 : {item2.REH} %</span>
//                                 <span> 신적설 : {item2.SNO}</span>
//                                 {item2.fcstTime === "0600" && (
//                                     <span>최저기온 : {item2.TMN}</span>
//                                 )}
//                                 {item2.fcstTime === "1500" && (
//                                     <span>최고기온 : {item2.TMX}</span>
//                                 )}
//                                 <hr />
//                             </>
//                         ))
//                     )}
//                 </div>
//                 {/*  중기 기온/ 날씨 */}
//                 <div className="box">
//                     {
//                         Object.values(midWeather).map((item,index) => Object.values(item).map((item2,index2) =>(
//
//                             Object.values(item2).map((item3,index3) => (
//                                 <>
//                                     {(index2===0 && index3 ===0) && <h1>예보날짜 : {date.getFullYear()+''+(date.getMonth()+1)+''+(date.getDate()+(index+4))}</h1>}
//                                     <span>{item3}</span>
//                                     {console.log(item3)}
//                                 </>
//                             ))
//                         )))
//                     }
//
//                 </div>
//
//
//             </div>
//         </>
//     );
// };
//
//
// // <>
// //
// //                 {item2.rnSt4Am && <span>오전강수확률 : {item2.rnSt4Am}</span> }
// //                 {item2.rnSt4Pm && <span>오후강수확률 : {item2.rnSt4Pm}</span>}
// //                 {item2.wf4Am&& <span>오전날씨예보 : {item2.wf4Am}</span>}
// //                 {item2.wf4Pm && <span>오후날씨예보 : {item2.wf4Pm}</span>}
// //                 {item2.taMax4&& <span>최고기온 : {item2.taMax4}</span>}
// //                 {item2.taMin4&& <span>최저기온 : {item2.taMin4}</span>}
// //                 {item2.rnSt5Am&& <span>오전강수확률 : {item2.rnSt5Am}</span>}
// //                 {item2.rnSt5Pm&& <span>오후강수확률 : {item2.rnSt5Pm}</span>}
// //                 {item2.wf5Am&& <span>오전날씨예보 : {item2.wf5Am}</span>}
// //                 {item2.wf5Am&& <span>오후날씨예보 : {item2.wf5Am}</span>}
// //                 {item2.taMax5&& <span>최고기온 : {item2.taMax5}</span>}
// //                 <span>최저기온 : {item2.taMin5}</span>
// //                 <span>오전강수확률 : {item2.rnSt6Am}</span>
// //                 <span>오후강수확률 : {item2.rnSt6Pm}</span>
// //                 <span>오전날씨예보 : {item2.wf6Am}</span>
// //                 <span>오후날씨예보 : {item2.wf6Pm}</span>
// //                 <span>최고기온 : {item2.taMax6}</span>
// //                 <span>최저기온 : {item2.taMin6}</span>
// //                 <span>오전강수확률 : {item2.rnSt7Am}</span>
// //                 <span>오후강수확률 : {item2.rnSt7Pm}</span>
// //                 <span>오전날씨예보 : {item2.wf7Am}</span>
// //                 <span>오후날씨예보 : {item2.wf7Pm}</span>
// //                 <span>최고기온 : {item2.taMax7}</span>
// //                 <span>최저기온 : {item2.taMin7}</span>
// //               </>
//
// export default WeatherInfo;
