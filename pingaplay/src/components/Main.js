import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./home/Home";
import ListarCompeticoes from "./competicoes/ListarCompeticoes";

import Firebase from "../utils/Firebase";
import FirebaseContext from "../utils/FirabaseContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "competicoes/listar",
                element: <ListarCompeticoes/>
            }
        ]
    },
]);

const Main = () => {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <RouterProvider router={router} />
        </FirebaseContext.Provider>
    );
};

export default Main;
