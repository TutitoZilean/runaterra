import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import BackgroundVideo from '../../components/BackgroundVideo/BackgroundVideo'
import './Home.css';

function Home() {

    return (
        <>
        <Header />
        <BackgroundVideo />
        <div class="main-body">
            <p>Esto es una prueba de textito</p>
        </div>
        <Footer />
        </>
    )
}

export default Home;