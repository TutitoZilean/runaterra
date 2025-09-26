import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import BackgroundVideo from "./components/BackgroundVideo/BackgroundVideo"

function App() {

  return (
    <>
      <BrowserRouter>
        <BackgroundVideo />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
