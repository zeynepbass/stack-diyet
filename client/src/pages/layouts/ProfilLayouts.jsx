import React from 'react';
import Footer from "./footer";
import Profile from "../../components/Profile/User/index";
import { Navigate } from 'react-router-dom';
import HeaderTop from './HeaderTop';

const Layout = ({ content }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/giris-yap" replace />;
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white p-2">
      <HeaderTop/>
        <div className="grid grid-cols-12 ">
          <div className="col-span-12 md:col-span-8 p-4">
         
            <Profile />
          </div>
          <div className="col-span-12 md:col-span-4">
     
            <h4 className="font-semibold text-slate-700">Öne Çıkanlar</h4>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
