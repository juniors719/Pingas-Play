import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ScoreBoard.css";

const Scoreboard = () => {
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isWarmingUp, setIsWarmingUp] = useState(false);
    const [warmUpTime, setWarmUpTime] = useState(3); // lembrar de ajustar o tempo de aquecimento
    const [isGameOver, setIsGameOver] = useState(false);
    const maxScore = 11;

    // Função para iniciar o aquecimento e, após ele, começar o jogo
    const startGame = () => {
        if (player1Name && player2Name) {
            setIsWarmingUp(true);
        } else {
            alert("Por favor, insira os nomes dos jogadores.");
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
        }
    }, [isWarmingUp, warmUpTime]);

    // Função para incrementar o placar de um jogador
    const incrementScore = (setScore, score, opponentScore) => {
        const newScore = score + 1;
        const lead = Math.abs(newScore - opponentScore);

        if (newScore >= maxScore && lead >= 2) {
            setIsGameOver(true);
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

    // Função para resetar o placar e voltar à tela de nomes
    const resetGame = () => {
        setPlayer1Score(0);
        setPlayer2Score(0);
        setPlayer1Name("");
        setPlayer2Name("");
        setIsGameStarted(false);
        setIsWarmingUp(false);
        setIsGameOver(false);
        setWarmUpTime(3); // lembrar de ajustar o tempo de aquecimento
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
                            onChange={(e) => {
                                if (!isNaN(e.target.value)) {
                                    setWarmUpTime(e.target.value * 60);
                                } else {
                                    setIsGameStarted(false);
                                    alert(
                                        "Por favor, insira um número válido."
                                    );
                                }
                            }}
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
                    <h2>
                        {player1Score > player2Score
                            ? player1Name
                            : player2Name}{" "}
                        venceu!
                    </h2>
                    <button className="btn btn-primary" onClick={resetGame}>
                        Novo Jogo
                    </button>
                </div>
            ) : (
                <div className="scoreboard">
                    <div className="player player1">
                        <h2>{player1Name || "Player 1"}</h2>
                        <h3 className="score">{player1Score}</h3>
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
                                        player2Score
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
                        <div className="controls">
                            <button
                                className="btn btn-light"
                                onClick={() =>
                                    incrementScore(
                                        setPlayer2Score,
                                        player2Score,
                                        player1Score
                                    )
                                }
                            >
                                +
                            </button>
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
