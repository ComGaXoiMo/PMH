import { L } from "@lib/abpUtility";
import * as React from "react";
import AppConst from "@lib/appconst";
import { renderIsActive } from "@lib/helper";
const { align } = AppConst;

const columns = (actionColumn?) => {
  let data = [
    actionColumn,
    {
      title: L("FULL_NAME"),
      dataIndex: "displayName",
      key: "displayName",
      width: "15%",
      ellipsis: true,
      render: (text: string) => <>{text}</>,
    },
    {
      title: L("EMAIL_ADDRESS"),
      dataIndex: "emailAddress",
      key: "emailAddress",
      width: "15%",
      ellipsis: true,
      render: (text: string) => <>{text}</>,
    },
    {
      title: L("ACTIVE_STATUS"),
      dataIndex: "isActive",
      key: "isActive",

      align: align.center,
      render: renderIsActive,
    },
  ];

  return data;
};

export default columns;
