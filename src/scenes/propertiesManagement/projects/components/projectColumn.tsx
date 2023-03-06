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
      title: L("PROPERTY"),
      dataIndex: "businessName",
      key: "businessName",
      width: "15%",
      ellipsis: true,
      render: (businessName) => <>{businessName}</>,
    },
    {
      title: L("LOCATION"),
      dataIndex: "companyAddress",
      key: "companyAddress",
      ellipsis: true,
      width: "10%",
      render: (companyAddress) => <>{companyAddress?.address}</>,
    },
    {
      title: L("OWNER"),
      dataIndex: "creatorUser",
      key: "creatorUser",
      width: "10%",
      render: (creatorUser) => <>{creatorUser?.displayName}</>,
    },

    {
      title: L("MANAGER"),
      dataIndex: "Manager",
      key: "Manager",
      width: "10%",
      ellipsis: true,
      render: (Manager) => <>{Manager?.name}</>,
    },
    {
      title: L("TYPE"),
      dataIndex: "companyTypeMap",
      key: "companyTypeMap",
      width: "10%",
      render: (companyTypeMap) => (
        <>{companyTypeMap.map((item) => item?.companyTypeName).join(", ")}</>
      ),
    },
    {
      title: L("UNIT"),
      dataIndex: "Unit",
      key: "Unit",
      width: "10%",
      render: (Unit) => <>{Unit?.name}</>,
    },
    {
      title: L("OCCUPIED"),
      dataIndex: "Occupied",
      key: "Occupied",
      width: "10%",
      render: (Occupied) => <>{Occupied?.name}</>,
    },
    {
      title: L("YEARBUILD"),
      dataIndex: "YearBuild",
      key: "YearBuild",
      width: "10%",
      render: (YearBuild) => <>{YearBuild?.name}</>,
    },
    // {
    //   title: L("DELIVERY_CREATED_AT"),
    //   dataIndex: "workflow",
    //   key: "workflow",

    //   ellipsis: true,
    //   render: (workflow, row) => (
    //     <div className="text-muted small">
    //       <CalendarOutlined className="mr-1" />{" "}
    //       {renderDateTime(row?.creationTime)}
    //       <div>
    //         <UserOutlined className="mr-1" /> {row?.creatorUser?.displayName}
    //       </div>
    //     </div>
    //   ),
    // },
    actionColumn,
  ];

  return data;
};

export default columns;
