const y = document.querySelectorAll(".btn");
let turn = 'x';
const usedPositions = [];
const userPositions = [];
const computerPositions = [];
var gameLock = false;
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener('click', reset);
const win = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
y.forEach(btn => {

    btn.addEventListener('click', ()=>{
        if(gameLock) return;
        
        btn.innerHTML = `<img src = "cross.png" class = "symbol pop" draggable = false >`;
        triggerPop(btn.querySelector("img"));
        usedPositions.push(Number(btn.id));
        userPositions.push(Number(btn.id));
        console.log(userPositions);
       
        if (checkWin(userPositions)) {
            gameLock = true;
         console.log("User wins!");
         document.querySelector(".title-a").innerHTML= "You win!".toUpperCase();
         return;
}
    gameLock = true;
    setTimeout(computerMove,1000);
       // computerMove();   
        btn.disabled = true;
      
        
    })


})

function computerMove(){
   
   gameLock = false;
      if(usedPositions.length == 9)
      {
         document.querySelector(".title-a").innerHTML= "its a tie!".toUpperCase();

        return;
      }

   var compMove = Math.floor(Math.random()*9+1);
   
   while (usedPositions.includes(compMove)){
    compMove = Math.floor(Math.random()*9+1);
   }
   usedPositions.push(compMove);
   computerPositions.push(compMove);
  
   console.log(computerPositions);


    const compBtn = document.getElementById(`${compMove}`);
compBtn.innerHTML = `<img src="circle.png" class="symbol pop" draggable = false>`;
triggerPop(compBtn.querySelector("img"));
     document.getElementById(`${compMove}`).disabled = true;
     if (checkWin(computerPositions)) {
        gameLock = true;
    console.log("Computer wins!"); document.querySelector(".title-a").innerHTML= "You lose!".toUpperCase();
    return;
}

}
function checkWin(playerMoves) {
    return win.some(combo =>
        combo.every(pos => playerMoves.includes(pos))
    );
}
function triggerPop(element) {
    element.classList.remove("pop");
    void element.offsetWidth; // forces reflow
    element.classList.add("pop");
}

function reset(){
   usedPositions.length = 0;
   userPositions.length = 0;
   computerPositions.length=0;
       gameLock = false;

   
    document.querySelectorAll(".btn").forEach(btn => {
        btn.innerHTML = "";       
        btn.disabled = false;     
    });

   
    document.querySelector(".title-a").innerHTML = "TIC TAC TOE!";

}