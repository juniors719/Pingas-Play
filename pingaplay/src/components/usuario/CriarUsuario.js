import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CriarUsuario.css";
import { auth } from "../../utils/FirebaseConfig"; // Importe a instância de autenticação
import { createUserWithEmailAndPassword } from "firebase/auth"; // Importe o método de criação de usuário
import { useNavigate } from "react-router-dom"; // Importe o hook de navegação

const CriarUsuario = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate(); // Instancie o hook de navegação

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/"); // Redirecione para a página inicial se o usuário estiver logado
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                senha
            );
            console.log("Usuário criado com sucesso: ", userCredential);
            navigate("/adicionar-dados"); // Redirecione para a página de adicionar
        } catch (error) {
            console.error("Erro ao criar usuário: ", error);
            setErro(error.message);
        }
    };

    return (
        <div className="usercreation-container">
            <div id="usercreation-content">
                <h2 className="title-criar-usuario">Criar Usuário</h2>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
                <form
                    className="form-content"
                    id="form-createUser"
                    onSubmit={handleSubmit}
                >
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="form-label">Senha:</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button type="submit" className="btn btn-primary">
                        Criar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CriarUsuario;
