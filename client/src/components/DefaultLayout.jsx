import { set } from "mongoose";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DefaultLayout({ children }) {



    const [collapsed, setcollapsed] = useState(false);
    const { user } = useSelector(state => state.users);
    // const navigate = useNavigate();
    // const userMenu = [
    //     {
    //         title: "Home",
    //         icon: <i class="ri- home - 3 - line"> </i>,
    //         onclick: () => navigate("/"),
    //         path: "/"
    //     },

    //     {
    //         title: "Transactions",
    //         icon: <i class="ri-bank-line"></i>,
    //         onclick: () => navigate("/transactions"),
    //         path: "/transactions"
    //     },
    //     {
    //         title: "requests",
    //         icon: <i class="ri-hand-heart-line"></i>,
    //         onclick: () => navigate("/requests"),
    //         path: "/requests"
    //     },
    //     {
    //         title: "profile",
    //         icon: <i class="ri-user-3-line"></i>,
    //         onclick: () => navigate("/profile"),
    //         path: "/profile"
    //     },
    //     {
    //         title: "Logout",
    //         icon: <i class="ri-logout-box-line"></i>,
    //         onclick: () => {
    //             localStorage.removeItem("token");
    //             navigate("/login");
    //         },
    //         path: "/Logout"
    //     },
    // ]

    // const adminMenu = [
    //     {
    //         title: "Home",
    //         icon: <i class="ri- home - 3 - line"> </i>,
    //         onclick: () => navigate("/"),
    //         path: "/"
    //     },
    //     {
    //         title: "users",
    //         icon: <i class="ri-user-community-line"></i>,
    //         onclick: () => navigate("/users"),
    //         path: "/users"
    //     },

    //     {
    //         title: "Transactions",
    //         icon: <i class="ri-bank-line"></i>,
    //         onclick: () => navigate("/transactions"),
    //         path: "/transactions"
    //     },
    //     {
    //         title: "requests",
    //         icon: <i class="ri-hand-heart-line"></i>,
    //         onclick: () => navigate("/requests"),
    //         path: "/requests"
    //     },
    //     {
    //         title: "profile",
    //         icon: <i class="ri-user-3-line"></i>,
    //         onclick: () => navigate("/profile"),
    //         path: "/profile"
    //     },
    //     {
    //         title: "Logout",
    //         icon: <i class="ri-logout-box-line"></i>,
    //         onclick: () => {
    //             localStorage.removeItem("token");
    //             navigate("/login");
    //         },
    //         path: "/Logout"
    //     },
    // ]
    return (

        <div className="layout">
            <div className="sidebar">
                sidebar
                {/* <div className="menu"></div> */}
            </div>

            <div className="body">
                <div className="header flex justify-between items-center">
                    <div className="text-white">
                 
                        {collapsed && <i class="ri-close-line"
                            onClick={() => setcollapsed(!collapsed)}
                        ></i>}
                        {!collapsed && <i class="ri-menu-2-line"
                            onClick={() => setcollapsed(collapsed)}
                        ></i>}
                    </div>


                    <div>
                        <h1 className="text-xl text-white">
                            BANGLADESH KRISHI BANK
                        </h1>
                    </div>

                    <div>
                        <h1 className="text-sm underline text-white">
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