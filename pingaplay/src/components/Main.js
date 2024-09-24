// Main.js
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig";

import Firebase from "../utils/Firebase";
import FirebaseContext from "../utils/FirabaseContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "../styles/mainstyle.css";

import LoginUsuario from "./login/LoginUsuario";
import Home from "./home/Home";
import ListarCompeticoes from "./competicoes/ListarCompeticoes";
import LoggedContainerBody from "./home/LoggedContainerBody";
import UnloggedContainerBody from "./home/UnloggedContainerBody";
import CriarUsuario from "./usuario/CriarUsuario";
const Main = () => {
    const [logged, setLogged] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLogged(!!user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <RouterProvider
                router={createBrowserRouter([
                    {
                        path: "/",
                        element: <Home logado={logged} />,
                        children: [
                            {
                                index: true,
                                element: logged ? (
                                    <LoggedContainerBody />
                                ) : (
                                    <UnloggedContainerBody />
                                ),
                            },
                            {
                                path: "competicoes/listar",
                                element: <ListarCompeticoes />,
                            },
                        ],
                    },
                    {
                        path: "/login",
                        element: <LoginUsuario />,
                    },
                    {
                        path: "/criar-conta",
                        element: <CriarUsuario />,
                    },
                ])}
            />
        </FirebaseContext.Provider>
    );
};

export default Main;
