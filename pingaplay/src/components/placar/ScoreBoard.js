import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Scoreboard = () => {
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isWarmingUp, setIsWarmingUp] = useState(false);
    const [warmUpTime, setWarmUpTime] = useState(5); // Tempo de aquecimento em segundos
    const [isGameOver, setIsGameOver] = useState(false); // Estado do jogo terminado
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

        // Verificar se o jogador venceu
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
        setWarmUpTime(5);
    };

    return (
        <div className="container text-center">
            <h1>Placar de Tênis de Mesa</h1>

            {!isGameStarted && !isWarmingUp ? (
                <div>
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
                <div>
                    <div className="row my-4">
                        <div className="col">
                            <h2>{player1Name}</h2>
                            <h3>{player1Score}</h3>
                            <button
                                className="btn btn-success mx-1"
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
                            <button
                                className="btn btn-danger mx-1"
                                onClick={() =>
                                    decrementScore(
                                        setPlayer1Score,
                                        player1Score
                                    )
                                }
                            >
                                -
                            </button>
                        </div>
                        <div className="col">
                            <h2>{player2Name}</h2>
                            <h3>{player2Score}</h3>
                            <button
                                className="btn btn-success mx-1"
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
                                className="btn btn-danger mx-1"
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
                    <button className="btn btn-warning" onClick={resetGame}>
                        Resetar
                    </button>
                </div>
            )}
        </div>
    );
};

export default Scoreboard;
