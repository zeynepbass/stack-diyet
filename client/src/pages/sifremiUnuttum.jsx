import React, { useState } from 'react';
import useStore from "../components/useStore";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { fetchSifre } = useStore();
  const [formData, setFormData] = useState({password: "", newPassword: "" });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.password || !formData.newPassword) {
      setErrorMessage('Lütfen tüm alanları doldurun.');
      return;
    }

    if (formData.password !== formData.newPassword) {
      setErrorMessage('Şifreler uyuşmuyor.');
      return;
    }

    // Call the function to update the password
    fetchSifre(formData);

    setErrorMessage("Başarılı yönlendiriliyorsunuz :)");
    setTimeout(() => {
      navigate("/giris-yap");
    }, 2000);

    // Clear the error message after the timeout
    setErrorMessage('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-purple-800">Şifremi Unuttum</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm text-center mt-2">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">

          {/* New Password Input */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Yeni Parola
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Yeni parolanızı girin"
              required
            />
          </div>

          {/* Confirm New Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Yeni Parolayı Tekrar Girin
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Yeni parolayı tekrar girin"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
