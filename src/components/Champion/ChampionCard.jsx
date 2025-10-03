import React from 'react';

const ChampionCardFixed = ({ championName, skinNumber = 0, showName = true, className = "" }) => {
  console.log('ChampionCardFixed - championName:', championName);

  if (!championName) {
    return <div className="champion-card error">Error: Sin nombre</div>;
  }

  const formattedName = championName.replace(/'/g, '').replace(/\s/g, '').replace(/\./g, '').trim();
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${formattedName}_${skinNumber}.jpg`;

  return (
      <div className={`champion-card ${className}`}>
        <img src={imageUrl} alt={championName} className="champion-image" />
        <div className="champion-fixer">
          {showName && <div className="champion-name" >{championName}</div>}
        </div>
      </div>
  );
};

export default ChampionCardFixed;