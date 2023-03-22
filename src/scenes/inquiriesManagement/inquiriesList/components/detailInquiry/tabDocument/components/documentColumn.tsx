import { L } from "@lib/abpUtility";
// import { CalendarOutlined, UserOutlined } from "@ant-design/icons/lib";
// import { renderDateTime } from "@lib/helper";

const columns = (actionColumn?) => {
  const data = [
    {
      title: L("DOC_NAME"),
      dataIndex: "",
      key: "",
      width: "34%",
      render: (id) => <>{id}</>,
    },
    {
      title: L("CAPACITY_KB"),
      dataIndex: "",
      key: "",
      width: "20%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("UPLOOAD_DATE"),
      dataIndex: "",
      key: "",
      width: "33%",
      render: () => <>{}</>,
    },
    {
      title: L("ATHOR"),
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
