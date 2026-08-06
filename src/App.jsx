import { ChampionsProvider } from '../src/contexts/championContext.jsx'
import { AppProvider } from '../src/contexts/appContext.jsx'
import BackgroundVideo from '../src/components/BackgroundVideo/BackgroundVideo.jsx'
import Header from '../src/components/Header/Header.jsx'
import Rules from '../src/components/Rules/Rules.jsx'
import Footer from '../src/components/Footer/Footer.jsx'
import Home from '../src/pages/Home/Home.jsx'
import './App.css'

function App() {
  return (
    <AppProvider>
      <ChampionsProvider>
        <BackgroundVideo />
        <Header />
        <Rules />
        <div className="app-container">
          <Home />
        </div>
        <Footer />
      </ChampionsProvider>
    </AppProvider>
  )
}

export default App