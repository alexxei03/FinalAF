import React from "react";
import { Link } from "react-router-dom";
import { Book, CheckSquare, LogOut, CirclePlus, UserRoundPen, House } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import "./css/Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { logout } = useAuth();

    return (
        <>
            {/* Оверлей - при клике закрывает сайдбар (только на мобилках) */}
            {isOpen && <div className="sidebar-overlay active" onClick={toggleSidebar}></div>}

            <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    <Link to="/">
                        <img
                            src={isOpen ? "/img/logo/logo-white-style2.png" : "/img/logo/logo-white-style1.png"}
                            alt="Logo"
                            className="sidebar-logo"
                        />
                    </Link>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/home" className="sidebar-link">
                        <House />
                        {isOpen && <span>Главная</span>}
                    </Link>
                    <Link to="/course/create" className="sidebar-link">
                        <CirclePlus />
                        {isOpen && <span>Создать курс</span>}
                    </Link>
                    <Link to="/courses" className="sidebar-link">
                        <Book />
                        {isOpen && <span>Курсы</span>}
                    </Link>
                    <Link to="/certificates" className="sidebar-link">
                        <CheckSquare />
                        {isOpen && <span>Сертификаты</span>}
                    </Link>
                    <Link to="/profile" className="sidebar-link">
                        <UserRoundPen />
                        {isOpen && <span>Профиль</span>}
                    </Link>
                </nav>


                <button className="sidebar-logout" onClick={logout}>
                    <LogOut />
                    {isOpen && <span>Выйти</span>}
                </button>
            </aside>
        </>
    );
};

export default Sidebar;
