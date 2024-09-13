import React from "react";

const AdicionarDados = () => {
    return (
        <div>
            <h2>Adicionar Dados do Usuário</h2>

            <form id="form-addUserData" className="form-content">
                <label className="form-label" htmlFor="name">
                    Nome:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    required
                />

                <label className="form-label" htmlFor="surname">
                    Sobrenome:
                </label>
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    className="form-control"
                    required
                />

                <label className="form-label" htmlFor="birthdate">
                    Data de Nascimento:
                </label>
                <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    className="form-control"
                    required
                />

                <label className="form-label" htmlFor="gender">
                    Sexo:
                </label>
                <select
                    id="gender"
                    name="gender"
                    className="form-control"
                    required
                >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                </select>

                <button type="submit" className="btn btn-primary">
                    Salvar Dados
                </button>
            </form>
        </div>
    );
};

export default AdicionarDados;
