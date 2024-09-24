import "./MeusDados.css";
import React, { useState, useEffect } from "react";
import { db, auth } from "../../utils/FirebaseConfig"; // Importa instância do Firestore e de autenticação
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Importa funções do Firestore
import { useNavigate } from "react-router-dom";

const MeusDados = () => {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [sexo, setSexo] = useState("masculino");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const navigate = useNavigate(); // Instancie o hook de navegação

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (!user) {
                navigate("/"); // Redireciona se não estiver autenticado
                return;
            }

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setNome(userData.nome);
                setSobrenome(userData.sobrenome);
                setDataNascimento(userData.dataNascimento?.toDate().toISOString().split("T")[0] || ""); // Formato para input type="date"
                setSexo(userData.sexo.masculino ? "masculino" : userData.sexo.feminino ? "feminino" : "outro");
            } else {
                setErro("Usuário não encontrado!");
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = auth.currentUser; // Obtém o usuário autenticado
            if (!user) {
                throw new Error("Usuário não autenticado!");
            }

            // Atualiza os dados do usuário no Firestore
            await updateDoc(doc(db, "users", user.uid), {
                nome,
                sobrenome,
                dataNascimento: new Date(dataNascimento), // Converte para timestamp
                sexo: {
                    masculino: sexo === "masculino",
                    feminino: sexo === "feminino",
                    outro: sexo === "outro",
                },
            });

            setSucesso("Dados atualizados com sucesso!");
            setErro("");
            navigate("/home"); // Redireciona para a página inicial
        } catch (error) {
            console.error("Erro ao atualizar dados: ", error);
            setErro("Erro ao atualizar dados. Tente novamente.");
            setSucesso("");
        }
    };

    return (
        <div className="meus-dados-container">
            <div className="meus-dados-frame">
                <h2>Editar Dados</h2>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
                {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}
                <form
                    id="form-editUserData"
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
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MeusDados;