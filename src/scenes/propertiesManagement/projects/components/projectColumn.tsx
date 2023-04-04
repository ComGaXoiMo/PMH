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
    //   dataIndex: "projectName",
    //   key: "projectName",
    //   width: "15%",
    //   ellipsis: true,
    //   render: (projectName) => <>{projectName}</>,
    // },
    {
      title: L("LOCATION"),
      dataIndex: "projectAddress",
      key: "projectAddress",
      ellipsis: true,
      width: "10%",
      render: (projectAddress) => (
        <>{projectAddress.map((item) => item?.address).join(", ")}</>
      ),
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
      dataIndex: "propertyManagement",
      key: "propertyManagement",
      width: "10%",
      ellipsis: true,
      render: (propertyManagement) => <>{propertyManagement?.businessName}</>,
    },
    {
      title: L("TYPE"),
      dataIndex: "types",
      key: "types",
      width: "10%",
      render: (types) => <>{types.map((item) => item?.name).join(", ")}</>,
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
  ];

  return data;
};

export default columns;
