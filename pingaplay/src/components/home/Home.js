import React from "react";

import Logout from "../login/Logout";

const Home = () => {
    return (
        <div>
            <h2>Bem-vindo à Página Home</h2>
            <p>Esta página só é acessível para usuários autenticados.</p>
            <Logout />
        </div>
    );
};

export default Home;
