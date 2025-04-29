import React, { useState } from 'react';
import useStore from "../../components/useStore";
import Dialog from "../../components/Dialog";
import { Navigate } from 'react-router-dom';
import Calculator from "./kitleCalculator"
const Footer = () => {
    const dietEmojis = ["🥗", "🥬", "🥒", "🥑", "🍅", "💪", "🍋", "🌽", "🍓", "🥦"];

    const getRandomEmoji = () => {
        return dietEmojis[Math.floor(Math.random() * dietEmojis.length)];
    };

    const { filteredData } = useStore();
    const [open, setOpen] = useState(false);
    const top5Posts = filteredData
        .filter((item) => item.likeCount)
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 9);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleClickUsers = () => {
        if (user) {
            setOpen(!open);
        } else {
            Navigate('/');
        }
    };


    return (

        <div className="grid grid-cols-1 gap-6 mt-8">

            <div className=" bg-green-50 rounded-xl border-2 border-green-100 p-4">
                <h4 className="font-semibold text-slate-700 ">Popüler Gönderiler</h4>
                <hr/>

                {top5Posts && top5Posts.map((post, index) => (
                    <div key={index} className="m-2">
                        <strong className="block text-sm font-semibold text-gray-800">
                            {getRandomEmoji()}   {post.title ? post.title.slice(0, 51) + "..." : "Başlık Yok"}
                        </strong>

                    </div>
                ))}
            </div>


            <Dialog setOpen={setOpen} open={open} />


            <div className="w-full h-auto rounded-xl border-2 border-gray-50 p-4 bg-white">
                <h4 className="font-semibold text-slate-700 mb-4">Soru Soran Kullanıcılar</h4>
                <div className="flex space-x-2">
                    <img className="h-12 w-12 rounded-full ring-2 ring-white" src="https://www.evobulut.com/img/evobulut/personel.jpg" alt="User Avatar" />
                    <div className="flex flex-col justify-center">
                        <p className="text-sm text-gray-500">+ {filteredData.length} kullanıcı</p>
                        <button
                            onClick={handleClickUsers}
                            className="text-sm text-green-500 hover:text-green-700 focus:outline-none mt-2">
                            Daha Fazla Kullanıcı
                        </button>
                    </div>
                </div>
            </div>
            <Calculator />

        </div>
    );
};

export default Footer;
