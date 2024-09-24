import { useEffect, useState, useContext } from "react";
import UserFirebaseService from "../../../services/UserFirebaseService";
import FirebaseContext from "../../../utils/FirabaseContext";

const UserInfo = () => {
    const [user, setUser] = useState({});
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const currentUser = firebase.getAuthentication().currentUser.uid;
        UserFirebaseService.getUserbyUID(
            firebase.getFirestoreDB(),
            currentUser,
            (user) => setUser(user)
        );
    }, [firebase]);

    return (
        <div className="user-info">
            <div className="user-info-avatar">
                <img
                    src="https://media.istockphoto.com/id/1337144146/pt/vetorial/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=_XeYoSJQIN7GrE08cUQDJCo3U7yvoEp5OKpbhQzpmC0="
                    alt="Avatar"
                />
            </div>
            <div className="user-info-name">
                <span>
                    {user.nome} {user.sobrenome}
                </span>
            </div>
            <div className="user-info-points">
                <span>{user.pontos} pontos</span>
            </div>
        </div>
    );
};
export default UserInfo;
