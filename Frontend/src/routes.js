import React from "react";
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdTableChart,
  MdSchool,
  MdClass,
  MdBook,
} from "react-icons/md";

import MainDashboard from "BackOffice/admin/default";
import NFTMarketplace from "BackOffice/admin/marketplace";
import Profile from "BackOffice/admin/profile";
import DataTables from "BackOffice/admin/tables";
import UserTable from "./BackOffice/SubAdmin/SubAdminList/UserTable";
import SubAdmin_Profil from "../src/BackOffice/SubAdmin/Profile_SubAdmin/subAdmin_Profile";
import SignIn from "FrontOffice/auth/SignIn";
import CreateSubAdmin from "BackOffice/SubAdmin/create_SubAdmin/createSubAsmin";
import AjouterSub from "./BackOffice/SubAdmin/create_SubAdmin/ajouterSubAdmin";
import StudentList from "./BackOffice/student/StudentList";
import AddStudent from "./BackOffice/student/AddStudent/AddStudent";
import ClassesList from "BackOffice/classes/ClassesList";
import AjouterClass from "BackOffice/classes/AjouterClass";
import CourseList from "./BackOffice/course/CourseList";
import SalleList from "BackOffice/salle/SalleListe";
import FormationList from "./BackOffice/formation/FormationList";
import VieWProfilSubAdmin from "BackOffice/SubAdmin/SubAdminList/ViewSubAdmin";
import ViewStudent from "./BackOffice/student/ViewStudent/ViewStudent";
import Schedule from "BackOffice/classes/emploi";
import DetailClasses from "BackOffice/classes/detailclass";
import TeacherList from "./BackOffice/Teacher/TeacherList";
import AddTeacher from "./BackOffice/Teacher/AddTeacher/AddTeacher";
import ViewTeacher from "./BackOffice/Teacher/ViewTeacher/ViewTeacher";

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
    path: "Etudiants",
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
    name: "Consulter Etudiant",
    layout: "/admin",
    path: "Etudiants/:studentId",
    component: <ViewStudent />,
  },
  {
    name: "Formateurs",
    layout: "/admin",
    path: "Formateurs",
    icon: <MdPerson className="h-6 w-6" />,
    component: <TeacherList />,
  },
  {
    name: "Ajouter Formateur",
    layout: "/admin",
    path: "Formateurs/Ajouter",
    component: <AddTeacher />,
  },
  {
    name: "Consulter Formateur",
    layout: "/admin",
    path: "Formateurs/:teacherId",
    component: <ViewTeacher />,
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
    name: "View Profile Sub Admin",
    layout: "/admin",
    path: "Utilisateurs/VoirProfil/:username",
    component: <VieWProfilSubAdmin />,
  },
  {
    name: "Matieres",
    layout: "/admin",
    path: "Matieres",
    icon: <MdBook className="h-6 w-6" />,
    component: <CourseList />,
  },
  {
    name: "Salle",
    layout: "/admin",
    path: "Salle",
    icon: <MdBook className="h-6 w-6" />,
    component: <SalleList />,
  },
  {
    name: "Classes",
    layout: "/admin",
    path: "Classes",
    icon: <MdClass className="h-6 w-6" />,
    component: <ClassesList />,
  },
  {
    name: "Ajouter Classes",
    layout: "/admin",
    path: "Classes/Ajouter",
    component: <AjouterClass />,
  },
  {
    name: "Detail Classes",
    layout: "/admin",
    path: "Classes/Detail/:id",
    component: <DetailClasses />,
  },
  {
    name: "Emploi Classes",
    layout: "/admin",
    path: "Classes/Emploi/:id",
    component: <Schedule />,
  },
  {
    name: "Formations",
    layout: "/admin",
    path: "Formations",
    icon: <MdSchool className="h-6 w-6" />,
    component: <FormationList />,
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
    path: "Profil",
    icon: <MdPerson className="h-6 w-6" />,
    component: <SubAdmin_Profil />,
  },
];

export default routes;
