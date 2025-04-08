import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import useStore from "./useStore";
import { useNavigate } from 'react-router-dom';

const Section = () => {
  const { filteredData, fetchPost, fetchLike, fetchComment } = useStore();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    baslik: "",
    acikla: ""
  });

  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCommentClick = () => {
    setIsCommentVisible(!isCommentVisible);
  };

  const handleClick = (postId, currentLikeCount) => {
    if (user) {
      const incrementedLikeCount = currentLikeCount + 1;
      fetchLike(postId, incrementedLikeCount);
    } else {
      navigate("/giris-yap");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission

    // Ensure 'user' is logged in before proceeding
    if (user) {
      // Use formData directly without re-declaring it
      const dataToSend = {
        acikla: formData.acikla,
        baslik: formData.baslik,
      };

      // Call fetchComment with the dataToSend to submit the post/comment
      await fetchComment(dataToSend);

      // Clear the form after submission
      setFormData({ acikla: "", baslik: "" });
    } else {
      navigate("/giris-yap"); // Redirect to login page if user is not logged in
    }
  };

  useEffect(() => {

    fetchPost();
  }, [fetchPost]);

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

      <form className="w-full flex space-x-4 h-10" onSubmit={handleSubmit}> {/* Form now uses onSubmit */}
      <div className="relative w-full row">
  <input
    type="text"
    name="baslik"
    value={formData.baslik}
    onChange={handleChange}
    className="h-10 block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    placeholder="Başlık yaz..."
    required
  />
  
  <textarea   type="text"
    name="acikla"
    value={formData.acikla}
    onChange={handleChange}
    className="h-50 block w-full p-1 mt-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
    placeholder="Açıklama yaz..."
    required>

  </textarea>
  
  <button
          type="submit"
          className="float-right mt-1 w-auto p-2 bg-purple-700 text-white rounded-lg hover:bg-purple-100 focus:ring-2 focus:ring-purple-300"
        >
          Gönder
        </button>
</div>

     
      </form>

      <br />
      <br />
      <br />

      <div className="grid grid-cols-1 gap-4">
        <div className="w-full p-4 h-[50vh] overflow-y-auto">
          {filteredData && filteredData.map((item,index) => (
            <div key={index} className="mt-2 text-gray-900">
              <h4><span className="font-semibold text-lg">Yayınlayan:</span> {item.nickName ? item.nickName : "" }</h4>
              <p className="mt-1 text-sm text-gray-700">{item.baslik}</p>
              <p className="mt-1 text-sm text-gray-700">{item.acikla}</p>
              <div className="flex items-center mt-2 space-x-4">
                <button
                  className="text-purple-600 hover:text-purple-800"
                  onClick={() => handleClick(item._id, item.likeCount)}
                >
                  <span className="text-sm">Beğen</span>
                </button>
                <span className="text-sm text-gray-500">{item.likeCount} Beğeni</span>
                <span>
                  <button
                    onClick={handleCommentClick}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Yorum Yap
                  </button>
                </span>
              </div>
            </div>
          ))}
          {/* Comment Section */}
          {isCommentVisible && (
            <div className="mt-4 flex items-center space-x-2 relative">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Yorumunuzu yazın..."
              />
              <button className="absolute top-2 right-2 bg-gray-800 text-white px-4 py-2 rounded-lg">
                Gönder
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;
