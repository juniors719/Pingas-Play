import { getFirestore } from "firebase/firestore"; // Certifique-se de importar Firestore corretamente
import CompetitionFirebaseService from "../../services/CompetitionFirebaseService";
import FirebaseContext from "../../utils/FirabaseContext";

import React, { useState, useContext } from "react";

const CadastrarCompeticao = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [local, setLocal] = useState("");
    const [data, setData] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const { user } = useContext(FirebaseContext);
    const db = getFirestore(); // Pega a instância do Firestore

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!user) {
                throw new Error("Usuário não autenticado!");
            }

            const competicao = {
                IDorganizador: user.getUserbyId(), // Passar o ID do organizador corretamente
                titulo,
                descricao,
                local,
                data, // A data será uma string e convertida no serviço
            };

            await CompetitionFirebaseService.adicionar(db, competicao, (id) => {
                if (id) {
                    setSucesso("Competição cadastrada com sucesso!");
                } else {
                    setErro("Erro ao cadastrar competição.");
                }
            });

            setTitulo("");
            setDescricao("");
            setLocal("");
            setData("");

        } catch (error) {
            console.error("Erro ao cadastrar competição: ", error);
            setErro("Erro ao cadastrar competição. Tente novamente.");
            setSucesso("");
        }
    };

    return (
        <div>
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
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastrarCompeticao;
