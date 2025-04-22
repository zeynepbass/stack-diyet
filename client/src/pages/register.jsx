import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import useStore from "../components/useStore";

const LoginForm = () => {
  const { fetchRegister } = useStore();
  const Navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "" 
  });

  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.confirmPassword) {
      setErrorMessage('Lütfen tüm alanları doldurun.');
      return; 
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Şifreler uyusmuyor.');
      return; 
    }


await fetchRegister(formData);  



    
      setErrorMessage("Başarılı yönlendiriliyorsunuz :)");
      setTimeout(() => {
        Navigate("/giris-yap");
      }, 1000); 
    
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
        <h2 className="text-2xl font-semibold text-center text-green-800">Kayıt Ol</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm text-center mt-2">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        
          <div>
            <label className="block text-sm font-medium text-gray-700">
              İsim
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="İsim girin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Soyisim
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Soyisim girin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>


          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Parola
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Parolanızı girin"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Parola Tekrar
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Parolanızı tekrar girin"
              required
            />
          </div>

        
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Kayıt Ol
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Hesabınız var mı?{' '}
            <Link to="/giris-yap" className="text-green-600 hover:text-green-500">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
