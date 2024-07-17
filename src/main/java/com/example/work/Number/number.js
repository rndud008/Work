// 랜덤번호 지정

// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름

// 만약 유저가 랜덤번호를 맞추면 , 맞춤

// 랜덤번호가 < 유저번호  Down

// 랜덤번호가 > 유저번호 up

// reset 버튼을 누르념 게임이 리셋.

// 5번의 기회를 지녔으며 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)

// 유저가 1 ~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다

// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

let computerNum =0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("resset-button");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver =false
let userValueHistory = [];

playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", () => userInput.value='')
function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답", computerNum)
}

function play(){
    let userValue = userInput.value;

    if(userValueHistory.includes(userValue)) return resultArea.textContent='이미 입력한 결과값 입니다.'
    if(userValue <1 || userValue >100) return resultArea.textContent='1과 100 사이 숫자를 입력해주세요.'

    chances--;
    chanceArea.textContent=` 남은기회 : ${chances}번 `

    if(userValue < computerNum){
        resultArea.textContent = "UP!"
        console.log("Up");
    }else if(userValue > computerNum){
        resultArea.textContent ="Down!"
        console.log("down")
    }else {
        resultArea.textContent = "맞춤."
        gameOver = true
    }

    userValueHistory.push(userValue);

    if(chances < 1){
        gameOver = true
    }
    if(gameOver === true){
        playButton.disabled = true;
    }
}

function reset(){
    // user input 창이 깨끗하게 정리되고
    // 새로운 번호가 생성됨.
    userInput.value='';
    chances=5;
    userValueHistory=[];
    gameOver =false
    playButton.disabled = false;
    chanceArea.textContent=` 남은기회 : ${chances}번 `

    pickRandomNum();

}

pickRandomNum();

