import React from 'react';
import useChampions from '../../hooks/useChampions.js';
import ChampionCard from '../Champion/ChampionCard.jsx';
import './DynamicFaction.css';

function DynamicRegion({
    regionName,
    bannerImage,
    customClassName = '',
    showName = true,
    skinNumber = 0,
    showChampionNames = true,
    layout = 'grid'
}) {
    const { champions: regionChampions } = useChampions(regionName);

    const regionClass = `region-extended region-${regionName.toLowerCase()} ${customClassName}`;
    const factionNameClass = `faction-name faction-name--${regionName.toLowerCase()}`;
    const gridClass = `region-grid-champion layout-${layout}`;

    return (
        <div className={regionClass}>
            <img
                className="faction-extended-img"
                src={bannerImage}
                alt={regionName}
            />

            {showName && (
                <p className={factionNameClass}>{regionName}</p>
            )}

            <div className={gridClass}>
                {regionChampions.map((champion) => (
                    <ChampionCard
                        className={`champion ${regionName.toLowerCase()}`}
                        key={champion.name}
                        championName={champion.name}
                        // skinNumber={skinNumber}
                        showName={showChampionNames}
                    />
                ))}
            </div>
        </div>
    );
}

export default DynamicRegion;