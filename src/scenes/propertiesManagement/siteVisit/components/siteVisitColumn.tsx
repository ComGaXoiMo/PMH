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
    // {
    //   title: L("PROPERTY"),
    //   dataIndex: "property",
    //   key: "property",
    //   width: "15%",
    //   ellipsis: true,
    //   render: (property) => <>{property}</>,
    // },
    {
      title: L("UNIT_NAME"),
      dataIndex: "unit",
      key: "unit",
      width: "10%",
      render: (unit) => <>{unit}</>,
    },
    {
      title: L("AGENT"),
      dataIndex: "agent",
      key: "agent",
      width: "10%",
      render: (agent) => <>{agent}</>,
    },

    {
      title: L("VISIT_DATE"),
      dataIndex: "date",
      key: "date",
      width: "10%",
      ellipsis: true,
      render: (date) => <>{date}</>,
    },
  ];

  return data;
};

export default columns;
