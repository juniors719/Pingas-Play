import React from "react";
import { auth } from "../../utils/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

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
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
