import React, { useState, useEffect } from 'react';
import './Board.css';

const Board = () => {
    const [board, setBoard] = useState(Array(9).fill(''))
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [winner, setWinner] = useState()

    useEffect(() => {
        setWinner(checkWinner())
    }, [board])

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < winningCombinations.length; i++) {
            const [p1, p2, p3] = winningCombinations[i]
            if (board[p1] !== '' && board[p1] === board[p2] && board[p2] === board[p3]) {
                return board[p1]
            }
        }
    }

    const checkTie = () => {
        return !winner && board.every(b => b !== '')
    }

    const makeMove = (square) => {
        if (board[square] == '' && !winner) {
            const nextBoard = [...board]
            nextBoard[square] = currentPlayer
            setBoard(nextBoard)
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
        }
    }

    const renderBoard = () => {
        return board.map((square, index) => <div className="board__container" onClick={() => makeMove(index)}>{square}</div>)
    }

    const renderResult = () => {
        if (winner)
            return <div className="game__winner">{winner} wins the game!</div>
        if (checkTie())
            return <div className="game__winner">It's a tie!</div>
    }

    const playAgain = () => {
        setCurrentPlayer('X')
        setBoard(Array(9).fill(''))
    }

    const renderButton = () => {
        if (winner || checkTie())
            return <button onClick={() => playAgain()} className="game__button">Play Again</button>
    }

    const renderCurrentPlayer = () => {
        if (!winner && !checkTie())
            return <div className="game__player">It's {currentPlayer} turn!</div>
    }

    return (
        <div className="game">
            <div>{renderResult()}</div>
            <div className="game__board">
                {renderBoard()}
            </div>
            {renderCurrentPlayer()}
            {renderButton()}
        </div>
    )
}

export default Board
