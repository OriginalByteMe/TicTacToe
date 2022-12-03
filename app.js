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

    return { board, resetBoard };
})();

// Player Factory
const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return { getName, getSymbol };
}

// Display Controller Module
const DisplayController = (() => {
    const board = document.querySelector('.board');
    
    // display board
    const displayBoard = () => {
        const cells = document.querySelectorAll('.cell');
        gameBoard.board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                cells[(rowIndex * 3) + cellIndex].textContent = cell;
            });
        });
    }
    return {displayBoard};
})();



// Game flow module
const Game = (() => {
    DisplayController.displayBoard();

    // Alternate between players
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');
    let currentPlayer = player1;
    let gameStatus = 'playing';
    const cells = document.querySelectorAll('.cell');
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    // Player click X and O
    const playerClick = () => {
        console.log("Current Player: " + currentPlayer.getName());
        cells.forEach(cell => {
            cell.removeEventListener('click', playerClick);
            cell.addEventListener('click', () => {
                if (cell.textContent === '') {
                    cell.textContent = currentPlayer.getSymbol();
                    switchPlayer();
                }
            });
        });
    };

    const checkWin = () => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[i][0] === gameBoard.board[i][1] && gameBoard.board[i][0] === gameBoard.board[i][2] && gameBoard.board[i][0] !== '') {
                return true;
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[0][i] === gameBoard.board[1][i] && gameBoard.board[0][i] === gameBoard.board[2][i] && gameBoard.board[0][i] !== '') {
                return true;
            }
        }
        // Check diagonals
        if (gameBoard.board[0][0] === gameBoard.board[1][1] && gameBoard.board[0][0] === gameBoard.board[2][2] && gameBoard.board[0][0] !== '') {
            return true;
        }
        if (gameBoard.board[0][2] === gameBoard.board[1][1] && gameBoard.board[0][2] === gameBoard.board[2][0] && gameBoard.board[0][2] !== '') {
            return true;
        }
        return false;
    }
    const play = () => {
        playerClick();
        while (gameStatus === 'playing') {
            if (checkWin()) {
                gameStatus = 'win';
                console.log('Game Over');
            }
        }
    }

        
    return { play };
})();
    
Game.play();
