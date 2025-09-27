import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
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
import './Home.css'
import { initRandomSelector, selectRandomFactions, resetSelection } from '../../scripts/randomFactionSelector.js';

function Home() {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            await initRandomSelector();
            setIsInitialized(true);
        };
        initialize();
    }, []);

    const handleRandomSelect = () => {
        if (isInitialized) {
            selectRandomFactions();
        }
    };

    return (
        <>
            <Header />
            <div className="paragraph-container" id="paragraph-container">
                <p className="paragraph-p">Se recomienda tener todos los campeones para evitar dolores de cabeza tanto a la hora de elegir regiones o campeones, aun así podéis jugar igual siguiendo las reglas.</p><br></br>
                <p className="paragraph-p">Como comienzo del minijuego se necesitará crear una personalizada donde jugar partidas con vuestros colegas, mientras más gente llene dicha personalizada mejor será la experiencia de juego, dicho juego consta de dos equipos que obtienen su región y campeones de runaterra de manera aleatoria elegida por la página y que ésta misma también se encargará de banear los campeones que salgan seleccionados una vez que se hace cada dos tiradas de azar, todo esto lo hará de forma completamente automática. Cualquier fallo o error me lo comunican.</p><br></br>
                <p className="paragraph-p">Por temas de diversión y evitar destrozos injustos en las partidas en ningún momento del juego está permitido intercambiarse campeones tanto en un mismo equipo como con el equipo contrario, lo que te toque de campeón es con lo que te quedas.</p><br></br>
                <p className="paragraph-p">En el caso de que una región no tenga suficientes campeones para completar lo que haga falta, se elegirá antes el número de campeones y se hace click en el botón de azar.</p><br></br>
                <p className="paragraph-p">En el caso de que X jugadores no tenga dicho campeón que le ha tocado, como "penalización" se vuelve a elegir región nuevamente y el equipo contrario del jugador es el que hace la selección.</p><br></br>
                <p className="paragraph-p">El propósito para este evento es jugar por diversión no para tryhardear, no me seas un neandertal sin vida que para eso, te vas a rankear a diamante.</p>
            </div>

            {/* Controles de selección aleatoria */}
            <div className="selection-controls">
                <div id="selection-status" className="selection-status">
                    {isInitialized ? 'Haz clic para seleccionar 2 facciones aleatorias' : 'Cargando datos...'}
                </div>

                <div className="control-buttons">
                    <button
                        className="random-btn"
                        onClick={handleRandomSelect}
                        disabled={!isInitialized}
                    >
                        🎲 Seleccionar 2 Facciones Aleatorias
                    </button>

                    <button
                        className="reset-btn"
                        onClick={resetSelection}
                    >
                        🔄 Reiniciar
                    </button>
                </div>
                // Agrega esto en tus controles
                <button onClick={() => console.log(getSystemStatus())}>
                    🔍 Debug System
                </button>
            </div>

            <div className="no-drag-container">
                <div className="grid-faction-container">
                    <div className="first-faction-icons">
                        <img src={AguasEstancadas} alt="Aguas Estancadas" id="aguasestancadas" className="faction-icon" />
                        <img src={CiudadDeBandle} alt="Ciudad de Bandle" id="ciudaddebandle" className="faction-icon" />
                        <img src={Demacia} alt="Demacia" id="demacia" className="faction-icon" />
                        <img src={ElVacio} alt="El Vacío" id="elvacio" className="faction-icon" />
                        <img src={Freljord} alt="Freljord" id="freljord" className="faction-icon" />
                        <img src={IslasDeLaSombra} alt="Islas de la sombra" id="islasdelasombra" className="faction-icon" />
                        <img src={Ixtal} alt="Ixtal" id="ixtal" className="faction-icon" />
                    </div>
                    <div className="second-faction-icons">
                        <img src={Jonia} alt="Jonia" id="jonia" className="faction-icon" />
                        <img src={Noxus} alt="Noxus" id="noxus" className="faction-icon" />
                        <img src={Piltover} alt="Piltover" id="piltover" className="faction-icon" />
                        <img src={Runaterra} alt="Runaterra" id="runaterra" className="faction-icon" />
                        <img src={Shurima} alt="Shurima" id="shurima" className="faction-icon" />
                        <img src={Targon} alt="Targon" id="targon" className="faction-icon" />
                        <img src={Zaun} alt="Zaun" id="zaun" className="faction-icon" />
                    </div>
                </div>
            </div>

            {/* Contenedores para campeones - se llenarán dinámicamente por el script */}
            <div id="aguasestancadas-champions" className="faction-champions">
                <h3>Campeones de Aguas Estancadas</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="ciudaddebandle-champions" className="faction-champions">
                <h3>Campeones de Ciudad de Bandle</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="demacia-champions" className="faction-champions">
                <h3>Campeones de Demacia</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="elvacio-champions" className="faction-champions">
                <h3>Campeones de El Vacío</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="freljord-champions" className="faction-champions">
                <h3>Campeones de Freljord</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="islasdelasombra-champions" className="faction-champions">
                <h3>Campeones de Islas de la Sombra</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="ixtal-champions" className="faction-champions">
                <h3>Campeones de Ixtal</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="jonia-champions" className="faction-champions">
                <h3>Campeones de Jonia</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="noxus-champions" className="faction-champions">
                <h3>Campeones de Noxus</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="piltover-champions" className="faction-champions">
                <h3>Campeones de Piltover</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="runaterra-champions" className="faction-champions">
                <h3>Campeones de Runaterra</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="shurima-champions" className="faction-champions">
                <h3>Campeones de Shurima</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="targon-champions" className="faction-champions">
                <h3>Campeones de Targon</h3>
                <div className="champions-grid"></div>
            </div>

            <div id="zaun-champions" className="faction-champions">
                <h3>Campeones de Zaun</h3>
                <div className="champions-grid"></div>
            </div>

            <Footer />
        </>
    )
}

export default Home;