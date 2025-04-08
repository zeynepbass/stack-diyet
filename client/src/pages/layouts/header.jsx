import React, { useState, useEffect } from 'react'
import Dialog from "../../components/Dialog"
import { useNavigate } from 'react-router-dom';
import useStore from '../../components/useStore';

const Header = () => {
  const [open, setOpen] = useState(false)
  const { usersData, fetchUsers } = useStore((state) => ({
    usersData: state.usersData,
    fetchUsers: state.fetchUsers,
  }));
  const [users, setUsers] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate()

  // Handle the "Kullanıcılar" click
  const handleClickUsers = async () => {
    if (user) {
      setOpen(true);
      setUsers(usersData); // Set the users state with the data fetched from the store
    } else {
      navigate('/giris-yap'); // Redirect to login page if no user
    }
  };


  useEffect(() => {
    if (user) {
      fetchUsers(); // Fetch users when the user exists
    }
  }, [user, fetchUsers]);

  return (
    <div className='border-r-2 border-gray-100 md:col-span-2'>
      <h4 className="font-semibold text-slate-800">Menü</h4>
      <div className='grid grid-cols-1'>
        {/* Dialog should use usersData */}
        <Dialog setOpen={setOpen} open={open} users={users} />
        <ul>
          <li onClick={handleClickUsers}>Kullanıcılar</li>
   
        </ul>
      </div>
    </div>
  )
}

export default Header
