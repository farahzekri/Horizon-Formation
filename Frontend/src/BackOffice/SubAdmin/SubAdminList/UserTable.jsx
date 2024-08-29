import React, { useEffect, useState } from "react";
import {
  get_All_Users,
  Update_Status,
  Check_Role,
} from "../../../services/UserService";
import { useNavigate } from "react-router-dom";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import {
  MdCheckCircle,
  MdCancel,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasPermission, setHasPermission] = useState(false);
  const usersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await get_All_Users();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const columnsData = [
    {
      Header: "Nom utilisateur",
      accessor: "username",
    },
    {
      Header: "Nom",
      accessor: "lastName",
    },
    {
      Header: "Prenom",
      accessor: "firstName",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === "actif" ? (
            <MdCheckCircle className="text-green-500" />
          ) : (
            <MdCancel className="text-red-500" />
          )}
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {row.original.status}
          </p>
        </div>
      ),
    },
    {
      Header: "Numéro",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Actions",
      accessor: "Actions",
      Cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === "actif" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer text-red-500 transition-transform hover:scale-110 hover:text-red-600"
              title="Désactiver"
              onClick={() => handleActionClick(row.original)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer text-green-500 transition-transform hover:scale-110 hover:text-green-600"
              title="Activer"
              onClick={() => handleActionClick(row.original)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
          <button
            className="flex cursor-pointer items-center gap-2 transition-transform hover:scale-110 hover:text-brand-300"
            title="Détails"
            onClick={() => handleUpdateClick(row.original.username)}
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
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const handleUpdateClick = (username) => {
    navigate(`/admin/Utilisateurs/VoirProfil/${username}`);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleActionClick = (user) => {
    setSelectedUser(user);
    setActionType(user.status === "actif" ? "deactivate" : "activate");
    setShowConfirmationModal(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedUser || !selectedUser._id) {
      console.error("Selected user or user ID is invalid.");
      return;
    }

    const newStatus = actionType === "deactivate" ? "inactif" : "actif";

    try {
      // Update user status via API call
      await Update_Status(selectedUser._id, newStatus);

      // Update UI state without fetching data again
      const updatedUsers = users.map((u) =>
        u._id === selectedUser._id ? { ...u, status: newStatus } : u
      );
      setUsers(updatedUsers);

      // Clear selection and close modal
      setSelectedUser(null);
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const closeModal = () => {
    setShowConfirmationModal(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    [user.lastName, user.firstName, user.username, user.email, user.phone]
      .filter((field) => field)
      .map((field) => field.toLowerCase())
      .some((field) => field.includes(searchTerm.toLowerCase()))
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const response = await Check_Role();
        setHasPermission(response);
      } catch (error) {
        console.error("Error checking permissions:", error);
      }
    };

    checkPermissions();
  }, []);
  return (
    <div className="mt-8">
      {hasPermission ? (
        <button
          onClick={() => navigate("/admin/Utilisateurs/CreateSubAdmin")}
          className="mt-4 mb-2 flex items-center justify-center rounded-full bg-green-500 p-3 text-white hover:cursor-pointer"
        >
          Ajouter un utilisateur
        </button>
      ) : (
        <p></p>
      )}
      <form className="mx-auto mb-2 max-w-full">
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Recherche
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
            className="block w-full rounded-xl border bg-white p-4 text-sm text-gray-900 ps-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-navy-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Recherche..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </form>

      <Card extra={"w-full h-full sm:overflow-auto p-4"}>
        <div className="mt-3 flex items-center justify-between">
          <CardMenu />
        </div>
        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table className="w-full">
            <thead>
              <tr>
                {columnsData.map((column) => (
                  <th
                    key={column.Header}
                    scope="col"
                    className="border-b border-gray-200 pr-6 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                      {column.Header}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  {columnsData.map((column) => (
                    <td
                      key={column.Header}
                      className="pt-[14px] pb-[18px] sm:text-sm"
                    >
                      {column.Cell ? (
                        column.Cell({ row: { original: user } })
                      ) : (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {user[column.accessor]}
                        </p>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`rounded-lg px-4 py-2 ${
            currentPage === 1
              ? "cursor-not-allowed bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
        >
          <MdChevronLeft size={24} />
        </button>
        <span className="text-lg font-bold text-gray-700 dark:text-white">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`rounded-lg px-4 py-2 ${
            currentPage === totalPages
              ? "cursor-not-allowed bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
        >
          <MdChevronRight size={24} />
        </button>
      </div>

      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <p className="mb-4">
              {`Êtes-vous sûr de vouloir ${
                actionType === "deactivate" ? "désactiver" : "activer"
              } cet utilisateur ?`}
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-2 rounded-lg bg-gray-300 px-4 py-2"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmAction}
                className={`rounded-lg px-4 py-2 ${
                  actionType === "deactivate"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
