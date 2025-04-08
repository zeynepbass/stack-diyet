import React, { useState } from 'react'
import Dialog from "../../components/Dialog"
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [open, setOpen] = useState(false)
  const user=JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate()
  const handleClick = () => {
    if(user){
      setOpen(true)
    }
    else{
      navigate("/giris-yap")
    }
    

  }
  return (

    <div className='border-r-2 border-gray-100 md:col-span-2'>
      <h4 className="font-semibold text-slate-800">Menü</h4>
      <strong></strong>
      <div className='grid grid-cols-1'>
        <Dialog setOpen={setOpen} open={open} />
        <ul>

          <li>  Kullanıcılar</li>
          <li onClick={handleClick}>  Etiket ara</li>
        </ul>
      </div>
    </div>
  )
}

export default Header
