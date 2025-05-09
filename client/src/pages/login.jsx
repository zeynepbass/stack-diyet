import React, { useState } from 'react';
import { Link } from "react-router-dom";
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

    try {
      if (!formData.email || !formData.password) {
        setErrorMessage('Lütfen tüm alanları doldurun.');
        return;
      }

      await fetchLogin(formData);
    } catch (error) {
      console.log(error)
    }





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
        <h2 className="text-2xl font-semibold text-center text-green-800">       Giriş Yap</h2>


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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email girin"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parola
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Parola girin"
              required
            />
          </div>


          <p className="text-sm text-gray-600 text-right underline">

            <Link to="/sifremi-unuttum" className="text-green-600 hover:text-green-500">
              şifremi unuttum
            </Link>
          </p>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Giriş Yap
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Hesabınız yok mu?{' '}
            <Link to="/kayit-ol" className="text-green-600 hover:text-green-500">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
