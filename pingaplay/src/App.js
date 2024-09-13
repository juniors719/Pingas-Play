import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginUsuario from "./components/login/LoginUsuario";
import CriarUsuario from "./components/usuario/CriarUsuario";
import AdicionarDados from "./components/usuario/AdicionarDados";
import Home from "./components/home/Home";
import PrivateRoute from "./components/PrivateRoute"; // Importe o componente "PrivateRoute"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CriarUsuario />} />
                <Route path="/login" element={<LoginUsuario />} />
                <Route path="/adicionar-dados" element={<AdicionarDados />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
