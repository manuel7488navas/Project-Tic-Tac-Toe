const xClass = 'x';
const circleClass = 'circle';
let circleTurn;
const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const winnersMessage = document.getElementById('text');
const restartButton = document.getElementById("restartButton");
const combsToWin=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

startGame();

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cells.forEach(cell=>{
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener('click', clickHandlerer);
        cell.addEventListener('click',clickHandlerer, {once:true});
       
    })
    printHover();
    message.classList.remove('show');
}

function clickHandlerer(event){
const cell = event.target;
const currentClass = circleTurn ? circleClass : xClass;
drawSign(cell, currentClass);
if (checkForWin(currentClass)){
    endGame(false);
}else if(checkDraw()){
    endGame(true)
}else{
    changeTurns();
    printHover();
    }
}



function endGame(draw){
    if(draw){
        winnersMessage.innerText = 'Its a draw!';
    }else{
        winnersMessage.innerText = `${circleTurn ? "O's":"X's"} won this one!`
    }
    message.classList.add('show');
}


function checkDraw(){
    return [...cells].every(cell=>{
        return cell.classList.contains(xClass) ||
        cell.classList.contains(circleClass);
    })
}



function drawSign(cell, currentClass){
    cell.classList.add(currentClass);
}

function changeTurns(){
    circleTurn = !circleTurn;
}

function printHover(){
    gameBoard.classList.remove(xClass);
    gameBoard.classList.remove(circleClass);
    if (circleTurn){
        gameBoard.classList.add(circleClass);
    }else{
        gameBoard.classList.add(xClass);
    }

}

function checkForWin(currentClass){
 return combsToWin.some(combinations=>{
    return combinations.every(index=>{
        return cells[index].classList.contains(currentClass);
    })
 })
}