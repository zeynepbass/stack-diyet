import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const basePath = process.env.REACT_APP_BASE_PATH;
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const boxRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`${basePath}/api/notifications`)
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Bildirimler alınamadı:", err));
  }, []);

  const filteredNotifications = notifications.filter(
    (notif) => notif.receiver === user?.result?.firstName
  );

  return (
    <div className="relative inline-block text-left" ref={boxRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <Bell className="w-6 h-6 text-green-700" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 z-50">
          <div className="p-4 text-sm text-gray-800">

          <p className="font-cursive text-2xl text-green-800" style={{ fontFamily: "'Dancing Script', cursive" }}>
  Bildirimler
</p>

            <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif, i) => (
                  <li key={i} className="border-b pb-2 text-sm text-gray-800">
                    💬 {notif.message}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">Henüz sana ait bildirim yok.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
