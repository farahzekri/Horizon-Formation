import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import React, { useMemo } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import Checkbox from "components/checkbox";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import Progress from "components/progress";

const CheckTable = ({ tableName, columnsData, tableData, onAjouterClick, handleCheckboxChange, handleViewStudent, handleDeleteSelected, selectedFormations, handleDetailClick ,handleEmploi}) => {
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 11 }, // Set initial page size
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    return (
        <Card extra={"w-full sm:overflow-auto p-4"}>
            <header className="relative flex items-center justify-between">
                <div className="text-xl font-bold text-navy-700 dark:text-white">
                    {tableName}
                </div>
                <div className="flex items-center">
                    {selectedFormations.length > 0 && (
                        <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ml-4" onClick={handleDeleteSelected}>Supprimer</button>
                    )}
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" onClick={onAjouterClick}>Ajouter</button>

                    <CardMenu />
                </div>
            </header>
            <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                <table {...getTableProps()} className="w-full">
                    <thead>
                        {headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup.headers.map((column, index) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        key={index}
                                        className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                                    >
                                        <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
                                            {column.render("Header")}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, index) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={index}>
                                    {row.cells.map((cell, index) => {
                                        let cellContent;
                                        if (cell.column.Header === "Nom" || cell.column.Header === "Matière" || cell.column.Header === "Salle" || cell.column.Header === "Formation" || cell.column.Header === "Niveau") {
                                            cellContent = (
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        checked={selectedFormations.includes(row.original._id)}
                                                        onChange={() => handleCheckboxChange(row.original._id)}
                                                    />
                                                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                        {cell.value}
                                                    </p>
                                                </div>
                                            );
                                        } else if (cell.column.Header === "DATE" || cell.column.Header === "Date de registration" || cell.column.Header === "Date de Creation" || cell.column.Header === "Date d\'embauche") {
                                            const formattedDate = format(new Date(cell.value), "dd.LLL.yyyy", {locale: fr});
                                            cellContent = (
                                                <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                    {formattedDate}
                                                </p>
                                            );
                                        } else if (cell.column.Header === "STATUS") {
                                            cellContent = (
                                                <div className="flex items-center gap-2">
                                                    <div className={`rounded-full text-xl`}>
                                                        {cell.value === "Approved" ? (
                                                            <MdCheckCircle className="text-green-500" />
                                                        ) : cell.value === "Disable" ? (
                                                            <MdCancel className="text-red-500" />
                                                        ) : cell.value === "Error" ? (
                                                            <MdOutlineError className="text-orange-500" />
                                                        ) : null}
                                                    </div>
                                                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                        {cell.value}
                                                    </p>
                                                </div>
                                            );
                                        } else if (cell.column.Header === "PROGRESS") {
                                            cellContent = (
                                                <Progress width="w-[68px]" value={cell.value} />
                                            );

                                        } else if (cell.column.Header === "Action") {
                                            cellContent = (
                                                <div className="flex items-center gap-2">
                                                    <div className={`rounded-full text-xl`}>
                                                        <button
                                                            className="flex cursor-pointer items-center gap-2 transition-transform hover:scale-110 hover:text-brand-300"
                                                            title="Détails"
                                                            onClick={() => handleDetailClick(row.original._id)}
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
                                                </div>
                                            );
                                        } else if (cell.column.Header === "Action Etudiant") {
                                            cellContent = (
                                                <div className="flex">
                                                    <button
                                                        className="bg-green-500 text-white py-1 px-2 rounded-lg
                                                        hover:bg-green-600"
                                                        onClick={() => handleViewStudent(row.original._id)}
                                                    >
                                                        Voir/Modifier
                                                    </button>
                                                </div>
                                            )
                                        }else if (cell.column.Header === "Action Formateur") {
                                            cellContent = (
                                                <div className="flex">
                                                    <button
                                                        className="bg-green-500 text-white py-1 px-2 rounded-lg
                                                        hover:bg-green-600"
                                                        onClick={() => handleViewStudent(row.original._id)}
                                                    >
                                                        Voir/Modifier
                                                    </button>
                                                </div>
                                            )
                                        }else {
                                            // Default style for headers not explicitly handled
                                            cellContent = (
                                                <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                    {cell.value}
                                                </p>
                                            );
                                        }
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                key={index}
                                                className="pt-[14px] pb-[16px] sm:text-[14px]"
                                            >
                                                {cellContent}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card >
    );
};

export default CheckTable;
