import UserFirebaseService from "../../services/UserFirebaseService";
import FirebaseContext from "../../utils/FirabaseContext";
import { auth } from "../../utils/FirebaseConfig";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./MeusDados.css";

const MeusDados = () => {
    const [uid, setUid] = useState("");
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [sexo, setSexo] = useState("");
    const [pontos, setPontos] = useState(0);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const navigate = useNavigate();
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUid(user.uid);
                // Só chamar o serviço após definir o UID
                UserFirebaseService.getUserbyUID(
                    firebase.getFirestoreDB(),
                    user.uid, // Passa diretamente o UID aqui
                    (userData) => {
                        if (userData) {
                            const {
                                nome,
                                sobrenome,
                                dataNascimento,
                                sexo,
                                id,
                                pontos,
                            } = userData;
                            setNome(nome);
                            setSobrenome(sobrenome);
                            setDataNascimento(dataNascimento);
                            setSexo(sexo);
                            setId(id);
                            setPontos(pontos);
                        } else {
                            setErro("Usuário não encontrado.");
                        }
                    }
                );
            } else {
                // Se o usuário não estiver logado, redirecionar para a página de login
                navigate("/login");
            }
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, [firebase, navigate]);

    const handleSelect = (e) => {
        setSexo(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            nome: nome,
            sobrenome: sobrenome,
            dataNascimento: dataNascimento,
            sexo: sexo,
            pontos: pontos,
            userId: uid,
        };
        UserFirebaseService.atualizar(
            firebase.getFirestoreDB(),
            id,
            user,
            () => {
                setSucesso("Dados atualizados com sucesso!");
                setErro("");
                navigate("/"); // Redireciona para a página inicial
            }
        );
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
                        className="form-select"
                        value={sexo}
                        onChange={handleSelect}
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
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
