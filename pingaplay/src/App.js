import LoginUsuario from "./components/login/LoginUsuario";
import CriarUsuario from "./components/usuario/CriarUsuario";

function App() {
    return (
        <div className="App">
            <h1>PingasPlay</h1>
            <CriarUsuario />
            <LoginUsuario />
        </div>
    );
}

export default App;
