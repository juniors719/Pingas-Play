import React from "react";
import { Outlet, Link } from "react-router-dom";

import logoPingaplayWhite from "../../images/logo-pingaplay-white-home.png";
import { UnloggedHomeButtons, LoggedHomeButtons } from "./HomeComponents";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./style.css";

const Home = ({ logado }) => {
    return (
        <div className="body-container">
            <nav className="navbar navbar-expand-lg navbar-home">
                <div className="container-fluid ">
                    <a
                        className="navbar-brand text-white img-logo-navbar"
                        href="/"
                    >
                        <img
                            src={logoPingaplayWhite}
                            alt="Logo Pingaplay"
                            style={{ height: "40px" }}
                        />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse navbar-home-div-items"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link active text-white"
                                    aria-current="page"
                                    href="/"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle text-white"
                                    href="/"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Competições
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="competicoes/listar"
                                        >
                                            Listar Competições
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="professor/criar"
                                        >
                                            Minhas Competições
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="professor/criar"
                                        >
                                            Cadastrar Competições
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/">
                                    Placar Online
                                </a>
                            </li>
                            {/* Botões de Entrar e Criar conta */}
                            {logado ? (
                                <LoggedHomeButtons />
                            ) : (
                                <UnloggedHomeButtons />
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Home;
