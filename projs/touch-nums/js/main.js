'use strict'


var gNums;
var gSize = 4;
var gLastNum;
var gStartTime;
var gTimer;

function init() {
    gNums = createNums();
    gLastNum = 0;
    renderNums();
}

function chooseLevel(level) {
    if (level === 1) gSize = 4;
    if (level === 2) gSize = 5;
    if (level === 3) gSize = 6;
    init()
}

function renderNums() {
    var strHTML = '';
    for (var i = 0; i < gSize; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gSize; j++) {
            // var num = gNums[(i * 4) + j];
            var num = gNums.pop()
                // make it nicer with pop
            var className = `cell cell-${i}-${j}`
            strHTML += `<td onclick="cellClicked(this,${num})" class="${className}">${num}</td>`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elNum, num) {
    if (num === 1) startTimer();
    if (num === gSize ** 2) clearInterval(gTimer);
    if (num !== gLastNum + 1) return;
    elNum.style.backgroundColor = 'rgb(163, 160, 160)'
    gLastNum = num
    var elNextNum = document.querySelector('.number');
    elNextNum.innerText = (num < (gSize ** 2)) ? num + 1 : 'Done!'

}

function startTimer() {
    gStartTime = Date.now();
    console.log(gStartTime);
    // var elTime = document.querySelector('.running-time');
    // elTime.innerText = '0.000';
    gTimer = setInterval(function() {
        var currTime = (Date.now() - gStartTime) / 1000;
        var elTime = document.querySelector('.running-time');
        // console.log(elTime);
        elTime.innerText = currTime;
    }, 10);
}

function createNums() {
    var nums = []
    for (var i = 0; i < gSize * gSize; i++) {
        nums.push((i + 1));
    }
    shuffle(nums);
    return nums;
}