import { L } from "@lib/abpUtility";
// import { CalendarOutlined, UserOutlined } from "@ant-design/icons/lib";
// import { renderDateTime } from "@lib/helper";

const columns = (actionColumn?) => {
  const data = [
    {
      title: L("ID"),
      dataIndex: "id",
      key: "id",
      width: "5%",
      render: (id) => <>{id}</>,
    },
    {
      title: L("TASK_NAME"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("TYPE"),
      dataIndex: "type",
      key: "type",
      ellipsis: true,
      width: "10%",
      render: () => <>{}</>,
    },
    {
      title: L("TYPE_NAME"),
      dataIndex: "",
      key: "",
      width: "10%",
      render: () => <>{}</>,
    },
    {
      title: L("CUSTOMER"),
      dataIndex: "",
      key: "",
      width: "10%",
      render: () => <>{}</>,
    },

    {
      title: L("DUE_DATE"),
      dataIndex: "",
      key: "",
      width: "10%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("STATUS"),
      dataIndex: "",
      key: "",
      width: "10%",
      render: () => <>{}</>,
    },

    actionColumn,
  ];

  return data;
};

export default columns;
