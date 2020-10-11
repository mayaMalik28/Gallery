'use strict'
const GHOST = '&#9781;';
// const GHOST = '👻';

var gGhosts = []
var gIntervalGhosts;

function createGhost(board, location = { i: 3, j: 3 }) {
    var ghost = {
        location,
        // location: {
        //     i: 3,
        //     j: 3
        // },
        currCellContent: FOOD,
        color: getRandomColor(),
        isAlive: true,
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost) //get ghost HTML
}


function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    if (!ghost.isAlive) return;
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        if (!ghost.isAlive) {
            renderCell(nextLocation, EMPTY);
            setTimeout(function() {
                currGhost.isAlive = true;
            }, 5000);
        }

        gameOver();
        return;
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    // console.log(gPacman.isSuper);
    if (gPacman.isSuper) renderCell(ghost.location, `<span style="color:gray;">${GHOST}</span>`);
    else renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color};">${GHOST}</span>`
}

function getGhostByLocation(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) return gGhosts[i]
    }
}