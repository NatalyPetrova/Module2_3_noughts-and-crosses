import styles from './App.module.css';
import React, { useState } from 'react';
import Cell from './Cell';

export const AppLayout = ({
	board,
	currentPlayer,
	winner,
	handleCellClick,
	handleRestartClick,
}) => {
	return (
		<div className="App">
			<div className={styles.board}>
				{board.map((cell, index) => (
					<Cell
						key={index}
						value={cell}
						onClick={() => handleCellClick(index)}
					/>
				))}
			</div>
			<div className={styles.game_info}>
				<span>Текущий ход: {currentPlayer}</span>
				{winner ? <span>Победил: {winner}</span> : null}
				<button onClick={handleRestartClick}>Начать заново</button>
			</div>
		</div>
	);
};

export const App = () => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [winner, setWinner] = useState(null);

	const handleCellClick = (index) => {
		if (!board[index] && !winner) {
			const newBoard = [...board];
			newBoard[index] = currentPlayer;
			setBoard(newBoard);

			const isWinner = checkWinner(newBoard, currentPlayer);
			setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
			setWinner(isWinner);
		}
	};

	const checkWinner = (board, player) => {
		const winCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (const winComb of winCombinations) {
			const [first, second, third] = winComb;

			if (
				board[first] &&
				board[first] === board[second] &&
				board[first] === board[third]
			) {
				return player;
			}

			if (board.every((cell) => cell !== null)) {
				return 'Ничья!';
			}
		}

		return;
	};

	const handleRestartClick = () => {
		setBoard(Array(9).fill(null));
		setCurrentPlayer('X');
		setWinner(null);
	};

	return (
		<AppLayout
			board={board}
			currentPlayer={currentPlayer}
			winner={winner}
			handleCellClick={handleCellClick}
			handleRestartClick={handleRestartClick}
		/>
	);
};
