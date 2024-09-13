import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "../../utils/FirebaseConfig"; // Importe a instância de autenticação
import { signInWithEmailAndPassword } from "firebase/auth"; // Importe o método de login
import { useNavigate } from "react-router-dom"; // Importe o hook de navegação

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
            navigate("/home");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setErro("Erro ao fazer login. Verifique suas credenciais.");
        }
    };

    return (
        <div id="login-content">
            <h2>Login</h2>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
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
            </form>
        </div>
    );
};

export default LoginUsuario;
