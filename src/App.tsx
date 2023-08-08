import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import { Container } from "react-bootstrap"
import Search from "./component/Search"
import TopArtist from "./component/TopArtist"

function App() {
  return(
  <Container>
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />  
      </Routes>
    </BrowserRouter>
  </Container>
  )
}

export default App
