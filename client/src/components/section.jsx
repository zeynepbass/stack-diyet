import React, { useEffect, useState, useCallback } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import useStore from "./useStore";
import Form from "../components/Form/index"
import axios from "axios";

const Section = () => {
  const { filteredData, fetchPost, fetchLike } = useStore();
  const user = JSON.parse(localStorage.getItem("user"));
  const [localPosts, setLocalPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [commentVisible, setCommentVisible] = useState({});
  const [text, settext] = useState({});
  const commentHandler = async (postId) => {
 
    const currenttext = text[postId];
    if (!currenttext?.trim()) return;

    try {
      const newComment = {
        text: currenttext,
        author: user?.result?.firstName
      };

      await axios.post(`/detay/${postId}`, newComment);
      setLocalPosts(prev =>
        prev.map(post =>
          post._id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
      settext(prev => ({ ...prev, [postId]: "" }));
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

  useEffect(() => {
    if (JSON.stringify(filteredData) !== JSON.stringify(localPosts)) {
      setLocalPosts(filteredData);
    }
  }, [filteredData]);
  const memoizedFetchPost = useCallback(() => {
    fetchPost(); 
  }, [fetchPost]);

  useEffect(() => {
    memoizedFetchPost();
  }, [memoizedFetchPost]); 

  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex w-full">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Kullanıcılar
                    </DialogTitle>
                    <ul>
                      <li>sdfsd</li>
                      <li>sdfsd</li>
                      <li>sdfsd</li>
                    </ul>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <p className='flex justify-between'>
        <h4 className="font-semibold text-slate-800">En iyi diyet listesi</h4>
      </p>
      <br />
      {user ? <Form /> : null}

      <div className="grid grid-cols-1 " style={{ paddingTop: user ? "15%" : "0" }}>
        <div className="w-full p-1 h-[100vh] overflow-y-auto">
          {localPosts && localPosts.map((item, index) => (
            <div key={index} className="mt-2 text-gray-900 bg-gray-100 p-4 rounded-lg">
              <h4><span className="font-semibold text-lg">Yayınlayan:</span> {item.nickName ? item.nickName : "..."}</h4>
              <p className="mt-1 text-sm text-gray-700">{item.baslik}</p>
              <p className="mt-1 text-sm text-gray-700">{item.acikla}</p>
              <div className="flex items-center mt-2 space-x-4">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleClick(item._id, item.likeCount)}
                >
                  <span className="text-sm">Beğen</span>
                </button>
                <span className="text-sm text-gray-500">{item.likeCount} Beğeni</span>
                <span>
                  <button
                    onClick={() => handleCommentClick(item._id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Yorum Yap
                  </button>
                </span>
              </div>

              <div className={`mt-4 flex items-center space-x-2 relative overflow-y-auto ${item.comments.length > 0 ? 'h-30' : 'h-0'}`}>
                <ul>
                  {item?.comments?.map((comment, index) => {
                    const isSameUser = comment.author === user?.result?.firstName;
                    return (
                      <li key={index}>
                        <strong>@{isSameUser ? "Sen" : comment.author}</strong>: {comment.text}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {commentVisible[item._id] && (
                <div className="mt-4 flex items-center space-x-2 relative">
                  <textarea
                    className='w-full rounded-lg'
                    value={text[item._id] || ""}
                    onChange={(e) =>
                      settext(prev => ({ ...prev, [item._id]: e.target.value }))
                    }
                  />
                  <button
                    className="absolute top-1 right-2 bg-gray-800 text-white px-4 py-2 rounded-lg"
                    onClick={() => commentHandler(item._id)}
                  >
                    Gönder
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
