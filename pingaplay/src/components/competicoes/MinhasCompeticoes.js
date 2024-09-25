import CompetitionFirebaseService from "../../services/CompetitionFirebaseService";
import UserFirebaseService from "../../services/UserFirebaseService";
import FirebaseContext from "../../utils/FirabaseContext";
import { auth } from "../../utils/FirebaseConfig";
import { useNavigate } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";

const MinhasCompeticoes = () => {
    const [competitions, setCompeticoes] = useState([]);
    const [user, setUser] = useState(null); // Estado para armazenar o usuário
    const firebase = useContext(FirebaseContext);
    const [erro, setErro] = useState("");
    const Navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (loggedUser) => {
            if (loggedUser) {
                try {
                    // Busca os dados do usuário logado
                    UserFirebaseService.getUserbyUID(
                        firebase.getFirestoreDB(),
                        loggedUser.uid,
                        (userData) => {
                            if (userData) {
                                setUser(userData); // Atualiza o estado com os dados do usuário
                                console.log("Usuário encontrado:", userData);

                                // Só busca as competições do organizador após o `user` ter sido definido
                                if (userData.id) {
                                    CompetitionFirebaseService.listarCompeticoesOrganizador(
                                        firebase.getFirestoreDB(),

                                        (competitions) =>
                                            setCompeticoes(competitions),
                                        userData.id // Usar o ID do usuário para listar as competições
                                    );
                                    Navigate("/competicoes/minhas-competicoes");
                                }
                            } else {
                                setErro("Usuário não encontrado.");
                            }
                        }
                    );
                } catch (error) {
                    setErro("Erro ao buscar usuário.");
                    console.error(error);
                }
            } else {
                setErro("Usuário não autenticado.");
            }
        });

        return () => unsubscribe();
    }, [firebase, Navigate]);

    const handleDelete = (id) => {
        // Excluir a competição
        CompetitionFirebaseService.deletar(
            firebase.getFirestoreDB(),
            id,
            (deletado) => {
                if (deletado) {
                    console.log("Competição excluída com sucesso!");

                    // Atualizar a lista de competições após a exclusão
                    CompetitionFirebaseService.listarCompeticoesOrganizador(
                        firebase.getFirestoreDB(),

                        (competitions) => setCompeticoes(competitions),
                        user.id // Certifique-se de que o 'user' está disponível
                    );
                } else {
                    console.error("Erro ao excluir competição.");
                    setErro("Erro ao excluir competição. Tente novamente.");
                }
            }
        );
    };

    // função que renderiza as competições
    const RenderizarCompeticoes = ({ competitions }) => {
        return competitions.map((competition, index) => (
            <tr key={competition.id || index}>
                <td>
                    {user.nome} {user.sobrenome}
                </td>
                <td>{competition.titulo}</td>
                <td>{competition.descricao}</td>
                <td>{competition.local}</td>
                <td>{competition.data}</td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(competition.id)}
                    >
                        Excluir
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="p-5">
            <h1>Listar competições</h1>
            <div>
                {/* erro */}
                {erro && <p style={{ color: "red" }}>{erro}</p>}
                {/* tabela */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Nome do Organizador</th>
                            <th scope="col">Título</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Local</th>
                            <th scope="col">Data</th>
                            <th scope="col">Ações</th>
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

export default MinhasCompeticoes;
