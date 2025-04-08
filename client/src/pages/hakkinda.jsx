import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const Hakkında = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  
  const formRef = useRef(); // Form referansı
  const navigate = useNavigate();
  const fullyear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVIS, 
        process.env.REACT_APP_TEMPLATE, 
        formRef.current,  
        process.env.REACT_APP_USERID
      )
      .then(
        (result) => {
          setStatus("Mesajınız başarıyla gönderildi!");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          setStatus("Mesaj gönderilirken bir hata oluştu.");
        }
      );
  };

  return (
    <div>
      {/* Header Bölümü */}
      <header className="bg-purple-600 text-white p-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Sağlıklı Yaşam İçin Sende Öneri Al</h1>
          <p className="mt-4 text-xl">Sağlıklı bir yaşam için adım atın!</p>
        </div>
      </header>

      {/* Tanıtım Bölümü */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Biz Kimiz?</h2>
          <p className="mt-4 text-xl text-gray-600">
            Biz, sağlıklı yaşam ve diyet konusunda size yardımcı olabilecek kullanıcılar tarafından yönetilen bir platformuz.
            Burada, diyetle ilgili tüm soruları sorabilir, deneyimlerinizi paylaşabilir ve toplulukla etkileşime geçebilirsiniz.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Soru Sor
          </button>
        </div>
      </section>

      {/* Özellikler Bölümü */}
      <section id="features" className="py-16 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">TOPLULUĞUMUZ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Kişiye Özel Diyet Programları</h3>
              <p className="mt-4 text-gray-600">Bireysel ihtiyaçlara göre kişiselleştirilmiş diyet planları ile daha sağlıklı bir yaşam paylaşımları.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Sürekli Destek ve Takip</h3>
              <p className="mt-4 text-gray-600">Diyet süreciniz boyunca sürekli destek alabilir, ilerlemenizi takip edebilirsiniz.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Online Takip</h3>
              <p className="mt-4 text-gray-600">İnternetten kolayca ulaşabileceğiniz milyonlarca kişi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* İletişim Bölümü */}
      <br />
      <section id="contact" className="bg-white">
        <div className="container mx-auto w-1/2 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Bize Ulaşın</h2>
          <p className="mt-4 text-xl text-gray-600">
            Bizimle iletişime geçmek için aşağıdaki formu doldurun ve sağlıklı yaşam yolculuğunuza başlayın.
          </p>
          <br/>
          {status && (
            <p className="mt-4 text-xl text-gray-600">{status}</p>
          )}
          <br/>
          <form ref={formRef} onSubmit={handleSubmit} className="mt-8">
            <input
              type="text"
              className="border p-2 rounded-lg w-full max-sm-md mb-4"
              placeholder="Adınız"
              name="name"  // Form data içinde hangi verinin geldiğini belirtiyoruz
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="border p-2 rounded-lg w-full max-sm-md mb-4"
              placeholder="E-posta"
              name="email" // Aynı şekilde email alanını da belirtiyoruz
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className="border p-2 rounded-lg w-full max-sm-md mb-4"
              placeholder="Mesajınız"
              name="message"  // Mesaj alanı da name özelliği ile formda belirtilmeli
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition"
            >
              Gönder
            </button>
          </form>
        
        </div>
      </section>
      <br />

      {/* Footer */}
      <footer className="bg-purple-900 text-white p-4 text-center">
        <p>© {fullyear} Sağlıklı Yaşam Topluluğu | Tüm Hakları Saklıdır.</p>
      </footer>
    </div>
  );
};

export default Hakkında;
