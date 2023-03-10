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
      dataIndex: "bookingCode",
      key: "bookingCode",
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
      title: L("UNIT_NO"),
      dataIndex: "unit",
      key: "unit",
      width: "10%",
      render: () => <>{}</>,
    },
    {
      title: L("TYPE_OF_UNIT"),
      dataIndex: "types",
      key: "types",
      width: "10%",
      render: () => <>{}</>,
    },

    {
      title: L("TENANT_NAME"),
      dataIndex: "propertyManagement",
      key: "propertyManagement",
      width: "10%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("NATIONALITY"),
      dataIndex: "nationality",
      key: "nationality",
      width: "10%",
      render: () => <>{}</>,
    },
    {
      title: L("ARRIVAL_DATE"),
      dataIndex: "date",
      key: "date",
      width: "10%",
      render: () => <>{}</>,
    },
    {
      title: L("DEPARTURE_DATE"),
      dataIndex: "d",
      key: "d",
      width: "10%",
      render: () => <>{}</>,
    },
    {
      title: L("REMARK"),
      dataIndex: "remark",
      key: "remark",
      width: "10%",
      render: () => <>{}</>,
    },

    actionColumn,
  ];

  return data;
};

export default columns;
