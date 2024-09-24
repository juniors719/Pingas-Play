import "./AdicionarDados.css";
import React, { useState } from "react";
import { db, auth } from "../../utils/FirebaseConfig"; // Importa instância do Firestore e de autenticação
import { collection, addDoc } from "firebase/firestore"; // Importa funções do Firestore
import { useNavigate } from "react-router-dom";

const AdicionarDados = () => {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [sexo, setSexo] = useState("masculino"); // Inicializando como "masculino"
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const navigate = useNavigate(); // Instancie o hook de navegação

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = auth.currentUser; // Obtém o usuário autenticado
            if (!user) {
                throw new Error("Usuário não autenticado!");
            }

            // Verifica se dataNascimento está no formato correto e cria um objeto Date
            let parsedDate = null;
            if (dataNascimento) {
                parsedDate = new Date(dataNascimento);
                if (isNaN(parsedDate.getTime())) {
                    throw new Error("Data inválida.");
                }
            }

            // Adiciona os dados do usuário ao Firestore
            await addDoc(collection(db, "users"), {
                userId: user.uid, // Associa os dados ao ID do usuário autenticado
                nome,
                sobrenome,
                dataNascimento: parsedDate, // Converte para timestamp
                pontos: 0, // Inicializa com 0
                sexo: {
                    masculino: sexo === "masculino",
                    feminino: sexo === "feminino",
                    outro: sexo === "outro",
                }, // Map conforme requerido no Firestore
            });

            setSucesso("Dados salvos com sucesso!");
            setErro("");
            navigate("/"); // Redireciona para a página inicial
        } catch (error) {
            console.error("Erro ao salvar dados: ", error);
            setErro("Erro ao salvar dados. Tente novamente.");
            setSucesso("");
        }
    };

    return (
        <div className="adicionar-dados-container">
            <div className="adicionar-dados-frame">
                <h2>Adicionar Dados do Usuário</h2>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
                {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}
                <form
                    id="form-addUserData"
                    className="form-content"
                    onSubmit={handleSubmit}
                >
                    <label className="form-label" htmlFor="name">
                        Nome:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <label className="form-label" htmlFor="surname">
                        Sobrenome:
                    </label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        className="form-control"
                        required
                        value={sobrenome}
                        onChange={(e) => setSobrenome(e.target.value)}
                    />

                    <label className="form-label" htmlFor="birthdate">
                        Data de Nascimento:
                    </label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        className="form-control"
                        required
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                    />

                    <label className="form-label" htmlFor="gender">
                        Sexo:
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        className="form-control"
                        required
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                    >
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                    </select>

                    <button type="submit" className="btn btn-primary">
                        Salvar Dados
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdicionarDados;
