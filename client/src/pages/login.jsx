import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useStore from "../components/useStore";

const LoginForm = () => {
  const { fetchLogin } = useStore();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kontroller
    if (!formData.email || !formData.password) {
      setErrorMessage('Lütfen tüm alanları doldurun.');
      return;
    }
  
 await fetchLogin(formData); 
   



    setErrorMessage('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-purple-800">       Giriş Yap</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm text-center mt-2">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
         
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email girin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parola
            </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="parola girin"
              required
            />
          </div>

        
          <p className="text-sm text-gray-600 text-right underline">

            <Link to="/sifremi-unuttum" className="text-purple-600 hover:text-purple-500">
              şifremi unuttum
            </Link>
          </p>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Giriş Yap
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Hesabınız yok mu?{' '}
            <Link to="/kayit-ol" className="text-purple-600 hover:text-purple-500">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
