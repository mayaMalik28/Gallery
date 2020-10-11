'use strict'
// const PACMAN = '😷';
const PACMAN = '😺';

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    if (nextCell === CHERRY) updateScore(10);
    else if (nextCell === SUPERFOOD) {
        updateScore(4);
        gPacman.isSuper = true;
        for (var i = 0; i < gGhosts.length; i++) {
            var strHTML = `<span style="color:gray;">${GHOST}</span>`
            renderCell(gGhosts[i].location, strHTML);
        }
        setTimeout(function() {
            gPacman.isSuper = false;
            for (var i = 0; i < gGhosts.length; i++) {
                var strHTML = getGhostHTML(gGhosts[i]);
                renderCell(gGhosts[i].location, strHTML);
            }
        }, 4000);


    } else if (nextCell === GHOST) {
        console.log(gPacman.isSuper);
        if (gPacman.isSuper) {
            var currGhost = getGhostByLocation(nextLocation);
            currGhost.isAlive = false;
            renderCell(nextLocation, EMPTY);
            setTimeout(function() {
                currGhost.isAlive = true;
            }, 5000);
        } else {
            gameOver();
            renderCell(gPacman.location, EMPTY);
            return;
        }
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);


}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}