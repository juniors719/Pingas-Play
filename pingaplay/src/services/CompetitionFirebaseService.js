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

class CompetitionFirebaseService {
    static async listar(db, callback) {
        const c = collection(db, "competicoes");

        const q = query(c);

        try {
            const querySnapshot = await getDocs(q);
            const competicoes = [];
            querySnapshot.forEach((competicao) => {
                const data = competicao.data();
                // Verifica e converte timestamps para datas legíveis
                const competicaoFormatada = {
                    id: competicao.id,
                    ...data,
                };
                if (data.data) {
                    competicaoFormatada.data = data.data.toDate();
                }
                competicoes.push(competicaoFormatada);
            });
            callback(competicoes);
        } catch (error) {
            console.error("Error fetching competitions: ", error);
            callback([]);
        }
    }
}

export default CompetitionFirebaseService;
