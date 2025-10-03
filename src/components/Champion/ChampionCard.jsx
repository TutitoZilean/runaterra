import './ChampionCard.css';

const ChampionCardFixed = ({ championName, skinNumber = 0, showName = true, className = "" }) => {
  console.log('ChampionCardFixed - championName:', championName);

  if (!championName) {
    return <div className="champion-card error">Error: Sin nombre</div>;
  }

  // Mapeo de nombres en español a nombres de archivo en inglés
  const championNameMapping = {
    "Maestro Yi": "MasterYi",
    "Kai'Sa": "KaiSa",
    "Dr. Mundo": "DrMundo",
    "Wukong": "MonkeyKing",
  };

  const getFormattedName = (name) => {
    if (championNameMapping[name]) {
      return championNameMapping[name];
    }
    
    return name.replace(/'/g, '').replace(/\s/g, '').replace(/\./g, '').trim();
  };

  const formattedName = getFormattedName(championName);
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${formattedName}_0.jpg`;

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