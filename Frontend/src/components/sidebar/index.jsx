/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";


import routes from "routes.js";
import {MdBarChart, MdHome, MdLock, MdOutlineShoppingCart, MdPerson} from "react-icons/md";
import AjouterSub from "../../BackOffice/SubAdmin/create_SubAdmin/ajouterSubAdmin";
import React from "react";

const Sidebar = ({ open, onClose }) => {
  const sidebarRoutes = [
    {
      name: "Main Dashboard",
      layout: "/admin",
      path: "default",
      icon: <MdHome className="h-6 w-6" />,
    },
    {
      name: "NFT Marketplace",
      layout: "/admin",
      path: "nft-marketplace",
      icon: <MdOutlineShoppingCart className="h-6 w-6" />,
      secondary: true,
    },
    {
      name: "Data Tables",
      layout: "/admin",
      icon: <MdBarChart className="h-6 w-6" />,
      path: "data-tables",
    },
    {
      name: "Profile",
      layout: "/admin",
      path: "profile",
      icon: <MdPerson className="h-6 w-6" />,
    },
    {
      name: "Sub Admins",
      layout: "/admin",
      path: "AjouterSub/*",
      icon: <MdPerson className="h-6 w-6" />,

    },
    {
      name: "Sign In",
      layout: "/auth",
      path: "sign-in",
      icon: <MdLock className="h-6 w-6" />,
    },
  ];
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Horizon <span class="font-medium">FREE</span>
        </div>
      </div>
      <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={sidebarRoutes} />
      </ul>

      {/* Free Horizon Card */}


      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
