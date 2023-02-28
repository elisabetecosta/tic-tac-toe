'use strict';

const boardRegions = document.querySelectorAll('#gameBoard span');

let vBoard = [];
let turnPlayer = '';

const startBtn = document.getElementById('new-game');
startBtn.addEventListener('click', initializeGame);

const turnMessage = document.querySelector('h2');


function initializeGame() {

    vBoard = [['', '', ''], ['', '', ''], ['', '', '']];

    turnPlayer = 'player1';
    turnMessage.innerHTML = 'Turn: <span id="turnPlayer"></span>';

    updatePlayerName();

    boardRegions.forEach((element) => {

        element.classList.remove('win');
        element.innerText = '';
        element.classList.add('cursor-pointer');

        element.addEventListener('click', handleBoardClick);
    });
}

function updatePlayerName() {

    const playerInput = document.getElementById(turnPlayer);
    const playerName = document.getElementById('turnPlayer');

    playerName.innerText = playerInput.value;
}

function handleBoardClick(event) {

    const span = event.currentTarget;

    const region = span.dataset.region;
    const rowColumnPair = region.split('.');
    const row = rowColumnPair[0];
    const column = rowColumnPair[1];

    if (turnPlayer === 'player1') {

        span.innerText = 'X';
        vBoard[row][column] = 'X';

    } else {

        span.innerText = 'O';
        vBoard[row][column] = 'O';
    }
    console.clear();
    console.table(vBoard);

    disableRegion(span);

    const winRegions = getWinRegions();

    if (winRegions.length > 0) {

        handleWin(winRegions);

    } else if (vBoard.flat().includes('')) {

        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1';
        updatePlayerName();

    } else {

        turnMessage.innerText = 'TIE!';
    }
}

function disableRegion(element) {

    element.classList.remove('cursor-pointer');
    element.removeEventListener('click', handleBoardClick);
}

function getWinRegions() {

    const winRegions = [];

    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2]) {

        winRegions.push("0.0", "0.1", "0.2");
    }

    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2]) {

        winRegions.push("1.0", "1.1", "1.2");
    }

    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2]) {

        winRegions.push("2.0", "2.1", "2.2");
    }

    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0]) {

        winRegions.push("0.0", "1.0", "2.0");
    }

    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1]) {

        winRegions.push("0.1", "1.1", "2.1");
    }

    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2]) {

        winRegions.push("0.2", "1.2", "2.2");
    }

    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2]) {

        winRegions.push("0.0", "1.1", "2.2");
    }

    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0]) {

        winRegions.push("0.2", "1.1", "2.0");
    }
        
    return winRegions;
}

function handleWin(regions) {

    regions.forEach( region => {

        const line = document.querySelector('[data-region="' + region + '"]');
        line.classList.add('win');

        const winner = document.getElementById(turnPlayer).value;

        turnMessage.innerHTML = winner + " won!";
    });

    boardRegions.forEach((element) => {

        element.classList.remove('cursor-pointer');
        element.removeEventListener('click', handleBoardClick);
    });
}