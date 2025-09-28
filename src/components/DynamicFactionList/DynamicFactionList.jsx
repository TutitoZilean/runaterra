// components/DynamicFactionList/DynamicFactionList.jsx
import React, { useState, useEffect } from 'react';
import { 
    initializeFactionSystem, 
    selectRandomFactions, 
    getChampionsBySelectedFactions,
    getAvailableFactions,
    resetSelection,
    getFormattedSelectedFactions 
} from '../../scripts/randomFactionSelector.js';
import ChampionCard, { ChampionCardSkeleton } from '../ChampionCard/ChampionCard.jsx';

// Importar las imágenes de las facciones
import AguasEstancadas from '../../img/factions/aguasestancadas.webp';
import CiudadDeBandle from '../../img/factions/ciudaddebandle.webp';
import Demacia from '../../img/factions/demacia.webp';
import ElVacio from '../../img/factions/elvacio.webp';
import Freljord from '../../img/factions/freljord.webp';
import IslasDeLaSombra from '../../img/factions/islasdelasombra.webp';
import Ixtal from '../../img/factions/ixtal.webp';
import Jonia from '../../img/factions/jonia.webp';
import Noxus from '../../img/factions/noxus.webp';
import Piltover from '../../img/factions/piltover.webp';
import Runaterra from '../../img/factions/runaterra.webp';
import Shurima from '../../img/factions/shurima.webp';
import Targon from '../../img/factions/targon.webp';
import Zaun from '../../img/factions/zaun.webp';

import './DynamicFactionList.css';

const DynamicFactionList = () => {
    const [factions, setFactions] = useState([]);
    const [selectedFactions, setSelectedFactions] = useState([]);
    const [champions, setChampions] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [animationStage, setAnimationStage] = useState('idle');
    const [selectedChampions, setSelectedChampions] = useState({});
    const [bannedChampions, setBannedChampions] = useState([]);

    // Mapeo de imágenes de facciones
    const factionImages = {
        'aguasestancadas': AguasEstancadas,
        'ciudaddebandle': CiudadDeBandle,
        'demacia': Demacia,
        'elvacio': ElVacio,
        'freljord': Freljord,
        'islasdelasombra': IslasDeLaSombra,
        'ixtal': Ixtal,
        'jonia': Jonia,
        'noxus': Noxus,
        'piltover': Piltover,
        'runaterra': Runaterra,
        'shurima': Shurima,
        'targon': Targon,
        'zaun': Zaun
    };

    // Inicialización del sistema
    useEffect(() => {
        initializeSystem();
    }, []);

    const initializeSystem = async () => {
        try {
            setIsLoading(true);
            await initializeFactionSystem();
            const availableFactions = getAvailableFactions();
            setFactions(availableFactions);
            setError(null);
        } catch (err) {
            setError('Error al inicializar el sistema de facciones');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRandomSelect = async () => {
        try {
            setAnimationStage('selecting');
            setError(null);
            setSelectedChampions({});
            setBannedChampions([]);
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            selectRandomFactions();
            
            const newFactions = getFormattedSelectedFactions();
            setSelectedFactions(newFactions);
            setAnimationStage('showing');
            
            setTimeout(() => {
                const factionChampions = getChampionsBySelectedFactions();
                setChampions(factionChampions);
                setAnimationStage('complete');
            }, 1000);
            
        } catch (err) {
            setError(err.message);
            setAnimationStage('idle');
        }
    };

    const handleChampionSelect = (champion, faction) => {
        setSelectedChampions(prev => ({
            ...prev,
            [faction]: champion
        }));
    };

    const handleChampionBan = (championName) => {
        setBannedChampions(prev => [...prev, championName]);
    };

    const handleReset = () => {
        resetSelection();
        setSelectedFactions([]);
        setChampions({});
        setSelectedChampions({});
        setBannedChampions([]);
        setAnimationStage('idle');
    };

    const getFactionImage = (factionId) => {
        return factionImages[factionId] || factionImages['runaterra']; // Fallback a Runaterra
    };

    const isChampionSelected = (champion, faction) => {
        return selectedChampions[faction]?.name === champion.name;
    };

    const isChampionBanned = (champion) => {
        return bannedChampions.includes(champion.name);
    };

    if (isLoading) {
        return (
            <div className="faction-container loading">
                <div className="spinner"></div>
                <p>Cargando sistema de facciones...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="faction-container error">
                <p>❌ {error}</p>
                <button onClick={initializeSystem} className="retry-btn">
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className={`faction-container ${animationStage}`}>
            {/* Header con información del sistema */}
            <div className="faction-header">
                <h2>🏰 Selector de Facciones de League of Legends</h2>
                <p className="system-info">
                    {factions.length} facciones disponibles • {Object.values(champions).flat().length} campeones listados
                </p>
            </div>

            {/* Controles principales */}
            <div className="controls">
                <button 
                    onClick={handleRandomSelect}
                    disabled={animationStage === 'selecting'}
                    className="select-btn"
                >
                    {animationStage === 'selecting' ? 'Seleccionando...' : '🎲 Seleccionar Facciones Aleatorias'}
                </button>
                
                <button 
                    onClick={handleReset}
                    className="reset-btn"
                >
                    🔄 Reiniciar
                </button>
            </div>

            {/* Facciones seleccionadas */}
            {selectedFactions.length > 0 && (
                <div className="selected-factions">
                    <h3>Facciones Seleccionadas:</h3>
                    <div className="factions-display">
                        {selectedFactions.map((faction, index) => (
                            <div 
                                key={faction.id} 
                                className={`faction-card stage-${animationStage} delay-${index}`}
                            >
                                <div className="faction-image-container">
                                    <img 
                                        src={getFactionImage(faction.id)} 
                                        alt={faction.name}
                                        className="faction-image"
                                    />
                                    <div className="faction-selection-indicator">
                                        {index === 0 ? '1ª' : '2ª'}
                                    </div>
                                </div>
                                <div className="faction-info">
                                    <h4>{faction.name}</h4>
                                    <span className="champion-count">
                                        {champions[faction.name]?.length || 0} campeones
                                    </span>
                                    {selectedChampions[faction.name] && (
                                        <div className="selected-champion">
                                            ✅ {selectedChampions[faction.name].name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Lista de campeones por facción */}
            {Object.keys(champions).length > 0 && (
                <div className="champions-section">
                    {selectedFactions.map((faction, factionIndex) => (
                        <div 
                            key={faction.id} 
                            className={`faction-champions delay-${factionIndex}`}
                        >
                            <div className="faction-header-section">
                                <div className="faction-title-container">
                                    <img 
                                        src={getFactionImage(faction.id)} 
                                        alt={faction.name}
                                        className="faction-title-image"
                                    />
                                    <h4 className="faction-title">{faction.name}</h4>
                                </div>
                                <span className="faction-champion-count">
                                    {champions[faction.name]?.length} campeones
                                </span>
                            </div>
                            
                            <div className="champions-grid">
                                {champions[faction.name]?.map((champion, champIndex) => (
                                    <ChampionCard
                                        key={champion.name}
                                        champion={champion}
                                        faction={faction.name}
                                        onChampionSelect={handleChampionSelect}
                                        isSelected={isChampionSelected(champion, faction.name)}
                                        isBanned={isChampionBanned(champion)}
                                        style={{ animationDelay: `${champIndex * 0.1}s` }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Estado cuando no hay selección */}
            {selectedFactions.length === 0 && animationStage === 'idle' && (
                <div className="empty-state">
                    <div className="empty-icon">🎯</div>
                    <p>Haz clic en "Seleccionar Facciones Aleatorias" para comenzar</p>
                    <div className="available-factions">
                        <p>Facciones disponibles:</p>
                        <div className="factions-tags-images">
                            {factions.map(faction => (
                                <div key={faction.id} className="faction-tag-image">
                                    <img 
                                        src={getFactionImage(faction.id)} 
                                        alt={faction.name}
                                        className="faction-tag-img"
                                    />
                                    <span className="faction-tag-name">
                                        {faction.name} ({faction.championCount})
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DynamicFactionList;