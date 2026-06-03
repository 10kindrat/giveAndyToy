let money = 0;
let moneyPerClick = 1;
let upgradeCost = 10;
let toyCost = 50;
let autoMoneyPerSec = 0;
let level = 0;

// Load saved values from localStorage
money = parseInt(localStorage.getItem("money")) || 0;
moneyPerClick = parseInt(localStorage.getItem("moneyPerClick")) || 1;
upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 10;
toyCost = parseInt(localStorage.getItem("toyCost")) || 50;
autoMoneyPerSec = parseInt(localStorage.getItem("autoMoneyPerSec")) || 0;
level = parseInt(localStorage.getItem("level")) || 0;

setInterval(() => {
    money += autoMoneyPerSec;
    updateUI();
}, 1000);

const currentMoneyText = document.getElementById("currentMoneyText");
const clickMoneyText = document.getElementById("clickMoneyText");
const autoMoneyText = document.getElementById("autoMoneyText");
const upgradeCostText = document.getElementById("upgradeCostText");
const toyCostText = document.getElementById("toyCostText");
const toyNumText = document.getElementById("numToy");

const earnMoneyBtn = document.getElementById("earnMoneyBtn");
const upgradeBtn = document.getElementById("upgradeBtn");
const buyToyBtn = document.getElementById("buyToyBtn");

const andySay = document.getElementById("andySay");

// 줌 방지
let lastTouchEnd = 0;
document.addEventListener("touchmove", function(event){
    if(event.touches.length > 1) {
        event.preventDefault();
    }
}, {passive :false});


document.addEventListener("mousedown", function(event){
    if(event.ctrlKey){
        event.preventDefault();
    }
}, {passive :false});    


function updateUI(){ // UI 업데이트 함수 - 돈, 클릭당 돈, 업그레이드 비용, 자동으로 버는 돈, 장난감 비용, 장난감 개수 업데이트
    currentMoneyText.innerText = money;
    clickMoneyText.innerText = moneyPerClick;
    upgradeCostText.innerText = upgradeCost;
    autoMoneyText.innerText = autoMoneyPerSec;
    toyCostText.innerText = toyCost;
    toyNumText.innerText = level;
    upgradeBtn.style.backgroundColor = money < upgradeCost ? "gray" : "#4CAF50";
    buyToyBtn.style.backgroundColor = money < toyCost ? "gray" : "#4CAF50";

}


earnMoneyBtn.addEventListener("click",()=>{
    money += moneyPerClick;
    updateUI();
})

upgradeBtn.addEventListener("click",()=>{
    if(money >= upgradeCost){
        money -= upgradeCost;
        moneyPerClick = Math.floor((moneyPerClick * 1.5) + 1);
        upgradeCost = Math.floor(upgradeCost * 1.5);
    }
    updateUI();
})

buyToyBtn.addEventListener("click",()=>{
    if(money >= toyCost){
        level += 1;
        money -= toyCost;
        autoMoneyPerSec = Math.floor((autoMoneyPerSec * 1.5)+5);
        toyCost = Math.floor(toyCost * 2.5);
        updateImg();
    }
    updateUI();
})

function resetGame(){
    money = 0;
    moneyPerClick = 1;
    upgradeCost = 10;
    toyCost = 50;
    autoMoneyPerSec = 0;
    level = 0;

    localStorage.setItem("money", money);
    localStorage.setItem("moneyPerClick", moneyPerClick);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("toyCost", toyCost);
    localStorage.setItem("autoMoneyPerSec", autoMoneyPerSec);
    localStorage.setItem("level", level);

    updateUI();
}

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", ()=>{
    if(confirm("게임을 초기화하시겠습니까?")){
        resetGame();
    }
});

const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", saveGame);


const message = document.getElementById("message");
function saveGame(){
    localStorage.setItem("money", money);
    localStorage.setItem("moneyPerClick", moneyPerClick);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("toyCost", toyCost);
    localStorage.setItem("autoMoneyPerSec", autoMoneyPerSec);
    localStorage.setItem("level", level);

    message.innerText = "게임이 저장되었습니다.";
    message.style.color = "green";
}



setInterval(() => {
    if(localStorage.getItem("money") != money){
        message.innerText = "게임이 저장되지않았습니다. 저장 버튼을 눌러주세요.";
        message.style.color = "red";
    }
}, 1000);

updateUI();