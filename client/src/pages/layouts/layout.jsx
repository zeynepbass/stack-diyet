import React from 'react';
import Header from "./header";
import Footer from "./footer";
import HeaderTop from "./HeaderTop";
import { Navigate } from 'react-router-dom';

const Layout = ({ content }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/giris-yap" replace />;
  }

  return (
    <div className="container-fluid mx-auto px-4" >

      <div className="bg-white shadow-sm p-4 mb-6 rounded-md">
        <HeaderTop />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

        <div className="col-span-1 md:col-span-2">
          <Header />
        </div>


        <div className="col-span-1 md:col-span-6 p-4 bg-white shadow-sm rounded-md">
          {content && content}
        </div>


        <div className="col-span-1 md:col-span-4 p-5 bg-white shadow-sm rounded-md">
  
          <Footer />
        </div>
      </div>


   
    </div>
  );
};

export default Layout;
