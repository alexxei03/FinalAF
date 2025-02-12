import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import "./css/Notification.css";

const Notification = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="notification-container" ref={notifRef}>
      <button className="notification-btn" onClick={() => setIsOpen(!isOpen)}>
        <Bell />
        {notifications.length > 0 && <span className="notification-badge" />}
      </button>
      {isOpen && (
        <div className="notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                {notification.text}
              </div>
            ))
          ) : (
            <div className="notification-empty">Нет новых уведомлений</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;