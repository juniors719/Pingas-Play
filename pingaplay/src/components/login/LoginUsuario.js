import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "../../utils/FirebaseConfig"; // Importe a instância de autenticação
import { signInWithEmailAndPassword } from "firebase/auth"; // Importe o método de login
import { useNavigate } from "react-router-dom"; // Importe o hook de navegação
import ImagemLogin from "./ImagemLogin.png";

import "./LoginUsuario.css";

const LoginUsuario = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate(); // Instancie o hook de navegação

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Tenta fazer o login com email e senha
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                senha
            );
            console.log("Usuário logado com sucesso:", userCredential.user);
            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setErro("Erro ao fazer login. Verifique suas credenciais.");
        }
    };

    const goToCreateUser = () => {
        navigate("/criar-conta");
    };

    const handleResetPassword = () => {
        alert("Senha redefinida");
    };

    return (
        <div id="login-page">
            {/* Lado esquerdo com a imagem */}
            <div id="login-image">
                <img src={ImagemLogin} alt="Login illustration" />
            </div>

            {/* Lado direito com o formulário */}
            <div id="login-content">
                <h2 id="login-title">Login</h2>
                {erro && <p>{erro}</p>}
                <form
                    className="form-content"
                    id="form-loginUser"
                    onSubmit={handleLogin}
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
                        Login
                    </button>

                    <button
                        onClick={goToCreateUser}
                        className="btn btn-primary"
                    >
                        Criar conta
                    </button>

                    <div className="forgot-password">
                        <span>Esqueceu a senha?</span>

                        <button
                            onClick={handleResetPassword}
                            className="btn btn-link"
                        >
                            Redefinir senha
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginUsuario;
