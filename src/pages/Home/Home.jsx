import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DynamicFaction from '../../components/DynamicFaction/DynamicFaction.jsx';
import './Home.css';

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

function Home() {

    return (
        <>
            <Header />
            <div className="paragraph-container" id="paragraph-container">
                <p className="paragraph-p">Se recomienda tener todos los campeones para evitar dolores de cabeza tanto a la hora de elegir regiones o campeones, aun así podéis jugar igual siguiendo las reglas.</p><br />
                <p className="paragraph-p">Como comienzo del minijuego se necesitará crear una personalizada donde jugar partidas con vuestros colegas, mientras más gente llene dicha personalizada mejor será la experiencia de juego, dicho juego consta de dos equipos que obtienen su región y campeones de runaterra de manera aleatoria elegida por la página y que ésta misma también se encargará de banear los campeones que salgan seleccionados una vez que se hace cada dos tiradas de azar, todo esto lo hará de forma completamente automática. Cualquier fallo o error me lo comunican.</p><br />
                <p className="paragraph-p">Por temas de diversión y evitar destrozos injustos en las partidas en ningún momento del juego está permitido intercambiarse campeones tanto en un mismo equipo como con el equipo contrario, lo que te toque de campeón es con lo que te quedas.</p><br />
                <p className="paragraph-p">En el caso de que una región no tenga suficientes campeones para completar lo que haga falta, se elegirá antes el número de campeones y se hace click en el botón de azar.</p><br />
                <p className="paragraph-p">En el caso de que X jugadores no tenga dicho campeón que le ha tocado, como "penalización" se vuelve a elegir región nuevamente y el equipo contrario del jugador es el que hace la selección.</p><br />
                <p className="paragraph-p">El propósito para este evento es jugar por diversión no para tryhardear, no me seas un neandertal sin vida que para eso, te vas a rankear a diamante.</p>
            </div>
            <div className="factions-main-container">
                <div className="first-faction-icons">
                    <DynamicFaction regionName="Aguas Estancadas" bannerImage={AguasEstancadas} showName={true} layout="grid" />
                    <DynamicFaction regionName="Ciudad de Bandle" bannerImage={CiudadDeBandle} showName={true} layout="grid" />
                    <DynamicFaction regionName="Demacia" bannerImage={Demacia} showName={true} layout="grid" />
                    <DynamicFaction regionName="El Vacío" bannerImage={ElVacio} showName={true} layout="grid" />
                    <DynamicFaction regionName="Freljord" bannerImage={Freljord} showName={true} layout="grid" />
                    <DynamicFaction regionName="Islas de la sombra" bannerImage={IslasDeLaSombra} showName={true} layout="grid" />
                    <DynamicFaction regionName="Ixtal" bannerImage={Ixtal} showName={true} layout="grid" />
                </div>
                <div className="second-faction-icons">
                    <DynamicFaction regionName="Jonia" bannerImage={Jonia} showName={true} layout="grid" />
                    <DynamicFaction regionName="Noxus" bannerImage={Noxus} showName={true} layout="grid" />
                    <DynamicFaction regionName="Piltover" bannerImage={Piltover} showName={true} layout="grid" />
                    <DynamicFaction regionName="Runaterra" bannerImage={Runaterra} showName={true} layout="grid" />
                    <DynamicFaction regionName="Shurima" bannerImage={Shurima} showName={true} layout="grid" />
                    <DynamicFaction regionName="Targon" bannerImage={Targon} showName={true} layout="grid" />
                    <DynamicFaction regionName="Zaun" bannerImage={Zaun} showName={true} layout="grid" />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;