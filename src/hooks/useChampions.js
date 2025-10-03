import { useState, useEffect } from 'react';
import championsData from '../data/champions.json';

const useChampions = (region = null) => {
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    let filteredChampions = championsData;
    
    if (region) {
      filteredChampions = championsData.filter(champ => 
        champ.faction === region
      );
    }
    
    filteredChampions.sort((a, b) => a.name.localeCompare(b.name));
    setChampions(filteredChampions);
  }, [region]);

  return { champions };
};

export default useChampions;