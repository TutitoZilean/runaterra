import React from 'react';
import useChampions from '../../../hooks/useChampions';
import ChampionCard from '../../../components/Champion/ChampionCard.jsx';
import ShurimaBanner from '../../../img/factions/shurima.webp';
import './Shurima.css';

function Shurima() {
    const { champions: shurimaChampions } = useChampions('Shurima');

    return (
        <div className="shurima-extended">
            <img className="faction-extended-img" src={ ShurimaBanner } alt="Shurima" />
            <p className="faction-name-shurima">Shurima</p>
            <div className="shurima-grid-champion">
                {shurimaChampions.map((champion) => (
                    <ChampionCard className="champion champion-name--shurima" key={champion.name} championName={champion.name} skinNumber={0} showName={true} />
                ))}
            </div>
        </div>
    );
}

export default Shurima;