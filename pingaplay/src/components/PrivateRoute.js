import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../utils/FirebaseConfig";

const PrivateRoute = ({ children }) => {
    // Verifica se o usuário está logado
    const user = auth.currentUser;

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
