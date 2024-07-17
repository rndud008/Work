// "안녕 내 이름은 제시카야"라는 문장을 프린트하는 함수 'greet’를 만드시오

function greet(){
    console.log("안녕 내 이름은 제시카야")
}

greet();

// 이름을 매개변수로 전달받아 다양한 이름을 프린트 할 수 있게 함수를 수정하시오 예) “안녕 내 이름은 에밀리야”, “안녕 내 이름은 할리야”
function great2(name){
    console.log("안녕 내 이름은",name,"야")
}
great2("에밀리")
great2("할리")

// 매개변수로 전달받은 이름을 반환하게 함수를 수정하시오

function great3(name){
    return name;
}
let A = great3("바나나")
console.log(A);
console.log(great3("바나나"))

//
// meetAt 함수를 만들어주세요.
//     인자를 세개 받습니다.
//
//     첫번째 인자는 년도에 해당하는 숫자입니다.
//     두번째 인자는 월에 해당하는 숫자입니다.
//
//     세번째 인자는 일에 해당하는 숫자입니다.
//
//     년도 인자만 받았을 경우 → "1234년" 과 같은 형식의 문자열을 리턴 해주세요.
//
//     년도,월 인자를 받았을 경우 → 년도와 월을 조합해서 "1234년 5월" 과 같은 형식의 문자열을
//
// 리턴 해주세요.
//
//     년도,월,일 인자를 전부 받았을 경우 → 년도,월,일을 조합해서 "1234/5/6" 과 같은 형식의 문자열을
//
// 리턴 해주세요.

function meetAt(year = '', month = '', day = ''){
    let result;
    if (month === '' && day === ''){
        result = year+'년'
    }else if(day === ''){
        result = year+'년 '+month+'월'
    }else if (year !== '' && month !=='' && day !==''){
        result = year+'/'+month+'/'+day
    }

    return result
}
console.log(meetAt(1234))
console.log(meetAt(1234,5))
console.log(meetAt(1234,5,6))

//
//
//
//     결과 예시
// meetAt(2022); // 결과 --> 2022년
//
// meetAt(2032, 3); // 결과 --> "2032년 3월"
// meetAt(1987, 10, 28); // 결과 --> "1987/10/28"
//
//
//
// findSmallestElement 함수를 구현해 주세요.
//
//     findSmallestElement 의 arr 인자는 숫자 값으로만 이루어진 배열입니다.
//
//     arr 의 값들 중 가장 작은 값을 리턴 해주세요.
//
//     만일 arr 가 비어있으면 0을 리턴 해주세요.
//
//     예를 들어, 다음과 같은 배열이 인자(input)으로 들어왔다면 0이 리턴 되어야 합니다.
//     이용되는 배열
//     [100,200,3,0,2,1]

function findSmallestElement(numbers){
    if(numbers.length ==0){
        return 0;
    }

    numbers.sort()
    return numbers[0];
}

console.log(findSmallestElement([100,200,3,0,2,-1]))

//
// 돈을 매개변수로 받으면 몇개의 지폐와 동전이 필요한지 최소 개수를 계산해주는 함수를 만드시오
//
// 출력예 )
//
// 12300인 경우
// 50000 X 0
// 10000 X 1
// 5000  X 0
// 1000 X 2
// 500 X 0
// 100 X 3

function money(Money){
    let count = Money.toString().length;
    let first = 0
    let second = 0
    let third= 0
    let fourth= 0
    let five= 0
    let six = 0

    if (count >4){

        let tenThousands = Math.floor(Money / 10000);
        first = Math.floor(tenThousands / 5);
        second = tenThousands % 5;

        let thousands = Math.floor((Money % 10000) / 1000);
        third = Math.floor(thousands / 5);
        fourth = thousands % 5;

        let hundreds = Math.floor((Money % 1000) / 100);
        five = Math.floor(hundreds / 5);
        six = hundreds % 5;
    }else if (count > 3){

        let thousands = Math.floor((Money % 10000) / 1000);
        third = Math.floor(thousands / 5);
        fourth = thousands % 5;

        let hundreds = Math.floor((Money % 1000) / 100);
        five = Math.floor(hundreds / 5);
        six = hundreds % 5;
    }else if (count > 2){

        let hundreds = Math.floor((Money % 1000) / 100);
        five = Math.floor(hundreds / 5);
        six = hundreds % 5;
    }

    console.log(first, second, third, fourth, five, six)

}
money(12345)

// 1. 다음의 코드를 es6 문법을 이용하여 재작성 하시오

// let name="noona's fruit store"
// let fruits = ["banana","apple","mango"]
// let address="Seoul"
//
// let store = {    name,    fruits,    address
// }
// console.log(store)

// 2. es6 문법을 이용하여 다음과 같이 출력하시오
// 제 가게 이름은 noona's fruit store 입니다. 위치는 Seoul 에 있습니다
// console.log(`제 가게 이름은 ${name} 입니다. 위치는 ${address} 에 있습니다`)


// 3. 다음 코드를 Destructoring을 이용하여 해결하시오
function calculate(obj){    // 함수 안을 바꾸시오
    let {a,b,c} = obj
    return a+ b+ c;
}

calculate({a:1,b:2,c:3})


// 4. 다음 문제에 정답이 true가 나오게 하시오

let name="noona store"
let fruits = ["banana","apple","mango"]
let address={
    country:"Korea",
    city:"Seoul"
}
let {city} = address

function findStore(obj){
    let {name, city} = obj
    return name==="noona store" && city === "Seoul"
}
console.log(findStore({name,fruits,address}))

// 5. 다음과같이 프린트되게 코드를 바꾸시오
function getNumber(){
    let array = [1,2,3,4,5,6]    // 여기서부터 바꾸시오
    let[first,,third,forth] = array

    // return `first:${array.slice(0,1)}, thrid: ${array.slice(2,3)}, fourth: ${array.slice(3,4)}`;
    return {first,third,forth}
}

console.log(getNumber()) //  결과값 { first: 1, third: 3, forth: 4 }


// 6. 다음의 결과가 true가 되게 하시오
function getCalendar(first, ...rest) {
    return (
        first === "January" &&
        rest[0] === "Febuary" &&
        rest[1] === "March" &&
        rest[2] === undefined
    );
}
let out = ['January','Febuary','March'];
let [a,...rest] = out;
console.log(getCalendar(a,...rest)); // 여기를 바꾸시오


// 7. 두 어레이들중 최소값을 찾는 함수를 완성하시오
function getMinimum(){
    let a= [45,23,78]
    let b = [54,11,9]
    return Math.min(...a,...b)  // 여기를 바꾸시오
}
console.log(getMinimum())


// 8. 다음의 함수를 화살표 함수로 바꾸시오

// function sumNumber() {
//     // 여기서부터 바꾸시오
//     const sum = (a,b) => a + b;
//
//     return sum(40, 10);
// }
// console.log(sumNumber())


// 9. 다음함수를 화살표 함수로 바꾸시오
function sumNumber() {
    //여기를 바꾸시오
    let addNumber = (a) => (b) => (c) =>  a+ b+ c

    return addNumber(1)(2)(3);
}

console.log(sumNumber());

// 모든 문제에는 다음 배열이 쓰입니다.

    let names = [
    "Steven Paul Jobs",
    "Bill Gates",
    "Mark Elliot Zuckerberg",
    "Elon Musk",
    "Jeff Bezos",
    "Warren Edward Buffett",
    "Larry Page",
    "Larry Ellison",
    "Tim Cook",
    "Lloyd Blankfein",
];

// map 문제
// 모든 이름을 대문자로 바꾸어서 출력하시오.
console.log(names.map((item) => item.toUpperCase()))
//     성을제외한 이름만 출력하시오. (예-[“Steven”,“Bill”,“Mark”,“Elon”…])
console.log(names.map((item) => item.slice(0, item.indexOf(" "))))
// 이름의 이니셜만 출력하시오. (예-[“SPU”,“BG”,“MEZ”,“EM”…])
console.log(names.map((item) => item.split(" ").map((item) => item.slice(0,1)).join().replaceAll(",","")))

// filter 문제
// 이름에 a를 포함한 사람들을 출력하시오.
console.log(names.filter((item) => item.includes('a')))
//     이름에 같은 글자가 연속해서 들어간 사람을 출력하시오. (예-tt,ff,ll 이런 글자들)
console.log(names.filter((item) => {
    let splitName = item.split("");
    return splitName.some((letter,index) => letter == splitName[index+1]);
}))
//
// some 문제
// 전체 이름의 길이가 20자 이상인 사람이 있는가?
console.log(names.some((item) => item.length >=20))
//     성을 제외한 이름에 p를 포함한 사람이 있는가?(대소문자 상관 no)
console.log(names.some((item) => item.slice(item.indexOf(" ")).toUpperCase().includes("P")))
//
// every 문제
// 모두의 전체 이름의 길이가 20자 이상인가?
console.log(names.every((item) => item.length >=20))
//     모두의 이름에 a 가 포함되어 있는가?
console.log(names.every((item) => item.includes('a')))
//
//     find 문제
// 전체 이름의 길이가 20자 이상인 사람을 찾으시오.
console.log(names.find((item) => item.length >= 20))
//     미들네임이 포함되어있는 첫번째 사람을 찾으시오.(예-Steven Paul Jobs)
console.log(names.find((item) => item.split(" ").length >= 3))
//
// findIndex 문제
// 전체 이름의 길이가 20자 이상인 사람의 인덱스 번호를 찾으시오.
console.log(names.findIndex((item) => item.length >= 20))
//     미들네임이 포함되어있는 사람의 인덱스 번호를 찾으시오.
console.log(names.findIndex((item) => item.split(" ").length >=3))

