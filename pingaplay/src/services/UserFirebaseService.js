import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    query,
    Timestamp,
} from "firebase/firestore";

// user:
// - userId: string
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
}
export default UserFirebaseService;
