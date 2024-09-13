import firebaseConfig from "../../src/keys/firebase";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Persistência de autenticação definida como local.");
    })
    .catch((error) => {
        console.error("Erro ao definir persistência de autenticação:", error);
    });

export { auth, db };
