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
    actionColumn,
    {
      title: L("UNIT_NO"),
      dataIndex: "unitNo",
      key: "unitNo",
      width: "15%",
      ellipsis: true,
      render: (unitNo) => <>{unitNo}</>,
    },
    {
      title: L("UNIT"),
      dataIndex: "unit",
      key: "unit",
      width: "15%",
      ellipsis: true,
      render: (unit) => <>{unit}</>,
    },
    {
      title: L("UNIT_TYPE"),
      dataIndex: "unitType",
      key: "unitType",
      width: "15%",
      ellipsis: true,
      render: (unitType) => <>{unitType}</>,
    },
    {
      title: L("TENANT_NAME"),
      dataIndex: "tenantName",
      key: "tenantName",
      width: "15%",
      ellipsis: true,
      render: (tenantName) => <>{tenantName}</>,
    },
    {
      title: L("NATIONALITY"),
      dataIndex: "nationality",
      key: "nationality",
      width: "15%",
      ellipsis: true,
      render: (nationality) => <>{nationality}</>,
    },
    {
      title: L("ARRIVAL_DATE"),
      dataIndex: "arrivalDate",
      key: "arrivalDate",
      width: "15%",
      ellipsis: true,
      render: (arrivalDate) => <>{arrivalDate}</>,
    },
    {
      title: L("DERPARTURE_DATE"),
      dataIndex: "derpartureDate",
      key: "derpartureDate",
      width: "15%",
      ellipsis: true,
      render: (derpartureDate) => <>{derpartureDate}</>,
    },
    {
      title: L("CONTRACT_STATUS"),
      dataIndex: "contractStatus",
      key: "contractStatus",
      width: "15%",
      ellipsis: true,
      render: (contractStatus) => <>{contractStatus}</>,
    },
    {
      title: L("REMARK"),
      dataIndex: "remark",
      key: "remark",
      width: "15%",
      ellipsis: true,
      render: (remark) => <>{remark}</>,
    },
  ];

  return data;
};

export default columns;
