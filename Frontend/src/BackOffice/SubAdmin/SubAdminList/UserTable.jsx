import React, { useEffect, useState } from "react";
import { get_All_Users, Update_Status } from "../../../services/UserService";
import { ViewIcon } from "@chakra-ui/icons";
import CheckTable from "../../admin/tables/components/CheckTable";
import ComplexTable from "../../admin/tables/components/ComplexTable";
import {useNavigate} from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_All_Users();
        console.log("Fetched users:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  const columnsData = [
    {
      Header: 'Nom',
      accessor:'username',
    },
    {
      Header: 'Numéro',
      accessor: 'phone',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Status',
      accessor: 'status', // Assuming the first formation is displayed
    },

  ];
  const handleClick = () => {
    navigate("/admin/Utilisateurs/CreateSubAdmin");
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusStyle = (status) => {
    return status === "active" ? "bg-green-500" : "bg-red-500";
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeactivateClick = (user) => {
    if (user.status === "inactive") {
      console.log("User is already inactive");
      return;
    }
    setSelectedUser(user);
    setShowConfirmationModal(true);
  };

  const handleDeactivateConfirm = async () => {
    if (!selectedUser || !selectedUser._id) {
      console.error("Selected user or user ID is invalid.");
      return;
    }

    console.log("Selected user:", selectedUser);

    try {
      await Update_Status(selectedUser._id, "inactive");

      const updatedUsers = users.map((u) =>
        u._id === selectedUser._id ? { ...u, status: "inactive" } : u
      );
      setUsers(updatedUsers);

      setSelectedUser(null); // Réinitialiser l'utilisateur sélectionné
      setShowConfirmationModal(false); // Fermer le modal après la mise à jour
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleActivateClick = (user) => {
    if (user.status === "active") {
      console.log("User is already active");
      return;
    }
    setSelectedUser(user);
    setShowConfirmationModal(true);
  };

  const handleActivateConfirm = async () => {
    if (!selectedUser || !selectedUser._id) {
      console.error("Selected user or user ID is invalid.");
      return;
    }

    console.log("Selected user:", selectedUser);

    try {
      await Update_Status(selectedUser._id, "active");

      const updatedUsers = users.map((u) =>
        u._id === selectedUser._id ? { ...u, status: "active" } : u
      );
      setUsers(updatedUsers);

      setSelectedUser(null); // Réinitialiser l'utilisateur sélectionné
      setShowConfirmationModal(false); // Fermer le modal après la mise à jour
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const closeModal = () => {
    setShowConfirmationModal(false);
    setSelectedUser(null); // Réinitialiser l'utilisateur sélectionné si le modal est fermé
  };

  if (users.length === 0) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  const filteredUsers = users.filter((user) =>
    [user.lastName, user.firstName, user.username, user.email, user.phone]
      .filter((field) => field)
      .map((field) => field.toLowerCase())
      .some((field) => field.includes(searchTerm.toLowerCase()))
  );

  return (
      <div className="mt-8">
        <form className="mx-auto max-w-full">
          <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 flex items-center ps-3 start-0">
              <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
              >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
                type="search"
                id="default-search"
                className="block w-full rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-900 ps-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Recherche ..."
                value={searchTerm}
                onChange={handleSearch}
                required
            />
          </div>
        </form>

        <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-700 rtl:text-right dark:text-gray-400">
            <caption
                className="bg-white p-5 text-left font-semibold text-gray-900 rtl:text-right dark:bg-gray-800 dark:text-white sm:text-sm md:text-2xl">
              Les Utilisateurs
            </caption>
            <button onClick={handleClick}
                className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-green-500 p-1 text-[10px] text-white hover:cursor-pointer sm:p-2 sm:text-xs md:p-3 md:text-[15px]">
              Ajouter un utilisateur
            </button>
            <thead className="bg-gray-50 text-xs uppercase text-gray-800 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Nom
              </th>
              <th scope="col" className="px-4 py-3">
                Prenom
              </th>
              <th scope="col" className="px-4 py-3">
                Nom d'utilsateur
              </th>
              <th scope="col" className="px-4 py-3">
                Statut
              </th>
              <th scope="col" className="px-4 py-3">
                Date de Creation
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Telephone
              </th>
              <th scope="col" className="px-4 py-3">
                Voir profil
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
            </thead>
            <tbody>
            {filteredUsers.map((user, index) => (
                <tr
                    key={index}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-4 py-4">{user.lastName}</td>
                  <td className="px-4 py-4">{user.firstName}</td>
                  <td className="px-4 py-4">{user.username}</td>
                  <td className="px-4 py-4 text-center">
                  <span
                      className={`inline-block h-3 w-3 rounded-full ${getStatusStyle(
                          user.status
                      )}`}
                  ></span>
                    <span className="ml-2">
                    {user.status === "active" ? "Active" : "Inactive"}
                  </span>
                  </td>
                  <td className="px-4 py-4">{formatDate(user.dateCreated)}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4">{user.phone}</td>
                  <td className="flex justify-center px-6 py-4">
                    <button className="group relative">
                      <ViewIcon style={{width: 20, height: 20}}/>
                    </button>
                  </td>
                  <td className="group relative px-4 py-4 text-center">
                    <button
                        disabled={user.status === "inactive"}
                        onClick={() => handleDeactivateClick(user)}
                        className={`${
                            user.status === "inactive"
                                ? "cursor-not-allowed text-gray-400"
                                : "text-red-500"
                        } flex h-8 w-8 items-center justify-center rounded-full text-white`}
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                      >
                        <path
                            fillRule="evenodd"
                            d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z"
                            clipRule="evenodd"
                        />
                      </svg>
                      <span
                          className="absolute left-1/2 z-50 hidden -translate-x-1/2 -translate-y-12 transform rounded bg-gray-800 p-1 text-xs text-white group-hover:block">
                      Desactiver
                    </span>
                    </button>
                  </td>
                  <td className="group relative px-4 py-4 text-center">
                    <button
                        disabled={user.status === "active"}
                        onClick={() => handleActivateClick(user)}
                        className={`${
                            user.status === "active"
                                ? "cursor-not-allowed text-gray-400"
                                : "text-green-500"
                        } flex h-8 w-8 items-center justify-center rounded-full text-white`}
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-5 w-5"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span
                          className="absolute left-1/2 hidden -translate-x-1/2 -translate-y-12 transform rounded bg-gray-800 p-1 text-xs text-white group-hover:block">
                      Activer
                    </span>
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        {/* Deactivate / Activate Modal */}
        {selectedUser && (
            <div
                className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
              <div className="w-full max-w-md overflow-hidden rounded-lg bg-white">
                <div className="p-8">
                  <p className="mb-4 text-lg font-semibold">
                    {selectedUser.status === "active"
                        ? `Are you sure you want to deactivate the account of ${selectedUser.firstName} ${selectedUser.lastName} ?`
                        : `Are you sure you want to activate the account of ${selectedUser.firstName} ${selectedUser.lastName} ?`}
                  </p>
                  <div className="flex justify-end">
                    <button
                        className="mr-2 rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                        onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                        className={`px-4 py-2 ${
                            selectedUser.status === "active"
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                        onClick={
                          selectedUser.status === "active"
                              ? handleDeactivateConfirm
                              : handleActivateConfirm
                        }
                    >
                      {selectedUser.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
        <div>
          <ComplexTable tableName="Tableau users" columnsData={columnsData} tableData={users}/>
        </div>
      </div>

  );

};

export default UserTable;
