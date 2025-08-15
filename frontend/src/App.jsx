import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profil from "./pages/profil";
import Error from "./pages/error";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profil" element={<Profil/>} />
        <Route path="*" element={<Erreur/>} />
      </Routes>
    </Router>
  )
  
}
export default App