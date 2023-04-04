import { L } from "@lib/abpUtility";
// import { CalendarOutlined, UserOutlined } from "@ant-design/icons/lib";
// import { renderDateTime } from "@lib/helper";

const columns = (actionColumn?) => {
  const data = [
    {
      title: L("ID"),
      children: [
        {
          dataIndex: "id",
          key: "id",
          width: "80px",
          render: (id?) => <>{id}</>,
        },
      ],
    },
    actionColumn,
    {
      title: L("FLOOR"),
      children: [
        {
          dataIndex: "floorName",
          key: "floorName",
          width: "150px",
          render: (floorName?) => <>{floorName}</>,
        },
      ],
    },
    // {
    //   title: L("UNIT"),
    //   children: [
    //     {
    //       dataIndex: "unitName",
    //       key: "unitName",
    //       width: "150px",
    //       render: (unitName?) => <>{unitName}</>,
    //     },
    //   ],
    // },

    {
      title: L("TOTAL_AREA"),
      children: [
        {
          dataIndex: "totalArea",
          key: "totalArea",
          width: "150px",
          render: (totalArea?) => <>{totalArea}</>,
        },
      ],
    },
    {
      title: L("BACONY"),
      children: [
        {
          dataIndex: "bacony",
          key: "bacony",
          width: "150px",
          render: (bacony?) => <>{bacony}</>,
        },
      ],
    },
    {
      title: L("ACTUAL_AREA"),
      children: [
        {
          dataIndex: "actualArea",
          key: "actualArea",
          width: "150px",
          render: (actualArea?) => <>{actualArea}</>,
        },
      ],
    },
    {
      title: L("VIEW"),
      children: [
        {
          dataIndex: "views",
          key: "views",
          width: "150px",
          render: (views?) => <>{views.map((item) => item.name).join(", ")}</>,
        },
      ],
    },
    {
      title: L("STATUS"),
      children: [
        {
          dataIndex: "status",
          key: "status",
          width: "150px",
          render: (status?) => <>{status?.name}</>,
        },
      ],
    },
    {
      title: L("LEASE_TERM"),
      children: [
        {
          title: L("START_DATE"),
          dataIndex: "startDate",
          key: "startDate",
          width: "150px",
          render: (startDate?) => <>{startDate}</>,
        },
        {
          title: L("END_DATE"),
          dataIndex: "endDate",
          key: "endDate",
          width: "150px",
          render: (endDate?) => <>{endDate}</>,
        },
      ],
    },
    {
      title: L("EXTENSION"),
      children: [
        {
          title: L("START_DATE"),
          dataIndex: "startDate",
          key: "startDate",
          width: "150px",
          render: (startDate?) => <>{startDate}</>,
        },
      ],
    },
    {
      title: L("TERMINATION"),
      children: [
        {
          title: L(""),
          dataIndex: "termination",
          key: "termination",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
    {
      title: L("CONTRACT_RENT_LNCL_VAT"),
      children: [
        {
          title: L(""),
          dataIndex: "lnclVAT",
          key: "lnclVAT",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
    {
      title: L("AFTER_DISCOUNT"),
      children: [
        {
          title: L("VND"),
          dataIndex: "vnd",
          key: "vnd",
          width: "150px",
          render: () => <>{}</>,
        },
        {
          title: L("USA"),
          dataIndex: "usa",
          key: "usa",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
    {
      title: L("VAT_10"),
      children: [
        {
          title: L(""),
          dataIndex: "VAT",
          key: "VAT",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
    {
      title: L("DEPOSIT"),
      children: [
        {
          title: L(""),
          dataIndex: "deposit",
          key: "deposit",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
    {
      title: L("TENANT"),
      children: [
        {
          title: L(""),
          dataIndex: "tenant",
          key: "tenant",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
    {
      title: L("NATIONALITY"),
      children: [
        {
          title: L(""),
          dataIndex: "nationality",
          key: "nationality",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
    {
      title: L("PAYMENT_AUTHOERIZED"),
      children: [
        {
          title: L(""),
          dataIndex: "paynemt-authorized",
          key: "paynemt-authorized",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
    {
      title: L("STATUS"),
      children: [
        {
          title: L(""),
          dataIndex: "s",
          key: "s",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
    {
      title: L("DEALER"),
      children: [
        {
          title: L(""),
          dataIndex: "dealer",
          key: "dealer",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
    {
      title: L("TERM"),
      children: [
        {
          title: L(""),
          dataIndex: "term",
          key: "term",
          width: "150px",
          render: () => <>{}</>,
        },
      ],
    },
  ];

  return data;
};

export default columns;
