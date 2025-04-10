import React from 'react'
import Header from "./header"
import Footer from "./footer"
import HeaderTop from "./HeaderTop"

const Layout = ({ content }) => {

  return (
    <div className="container mx-auto px-4" >
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
