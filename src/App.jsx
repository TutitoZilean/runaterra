import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Prueba from "./pages/Prueba/Prueba"
import BackgroundVideo from "./components/BackgroundVideo/BackgroundVideo"
import './index.css'

function App() {

  return (
    <>
      <BackgroundVideo />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/prueba" element={<Prueba />} />
          <Route path="/homeneiro" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
