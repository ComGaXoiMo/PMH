import { L } from "@lib/abpUtility";
import * as React from "react";

const columns = (actionColumn?) => {
  let data = [
    actionColumn,
    {
      title: L("STAGE"),
      dataIndex: "stage",
      key: "stage",
      width: "15%",
      render: (stage: string) => <div>{stage ?? "None"}</div>,
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
      width: "",
      render: (sort: string) => <div>{sort ?? "None"}</div>,
    },
  ];

  return data;
};

export default columns;
