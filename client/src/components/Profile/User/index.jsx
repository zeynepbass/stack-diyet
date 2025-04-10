import React from "react";
import useStore from "../../useStore"
const ProfilePage = () => {
  const { filteredData } = useStore()
  const user = JSON.parse(localStorage.getItem("user"))
  const userProfile = JSON.parse(localStorage.getItem("userProfile"))
  const filteredTitles = filteredData.filter((item) => item.nickName === user?.result?.firstName);
  const Likes = filteredTitles
    .sort((a, b) => b.likeCount - a.likeCount)[0];

  console.log(Likes);

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="bg-purple-500 p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={userProfile.selectedFile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4 text-white">
            <h1 className="text-2xl font-bold">{user.result.fistName} {user.result.lastName}</h1>
            <p className="text-sm">@{user.result.fistName}{user.result.lastName}</p>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-6 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center">

          <div className="flex-1 sm:mr-6">
            <h2 className="text-xl font-semibold">Son Gönderi</h2>
            <p className="text-gray-700 mt-2">
              {Likes && Likes.acikla}
            </p>
          </div>


          <div className="mt-6 sm:mt-0 sm:flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-lg font-semibold">{Likes && Likes.likeCount}</p>
                <p className="text-sm text-gray-500">Beğeni</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">{Likes && Likes.comments.length}</p>
                <p className="text-sm text-gray-500">Yorum Yapanlar</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-900">Gönderi</h2>
        <div className="mt-4 space-y-4 h-[100vh] overflow-y-auto">
          {filteredTitles.map((item) => {
            return (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={userProfile.selectedFile}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>



                  <div>
                    <h3 className="text-lg font-semibold">@{user.result.fistName} {user.result.lastName} </h3>
                    <p className="text-sm text-gray-500">@{user.result.fistName}{user.result.lastName}</p>
                  </div>
                </div>
                <h6 className="mt-4 text-gray-800">
                  {item.baslik}
                </h6>
                <p className="mt-4 text-gray-800">
                  {item.acikla}
                </p>
                <div className="flex items-center mt-2 space-x-4">

                  <span className="text-sm text-gray-500">  {item.likeCount === 0 ? "" : `${item.likeCount} Beğeni`}</span>
                  <span className="text-sm text-gray-500">{item.comments.length >= 0 ? "" : item.comments.length} </span>


                </div>

              </div>

            )
          })}

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
