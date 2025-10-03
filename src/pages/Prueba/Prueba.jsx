import React from 'react';
import useChampions from '../../hooks/useChampions';
import ChampionCard from '../../components/Champion/ChampionCard';
import Shurima from '../../img/factions/shurima.webp';
import './Prueba.css';

function Prueba() {
    const { champions: shurimaChampions } = useChampions('Shurima');

    return (
        <div className="shurima-extended">
            <img className="faction-extended-img" src={Shurima} alt="Shurima" />
            <p className="faction-name" id="faction-text-shurima">Shurima</p>
            <div className="shurima-grid-champion">
                {shurimaChampions.map((champion) => (
                    <ChampionCard className="champion" key={champion.name} championName={champion.name} skinNumber={0} showName={true} />
                ))}
            </div>
        </div>
    );
}

export default Prueba;