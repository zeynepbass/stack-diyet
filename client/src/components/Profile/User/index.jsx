import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useStore from "../../useStore";

const ProfilePage = () => {
  const { id } = useParams();
  const { filteredData } = useStore();
  const [data, setData] = useState({});
  

  const fetchData = async () => {
    try {
      const response = await axios.get(`/detay/${id}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 
  const filteredTitles = filteredData.filter((item) => item.nickName === data.firstName);


  const Likes = filteredTitles.length > 0
    ? filteredTitles.sort((a, b) => b.likeCount - a.likeCount)[0]
    : null;

  useEffect(() => {
    if (id) {
      fetchData();  
    }
  }, [id]);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-blue-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center">
        {data.selectedFile ?  
          <div className="w-16 h-16 rounded-full overflow-hidden">
     <img
              src={data.selectedFile || "default-image-url"} 
              alt="Profile"
              className="w-full h-full object-cover"
            /> 
         
          </div>: null}
          <div className="ml-4 text-white">
            <h1 className="text-2xl font-bold">{data.firstName} {data.lastName}</h1>
            <p className="text-sm">@{data.firstName}{data.lastName}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-50 rounded-lg mt-1">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-1 sm:mr-6">
            <h2 className="text-xl font-semibold">Son Gönderi</h2>
            <p className="text-gray-700 mt-2">
              {Likes ? Likes.acikla : "Henüz gönderi bulunmuyor."}
            </p>
          </div>

          <div className="mt-6 sm:mt-0 sm:flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-lg font-semibold">{Likes ? Likes.likeCount : 0}</p>
                <p className="text-sm text-gray-500">Beğeni</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">{Likes ? Likes.comments.length : 0}</p>
                <p className="text-sm text-gray-500">Yorum Yapanlar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-900">Gönderiler</h2>
        <div className="mt-4 space-y-4 h-[100vh] overflow-y-auto">
          {filteredTitles.length > 0 ? (
            filteredTitles.map((item) => (
              <div key={item._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={data.selectedFile || "default-image-url"} 
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">@{data.firstName} {data.lastName}</h3>
                    <p className="text-sm text-gray-500">@{data.firstName} {data.lastName}</p>
                  </div>
                </div>
                <h6 className="mt-4 text-gray-800">{item.baslik}</h6>
                <p className="mt-4 text-gray-800">{item.acikla}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-sm text-gray-500">
                    {item.likeCount > 0 ? `${item.likeCount} Beğeni` : "Beğeni Yok"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.comments.length > 0 ? `${item.comments.length} Yorum` : "Yorum Yok"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Hiç gönderi yayınlanmamış.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
