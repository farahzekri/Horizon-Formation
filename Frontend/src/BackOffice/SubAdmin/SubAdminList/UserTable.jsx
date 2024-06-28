import React, { useEffect, useState } from "react";
import { get_All_Users, Update_Status } from "../../../services/UserService";
import { useNavigate } from "react-router-dom";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { MdCheckCircle, MdCancel, MdChevronLeft, MdChevronRight } from "react-icons/md"; // Import des icônes

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [actionType, setActionType] = useState(""); // Ajout de actionType pour distinguer l'action
  const [currentPage, setCurrentPage] = useState(1); // Ajout pour la pagination
  const usersPerPage = 5; // Nombre d'utilisateurs par page
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
      Header: 'Nom utilisateur',
      accessor: 'username',
    },
    {
      Header: 'Nom',
      accessor: 'lastName',
    },
    {
      Header: 'Prenom',
      accessor: 'firstName',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === 'active' ? (
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
      Header: 'Numéro',
      accessor: 'phone',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Actions',
      accessor: 'Actions',
      Cell: ({ row }) => (
        <button
          className={`px-4 py-2 rounded-full text-white ${
            row.original.status === 'active'
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
          onClick={() => handleActionClick(row.original)}
        >
          {row.original.status === 'active' ? 'Désactiver' : 'Activer'}
        </button>
      ),
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Réinitialiser la page actuelle lors de la recherche
  };

  const handleActionClick = (user) => {
    setSelectedUser(user);
    setActionType(user.status === "active" ? "deactivate" : "activate");
    setShowConfirmationModal(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedUser || !selectedUser._id) {
      console.error("Selected user or user ID is invalid.");
      return;
    }

    const newStatus = actionType === "deactivate" ? "inactive" : "active";

    try {
      await Update_Status(selectedUser._id, newStatus);

      const updatedUsers = users.map((u) =>
        u._id === selectedUser._id ? { ...u, status: newStatus } : u
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

  const filteredUsers = users.filter((user) =>
    [user.lastName, user.firstName, user.username, user.email, user.phone]
      .filter((field) => field)
      .map((field) => field.toLowerCase())
      .some((field) => field.includes(searchTerm.toLowerCase()))
  );

  // Pagination
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

  return (
    <div className="mt-8">
      <button
        onClick={() => navigate('/admin/Utilisateurs/CreateSubAdmin')}
        className="mt-4 mb-2 flex items-center justify-center rounded-full bg-green-500 p-3 text-white hover:cursor-pointer"
      >
        Ajouter un utilisateur
      </button>
      <form className="mx-auto max-w-full mb-2">
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
            className="block w-full rounded-xl border bg-white p-4 text-sm text-gray-900 ps-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Recherche ..."
            value={searchTerm}
            onChange={handleSearch}
            required
          />
        </div>
      </form>

      <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
        <div className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Utilisateurs
          </div>
          <CardMenu />
        </div>

        <div className="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                {columnsData.map((column, index) => (
                  <th key={index} className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700">
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.Header}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  {columnsData.map((column, columnIndex) => (
                    <td
                      key={columnIndex}
                      className="pt-[14px] pb-[18px] sm:text-[14px]"
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
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            <MdChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm text-gray-800">
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            <MdChevronRight className="w-6 h-6" />
          </button>
        </div>
      </Card>

      {showConfirmationModal && selectedUser && (
        <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-lg bg-white">
            <div className="p-8">
              <p className="mb-4 text-lg font-semibold">
                {actionType === "deactivate"
                  ? `Are you sure you want to deactivate the account of ${selectedUser.firstName} ${selectedUser.lastName}?`
                  : `Are you sure you want to activate the account of ${selectedUser.firstName} ${selectedUser.lastName}?`}
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
                    actionType === "deactivate" ?  "bg-red-500 text-white hover:bg-red-600": "bg-green-500 text-white hover:bg-green-600"
                  }`}
                  onClick={handleConfirmAction}
                >
                  {actionType === "deactivate" ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
