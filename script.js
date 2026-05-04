let money = 0;
let moneyPerClick = 1;
let upgradeCost = 10;
let toyCost = 50;
let autoMoneyPerSec = 0;
let level = 0;

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

const andyImg = document.getElementById("andy");
const andySay = document.getElementById("andySay");

function updateUI(){
    currentMoneyText.innerText = money;
    clickMoneyText.innerText = moneyPerClick;
    upgradeCostText.innerText = upgradeCost;
    autoMoneyText.innerText = autoMoneyPerSec;
    toyCostText.innerText = toyCost;
    toyNumText.innerText = level;
    upgradeBtn.disabled = money < upgradeCost;
    buyToyBtn.disabled = money < toyCost;
}

function updateImg(){
    if(level == 1){
        andyImg.src = "img/andyLv1.jpg";
        andySay.innerText = "앤디가 관심을 가진다...";
    }
    else if(level == 5){
        andyImg.src = "img/andyLv5.jpg";
        andySay.innerText = "엔디는 리본을 가지고 놀고있다...";
    }
    else if(level == 10){
        andyImg.src = "img/andyLv10.jpg";
        andySay.innerText = "앤디는 너무 즐거워 휴식을 취하고싶다...";
    }
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



updateUI();