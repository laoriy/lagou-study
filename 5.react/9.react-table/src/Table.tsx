import React from "react";
import { columns } from "./columns";
import MockData from "./MOCK_DATA.json";
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";

function Table() {
  const table = useReactTable({
    columns,
    data: MockData,
    getCoreRowModel: getCoreRowModel(), //row model
  });

  console.log(table);

  return (
    <table className="gridtable">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(
                (
                  header // map over the headerGroup headers array
                ) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
    </table>
  );
}

export default Table;
