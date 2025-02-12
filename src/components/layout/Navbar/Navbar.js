import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import Sidebar from "./Sidebar";
import SearchBar from "./Search";
import Notification from "./Notification";
import "./css/Navbar.css";

const Navbar = ({ children }) => {
  const savedState = localStorage.getItem("sidebarState");
  const [isSidebarOpen, setIsSidebarOpen] = useState(savedState === "open");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([
      { id: 1, text: "Новое сообщение от преподавателя" },
      { id: 2, text: "Ваш курс обновлен" },
    ]);
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebarState", newState ? "open" : "closed");
  };

  return (
    <div className={`layout ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">
        <nav className="navbar">
          <button className="nav-btn" onClick={toggleSidebar}>
            <Menu />
          </button>
          <SearchBar />
          <div className="nav-icons">
            <Notification notifications={notifications} />
            <Link to="/profile" className="nav-btn">
              <User />
            </Link>
          </div>
        </nav>
        {/* Контент страницы будет отображаться здесь */}
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Navbar;
