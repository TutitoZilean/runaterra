import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Home.css'

function Rules() {

    return (
        <>
            <Header />
            <div class="main-menu">
                <div class="rules">
                    <p>Se recomienda tener todos los campeones para evitar dolores de cabeza tanto a la hora de elegir regiones o campeones, aun así podéis jugar igual siguiendo las reglas.</p>

                    <p>Como comienzo del minijuego se necesitará crear una personalizada donde jugar partidas con vuestros colegas, mientras más gente llene dicha personalizada mejor será la experiencia de juego, dicho juego consta de dos equipos que obtienen su facción y campeones de runaterra de manera aleatoria elegida por la página y que ésta misma también se encargará de baneará los campeones que salgan seleccionados una vez que se hace cada dos tiradas de azar, todo esto lo hará de forma completamente automática. Cualquier fallo o error me lo comunican.</p>

                    <p>Por temas de diversión y evitar destrozos injustos en las partidas en ningún momento del juego está permitido intercambiarse campeones tanto en un mismo equipo como con el equipo contrario, lo que te toque de campeón es con lo que te quedas.</p>

                    <p>En el caso de que una región no tenga suficientes campeones para completar lo que haga falta, se elegirá antes el número de campeones y se hace click en el botón de azar.</p>

                    <p>En el caso de que X jugadores no tenga dicho campeón que le ha tocado, como "penalización" se vuelve a elegir región nuevamente y el equipo contrario del jugador es el que hace la selección.</p>

                    <p>El propósito para este evento es jugar por diversión no para tryhardear, no me seas un neandertal sin vida que para eso, te vas a rankear a diamante.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Rules;