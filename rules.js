//squares
let table = document.getElementById("table");
let square
let grid = 20

function createGrid(a){
    table.setAttribute("style" ,` width: auto; display: grid ; grid-template-columns: repeat(${a},0.6cm);gap: 3px 0;`)
    for(let i=1 ; i<=a*a ; i++){
        square = `<div data-sq="${i}" style="width: 0.5cm ;height: 0.5cm; border-radius: 3px ; border: 1px solid;" onclick=put(event);></div>`
        table.innerHTML+=square
    }
}
createGrid(grid)
window.onload = initializeScore;
// Rules

let sqTocheck=[]
let Xsq = []
let Osq = []
let turn = 0 ;
function put(e){
    let sq_num = parseInt (e.currentTarget.dataset.sq);
    let getsq = e.currentTarget
    // console.log(Xsq);
    // console.log(sq_num);
    console.log(sqTocheck);
    // console.log("w "+isThere(sqTocheck, sq_num));
    if(!isThere(sqTocheck, sq_num)){
        if(turn == 0 ){
            getsq.innerHTML =` <i class="fa-solid fa-xmark" style="font-size: 20px; margin-left:2px ;color: red" ></i>`
            Xsq.push(sq_num)
        }else{
            getsq.innerHTML = `<i class="fa-solid fa-o" style="font-size: 18px; margin-left:1.5px; margin-top:1px;color: blue"></i>`
            Osq.push(sq_num)
        }
        sqTocheck.push(sq_num)
        win(sq_num,Xsq,Osq,turn,grid)
        switchTurn()
    
    }
}

function isThere(arr , id){
    console.log("isThere = "+id);
    if(arr.includes(id)){
        return true;
    }else {
        return false;
    }
}

function switchTurn(){
    if(turn == 0){
        turn = 1
        return 1
    }
    if(turn == 1){
        turn = 0
        return 0
    }
}

// function currentTurn(){
// }

function win(lastsq, Xsq, Osq, turn, grid) {
    let count = 1; 
 
    let sqArray = turn == 0 ? Xsq : Osq;

    let lastCheck = lastsq;

    // Horizontal
    count += checkDirection(lastCheck, sqArray, 1); // Right
    count += checkDirection(lastCheck, sqArray, -1); // Left
    if (count >= 5) {
        alert(turn == 0 ? "X Wins!" : "O Wins!");
        turn==0 ? updateScore('X') : updateScore('O');
        resetPage()
        return;
    }

    // Vertical Check 
    count = 1; 
    count += checkDirection(lastCheck, sqArray, grid); 
    count += checkDirection(lastCheck, sqArray, -grid); 
    if (count >= 5) {
        alert(turn == 0 ? "X Wins!" : "O Wins!");
        turn==0 ? updateScore('X') : updateScore('O');
        resetPage()
        return;
    }

    //top-left to bottom-right
    count = 1; 
    count += checkDirection(lastCheck, sqArray, grid + 1);
    count += checkDirection(lastCheck, sqArray, -(grid + 1)); 
    if (count >= 5) {
        alert(turn == 0 ? "X Wins!" : "O Wins!");
        turn==0 ? updateScore('X') : updateScore('O');
        resetPage()
        return;
    }

    //top-right to bottom-left
    count = 1; 
    count += checkDirection(lastCheck, sqArray, grid - 1); 
    count += checkDirection(lastCheck, sqArray, -(grid - 1)); 
    if (count >= 5) {
        alert(turn == 0 ? "X Wins!" : "O Wins!");
        turn==0 ? updateScore('X') : updateScore('O');
        resetPage()
        return;
    }

}

function checkDirection(startSq, sqArray, increment) {
    let tempCount = 0;
    let currentCheck = startSq + increment;

    while (sqArray.includes(currentCheck)) {
        tempCount++;
        currentCheck += increment;
    }

    return tempCount;
}

function updateScore(winner) {
    if (winner === 'X') {
        let currentScore = parseInt(localStorage.getItem('Xscore'));
        localStorage.setItem('Xscore', currentScore + 1);
    } else if (winner === 'O') {
        let currentScore = parseInt(localStorage.getItem('Oscore'));
        localStorage.setItem('Oscore', currentScore + 1);
    }
    updateScoreDisplay();
}

function updateScoreDisplay() {
    document.getElementById('Xscore').textContent = localStorage.getItem('Xscore');
    document.getElementById('Oscore').textContent = localStorage.getItem('Oscore');
}

function initializeScore() {
    if (!localStorage.getItem('Xscore')) {
        localStorage.setItem('Xscore', 0);
    }
    if (!localStorage.getItem('Oscore')) {
        localStorage.setItem('Oscore', 0);
    }
    updateScoreDisplay();
}

function resetPage() {
    sqTocheck = []
    Xsq= []
    Osq= [] 
    table.innerHTML = '' 
    createGrid(grid);  
}
function resetScore() {
    localStorage.setItem('Xscore', 0);
    localStorage.setItem('Oscore', 0);
    initializeScore()
}
