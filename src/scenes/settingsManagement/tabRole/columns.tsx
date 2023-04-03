import { L } from "@lib/abpUtility";
import * as React from "react";

const columns = (actionColumn?) => {
  let data = [
    actionColumn,
    {
      title: L("ST_ROLE_DISPLAY_NAME"),
      dataIndex: "displayName",
      key: "displayName",
      width: 150,
      render: (text: string) => <div>{text}</div>,
    },
  ];

  return data;
};

export default columns;
