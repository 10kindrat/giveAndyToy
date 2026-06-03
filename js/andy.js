const andyImg = document.getElementById("andy");
const rightContainer = document.querySelector(".right");

let x = 0;
let speed = 1;

function moveAndy(){
    x += speed;
    if(x >= rightContainer.clientWidth - andyImg.clientWidth || x <= 0){
        speed *= -1;
    }
    
    if(speed > 0){
        andyImg.style.transform = "scaleX(1)";
    }else{
        andyImg.style.transform = "scaleX(-1)";
    }

    andyImg.style.left = `${x}px`;
    requestAnimationFrame(moveAndy);
}

moveAndy();