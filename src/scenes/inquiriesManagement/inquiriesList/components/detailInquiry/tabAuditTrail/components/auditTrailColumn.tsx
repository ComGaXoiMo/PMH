import { L } from "@lib/abpUtility";
// import { CalendarOutlined, UserOutlined } from "@ant-design/icons/lib";
// import { renderDateTime } from "@lib/helper";

const columns = (actionColumn?) => {
  const data = [
    {
      title: L("BY"),
      dataIndex: "",
      key: "",
      width: "34%",
      render: (id) => <>{id}</>,
    },
    {
      title: L("OLD"),
      dataIndex: "",
      key: "",
      width: "33%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("NEW"),
      dataIndex: "",
      key: "",
      width: "33%",
      render: () => <>{}</>,
    },

    actionColumn,
  ];

  return data;
};

export default columns;
