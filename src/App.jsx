import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import AguasEstancadas from "./pages/AguasEstancadas/AguasEstancadas"
import CiudadDeBandle from "./pages/CiudadDeBandle/CiudadDeBandle"
import Demacia from "./pages/Demacia/Demacia"
import ElVacio from "./pages/ElVacio/ElVacio"
import Freljord from "./pages/Freljord/Freljord"
import IslasDeLaSombra from "./pages/IslasDeLaSombra/IslasDeLaSombra"
import Ixtal from "./pages/Ixtal/Ixtal"
import Jonia from "./pages/Jonia/Jonia"
import Noxus from "./pages/Noxus/Noxus"
import Piltover from "./pages/Piltover/Piltover"
import Shurima from "./pages/Shurima/Shurima"
import Targon from "./pages/Targon/Targon"
import Zaun from "./pages/Zaun/Zaun"
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/aguasestancadas" element={<AguasEstancadas />} />
          <Route path="/ciudaddebandle" element={<CiudadDeBandle />} />
          <Route path="/demacia" element={<Demacia />} />
          <Route path="/elvacio" element={<ElVacio />} />
          <Route path="/freljord" element={<Freljord />} />
          <Route path="/islasdelasombra" element={<IslasDeLaSombra />} />
          <Route path="/ixtal" element={<Ixtal />} />
          <Route path="/jonia" element={<Jonia />} />
          <Route path="/noxus" element={<Noxus />} />
          <Route path="/piltover" element={<Piltover />} />
          <Route path="/shurima" element={<Shurima />} />
          <Route path="/targon" element={<Targon />} />
          <Route path="/zaun" element={<Zaun />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
