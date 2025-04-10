import React, { useState } from 'react'
import useStore from "../../components/useStore"
import { useNavigate } from 'react-router-dom'
import Dialog from "../../components/Dialog"
const Footer = () => { 
    const { filteredData } = useStore();
    const [open, setOpen] = useState(false)
    const top5Posts = filteredData
        .filter((item) => item.likeCount)
        .sort((a, b) => b.likeCount - a.likeCount) 
        .slice(0, 10);


        const user = JSON.parse(localStorage.getItem("user"));
      
        const navigate = useNavigate()
      
       
        const handleClickUsers = async () => {
          if (user) {
            setOpen(!open);
          
          } else {
            navigate('/');
          }
        };
      
    return (
        <div className="grid grid-cols-1 gap-4">

            <div className="w-full h-[280px] bg-purple-50 rounded-xl  border-2 border-purple-100 p-4">

                {top5Posts.map((post,index) => (
                    <div key={index} className="post-card">
                        <strong><span >{post.baslik.slice(0,20)}</span></strong>
                      &nbsp;<span className='text-gray-400'>{post.likeCount} Beğeni</span>
                    </div>
                ))}
            </div>
            <Dialog setOpen={setOpen} open={open}  />
            <div className="w-full h-[150px]  rounded-xl  border-2 border-gray-50">
                <div className='p-1'>
                <h4 className="font-semibold text-slate-700">Soru Soran Kullanıcılar</h4>
                    <div className="mt-3 flex -space-x-2 overflow-hidden">
                        <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://www.evobulut.com/img/evobulut/personel.jpg" alt="{user.handle}" />
                    </div>
                    <div className="mt-3 text-sm font-medium" onClick={handleClickUsers}>
                        <a href="#" className="text-gray-500" >+ {filteredData.length} kullanıcı</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
