// Home.jsx - VERSIÓN CORREGIDA
import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getChampionImage, getChampionTitle } from '../../utils/championImages.js';
import './Home.css';

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
import Shurima from '../../components/Factions/Shurima/Shurima.jsx';
import Targon from '../../img/factions/targon.webp';
import Zaun from '../../img/factions/zaun.webp';

// import {
//     initRandomSelector,
//     selectRandomFactions,
//     resetSelection,
//     getSystemStatus,
//     getChampionsBySelectedFactions
// } from '../../scripts/randomFactionSelector.js';

function Home() {
    const [isInitialized, setIsInitialized] = useState(false);
    const [selectedFactions, setSelectedFactions] = useState([]);
    const [champions, setChampions] = useState({});
    const [showChampions, setShowChampions] = useState(false);
    const [animationStage, setAnimationStage] = useState('idle');
    const [debugInfo, setDebugInfo] = useState('');
    const [error, setError] = useState(null); // ✅ Estado error agregado

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

    useEffect(() => {
        const initialize = async () => {
            try {
                console.log('🚀 Inicializando con datos REALES...');
                const success = await initRandomSelector();
                setIsInitialized(success);

                if (success) {
                    const status = getSystemStatus();
                    setDebugInfo(`Sistema listo: ${status.championsDataLength} campeones cargados`);
                    console.log('✅ Sistema inicializado con datos reales');
                } else {
                    setDebugInfo('Error al inicializar el sistema');
                }
            } catch (err) {
                console.error('❌ Error en inicialización:', err);
                setDebugInfo('Error: ' + err.message);
                setIsInitialized(false);
            }
        };

        initialize();
    }, []);

    // ✅ SOLO UNA función handleRandomSelect
    const handleRandomSelect = async () => {
        if (!isInitialized) {
            setError('Sistema no inicializado');
            return;
        }

        try {
            console.log('🎲 Iniciando selección con datos REALES...');
            setError(null);
            setAnimationStage('selecting');
            setShowChampions(false);
            setChampions({});

            // Seleccionar facciones aleatorias
            const newFactions = selectRandomFactions();
            console.log('✅ Facciones seleccionadas:', newFactions);

            setSelectedFactions(newFactions);
            setAnimationStage('showing');

            // Obtener campeones REALES del JSON
            setTimeout(() => {
                try {
                    const factionChampions = getChampionsBySelectedFactions();
                    console.log('📊 Campeones reales cargados:', factionChampions);

                    // Enriquecer los datos de campeones con imágenes y títulos
                    const enrichedChampions = {};
                    Object.keys(factionChampions).forEach(factionName => {
                        enrichedChampions[factionName] = factionChampions[factionName].map(champion => ({
                            ...champion,
                            image: getChampionImage(champion.name),
                            title: getChampionTitle(champion.name)
                        }));
                    });

                    setChampions(enrichedChampions);
                    setShowChampions(true);
                    setAnimationStage('complete');

                    // Debug info
                    const status = getSystemStatus();
                    setDebugInfo(`Selección completada: ${newFactions.map(f => f.name).join(' + ')}`);

                } catch (champError) {
                    console.error('❌ Error cargando campeones reales:', champError);
                    setError('Error cargando campeones: ' + champError.message);
                    setAnimationStage('idle');
                }
            }, 1000);

        } catch (err) {
            console.error('❌ Error en selección:', err);
            setError(err.message || 'Error al seleccionar facciones');
            setAnimationStage('idle');
        }
    };

    const handleReset = () => {
        try {
            resetSelection();
            setSelectedFactions([]);
            setChampions({});
            setShowChampions(false);
            setAnimationStage('idle');
            setError(null);
            setDebugInfo('Sistema reiniciado');
            console.log('🔄 Sistema reiniciado');
        } catch (err) {
            console.error('❌ Error al reiniciar:', err);
            setError('Error al reiniciar el sistema');
        }
    };

    const handleDebug = () => {
        try {
            const status = getSystemStatus();
            console.log('🔍 Debug System:', status);
            
            // Mostrar información útil en alert
            const debugMessage = `
Sistema Debug:
- Inicializado: ${status.isInitialized}
- Campeones cargados: ${status.championsDataLength}
- Facciones totales: ${status.totalFactions}
- Facciones con campeones: ${status.factionsWithChampions}
- Última selección: ${status.selectedFactions.map(f => f.name).join(', ') || 'Ninguna'}
            `.trim();
            
            alert(debugMessage);
        } catch (err) {
            console.error('❌ Error en debug:', err);
            alert('Error al obtener información del sistema');
        }
    };

    return (
        <>
            <Header />

            <div className="paragraph-container" id="paragraph-container">
                <p className="paragraph-p">Se recomienda tener todos los campeones para evitar dolores de cabeza tanto a la hora de elegir regiones o campeones, aun así podéis jugar igual siguiendo las reglas.</p>
                <br />
                <p className="paragraph-p">Como comienzo del minijuego se necesitará crear una personalizada donde jugar partidas con vuestros colegas, mientras más gente llene dicha personalizada mejor será la experiencia de juego, dicho juego consta de dos equipos que obtienen su región y campeones de runaterra de manera aleatoria elegida por la página y que ésta misma también se encargará de banear los campeones que salgan seleccionados una vez que se hace cada dos tiradas de azar, todo esto lo hará de forma completamente automática. Cualquier fallo o error me lo comunican.</p>
                <br />
                <p className="paragraph-p">Por temas de diversión y evitar destrozos injustos en las partidas en ningún momento del juego está permitido intercambiarse campeones tanto en un mismo equipo como con el equipo contrario, lo que te toque de campeón es con lo que te quedas.</p>
                <br />
                <p className="paragraph-p">En el caso de que una región no tenga suficientes campeones para completar lo que haga falta, se elegirá antes el número de campeones y se hace click en el botón de azar.</p>
                <br />
                <p className="paragraph-p">En el caso de que X jugadores no tenga dicho campeón que le ha tocado, como "penalización" se vuelve a elegir región nuevamente y el equipo contrario del jugador es el que hace la selección.</p>
                <br />
                <p className="paragraph-p">El propósito para este evento es jugar por diversión no para tryhardear, no me seas un neandertal sin vida que para eso, te vas a rankear a diamante.</p>
            </div>

            {/* Controles de selección - ✅ SOLO UNO */}
            <div className="selection-controls">
                <div className="selection-status">
                    {error ? (
                        <span style={{ color: '#ff4444' }}>❌ {error}</span>
                    ) : isInitialized ? (
                        debugInfo || 'Haz clic para seleccionar 2 facciones aleatorias'
                    ) : (
                        'Inicializando sistema...'
                    )}
                </div>

                <div className="control-buttons">
                    <button
                        className="random-btn"
                        onClick={handleRandomSelect}
                        disabled={!isInitialized || animationStage === 'selecting'}
                    >
                        {animationStage === 'selecting' ? '🎲 Seleccionando...' : '🎲 Seleccionar 2 Facciones Aleatorias'}
                    </button>

                    <button
                        className="reset-btn"
                        onClick={handleReset}
                        disabled={animationStage === 'selecting'}
                    >
                        🔄 Reiniciar
                    </button>

                    <button
                        className="debug-btn"
                        onClick={handleDebug}
                    >
                        🔍 Debug
                    </button>
                </div>
            </div>

            {/* Contenedor principal de facciones */}
            <div className={`factions-main-container ${showChampions ? 'show-champions' : ''}`}>

                {/* Grid de facciones izquierdo */}
                <div className="first-faction-icons">
                    <img src={AguasEstancadas} alt="Aguas Estancadas" id="aguasestancadas" className={`faction-icon ${selectedFactions[0]?.id === 'aguasestancadas' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'aguasestancadas' ? 'selected moving-to-center' : ''}`} />
                    <img src={CiudadDeBandle} alt="Ciudad de Bandle" id="ciudaddebandle" className={`faction-icon ${selectedFactions[0]?.id === 'ciudaddebandle' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'ciudaddebandle' ? 'selected moving-to-center' : ''}`} />
                    <img src={Demacia} alt="Demacia" id="demacia" className={`faction-icon ${selectedFactions[0]?.id === 'demacia' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'demacia' ? 'selected moving-to-center' : ''}`} />
                    <img src={ElVacio} alt="El Vacío" id="elvacio" className={`faction-icon ${selectedFactions[0]?.id === 'elvacio' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'elvacio' ? 'selected moving-to-center' : ''}`} />
                    <img src={Freljord} alt="Freljord" id="freljord" className={`faction-icon ${selectedFactions[0]?.id === 'freljord' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'freljord' ? 'selected moving-to-center' : ''}`} />
                    <img src={IslasDeLaSombra} alt="Islas de la sombra" id="islasdelasombra" className={`faction-icon ${selectedFactions[0]?.id === 'islasdelasombra' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'islasdelasombra' ? 'selected moving-to-center' : ''}`} />
                    <img src={Ixtal} alt="Ixtal" id="ixtal" className={`faction-icon ${selectedFactions[0]?.id === 'ixtal' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'ixtal' ? 'selected moving-to-center' : ''}`} />
                </div>

                {/* Grid de facciones derecho */}
                <div className="second-faction-icons">
                    <img src={Jonia} alt="Jonia" id="jonia" className={`faction-icon ${selectedFactions[0]?.id === 'jonia' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'jonia' ? 'selected moving-to-center' : ''}`} />
                    <img src={Noxus} alt="Noxus" id="noxus" className={`faction-icon ${selectedFactions[0]?.id === 'noxus' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'noxus' ? 'selected moving-to-center' : ''}`} />
                    <img src={Piltover} alt="Piltover" id="piltover" className={`faction-icon ${selectedFactions[0]?.id === 'piltover' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'piltover' ? 'selected moving-to-center' : ''}`} />
                    <img src={Runaterra} alt="Runaterra" id="runaterra" className={`faction-icon ${selectedFactions[0]?.id === 'runaterra' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'runaterra' ? 'selected moving-to-center' : ''}`} />
                    <Shurima />
                    <img src={Targon} alt="Targon" id="targon" className={`faction-icon ${selectedFactions[0]?.id === 'targon' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'targon' ? 'selected moving-to-center' : ''}`} />
                    <img src={Zaun} alt="Zaun" id="zaun" className={`faction-icon ${selectedFactions[0]?.id === 'zaun' ? 'selected moving-to-center' : ''} ${selectedFactions[1]?.id === 'zaun' ? 'selected moving-to-center' : ''}`} />
                </div>

                {/* Área central para facciones seleccionadas */}
                {showChampions && selectedFactions.length > 0 && (
                    <div className="selected-factions-center">
                        {selectedFactions.map((faction, index) => (
                            <div
                                key={faction.uniqueKey || `${faction.id}_${index}`}
                                className="selected-faction-group"
                            >
                                <div className="faction-header-center">
                                    <img
                                        src={factionImages[faction.id]}
                                        alt={faction.name}
                                        className="faction-image-center"
                                    />
                                    <h3 className="faction-name-center">
                                        {faction.name}
                                        <small style={{ display: 'block', fontSize: '0.6em', opacity: 0.8 }}>
                                            ({champions[faction.name]?.length || 0} campeones)
                                        </small>
                                    </h3>
                                </div>

                                <div className="champions-grid-center">
                                    {champions[faction.name]?.map((champion, champIndex) => (
                                        <ChampionCard
                                            key={`${champion.name}_${faction.id}_${champIndex}`}
                                            champion={champion}
                                            faction={faction.name}
                                            style={{ animationDelay: `${champIndex * 0.1}s` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}

export default Home;