

import { Routes, Route } from "react-router-dom";
import Section from "./components/section"
import Hakkinda from "./pages/hakkinda"
import Layouts from "./pages/layouts/layout"
import Login from "./pages/login"
import Register from "./pages/register"
import SifremiUnuttum from "./pages/sifremiUnuttum"
import ProfilePage from "./components/Profile/User"
function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <>
      <Routes>
      <Route path="/hakkinda" element={<Hakkinda />}></Route>
        {user ?  
         <>

         
         <Route path="/ana-sayfa" element={<Layouts content={<Section />} />}></Route>
         <Route path="/profile/:userId" element={<ProfilePage />}></Route> 
        </>  
         :   
          <>
        <Route path="/" element={<Login />}></Route>
         <Route path="/kayit-ol" element={<Register />}></Route>
         <Route path="/sifremi-unuttum" element={<SifremiUnuttum />}></Route>
        </>
         
        }



      </Routes>

    </>
  );
}

export default App;
