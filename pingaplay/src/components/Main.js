import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/FirebaseConfig";

import LoginUsuario from "./login/LoginUsuario";
import LoggedHome from "./home/LoggedHome";
import UnloggedHome from "./home/UnloggedHome";
import ListarCompeticoes from "./competicoes/ListarCompeticoes";

import Firebase from "../utils/Firebase";
import FirebaseContext from "../utils/FirabaseContext";

const Main = () => {
    const [logged, setLogged] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLogged(!!user); // Se houver um usuário, `logado` será `true`, senão será `false`
        });
        return () => unsubscribe();
    }, []);

    const homeRoute = logged ? <LoggedHome /> : <UnloggedHome />;

    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <RouterProvider
                router={createBrowserRouter([
                    {
                        path: "/",
                        element: homeRoute,
                        children: [
                            {
                                path: "competicoes/listar",
                                element: <ListarCompeticoes />,
                            },
                        ],
                    },
                    // rota de login
                    {
                        path: "/login",
                        element: <LoginUsuario />,
                    },
                ])}
            />
        </FirebaseContext.Provider>
    );
};

export default Main;
