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
      title: L("CLIENT_NAME"),
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
      title: L("PNB"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <></>,
    },
    {
      title: L("NO_UNIT"),
      dataIndex: "",
      key: "",
      width: "150px",
      ellipsis: true,
      render: () => <></>,
    },
    {
      title: L("START_DATE"),
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
      title: L("RENTAL_TERM"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <>{}</>,
    },
    {
      title: L("P_PERIOD"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <>{}</>,
    },
    {
      title: L("P_DUE"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <>{}</>,
    },
    {
      title: L("EXCHANGE_RATE"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <>{}</>,
    },
    {
      title: L("DEPOSIT"),
      dataIndex: "",
      key: "",
      width: "150px",
      render: () => <>{}</>,
    },

    {
      title: L("RENT"),
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
      title: L("CONTRACT_STATUS"),
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
