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
            for (const competicao of querySnapshot.docs) {
                const data = competicao.data();
                // Verifica e converte timestamps para datas legíveis
                const competicaoFormatada = {
                    id: competicao.id,
                    ...data,
                };
                if (data.data) {
                    competicaoFormatada.data = data.data.toDate();
                }

                // Fetch organizer details
                if (data.IDorganizador) {
                    const organizadorRef = doc(db, "users", data.IDorganizador);
                    const organizadorSnap = await getDoc(organizadorRef);
                    if (organizadorSnap.exists()) {
                        const organizadorData = organizadorSnap.data();
                        competicaoFormatada.nomeorganizador = `${organizadorData.nome} ${organizadorData.sobrenome}`;
                    } else {
                        competicaoFormatada.nomeorganizador =
                            "Organizador não encontrado";
                    }
                } else {
                    competicaoFormatada.nomeorganizador =
                        "ID do organizador não fornecido";
                }

                competicoes.push(competicaoFormatada);
            }
            callback(competicoes);
        } catch (error) {
            console.error("Error fetching competitions: ", error);
            callback([]);
        }
    }

    static async adicionar(db, competicao, callback) {
        try {
            const c = collection(db, "competicoes");
            const competicaoAdicionada = await addDoc(c, {
                ...competicao,
                data: Timestamp.fromDate(competicao.data),
            });
            callback(competicaoAdicionada.id);
        } catch (error) {
            console.error("Error adding competition: ", error);
            callback(null);
        }
    }

    static async getById(db, callback, id) {
        const docRef = doc(db, "competicoes", id);
        try {
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            const competicao = {
                id: docSnap.id,
                ...data,
            };
            if (data.data) {
                competicao.data = data.data.toDate();
            }
            callback(competicao);
        } catch (error) {
            console.error(error);
            callback(null);
        }
    }
}

export default CompetitionFirebaseService;
