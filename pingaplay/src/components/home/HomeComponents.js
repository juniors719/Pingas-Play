import React from "react";
import { auth } from "../../utils/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./style.css";

const Banner = () => {
    return (
        <div className="banner-home">
            <img src="https://via.placeholder.com/1900x300" alt="Banner Home" />
        </div>
    );
};

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <Link className="dropdown-item" to="/" onClick={handleLogout}>
            Sair
        </Link>
    );
};

const UnloggedHomeButtons = () => {
    return (
        <>
            {/* Botões de Entrar e Criar conta */}
            <li className="nav-item">
                <a
                    className="nav-link text-white botao-entrar-home"
                    href="/login"
                >
                    Entrar
                </a>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link text-white botao-criarconta-home"
                    href="/"
                >
                    Criar Conta
                </a>
            </li>
        </>
    );
};

const LoggedHomeButtons = () => {
    return (
        <>
            {/* Botões de Entrar e Criar conta */}
            <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle text-white"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Minha Conta
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item" to="professor/listar">
                            Meus Dados
                        </Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <Logout />
                    </li>
                </ul>
            </li>
        </>
    );
};

export { Banner, UnloggedHomeButtons, LoggedHomeButtons };
