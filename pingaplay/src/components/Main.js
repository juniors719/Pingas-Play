import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./home/Home";

import Firebase from "../utils/Firebase";
import FirebaseContext from "../utils/FirabaseContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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
