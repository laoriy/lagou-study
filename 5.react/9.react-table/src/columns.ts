import dateFormat from "dateformat";
export const COLUMNS = [
  {
    header: "ID",
    footer: "ID",
    accessorKey: "id",
  },
  {
    header: "名",
    footer: "名",
    accessorKey: "first_name",
  },
  {
    header: "姓",
    footer: "姓",
    accessorKey: "last_name",
  },
  {
    header: "出生日期",
    footer: "出生日期",
    accessorKey: "date_of_birth",
    cell: ({ cell, row }: any) => {
      return dateFormat(cell.getValue(), "yyyy-mm-dd");
    },
  },
  {
    header: "国家",
    footer: "国家",
    accessorKey: "country",
  },
  {
    header: "电话",
    footer: "电话",
    accessorKey: "phone",
  },
];

//表格分组
export const COLUMNS_GROUPS = [
  {
    header: "ID",
    footer: "ID",
    accessorKey: "id",
  },
  {
    header: "姓名",
    footer: "姓名",
    columns: [
      {
        header: "名",
        footer: "名",
        accessorKey: "first_name",
      },
      {
        header: "姓",
        footer: "姓",
        accessorKey: "last_name",
      },
    ],
  },

  {
    header: "一般信息",
    footer: "一般信息",
    columns: [
      {
        header: "出生日期",
        footer: "出生日期",
        accessorKey: "date_of_birth",
        cell: ({ cell, row }: any) => {
          return dateFormat(row.original.date_of_birth, "yyyy-mm-dd");
        },
      },
      {
        header: "国家",
        footer: "国家",
        accessorKey: "country",
      },
      {
        header: "电话",
        footer: "电话",
        accessorKey: "phone",
      },
    ],
  },
];
