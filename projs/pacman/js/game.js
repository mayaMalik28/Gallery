'use strict'
// const WALL = '#'
const WALL = '🏢'
    // const FOOD = '.'
const FOOD = '⭐'
const EMPTY = ' ';
// const SUPERFOOD = '🍔'
const SUPERFOOD = '🍦';
const CHERRY = '🍒';
var gIntervalCherry;


var gBoard;
var gGame = {
    score: 1,
    scorsToCollect: 0,
    isOn: false,
    gIsDone: false,
}

function init() {
    closeModal();
    // console.log('hello')
    gGame = {
        score: 1,
        scorsToCollect: 0,
        isOn: true,
        gIsDone: false,
    }
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
        // console.log('scoresToCollect', gGame.scorsToCollect);
        // console.log(gIntervalGhosts);
    gIntervalCherry = setInterval(addCherry, 15000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 || i === SIZE - 2) && (j === 1 || j === SIZE - 2)) {
                board[i][j] = SUPERFOOD;
            }
            if (board[i][j] === FOOD) gGame.scorsToCollect++
                if (board[i][j] === SUPERFOOD) gGame.scorsToCollect += 4
        }
    }
    return board;
}

function addCherry() {
    var emptyCells = getEmptyCells(gBoard);
    // console.log(emptyCells);
    if (emptyCells.length === 0) return;
    var randIdx = getRandomIntInclusive(0, emptyCells.length - 1);
    var cherryLocation = emptyCells[randIdx];
    //model
    gBoard[cherryLocation.i][cherryLocation.j] = CHERRY;
    gGame.scorsToCollect += 10;
    //dom
    renderCell(cherryLocation, CHERRY);
}


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
    if (gGame.score === gGame.scorsToCollect) {
        gGame.gIsDone = true
        openModal();
    }
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    openModal()
}

function openModal() {
    //open modal
    var modal = document.querySelector('.modal');
    if (!modal.classList.contains('show')) modal.classList.add('show');
    //change color
    //change inneHTML
    if (gGame.gIsDone) {
        if (!modal.classList.contains('win')) modal.classList.add('win');
        var strHTML = '<h3> you won! </h3>';
    } else {
        if (!modal.classList.contains('game-over')) modal.classList.add('game-over');
        var strHTML = '<h3> GAME OVER </h3>';
    }
    strHTML += '<button onclick="init()">play again</button>'
    modal.innerHTML = strHTML

}

function closeModal() {
    var modal = document.querySelector('.modal');
    if (modal.classList.contains('show')) modal.classList.remove('show');
    if (modal.classList.contains('win')) modal.classList.remove('win');
    if (modal.classList.contains('game-over')) modal.classList.remove('game-over');

}