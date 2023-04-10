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
      ellipsis: true,
      render: (id) => <>{id}</>,
    },
    actionColumn,
    {
      title: L("INDUSTRY"),
      dataIndex: "industry",
      key: "industry",
      ellipsis: true,
      width: "10%",
      render: (industry) => <>{industry?.industryName}</>,
    },
    {
      title: L("TAX_CODE"),
      dataIndex: "textCode",
      ellipsis: true,
      key: "textCode",
      width: "10%",
      render: () => <>{}</>,
    },
    {
      title: L("CONTACT"),
      dataIndex: "contactPhone",
      key: "contactPhone",
      ellipsis: true,
      width: "10%",
      render: () => <></>,
    },
    {
      title: L("INQUIRY"),
      dataIndex: "contactEmail",
      key: "contactEmail",
      width: "10%",
      ellipsis: true,
      render: () => <>{}</>,
    },

    {
      title: L("TASK"),
      dataIndex: "tasl",
      key: "task",
      ellipsis: true,
      width: "10%",
      render: () => <>{}</>,
    },
  ];

  return data;
};

export default columns;
