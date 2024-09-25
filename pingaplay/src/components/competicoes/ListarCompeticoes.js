import CompetitionFirebaseService from "../../services/CompetitionFirebaseService";
import FirebaseContext from "../../utils/FirabaseContext";

import React, { useContext, useEffect, useState } from "react";

const ListarCompeticoes = () => {
    const [competitions, setCompeticoes] = useState([]);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        CompetitionFirebaseService.listar(
            firebase.getFirestoreDB(),
            (competitions) => setCompeticoes(competitions)
        );
    }, [firebase]);

    // função que renderiza as competições
    const RenderizarCompeticoes = ({ competitions }) => {
        return competitions.map((competition, index) => (
            <tr key={competition.id || index}>
                <td>{competition.nomeorganizador}</td>
                <td>{competition.titulo}</td>
                <td>{competition.descricao}</td>
                <td>{competition.local}</td>
                <td>{competition.data}</td>
            </tr>
        ));
    };

    return (
        <div>
            <h1>Listar competições</h1>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nome do Organizador</th>
                            <th scope="col">Título</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Local</th>
                            <th scope="col">Data</th>
                        </tr>
                    </thead>
                    {
                        <tbody>
                            <RenderizarCompeticoes
                                competitions={competitions}
                            />{" "}
                            {/* Chamando como componente */}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );
};

export default ListarCompeticoes;
