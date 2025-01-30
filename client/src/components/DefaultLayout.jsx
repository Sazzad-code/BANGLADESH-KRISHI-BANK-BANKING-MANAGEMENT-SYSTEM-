import { set } from "mongoose";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bank, HandCoins, HandHeart, House, List, SignOut, User, X } from "@phosphor-icons/react";

function DefaultLayout({ children }) {



    const [collapsed, setcollapsed] = useState(false);
    const { user } = useSelector(state => state.users);
    const navigate = useNavigate();
    const userMenu = [
        {
            title: "Home",
            icon: <House size={32} />,
            onclick: () => navigate("/"),
            path: "/"
        },

        {
            title: "Transactions",
            icon: <Bank size={32} />,
            onclick: () => navigate("/transactions"),
            path: "/transactions"
        },
        {
            title: "Loan",
            icon:<HandCoins size={32} />,
            onclick: () => navigate("/loan"),
            path: "/loan"
        },
        {
            title: "profile",
            icon: <User size={32} />,
            onclick: () => navigate("/profile"),
            path: "/profile"
        },
        {
            title: "Logout",
            icon: <SignOut size={32} />,
            onclick: () => {
                localStorage.removeItem("token");
                navigate("/login");
            },
            path: "/Logout"
        },
    ]

    const adminMenu = [
        {
            title: "Home",
            icon: <i class="ri- home - 3 - line"> </i>,
            onclick: () => navigate("/"),
            path: "/"
        },
        {
            title: "users",
            icon: <i class="ri-user-community-line"></i>,
            onclick: () => navigate("/users"),
            path: "/users"
        },

        {
            title: "Transactions",
            icon: <i class="ri-bank-line"></i>,
            onclick: () => navigate("/transactions"),
            path: "/transactions"
        },
        {
            title: "Loan",
            icon: <i class="ri-hand-heart-line"></i>,
            onclick: () => navigate("/loan"),
            path: "/loan"
        },
        {
            title: "profile",
            icon: <i class="ri-user-3-line"></i>,
            onclick: () => navigate("/profile"),
            path: "/profile"
        },
        {
            title: "Logout",
            icon: <i class="ri-logout-box-line"></i>,
            onclick: () => {
                localStorage.removeItem("token");
                navigate("/login");
            },
            path: "/Logout"
        },
    ]

    const menuToRender = user?.isAdmin ? adminMenu : userMenu;
    return (

        <div className="layout">
            <div className="sidebar">

                <div className="menu">
                    {
                        menuToRender.map((item) => {
                            const isActive = window.location.pathname === item.path;
                            return <div className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                                onClick={item.onclick}
                            >
                                {item.icon}
                                {!collapsed && <h1 className="text-sm">{item.title}</h1>}
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="body">
                <div className="header flex justify-between items-center">
                    <div className="text-white">

                        {!collapsed && <X size={32} onClick={() => setcollapsed(!collapsed)} />}

                        {collapsed && <List size={32} onClick={() => setcollapsed(!collapsed)} />}

                    </div>


                    <div>
                        <h1 className="text-xl text-secondary">
                            BANGLADESH KRISHI BANK
                        </h1>
                    </div>

                    <div>
                        <h1 className="text-sm underline text-secondary">
                            {user?.firstName} {user?.lastName}
                        </h1>


                    </div>
                </div>

                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout  