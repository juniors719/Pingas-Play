import CompetitionFirebaseService from "../../../services/CompetitionFirebaseService";
import FirebaseContext from "../../../utils/FirabaseContext";

import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./NextCompetitions.css";

const CompetitionItemHome = ({ competition }) => {
    return (
        <div className="listagem-campeonato">
            <div className="text-wrapper">{competition.título}</div>
            <div className="nome-organizador">{competition.IDorganizador}</div>
            <div className="data-do-campeonato">
                {competition.data.toLocaleDateString()}
            </div>
        </div>
    );
};

const RenderizarCompeticoes = ({ competitions }) => {
    return competitions.map((competition) => (
        <CompetitionItemHome key={competition.nome} competition={competition} />
    ));
};

const NextCompetitions = () => {
    const [competitions, setCompetitions] = useState([]);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        CompetitionFirebaseService.listar(
            firebase.getFirestoreDB(),
            (competitions) => setCompetitions(competitions)
        );
    }, [firebase]);

    return (
        <div className="proximas-competicoes">
            <div className="nextcomp-ranking-header">
                <span>Próximas Competições</span>
            </div>
            <div className="competition-list-home">
                <RenderizarCompeticoes competitions={competitions} />
            </div>
        </div>
    );
};

export default NextCompetitions;
