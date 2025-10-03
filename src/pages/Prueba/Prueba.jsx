import React from 'react';
import useChampions from '../../hooks/useChampions';
import ChampionCard from '../../components/Champion/ChampionCard';
import Jonia from '../../img/factions/jonia.webp';
import './Prueba.css';

function Prueba() {
    const { champions: joniaChampions } = useChampions('Jonia');

    return (
        <div className="jonia-extended">
            <img className="faction-extended-img" src={Jonia} alt="Jonia" />
            <p className="faction-name">Jonia</p>
            <div className="jonia-grid-champion">
                {joniaChampions.map((champion) => (
                    <ChampionCard className="champion" key={champion.name} championName={champion.name} skinNumber={0} showName={true} />
                ))}
            </div>
        </div>
    );
}

export default Prueba;