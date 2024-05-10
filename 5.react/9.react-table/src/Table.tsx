import React from "react";
import { COLUMNS, COLUMNS_GROUPS } from "./columns";
import MockData from "./MOCK_DATA.json";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";

const GlobalFilter = ({ setFilter }: any) => {
  return (
    <div>
      搜索：
      <input
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </div>
  );
};

function Table() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns: COLUMNS_GROUPS,
    data: MockData,
    getCoreRowModel: getCoreRowModel(), //row model
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getColumnCanGlobalFilter: (column) => column.id !== "id",
    state: {
      sorting,
    },
  });

  return (
    <>
      <GlobalFilter setFilter={table.setGlobalFilter} />
      <table className="gridtable">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(
                  (
                    header // map over the headerGroup headers array
                  ) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  )
                )}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
}

export default Table;
