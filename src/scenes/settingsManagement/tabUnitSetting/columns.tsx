import { L } from "@lib/abpUtility";
import * as React from "react";

const columns = (actionColumn?) => {
  let data = [
    actionColumn,
    {
      title: L("COLOR"),
      dataIndex: "color",
      key: "color",
      width: "15%",
      render: (color: string) => <div>{color ?? "None"}</div>,
    },
    {
      title: L("SORT"),
      dataIndex: "sortOrder",
      key: "sortOrder",
      // width: "15%",
      render: (sortOrder) => <div>{sortOrder}</div>,
    },
  ];

  return data;
};

export default columns;
