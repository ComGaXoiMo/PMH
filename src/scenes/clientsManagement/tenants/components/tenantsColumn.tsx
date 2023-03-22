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
      title: L("BOOKING_CODE"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("UNIT_NO"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("UNIT"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("UNIT_TYPE"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("TENANT_NAME"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("NATIONALITY"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("ARRIVAL_DATE"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("DERPARTURE_DATE"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("CONTRACT_STATUS"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("REMARK"),
      dataIndex: "",
      key: "",
      width: "15%",
      ellipsis: true,
      render: () => <>{}</>,
    },

    actionColumn,
  ];

  return data;
};

export default columns;
