import React from "react";

// Admin Imports
import MainDashboard from "BackOffice/admin/default";
import NFTMarketplace from "BackOffice/admin/marketplace";
import Profile from "BackOffice/admin/profile";
import DataTables from "BackOffice/admin/tables";
import UserTable from "./BackOffice/SubAdmin/SubAdminList/UserTable";
import SubAdmin_Profil from "../src/BackOffice/SubAdmin/Profile_SubAdmin/subAdmin_Profile";
import UpdateSubAdmin from "BackOffice/SubAdmin/create_SubAdmin/UpdateSubAdmin";

// Auth Imports
import SignIn from "FrontOffice/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdTableChart,
} from "react-icons/md";
import CreateSubAdmin from "BackOffice/SubAdmin/create_SubAdmin/createSubAsmin";
import AjouterSub from "./BackOffice/SubAdmin/create_SubAdmin/ajouterSubAdmin";
import StudentList from "./BackOffice/student/StudentList";
import AddStudent from "./BackOffice/student/AddStudent/AddStudent";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },

  {
    name: "Etudiants",
    layout: "/admin",
    path: "Etudiants/*",
    icon: <MdPerson className="h-6 w-6" />,
    component: <StudentList />,
  },
  {
    name: "Ajouter Etudiant",
    layout: "/admin",
    path: "Etudiants/Ajouter",
    component: <AddStudent />,
  },
  {
    name: "Utilisateurs",
    layout: "/admin",
    path: "Utilisateurs",
    icon: <MdTableChart className="h-6 w-6" />,
    component: <UserTable />,
  },
  {
    name: "Create Sub Admin",
    layout: "/admin",
    path: "Utilisateurs/CreateSubAdmin",
    component: <CreateSubAdmin />,
  },
  {
    name: "Update Sub Admin",
    layout: "/admin",
    path: "Utilisateurs/UpdateSubAdmin/:username",
    component: <UpdateSubAdmin />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },

  {
    name: "Profil",
    layout: "/admin",
    path: `Profil`,
    icon: <MdPerson className="h-6 w-6" />,
    component: <SubAdmin_Profil />,
  },


];
export default routes;
