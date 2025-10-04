import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DynamicFaction from '../../components/DynamicFaction/DynamicFaction.jsx';
import RegionViewToggle from '../../components/RegionViewToggle/RegionViewToggle.jsx';
import { useRegionViewMode } from '../../hooks/useRegionViewMode.js'; // ← Importar el hook
import './Home.css';

function Home() {
    const { viewMode } = useRegionViewMode();

    const containerClass = `factions-main-container ${viewMode === 'icons-only' ? 'icons-only-view' : ''}`;

    return (
        <>
            <Header />
            <RegionViewToggle />
            
            <div className="paragraph-container" id="paragraph-container">
                {/* ... tu contenido del párrafo ... */}
            </div>
            
            <div className={containerClass}>
                <div className="first-faction-icons">
                    <DynamicFaction regionName="Aguas Estancadas" showName={true} layout="grid" />
                    <DynamicFaction regionName="Ciudad de Bandle" showName={true} layout="grid" />
                    <DynamicFaction regionName="Demacia" showName={true} layout="grid" />
                    <DynamicFaction regionName="El Vacío" showName={true} layout="grid" />
                    <DynamicFaction regionName="Freljord" showName={true} layout="grid" />
                    <DynamicFaction regionName="Islas de la sombra" showName={true} layout="grid" />
                    <DynamicFaction regionName="Ixtal" showName={true} layout="grid" />
                </div>
                <div className="second-faction-icons">
                    <DynamicFaction regionName="Jonia" showName={true} layout="grid" />
                    <DynamicFaction regionName="Noxus" showName={true} layout="grid" />
                    <DynamicFaction regionName="Piltover" showName={true} layout="grid" />
                    <DynamicFaction regionName="Runaterra" showName={true} layout="grid" />
                    <DynamicFaction regionName="Shurima" showName={true} layout="grid" />
                    <DynamicFaction regionName="Targon" showName={true} layout="grid" />
                    <DynamicFaction regionName="Zaun" showName={true} layout="grid" />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;