// Tic Tac Toe Board Module
const gameBoard = (() => {

    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const resetBoard = () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    };
    const drawBoard = () => {
        const cells = document.querySelectorAll('.cell');
        
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                cell.innerHTML = Game.currentPlayer.symbol;
                let row = Math.floor(index / 3);
                let col = index % 3;
                board[row][col] = Game.currentPlayer.symbol;
                cell.style.pointerEvents = 'none';
                cell.classList.add('activated');
                Game.remainingSpots--;
                Game.checkWin();
              
                if (Game.winner == false){
                    if (Game.remainingSpots > 0){
                        Game.switchPlayer();
                    } else if (Game.remainingSpots == 0){
                        Game.tie();
                    }
                }
            })
        });
    }

    return { board, resetBoard, drawBoard };
})();

// Player Factory
const Player = (name, symbol) => {
    return { name, symbol };
}

const resetBoard = () => {
    location.reload(true);
}

const changeName = () => {
    const player1Input = document.querySelector('#player1');
    const player2Input = document.querySelector('#player2');
    Game.player1.name = player1Input.value;
    Game.player2.name = player2Input.value;
}


// Game flow module
const Game = (() => {
    // Alternate between players
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');
    const playerDisplay = document.querySelector('.player-display');

    // Set current player
    let currentPlayer = player1;
    let winner = false;
    let remainingSpots = 9;

    playerDisplay.innerHTML = `${currentPlayer.name}'s turn`;
 
    function switchPlayer() {
        this.currentPlayer === player1 ? this.currentPlayer = player2 : this.currentPlayer = player1;
        playerDisplay.innerHTML = `${this.currentPlayer.name}'s turn`;
    };


    function checkWin () {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[i][0] === gameBoard.board[i][1] && gameBoard.board[i][0] === gameBoard.board[i][2] && gameBoard.board[i][0] !== '') {
                this.winner = true;
                playerDisplay.innerHTML = `${this.currentPlayer.name} wins!`;
                return;
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[0][i] === gameBoard.board[1][i] && gameBoard.board[0][i] === gameBoard.board[2][i] && gameBoard.board[0][i] !== '') {
                this.winner = true;
                playerDisplay.innerHTML = `${this.currentPlayer.name} wins!`;
                return;
            }
        }
        // Check diagonals
        if (gameBoard.board[0][0] === gameBoard.board[1][1] && gameBoard.board[0][0] === gameBoard.board[2][2] && gameBoard.board[0][0] !== '') {
            this.winner = true;
            playerDisplay.innerHTML = `${this.currentPlayer.name} wins!`;
            return;
        }
        if (gameBoard.board[0][2] === gameBoard.board[1][1] && gameBoard.board[0][2] === gameBoard.board[2][0] && gameBoard.board[0][2] !== '') {
            this.winner = true;
            playerDisplay.innerHTML = `${this.currentPlayer.name} wins!`;
            return;
        }
    };

    const tie = () => {
        playerDisplay.innerHTML = 'Tie!';
        gameBoard.resetBoard();
    }

   
    return { checkWin, switchPlayer,tie, currentPlayer, winner, remainingSpots, player1, player2 };
})();


gameBoard.drawBoard();