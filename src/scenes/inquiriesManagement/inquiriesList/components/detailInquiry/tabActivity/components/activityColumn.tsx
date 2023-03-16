import { L } from "@lib/abpUtility";
// import { CalendarOutlined, UserOutlined } from "@ant-design/icons/lib";
// import { renderDateTime } from "@lib/helper";

const columns = (actionColumn?) => {
  const data = [
    {
      title: L("ID"),
      dataIndex: "",
      key: "",
      width: "25%",
      render: (id) => <>{id}</>,
    },
    {
      title: L("TOTAL"),
      dataIndex: "",
      key: "",
      width: "25%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("MENBER"),
      dataIndex: "",
      key: "",
      width: "25%",
      render: () => <>{}</>,
    },
    {
      title: L("YOU"),
      dataIndex: "",
      key: "",
      width: "25%",
      render: () => <>{}</>,
    },

    actionColumn,
  ];

  return data;
};

export default columns;
