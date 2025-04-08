

import { Routes, Route } from "react-router-dom";
import Section from "./components/section"
import Hakkinda from "./pages/hakkinda"
import Layouts from "./pages/layouts/layout"
import Login from "./pages/login"
import Register from "./pages/register"
import SifremiUnuttum from "./pages/sifremiUnuttum"
function App() {
  return (
    <>
      <Routes>
      <Route path="/hakkinda" element={<Hakkinda />}></Route>

        <Route path="/" element={<Layouts content={<Section />} />}></Route>
        <Route path="/giris-yap" element={<Login />}></Route>
        <Route path="/kayit-ol" element={<Register />}></Route>
        <Route path="/sifremi-unuttum" element={<SifremiUnuttum />}></Route>
      </Routes>

    </>
  );
}

export default App;
