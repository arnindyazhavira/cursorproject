class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('[data-cell]');
        this.statusElement = document.getElementById('status');
        this.winningMessageElement = document.getElementById('winning-message');
        this.winningTextElement = document.getElementById('winning-text');
        this.restartButton = document.getElementById('restart-btn');
        this.resetScoreButton = document.getElementById('reset-score-btn');
        this.playAgainButton = document.getElementById('play-again-btn');
        this.scoreXElement = document.getElementById('score-x');
        this.scoreOElement = document.getElementById('score-o');
        
        this.addEventListeners();
        this.updateStatus();
        this.updateScoreDisplay();
    }
    
    addEventListeners() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.resetScoreButton.addEventListener('click', () => this.resetScore());
        this.playAgainButton.addEventListener('click', () => this.playAgain());
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        // Add click animation
        this.cells[index].style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.cells[index].style.transform = 'scale(1)';
        }, 100);
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }
    
    checkWin() {
        return this.winningConditions.some(condition => {
            return condition.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScoreDisplay();
        
        // Highlight winning cells
        const winningCondition = this.winningConditions.find(condition => {
            return condition.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
        
        winningCondition.forEach(index => {
            this.cells[index].classList.add('winning');
        });
        
        this.winningTextElement.textContent = `Player ${this.currentPlayer} wins!`;
        this.showWinningMessage();
    }
    
    handleDraw() {
        this.gameActive = false;
        this.winningTextElement.textContent = "It's a draw!";
        this.showWinningMessage();
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }
    
    updateStatus() {
        this.statusElement.textContent = `Player ${this.currentPlayer}'s turn`;
    }
    
    updateScoreDisplay() {
        this.scoreXElement.textContent = this.scores.X;
        this.scoreOElement.textContent = this.scores.O;
    }
    
    showWinningMessage() {
        this.winningMessageElement.classList.add('show');
    }
    
    hideWinningMessage() {
        this.winningMessageElement.classList.remove('show');
    }
    
    restartGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.updateStatus();
        this.hideWinningMessage();
    }
    
    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.updateScoreDisplay();
        this.restartGame();
    }
    
    playAgain() {
        this.hideWinningMessage();
        this.restartGame();
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});