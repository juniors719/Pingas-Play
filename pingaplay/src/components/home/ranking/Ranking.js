import UserFirebaseService from "../../../services/UserFirebaseService";
import FirebaseContext from "../../../utils/FirabaseContext";

import { useEffect, useState, useContext } from "react";

import "../nextcompetitions/NextCompetitions.css";

const RankingItem = ({ ranking }) => {
    return (
        <div
            className="listagem-ranking"
            style={{
                backgroundColor:
                    ranking.posicao === 1
                        ? "#ebb734"
                        : ranking.posicao === 2
                        ? "#bbb"
                        : ranking.posicao === 3
                        ? "#dead7c"
                        : "#eee",
            }}
        >
            <div className="posicao">{ranking.posicao}</div>
            <div className="nome-ranking">
                {ranking.nome} {ranking.sobrenome}
            </div>
            <div className="pontos">{ranking.pontos}</div>
        </div>
    );
};

const RenderizarRanking = ({ rankings }) => {
    return rankings.map((ranking, index) => (
        <RankingItem
            key={ranking.id || index}
            ranking={{ ...ranking, posicao: index + 1 }}
        />
    ));
};

const Ranking = () => {
    const [ranking, setRanking] = useState([]);
    const firebase = useContext(FirebaseContext);
    useEffect(() => {
        UserFirebaseService.listar(firebase.getFirestoreDB(), (users) => {
            const ranking = users.sort((a, b) => b.pontos - a.pontos);
            setRanking(ranking);
        });
    }, [firebase]);

    return (
        <div className="ranking">
            <div className="nextcomp-ranking-header">
                <span>Ranking</span>
            </div>
            <div className="ranking-list-home">
                <RenderizarRanking rankings={ranking} />
            </div>
        </div>
    );
};

export default Ranking;
