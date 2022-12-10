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

// Game flow module
const Game = (() => {
    // Alternate between players
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');

    // Set current player
    let currentPlayer = player1;
    let winner = false;
    let remainingSpots = 9;

 
    function switchPlayer() {
        this.currentPlayer === player1 ? this.currentPlayer = player2 : this.currentPlayer = player1;
    };


    function checkWin () {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[i][0] === gameBoard.board[i][1] && gameBoard.board[i][0] === gameBoard.board[i][2] && gameBoard.board[i][0] !== '') {
                this.winner = true;
                return;
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[0][i] === gameBoard.board[1][i] && gameBoard.board[0][i] === gameBoard.board[2][i] && gameBoard.board[0][i] !== '') {
                this.winner = true;
                return;
            }
        }
        // Check diagonals
        if (gameBoard.board[0][0] === gameBoard.board[1][1] && gameBoard.board[0][0] === gameBoard.board[2][2] && gameBoard.board[0][0] !== '') {
            this.winner = true;
            return;
        }
        if (gameBoard.board[0][2] === gameBoard.board[1][1] && gameBoard.board[0][2] === gameBoard.board[2][0] && gameBoard.board[0][2] !== '') {
            this.winner = true;
            return;
        }
    };

    const tie = () => {
        alert('Tie!');
        gameBoard.resetBoard();
    }

   
    return { checkWin, switchPlayer,tie, currentPlayer, winner, remainingSpots };
})();


gameBoard.drawBoard();