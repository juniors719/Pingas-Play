import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CriarUsuario = () => {
    return (
        <div id="usercreation-content">
            <h2>Criar Usuário</h2>

            <form className="form-content" id="form-createUser">
                <label className="form-label">Nome:</label>
                <input type="text" name="name" className="form-control" />

                <label className="form-label">Email:</label>
                <input type="email" name="email" className="form-control" />

                <label className="form-label">Senha:</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                />

                <button type="submit" className="btn btn-primary">
                    Criar
                </button>
            </form>
        </div>
    );
};

export default CriarUsuario;
