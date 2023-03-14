import { L } from "@lib/abpUtility";
// import { CalendarOutlined, UserOutlined } from "@ant-design/icons/lib";
// import { renderDateTime } from "@lib/helper";

const columns = (actionColumn?) => {
  const data = [
    {
      title: L("ID"),
      dataIndex: "id",
      key: "id",
      width: "150px",
      render: (id) => <>{id}</>,
    },
    {
      title: L("CONTACTS_NUMBER"),
      dataIndex: "",
      key: "",
      width: "200px",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("TENANT"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <></>,
    },
    {
      title: L("COMPANY"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <>{}</>,
    },
    {
      title: L("PROJECT"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <></>,
    },
    {
      title: L("UNIT"),
      dataIndex: "",
      key: "",
      width: "150px",
      ellipsis: true,
      render: () => <></>,
    },
    {
      title: L("PRICE_RENT_USA"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <>{}</>,
    },
    {
      title: L("END_DATE"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <>{}</>,
    },

    {
      title: L("PAYMENT_STATUS"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <>{}</>,
    },
    {
      title: L("DEPOSIT_STATUS"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <>{}</>,
    },
    actionColumn,
  ];

  return data;
};

export default columns;
