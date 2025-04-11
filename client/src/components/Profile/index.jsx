import React, { useEffect, useState } from 'react';
import useStore from "../useStore";
import Dialog from "../Dialog"
import axios from "axios"
const ProfilePage = () => {
    const { filteredData } = useStore()
    const [open, setOpen] = useState(false)
    const [data, setData] = useState("")
    const user = JSON.parse(localStorage.getItem("user"))
    const filteredTitles = filteredData.filter((item) => item.nickName === user?.result?.firstName);

    const lastTitles = filteredTitles.reverse().slice(0, 10)
    const handleClick = async () => {
        setOpen(true)

    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`/detay/${user?.result?._id}`)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <Dialog open={open} setOpen={setOpen} data={data} setData={setData} />
     
            
            
                <div className="flex items-center space-x-6">

                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                    <img src={data.selectedFile ? data.selectedFile : null} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">@{data.firstName}</h1>

                    <p className="text-blue-300  rounded-md hover:text-blue-800" onClick={() => handleClick(user?.result?._id)}>Profil Düzenle</p>

                </div>
            </div>





                <div className="mt-6">

                    <ul className="list-none mt-2">

                        <li className="text-gray-700">E-posta: {data.email}</li>


                    </ul>
                    <div className="grid grid-cols-1 gap-4" style={{ paddingTop: user ? "10%" : "0" }}>
                        <div className="w-full p-4 h-[50vh] overflow-y-auto">
                            {lastTitles.length > 0 ? (
                                <ul className="list-none">
                                    {lastTitles.map((item, index) => (
                                        <li key={index} className="text-gray-900 text-lg">{item.baslik} </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Hiç gönderi yayınlamadın.</p>
                            )}
                        </div>
                    </div>

                </div> 





        </>
    );
};

export default ProfilePage;
