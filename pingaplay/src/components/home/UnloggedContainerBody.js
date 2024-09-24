// UnloggedContainerBody.js
import React from "react";
import NextCompetitions from "./nextcompetitions/NextCompetitions";
import Ranking from "./ranking/Ranking";

const UnloggedContainerBody = () => {
    return (
        <div className="body-main">
            <div className="banner-container"></div>
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
