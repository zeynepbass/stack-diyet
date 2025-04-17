import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const boxRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("/api/notifications")
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
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <Bell className="w-6 h-6 text-gray-700" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 z-50">
          <div className="p-4 text-sm text-gray-800">
            <p className="font-semibold">Bildirimler</p>
            <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif, i) => (
                  <li key={i} className="border-b pb-2">
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
