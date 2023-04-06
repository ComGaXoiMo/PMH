import { L } from "@lib/abpUtility";
// import { CalendarOutlined, UserOutlined } from "@ant-design/icons/lib";
// import { renderDateTime } from "@lib/helper";

const columns = (actionColumn?) => {
  const data = [
    {
      title: L("ID"),
      dataIndex: "id",
      key: "id",
      width: "70px",
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
      title: L("TENANT"),
      dataIndex: "tenant",
      key: "tenant",
      width: "150px",
      render: (tenant) => <>{tenant}</>,
    },
    {
      title: L("COMPANY"),
      dataIndex: "company",
      key: "company",
      width: "150px",
      render: (company) => <>{company ?? "-"}</>,
    },
    {
      title: L("PROJECT"),
      dataIndex: "project",
      key: "project",
      width: "150px",
      render: (project) => <>{project}</>,
    },
    {
      title: L("UNIT"),
      dataIndex: "unit",
      key: "unit",
      width: "150px",
      ellipsis: true,
      render: (unit) => <>{unit}</>,
    },
    {
      title: L("PRICE_DEPOSIT"),
      dataIndex: "priceDeposit",
      key: "priceDeposit",
      width: "150px",
      render: (priceDeposit) => <>{priceDeposit}</>,
    },
    {
      title: L("END_DATE"),
      dataIndex: "endDate",
      key: "endDate",
      width: "150px",
      render: (endDate) => <>{endDate}</>,
    },
    {
      title: L("PRICE_RENT"),
      dataIndex: "princeRent",
      key: "princeRent",
      width: "150px",
      render: (princeRent) => <>{princeRent}</>,
    },

    {
      title: L("PAYMENT_STATUS"),
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: "150px",
      render: (paymentStatus) => <>{paymentStatus}</>,
    },
  ];

  return data;
};

export default columns;
