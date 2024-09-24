import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ScoreBoard.css";

const Scoreboard = () => {
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [player1Sets, setPlayer1Sets] = useState(0);
    const [player2Sets, setPlayer2Sets] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isWarmingUp, setIsWarmingUp] = useState(false);
    const [warmUpTime, setWarmUpTime] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [winner, setWinner] = useState("");
    const maxScore = 11;
    const maxSets = 4; // Melhor de 7, 4 sets vitoriosos

    // Iniciar cronômetro ao iniciar o jogo
    useEffect(() => {
        let timer;
        if (isTimerRunning) {
            timer = setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isTimerRunning]);

    // Função para iniciar o aquecimento e, após ele, começar o jogo
    const startGame = () => {
        if (player1Name && player2Name && warmUpTime >= 0) {
            setIsWarmingUp(true);
        } else {
            alert("Por favor, preencha todos os campos!");
        }
    };

    // Lógica de contagem regressiva para o tempo de aquecimento
    useEffect(() => {
        if (isWarmingUp && warmUpTime > 0) {
            const timer = setTimeout(() => setWarmUpTime(warmUpTime - 1), 1000);
            return () => clearTimeout(timer);
        } else if (warmUpTime === 0) {
            setIsWarmingUp(false);
            setIsGameStarted(true);
            setIsTimerRunning(true);
        }
    }, [isWarmingUp, warmUpTime]);

    // Função para incrementar o placar de um jogador
    const incrementScore = (setScore, score, opponentScore, setSets, playerSets, opponentSets) => {
        const newScore = score + 1;
        const lead = Math.abs(newScore - opponentScore);

        if (newScore >= maxScore && lead >= 2) {
            setSets(sets => sets + 1);
            resetRound();

            // Checa se o jogador venceu 4 sets
            if (playerSets + 1 === maxSets) {
                endGame(playerSets + 1, opponentSets);
            }
        } else {
            setScore(newScore);
        }
    };

    // Função para decrementar o placar de um jogador
    const decrementScore = (setScore, score) => {
        if (score > 0) {
            setScore(score - 1);
        }
    };

    // Função para resetar o placar entre sets
    const resetRound = () => {
        setPlayer1Score(0);
        setPlayer2Score(0);
    };

    // Função para resetar o jogo
    const resetGame = () => {
        setPlayer1Score(0);
        setPlayer2Score(0);
        setPlayer1Sets(0);
        setPlayer2Sets(0);
        setPlayer1Name("");
        setPlayer2Name("");
        setIsGameStarted(false);
        setIsWarmingUp(false);
        setIsGameOver(false);
        setWarmUpTime(0);
        setElapsedTime(0);
        setIsTimerRunning(false);
        setWinner(""); // Limpa o vencedor
    };

    // Função para encerrar o jogo e anunciar o vencedor
    const endGame = (winnerSets, loserSets) => {
        setIsGameOver(true);
        setIsTimerRunning(false);

        if (player1Sets === maxSets) {
            setWinner(`${player1Name} venceu por ${winnerSets} sets a ${loserSets}!`);
        } else {
            setWinner(`${player2Name} venceu por ${winnerSets} sets a ${loserSets}!`);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Placar Pingas Play</h1>

            {!isGameStarted && !isWarmingUp ? (
                <div className="name-input">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do Jogador 1"
                            onChange={(e) => setPlayer1Name(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do Jogador 2"
                            onChange={(e) => setPlayer2Name(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Aquecimento (min)"
                            onChange={(e) => setWarmUpTime(e.target.value * 60)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={startGame}>
                        Iniciar Jogo
                    </button>
                </div>
            ) : isWarmingUp ? (
                <div>
                    <h2>Aquecendo... {warmUpTime}</h2>
                </div>
            ) : isGameOver ? (
                <div>
                    <h2>{winner}</h2>
                    <button className="btn btn-primary" onClick={resetGame}>
                        Novo Jogo
                    </button>
                </div>
            ) : (
                <div className="scoreboard">
                    <div className="timer">
                        <h3>Tempo de Jogo: {Math.floor(elapsedTime / 60)}:{elapsedTime % 60 < 10 ? '0' : ''}{elapsedTime % 60}</h3>
                    </div>
                    <div className="players-container">
                        <div className="player player1">
                            <h2>{player1Name || "Player 1"}</h2>
                            <h3 className="score">{player1Score}</h3>
                            <h4>Sets: {player1Sets}</h4>
                            <div className="controls">
                                <button
                                    className="btn btn-light"
                                    onClick={() =>
                                        decrementScore(
                                            setPlayer1Score,
                                            player1Score
                                        )
                                    }
                                >
                                    -
                                </button>
                                <button
                                    className="btn btn-light"
                                    onClick={() =>
                                        incrementScore(
                                            setPlayer1Score,
                                            player1Score,
                                            player2Score,
                                            setPlayer1Sets,
                                            player1Sets,
                                            player2Sets
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="player player2">
                            <h2>{player2Name || "Player 2"}</h2>
                            <h3 className="score">{player2Score}</h3>
                            <h4>Sets: {player2Sets}</h4>
                            <div className="controls">
                                <button
                                    className="btn btn-light"
                                    onClick={() =>
                                        decrementScore(
                                            setPlayer2Score,
                                            player2Score
                                        )
                                    }
                                >
                                    -
                                </button>
                                <button
                                    className="btn btn-light"
                                    onClick={() =>
                                        incrementScore(
                                            setPlayer2Score,
                                            player2Score,
                                            player1Score,
                                            setPlayer2Sets,
                                            player2Sets,
                                            player1Sets
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-warning reset-button"
                        onClick={resetGame}
                    >
                        Resetar
                    </button>
                </div>
            )}
        </div>
    );
};

export default Scoreboard;
