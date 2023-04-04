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
    actionColumn,
    // {
    //   title: L("CONTACTS_NUMBER"),
    //   dataIndex: "contractNumber",
    //   key: "contractNumber",
    //   width: "200px",
    //   ellipsis: true,
    //   render: (contractNumber) => <>{contractNumber}</>,
    // },
    {
      title: L("CLIENT_NAME"),
      dataIndex: "clientName",
      key: "clientName",
      width: "150px",
      render: (clientName) => <>{clientName}</>,
    },
    {
      title: L("COMPANY"),
      dataIndex: "company",
      key: "company",
      width: "150px",
      render: (company) => <>{company ?? "-"}</>,
    },
    {
      title: L("phone"),
      dataIndex: "phone",
      key: "phone",
      width: "150px",
      render: (phone) => <>{phone}</>,
    },
    {
      title: L("NO_UNIT"),
      dataIndex: "unit",
      key: "unit",
      width: "150px",
      ellipsis: true,
      render: (unit) => <>{unit}</>,
    },
    {
      title: L("START_DATE"),
      dataIndex: "startDate",
      key: "startDate",
      width: "150px",
      render: (startDate) => <>{startDate}</>,
    },
    {
      title: L("END_DATE"),
      dataIndex: "endDate",
      key: "endDate",
      width: "150px",
      render: (endDate) => <>{endDate}</>,
    },
    {
      title: L("RENTAL_TERM"),
      dataIndex: "rt",
      key: "rt",
      width: "150px",
      render: (rt) => <>{rt}</>,
    },
    {
      title: L("P_PERIOD"),
      dataIndex: "pPeriod",
      key: "pPeriod",
      width: "150px",
      render: (pPeriod) => <>{pPeriod}</>,
    },
    {
      title: L("P_DUE"),
      dataIndex: "pDue",
      key: "pDue",
      width: "150px",
      render: (pDue) => <>{pDue}</>,
    },
    {
      title: L("EXCHANGE_RATE"),
      dataIndex: "exchangeRate",
      key: "exchangeRate",
      width: "150px",
      render: (exchangeRate) => <>{exchangeRate}</>,
    },
    {
      title: L("DEPOSIT"),
      dataIndex: "deposit",
      key: "deposit",
      width: "150px",
      render: (deposit) => <>{deposit}</>,
    },

    {
      title: L("RENT"),
      dataIndex: "rent",
      key: "rent",
      width: "150px",
      render: (rent) => <>{rent}</>,
    },
    {
      title: L("PAYMENT_STATUS"),
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: "150px",
      render: (paymentStatus) => <>{paymentStatus}</>,
    },
    {
      title: L("CONTRACT_STATUS"),
      dataIndex: "contractStatus",
      key: "contractStatus",
      width: "150px",
      render: (contractStatus) => <>{contractStatus}</>,
    },
  ];

  return data;
};

export default columns;
