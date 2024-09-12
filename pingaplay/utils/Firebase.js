import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import firebaseConfig from "../keys/firebase";

class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig);
    }

    getFirestoreDB() {
        return getFirestore(this.app);
    }

    getAuthentication() {
        return getAuth(this.app);
    }
}

export default Firebase;
