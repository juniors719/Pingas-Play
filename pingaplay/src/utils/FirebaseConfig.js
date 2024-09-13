import firebaseConfig from "../../src/keys/firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
