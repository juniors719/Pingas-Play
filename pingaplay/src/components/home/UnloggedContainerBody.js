// UnloggedContainerBody.js
import React from "react";
import NextCompetitions from "./nextcompetitions/NextCompetitions";
import Ranking from "./ranking/Ranking";

const UnloggedContainerBody = () => {
    return (
        <div className="body-main">
            <div className="banner-container">
                <h1>Bem-vindo ao PingasPlay!</h1>
                <p>Explore competições e rankings na nossa plataforma!</p>
                {/* Aqui você pode adicionar imagens ou banners específicos */}
            </div>
            <div className="comps-rankis-container">
                <div className="competicoes-container">
                    <NextCompetitions />
                </div>
                <div className="ranking-container">
                    <Ranking />
                </div>
            </div>
        </div>
    );
};

export default UnloggedContainerBody;
