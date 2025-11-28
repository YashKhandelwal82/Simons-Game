let gameSeq = [];
let userSeq = [];

let btns = ["yellow" , "red" ,"purple","green"];


let started = false;
let Level = 0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress" , function() {
    if(started == false){
        // start the game and show level 0 -> then levelUp will increment to 1
        started = true;
        Level = 0;
        levelUp();
    }
});

function gameflash(btn){
   btn.classList.add('flash');
   setTimeout(function() {
         btn.classList.remove("flash");
    } , 250);
}

function userflash(btn){
   btn.classList.add("userflash");
   setTimeout(function() {
         btn.classList.remove("userflash");
    } , 250);
}


function levelUp(){
    userSeq = [];
    Level++;
    h2.innerText = `Level ${Level}`;

    //random btn choose
    // use btns.length for correct range
    let ranInd = Math.floor(Math.random() * btns.length);
    let ranColor = btns[ranInd];
    // query selector by class matching the color name
    let ranbtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    console.log(gameSeq);
    gameflash(ranbtn);
}

function checkAns(inx){
//    console.log("curr level:",Level)
// jiss curr level pr hum hote hein wahi pr userSeq==gameSeq array ka size hota hein ;
    // let inx = Level -1;
    if(userSeq[inx] === gameSeq[inx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp , 1000);
        }
    }else{
       h2.innerHTML = `Game Over..! Your score was <b>${Level}<b> <br> Press any key to start.`; 
         document.querySelector("body").style.backgroundColor = "red";
         setTimeout(function(){
             document.querySelector("body").style.backgroundColor = "white";
         },200)
       reset();
    }

}

function btnPress(){
    let btn_press = this;
    // visual feedback for user press
    userflash(btn_press);
   
    let userColor = btn_press.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length - 1);
}

// select all buttons with class 'btn' (querySelectorAll returns a NodeList)
let allbtns = document.querySelectorAll('.btn');
for(let btn of allbtns){
    btn.addEventListener('click', btnPress);
}

function reset(){
   started = false;
   gameSeq = [];
   userSeq = [];
   Level = 0;
}