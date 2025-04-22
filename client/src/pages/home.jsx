import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons"; 

const Hakkında = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const formRef = useRef();
  const fullyear = new Date().getFullYear();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("Mesajınız başarıyla gönderildi!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="font-sans">

      <header className="fixed w-full bg-green-50 shadow-lg z-10 backgorund-i">
        <nav className="flex justify-between items-center py-4 px-8">
          <div className="flex items-center text-green-800">
            <FontAwesomeIcon icon={faApple} size="2x" className="mr-2" />
            <span className="text-2xl font-semibold" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Sağlıklı Yaşam
            </span>
          </div>
          <ul className="flex space-x-8">
            <li><a href="#biz-kimiz" className="text-green-800 text-lg hover:text-green-700" style={{ fontFamily: "'Dancing Script', cursive" }}>Biz Kimiz?</a></li>
            <li><a href="#toplulugumuz" className="text-green-800 text-lg hover:text-green-700" style={{ fontFamily: "'Dancing Script', cursive" }}>Topluluğumuz</a></li>
            <li><a href="#iletisim" className="text-green-800 text-lg hover:text-green-700" style={{ fontFamily: "'Dancing Script', cursive" }}>İletişim</a></li>
            <li><a href={user ? "/ana-sayfa" : "/giris-yap"} className="text-green-800 text-lg hover:text-green-700" style={{ fontFamily: "'Dancing Script', cursive" }}>Giriş Yap</a></li>
          </ul>
        </nav>
      </header>


      <section
  className="relative bg-cover bg-center h-[500px] bg-blur-sm"
  style={{
    backgroundImage: "url('/images/concept-healthy-food-sports-lifestyle-vegetarian-lunch-healthy-breakfast-proper-nutrition-top-view-flat-lay.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: '80% 20%',
  }}
>
  <div className="absolute inset-0 bg-black opacity-40"></div>
  <div className="absolute flex flex-col justify-center items-center text-white text-center px-6 md:px-12 h-full">
    <h1
      className="text-4xl md:text-6xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s"
      style={{ fontFamily: "'Dancing Script', cursive" }}
    >
      Sağlıklı Yaşam İçin Sende Öneri Al
    </h1>
    <p className="text-lg md:text-2xl font-light animate__animated animate__fadeIn animate__delay-2s">
      Topluluğumuza katılarak sağlıklı yaşama adım atın!
    </p>
  </div>
</section>



      <section id="biz-kimiz" className="py-16 bg-white text-center px-4">
        <h2 className="text-4xl font-bold text-green-800 mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>Biz Kimiz?</h2>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          Sağlıklı yaşam yolculuğunuzda sizinle birlikte yürüyen bir topluluğuz. Bilgi paylaşır, birbirimize destek olur ve birlikte güçleniriz.
        </p>
        <button
          onClick={() => {
            user ? navigate("/ana-sayfa") : navigate("/giris-yap");
          }}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full mx-auto transition duration-300 text-sm"
        >
          🚀 Soru Sor
        </button>
      </section>


      <section className="bg-green-50 py-16">
  <div className="flex justify-around items-center text-center max-w-4xl mx-auto">
    {[
      { label: "Toplam Üye", value: "1.200+" },
      { label: "Paylaşılan Tarif", value: "340+" },
      { label: "Günlük Ziyaretçi", value: "500+" }
    ].map((item, idx) => (
      <div key={idx}>
        <h3 className="text-3xl font-bold text-green-700">{item.value}</h3>
        <p className="text-sm text-gray-600">{item.label}</p>
      </div>
    ))}
  </div>
</section>

      <section className="py-16 bg-white text-center">
  <h2 className="text-3xl font-bold text-green-800 mb-8" style={{ fontFamily: "'Dancing Script', cursive" }}>Kullanıcı Yorumları</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
    {[
      { name: "Ayşe K.", comment: "Bu topluluk sayesinde sağlıklı beslenmeye başladım. Gerçekten çok yardımcı!" },
      { name: "Mehmet T.", comment: "Tarif önerileri ve tavsiyeler çok faydalı, herkese öneririm!" },
      { name: "Zeynep B.", comment: "Harika bir topluluk, sürekli destek var. Teşekkür ederim!" }
    ].map((item, idx) => (
      <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow">
        <p className="italic text-gray-700">"{item.comment}"</p>
        <p className="mt-2 text-green-800 font-semibold">- {item.name}</p>
      </div>
    ))}
  </div>
</section>

      <section id="toplulugumuz" className="py-16 bg-green-50 text-center">
  <h2 className="text-4xl font-bold text-green-800 mb-12" style={{ fontFamily: "'Dancing Script', cursive" }}>
    Topluluğumuz
  </h2>
  <div className="flex flex-col items-center space-y-10 px-4 md:px-10">
    {[
      {
        title: "Kişiye Özel Gönderiler",
        desc: "Bireysel ihtiyaçlara göre kullanıcılara öneriler sunuyoruz."
      },
      {
        title: "Sürekli Destek ve Takip",
        desc: "Birlikte takip ediyor, birlikte başarıyoruz."
      },
      {
        title: "Online Erişim",
        desc: "Her zaman, her yerden erişilebilir destek."
      }
    ].map((item, idx) => (
      <div
        key={idx}
        className={`w-full md:max-w-xl flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
      >
        <div
          className={`bg-white p-6 rounded-2xl shadow-lg relative max-w-md text-left border-l-4
          ${idx % 2 === 0 ? 'border-green-400' : 'border-yellow-400'}`}
        >
          <div className="text-xl font-semibold text-green-700">{item.title}</div>
          <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>
<section className="py-16 bg-white px-4">
  <h2 className="text-3xl font-bold text-green-800 mb-12 text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>
    Sıkça Sorulan Sorular
  </h2>
  <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto space-y-10 md:space-y-0 s">
    

    <div className="w-full ">
      <img
        src="/images/10350996.png"
        alt="diyet"
        className="rounded-xl object-contain w-full"
        style={{height:"40vh"}}

      />
    </div>


    <div className="w-full md:w-1/2 space-y-6">
      <div className="">
        <h4 className="font-semibold text-green-700">Topluluğa katılmak ücretli mi?</h4>
        <p className="text-gray-600 text-sm">Hayır, tamamen ücretsizdir.</p>
      </div>
      <div>
        <h4 className="font-semibold text-green-700">Soru sormak için üye olmam gerekiyor mu?</h4>
        <p className="text-gray-600 text-sm">Evet, topluluğumuza katılarak soru sorabilirsiniz.</p>
      </div>
      <div>
        <h4 className="font-semibold text-green-700">Uzman desteği sağlıyor musunuz?</h4>
        <p className="text-gray-600 text-sm">Evet, alanında uzman gönüllü üyelerimiz size yardımcı olabilir.</p>
      </div>
      <div>
        <h4 className="font-semibold text-green-700">Görselleri ve içerikleri paylaşabilir miyim?</h4>
        <p className="text-gray-600 text-sm">Kaynak belirttiğiniz sürece içerikleri paylaşmanızda sakınca yoktur.</p>
      </div>
    </div>

  </div>
</section>


      <section id="iletisim" className="bg-white py-20">
        <div className="w-full max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6" style={{ fontFamily: "'Dancing Script', cursive" }}>Bize Ulaşın</h2>
          <p className="text-gray-600 mb-4">Formu doldurun, en kısa sürede sizinle iletişime geçelim.</p>
          {status && <p className="text-green-600 mb-4 font-medium">{status}</p>}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              type="text"
              className="border border-gray-300 focus:ring-2 focus:ring-green-500 p-3 rounded-lg w-full"
              placeholder="Adınız"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="border border-gray-300 focus:ring-2 focus:ring-green-500 p-3 rounded-lg w-full"
              placeholder="E-posta"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              className="border border-gray-300 focus:ring-2 focus:ring-green-500 p-3 rounded-lg w-full"
              placeholder="Mesajınız"
              name="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white py-2 px-6 rounded-full text-sm"
              >
                Gönder
              </button>
            </div>
          </form>
        </div>
      </section>


      <footer className="bg-white text-green-800 py-6 text-center text-sm">
        <p className="scroll-text flex justify-center">
          <span className="pt-2">© {fullyear} Sağlıklı Yaşam Topluluğu | Tüm Hakları Saklıdır. | Zeynep Baş tarafından keyifle kodlanmıştır.</span>
          <span><img src="/images/coffee-lover.gif" width="40" height="40" alt="coffee" /></span>
        </p>
      </footer>
    </div>
  );
};

export default Hakkında;
