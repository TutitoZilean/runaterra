// components/ChampionCard/ChampionCard.jsx
import React from 'react';
import './ChampionCard.css';

const ChampionCard = ({ champion, faction, onChampionSelect, isSelected = false, isBanned = false }) => {
    const handleClick = () => {
        if (onChampionSelect && !isBanned) {
            onChampionSelect(champion, faction);
        }
    };

    return (
        <div 
            className={`champion-card ${isSelected ? 'selected' : ''} ${isBanned ? 'banned' : ''}`}
            onClick={handleClick}
            data-faction={faction}
            data-champion={champion.name}
        >
            <div className="champion-image-container">
                <img 
                    src={`/images/champions/${champion.image || 'default.webp'}`} 
                    alt={champion.name}
                    className="champion-image"
                    loading="lazy"
                />
                {isBanned && <div className="banned-overlay">❌ BANEADO</div>}
                {isSelected && <div className="selected-overlay">✅ SELECCIONADO</div>}
            </div>
            
            <div className="champion-info">
                <h4 className="champion-name">{champion.name}</h4>
                <p className="champion-title">{champion.title}</p>
                <span className="champion-faction">{faction}</span>
            </div>

            {/* Efectos visuales */}
            <div className="champion-glow"></div>
        </div>
    );
};

// Componente para cuando no hay imagen
export const ChampionCardSkeleton = ({ name, faction }) => (
    <div className="champion-card skeleton">
        <div className="champion-image-container">
            <div className="image-placeholder">
                {name.charAt(0)}
            </div>
        </div>
        <div className="champion-info">
            <h4 className="champion-name">{name}</h4>
            <span className="champion-faction">{faction}</span>
        </div>
    </div>
);

export default ChampionCard;