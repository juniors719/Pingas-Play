import {
    collection,
    getDocs,
    addDoc,
    doc,
    setDoc,
    query,
    where,
} from "firebase/firestore";

// user:
// - userId: string(id de autenticacao)
// - nome: string
// - sobrenome: string
// - dataNascimento: Timestamp
// - sexo: map boolean
// - pontos: number

class UserFirebaseService {
    // listar
    static async listar(db, callback) {
        const c = collection(db, "users");

        const q = query(c);

        try {
            const querySnapshot = await getDocs(q);
            const users = [];
            for (const user of querySnapshot.docs) {
                const data = user.data();
                // Verifica e converte timestamps para datas legíveis
                const userFormatado = {
                    id: user.id,
                    ...data,
                };

                users.push(userFormatado);
            }
            callback(users);
        } catch (error) {
            console.error("Error fetching users: ", error);
            callback([]);
        }
    }

    static getUserbyUID = async (db, uid, callback) => {
        try {
            console.log("Buscando usuário com o UID:", uid);
            const usersCollection = collection(db, "users");
            const q = query(usersCollection, where("userId", "==", uid));
            const querySnapshot = await getDocs(q);

            console.log("QuerySnapshot:", querySnapshot);

            if (querySnapshot.empty) {
                console.error("Usuárioo não encontrado");
                callback(null);
                return;
            }

            const userSnap = querySnapshot.docs[0];

            if (!userSnap.exists()) {
                console.error("Usuário não encontradoo");
                callback(null);
                return;
            }

            const data = userSnap.data();
            const user = {
                id: userSnap.id,
                ...data,
            };
            console.log("Usuário encontrado com sucesso:", user);
            callback(user);
        } catch (error) {
            console.error("Erro ao buscar o usuário:", error);
            callback(null);
        }
    };

    // adicionar
    static async adicionar(db, user, callback) {
        try {
            const docRef = await addDoc(collection(db, "users"), user);
            console.log("Document written with ID: ", docRef.id);
            callback(true);
        } catch (error) {
            console.error("Error adding document: ", error);
            callback(false);
        }
    }

    static async atualizar(db, id, userAtualizado, callback) {
        const MyDoc = doc(db, "users", id);
        try {
            await setDoc(MyDoc, userAtualizado);
            console.log("Document written with ID: ", MyDoc.id);
            callback(true);
        } catch (error) {
            console.error("Error updating document: ", error);
            callback(false);
        }
    }
}
export default UserFirebaseService;
