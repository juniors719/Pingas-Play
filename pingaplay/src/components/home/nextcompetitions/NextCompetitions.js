import "./NextCompetitions.css";

const CompetitionItemHome = ({ competition }) => {
    return (
        <div className="listagem-campeonato">
            <div className="text-wrapper">{competition.nome}</div>
            <div className="nome-organizador">{competition.organizador}</div>
            <div className="data-do-campeonato">{competition.data}</div>
        </div>
    );
};

const RenderizarCompeticoes = ({ competitions }) => {
    return competitions.map((competition) => (
        <CompetitionItemHome key={competition.nome} competition={competition} />
    ));
};

const NextCompetitions = () => {
    const competitions = [
        {
            nome: "Campeonato de CS:GO",
            organizador: "Valve",
            data: "10/10/2022",
        },
        {
            nome: "Campeonato de LoL",
            organizador: "Riot Games",
            data: "20/10/2022",
        },
        {
            nome: "Campeonato de Valorant",
            organizador: "Riot Games",
            data: "30/10/2022",
        },
    ];

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
