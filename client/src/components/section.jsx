import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import useStore from "./useStore";
import Form from "./Form/index";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Section = () => {
  const basePath = process.env.REACT_APP_BASE_PATH;
  const { filteredData, fetchPost, fetchLike } = useStore();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [commentVisible, setCommentVisible] = useState({});
  const [text, setText] = useState({});


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchPost();
    }
  }, []);
  const commentHandler = async (postId) => {
    const currentText = text[postId];
    if (!currentText?.trim()) return;

    try {
      const newComment = {
        text: currentText,
        author: user?.result?.firstName
      };
      await axios.post(`${basePath}/detay/${postId}`, newComment);
      await fetchPost();
      setText(prev => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentClick = (id) => {
    setCommentVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };


  const handleClick = (postId, currentLikeCount) => {
    const incrementedLikeCount = currentLikeCount + 1;
    fetchLike(postId, incrementedLikeCount);
  };
  let dizi = []
  return (
    <div className='pt-4 px-6'>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex w-full">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">Kullanıcılar</DialogTitle>
                    <ul>
                      <li>Kullanıcı A</li>
                      <li>Kullanıcı B</li>
                      <li>Kullanıcı C</li>
                    </ul>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>


      <h4 className="font-semibold text-slate-800 text-2xl mb-4">Sağlıklı Yaşam İçin Diyet Önerileri</h4>
      {user ? <Form /> : null}

      <br /><br /><br />
      <div className="grid gap-8 pt-4 mt-10">
        {filteredData && filteredData.map((item, index) => (
          <div key={item._id || index} className="bg-white p-6 rounded-xl shadow-md transition hover:shadow-lg">
            <div className="flex justify-between w-full">
              <h4 className="text-green-700 font-semibold text-md mb-1">
                {item.kullanici || "Anonim Kullanıcı"}
              </h4>
              <h6 className="text-green-900 ">
              <p className="text-green-900 text-xs">
  {item.updatedAt 
    ? `${new Date(item.updatedAt).toLocaleDateString("tr-TR")} ${new Date(item.updatedAt).getHours().toString().padStart(2, '0')}:${new Date(item.updatedAt).getMinutes().toString().padStart(2, '0')}`
    : null}
</p>

              </h6>
            </div>


            <p className="text-lg font-bold text-gray-800">{item.title}</p>

            <p className="text-sm text-gray-600 mt-2 font-bold">

              <p className="text-sm text-gray-600 mt-2 font-bold">
                {item.content.includes("#")
                  ? item.content.split("#")[0].trim()
                  : item.content}
              </p>


            </p>
            <p className="text-sm text-gray-600 mt-2 font-bold">

              {item.content.includes("#")
                ? item.content.match(/#[\wğüşöçıİĞÜŞÖÇ]+/g)?.join(", ")
                : item.content}

            </p>






            <div className="flex items-center justify-start mt-4 gap-4 text-sm text-gray-500 ">
              <button
                onClick={() => handleClick(item._id, item.likeCount)}
                className="flex items-center gap-1 text-red-500 hover:text-red-600"
              >
                <FontAwesomeIcon icon={faHeart} className="text-xl" />
                {item.likeCount || 0}
              </button>
              <button
                onClick={() => handleCommentClick(item._id)}
                className="text-gray-600 hover:text-gray-800"
              >
                Yorum Yap
              </button>
            </div>

            <ul className="mt-3 space-y-2 pl-2">
                  {item?.comments?.map((comment, idx) => (
                    <li key={idx} className="flex justify-between items-start text-sm text-gray-700">
                      <span>
                        <strong>@{comment.author.toLowerCase()}:</strong> {comment.text}
                      </span>
                    </li>
                  ))}
                </ul>
            {commentVisible[item._id] && (
              <div className="mt-4 pl-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <textarea
                    className="w-full rounded-lg p-2 border border-gray-300 outline-none"
                    rows="2"
                    value={text[item._id] || ""}
                    onChange={(e) =>
                      setText(prev => ({ ...prev, [item._id]: e.target.value }))
                    }
                    placeholder="Yorumunuzu yazın..."
                  />
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={() => commentHandler(item._id)}
                  >
                    Gönder
                  </button>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
