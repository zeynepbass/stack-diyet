import React, { useState, useEffect } from 'react'
import Dialog from "../../components/Dialog"
import { useNavigate } from 'react-router-dom';
import useStore from '../../components/useStore';

const Header = () => {
  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate()

 
  const handleClickUsers = async () => {
    if (user) {
      setOpen(!open);
    
    } else {
      navigate('/giris-yap');
    }
  };



  return (
    <div className='border-r-2 border-gray-100 md:col-span-2'>
      <h4 className="font-semibold text-slate-800">Menü</h4>
      <div className='grid grid-cols-1'>
   
        <Dialog setOpen={setOpen} open={open}  />
        <ul>
          <li onClick={handleClickUsers}>Kullanıcılar</li>
   
        </ul>
      </div>
    </div>
  )
}

export default Header
