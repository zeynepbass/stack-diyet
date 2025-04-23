

import { Routes, Route } from "react-router-dom"
import Hakkinda from "./pages/home"
import Layouts from "./pages/layouts/layout"
import Login from "./pages/login"
import Register from "./pages/register"
import SifremiUnuttum from "./pages/sifremiUnuttum"
import ProfilePage from "./pages/layouts/ProfilLayouts"
import Section from "./components/Section"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Hakkinda />} />

        <Route path="/ana-sayfa" element={<Layouts content={<Section />} />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

        <Route path="/giris-yap" element={<Login />} />
        <Route path="/kayit-ol" element={<Register />} />
        <Route path="/sifremi-unuttum" element={<SifremiUnuttum />} />

      </Routes>


    </>
  );
}

export default App;
