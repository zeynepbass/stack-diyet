import React, { useState, useEffect } from 'react';
import useStore from "../useStore";
import { Navigate } from 'react-router-dom';
const Index = () => {
  const { fetchComment } = useStore();

  
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    baslik: "",
    acikla: ""
  });


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (user) {
      const dataToSend = {
        acikla: formData.acikla,
        baslik: formData.baslik,
      };
      await fetchComment(dataToSend);
      setFormData({ acikla: "", baslik: "" });
    } else {
      Navigate("/ana-sayfa");
    }
  };

  return (
    <form className="w-full flex space-x-4 h-10" onSubmit={handleSubmit}>
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

        <textarea
          name="acikla"
          value={formData.acikla}
          onChange={handleChange}
          className="h-50 block w-full p-1 mt-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Açıklama yaz..."
          required
        ></textarea>

        <button
          type="submit"
          className="float-right mt-1 w-auto p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-100 focus:ring-2 focus:ring-blue-300"
        >
          Gönder
        </button>
      </div>
    </form>
  );
};

export default Index;
