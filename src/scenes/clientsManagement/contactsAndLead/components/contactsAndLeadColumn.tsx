import { L } from "@lib/abpUtility";
// import { CalendarOutlined, UserOutlined } from "@ant-design/icons/lib";
// import { renderDateTime } from "@lib/helper";

const columns = (actionColumn?) => {
  const data = [
    {
      title: L("ID"),
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      width: "5%",
      render: (id) => <>{id}</>,
    },
    actionColumn,
    // {
    //   title: L("CONTACTS_NAME"),
    //   dataIndex: "contactName",
    //   key: "contactName",
    //   width: "15%",
    //   ellipsis: true,
    //   render: (contactName) => <>{contactName}</>,
    // },
    {
      title: L("COMPANY"),
      dataIndex: "companyContact",
      key: "companyContact",
      width: "10%",
      ellipsis: true,
      render: (companyContact) => (
        <>
          {companyContact.map((item) => item?.company?.businessName).join(", ")}
        </>
      ),
    },
    {
      title: L("TITLE"),
      dataIndex: "title",
      key: "title",
      width: "10%",
      ellipsis: true,
      render: (title) => <>{title}</>,
    },
    {
      title: L("PHONE"),
      dataIndex: "contactPhone",
      key: "contactPhone",
      ellipsis: true,
      width: "10%",
      render: (contactPhone) => (
        <>
          {contactPhone
            .map((item) => `(+${item?.phoneCode ?? "??"}) ${item?.phone}`)
            .join(", ")}
        </>
      ),
    },
    {
      title: L("EMAIL"),
      dataIndex: "contactEmail",
      key: "contactEmail",
      width: "10%",
      ellipsis: true,
      render: (contactEmail) => (
        <>{contactEmail.map((item) => item.email).join(", ")}</>
      ),
    },
    {
      title: L("STATUS"),
      dataIndex: "status",
      key: "status",
      width: "10%",
      ellipsis: true,
      render: () => <>{}</>,
    },
    {
      title: L("DEAL"),
      dataIndex: "deal",
      key: "deal",
      ellipsis: true,
      width: "10%",
      render: () => <>{}</>,
    },
    {
      title: L("TASK"),
      dataIndex: "tasl",
      key: "task",
      ellipsis: true,
      width: "10%",
      render: () => <>{}</>,
    },
  ];

  return data;
};

export default columns;
