import { getFirestore } from "firebase/firestore"; // Certifique-se de importar Firestore corretamente
import CompetitionFirebaseService from "../../services/CompetitionFirebaseService";
import UserFirebaseService from "../../services/UserFirebaseService";
import FirebaseContext from "../../utils/FirabaseContext";
import { auth } from "../../utils/FirebaseConfig";

import React, { useState, useContext, useEffect } from "react";

const CadastrarCompeticao = () => {
    const firebase = useContext(FirebaseContext);
    const [user, setUser] = useState(null); // Estado para armazenar o usuário
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [local, setLocal] = useState("");
    const [data, setData] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    useEffect(() => {
        // Verifica o estado de autenticação e busca os dados do usuário
        const unsubscribe = auth.onAuthStateChanged((loggedUser) => {
            if (loggedUser) {
                UserFirebaseService.getUserbyUID(
                    firebase.getFirestoreDB(),
                    loggedUser.uid,
                    (userData) => {
                        if (userData) {
                            setUser(userData); // Atualiza o estado com os dados do usuário
                        } else {
                            setErro("Usuário não encontrado.");
                        }
                    }
                );
            } else {
                setErro("Usuário não autenticado.");
            }
        });

        // Limpar o listener ao desmontar o componente
        return () => unsubscribe();
    }, [firebase]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!user) {
            setErro("Não foi possível identificar o organizador.");
            return;
        }

        const novaCompeticao = {
            titulo,
            descricao,
            local,
            data,
            IDOrganizador: user.id, // Garante que o organizador é o usuário logado
            IDParticipantes: [], // Inicializa a lista de participantes vazia
        };

        console.log("Competição a ser adicionada:", novaCompeticao);

        CompetitionFirebaseService.adicionar(
            firebase.getFirestoreDB(),
            novaCompeticao,
            (competicaoSimples) => {
                if (competicaoSimples) {
                    setSucesso("Competição cadastrada com sucesso!");
                } else {
                    setErro("Erro ao cadastrar competição.");
                }
            }
        );
    };

    return (
        <div className="p-5">
            <h1>Cadastrar Competição</h1>

            {/* Exibir mensagens de sucesso ou erro */}
            {sucesso && <div className="alert alert-success">{sucesso}</div>}
            {erro && <div className="alert alert-danger">{erro}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="local">Local</label>
                    <input
                        type="text"
                        className="form-control"
                        id="local"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="data">Data</label>
                    <input
                        type="date"
                        className="form-control"
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default CadastrarCompeticao;
