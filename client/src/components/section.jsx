import React, { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import useStore from "./useStore"
import { useNavigate } from 'react-router-dom';

const Section = () => {
  const { filteredData, fetchPost, fetchLike, fetchComment } = useStore();
  const user=JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    baslik: "",
    acikla:""
  })

  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCommentClick = () => {
    setIsCommentVisible(!isCommentVisible);
  };
  const handleClick = (postId, currentLikeCount) => {

    if(user){
      const incrementedLikeCount = currentLikeCount + 1;
      fetchLike(postId, incrementedLikeCount);
    }
    else{
      navigate("/giris-yap")
    }
    
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if(user){
      fetchComment(formData)
      console.log(formData)
    }
    else{
      navigate("/giris-yap")
    }
    
  }
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
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
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">


              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <p className='flex justify-between'> <h4 className="font-semibold text-slate-800">En iyi diyet listesi</h4> 
      </p>
      <br />
      {user ?  (
           <form className="w-full flex space-x-4 h-10" action={handleSubmit}> {/* Use flex layout to place items next to each other */}
        <div className="relative w-full">  {/* This div takes full width */}
  
   
        <input
            type="text" // Use 'text' instead of 'post'
            name="acikla" // This will map to formData.baslik
            value={formData.acikla} // Bind the value to the state
            onChange={handleChange}
            className="h-10 block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Başlık yaz..."
            required
          />
          <input
            type="text" // Use 'text' instead of 'post'
            name="baslik" // This will map to formData.baslik
            value={formData.baslik} // Bind the value to the state
            onChange={handleChange}
            className="h-10 block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Başlık yaz..."
            required
          />
        </div>

        {/* Button next to the input */}
        <button
          type="submit"
          className=" w-auto px-4 bg-purple-700 text-white rounded-lg hover:bg-purple-100 focus:ring-2 focus:ring-purple-300"
        >
          Gönder
        </button>
      </form> 
      ) : null }

   
      <br />
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 ">
        <div className="w-full p-4 h-[50vh] overflow-y-auto">


      
          {filteredData.map((item) => {
            return (
              <>
                <div className="mt-2 text-gray-900">

                  <h4><span className="font-semibold text-lg">Kullanıcı Adı:</span> {item.acikla}</h4>
                  <p className="mt-1 text-sm text-gray-700">{item.baslik}</p>


                </div>

                {/* Likes */}
                <div className="flex items-center mt-2 space-x-4">
                  <button className="text-purple-600 hover:text-purple-800">

                    <span className="text-sm" onClick={() => handleClick(item._id, item.likeCount)}>Beğen</span>
                  </button>
                  <span className="text-sm text-gray-500" >{item.likeCount} Beğeni</span>
                  <span>    <button
                    onClick={handleCommentClick}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    Yorum Yap
                  </button></span>
                </div>
              </>

            )
          })}
          {/* Comment Section */}
          <div className="mt-4">


            {/* Comment Input and Button */}
            {isCommentVisible && (
              <div className="mt-4 flex items-center space-x-2 relative">
                <textarea className="w-full p-2 border border-gray-300 rounded-lg text-sm " placeholder="Yorumunuzu yazın..."></textarea>

                <button className="absolute top-2 right-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none">
                  Gönder
                </button>
              </div>
            )}
          </div>


        </div>

      </div>

    </div>
  )
}

export default Section
