import React from 'react'
import Header from "./header"
import Footer from "./footer"
import HeaderTop from "./HeaderTop"
import { Navigate } from 'react-router-dom';
const Layout = ({ content }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/giris-yap" replace />;
  }
  return (
    <div className="container-fluid mx-auto px-4" >
      <div className="bg-white p-2">
        <HeaderTop />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
       
          <Header />
  
          <div className="col-span-1 md:col-span-6 p-4">
          {content && content}
          </div>
          <div className="col-span-1 md:col-span-4 p-5">
            <h4 className="font-semibold text-slate-700">Öne Çıkanlar</h4>

        
            <Footer />
         

          </div>
        </div>
      </div>

    </div>


  )
}

export default Layout
