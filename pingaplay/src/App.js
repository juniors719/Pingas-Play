import React, { useEffect, useState } from "react";
import { auth } from "./utils/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginUsuario from "./components/login/LoginUsuario";
import CriarUsuario from "./components/usuario/CriarUsuario";
import AdicionarDados from "./components/usuario/AdicionarDados";
import Home from "./components/home/Home";
import PrivateRoute from "./components/PrivateRoute"; // Importe o componente "PrivateRoute"
import Scoreboard from "./components/placar/ScoreBoard";
import "./components/placar/ScoreBoard.css";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Monitorar o estado de autenticação
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Pare o carregamento após obter o usuário
        });

        return () => unsubscribe(); // Limpeza para evitar vazamentos de memória
    }, []);

    if (loading) {
        return <p>Carregando...</p>; // Mostra um carregamento até que o estado de autenticação seja resolvido
    }

    return (
        <Scoreboard/>
    )

    /* return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<LoginUsuario />} />
                <Route
                    path="/adicionar-dados"
                    element={
                        user ? <AdicionarDados /> : <Navigate to="/login" />
                    }
                />
                <Route path="/criar-usuario" element={<CriarUsuario />} />
                <Route
                    path="/home"
                    element={
                        user ? (
                            <PrivateRoute>{<Home />}</PrivateRoute>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    ); */
}

export default App;
