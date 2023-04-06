import { L } from "@lib/abpUtility";
import * as React from "react";

const columns = (actionColumn?) => {
  let data = [
    actionColumn,
    {
      title: L("STATUS"),
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: string) => <div>{status ?? "None"}</div>,
    },
    {
      title: L("COLOR"),
      dataIndex: "color",
      key: "color",
      width: "15%",
      render: (color: string) => <div>{color ?? "None"}</div>,
    },
    {
      title: L("SORT"),
      dataIndex: "sort",
      key: "sort",
      width: "15%",
      render: (sort: string) => <div>{sort ?? "None"}</div>,
    },
  ];

  return data;
};

export default columns;
