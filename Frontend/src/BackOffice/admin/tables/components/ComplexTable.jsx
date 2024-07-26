import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import React, { useMemo } from "react";
import Progress from "components/progress";
const ComplexTable = (props) => {
  const { tableName, columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  return (
      <Card extra={"w-full h-full p-4 sm:overflow-x-auto"}>
        <div class="relative flex items-center justify-between">
          <div class="text-xl font-bold text-navy-700 dark:text-white">
            {tableName}
          </div>
          <CardMenu />
        </div>

        <div class="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
          <table {...getTableProps()} className="w-full">
            <thead>
            {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                      <th
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                          key={index}
                          className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                      >
                        <p className="text-xs tracking-wide text-gray-600">
                          {column.render("Header")}
                        </p>
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
                      let data = cell.render('Cell');
                      if (cell.column.Header === 'STATUS' || cell.column.Header === "Status") {
                        data = (
                            <div className="flex items-center gap-2">
                              <div className={`rounded-full text-xl`}>
                                {cell.value === 'Approved' ||cell.value === 'active' ? (
                                    <MdCheckCircle className="text-green-500" />
                                ) : cell.value === 'Disable' ||cell.value === 'inactive'? (
                                    <MdCancel className="text-red-500" />
                                ) : cell.value === 'Error' ? (
                                    <MdOutlineError className="text-orange-500" />
                                ) : null}
                              </div>
                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                {cell.value}
                              </p>
                            </div>
                        );
                      } else if (cell.column.Header === 'PROGRESS') {
                        data = <Progress width="w-[68px]" value={cell.value} />;
                      }else {
                          // Default style for headers not explicitly handled
                          data = (
                              <p className="text-sm font-bold text-navy-700 dark:text-white">
                                  {cell.value}
                              </p>
                          );
                      }
                      return (
                          <td
                              className="pt-[14px] pb-[18px] sm:text-[14px]"
                              {...cell.getCellProps()}
                              key={index}
                          >
                            {data}
                          </td>
                      );
                    })}
                  </tr>
              );
            })}

            </tbody>
          </table>
        </div>
      </Card>
  );
};

export default ComplexTable;