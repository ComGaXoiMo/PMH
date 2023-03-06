import React from "react";
import { Tag } from "antd";
import AppConst, { appPermissions } from "@lib/appconst";
import SystemColumn from "@components/DataTable/columns";
import { isGranted, L } from "@lib/abpUtility";
import { formatCurrency, renderIsActive } from "@lib/helper";
const { align } = AppConst;

export const getColumns = (onShowCreateOrUpdateModal, activateOrDeactivate) => [
  {
    title: L("INQUIRY_CLIENT"),
    dataIndex: "clientId",
    width: 220,
    ellipsis: true,
    render: (clientId, row) => (
      <span
        onClick={() => {
          isGranted(appPermissions.inquiryManagement.update) &&
            onShowCreateOrUpdateModal(row.id);
        }}
        className={
          isGranted(appPermissions.inquiryManagement.update)
            ? "pointer text-primary"
            : ""
        }
      >
        {row.client?.businessName}
      </span>
    ),
  },
  {
    title: L("INQUIRY_CONTACT"),
    dataIndex: "contactId",
    width: 160,
    ellipsis: true,
    render: (contactId, row) => <>{row?.contact?.contactName}</>,
  },
  {
    title: L("INQUIRY_TYPE"),
    dataIndex: "typeId",
    width: 120,
    ellipsis: true,
    render: (typeId, row) => <>{row.type?.name}</>,
  },
  {
    title: L("INQUIRY_PROPERTY_TYPE"),
    dataIndex: "propertyTypeId",
    width: 120,
    ellipsis: true,
    render: (propertyTypeId, row) => <>{row.propertyType?.name}</>,
  },
  {
    title: L("INQUIRY_SOURCE"),
    dataIndex: "source",
    width: 120,
    ellipsis: true,
    render: (source, row) => <>{row.source?.name}</>,
  },
  {
    title: L("INQUIRY_PRICE"),
    dataIndex: "fromPrice",
    width: 160,
    ellipsis: true,
    render: (fromPrice, row) => (
      <>
        {formatCurrency(fromPrice)} - {formatCurrency(row.toPrice)}
      </>
    ),
  },
  {
    title: L("INQUIRY_FACILITIES"),
    dataIndex: "inquiryFacility",
    width: 300,
    ellipsis: true,
    render: (inquiryFacilities) =>
      inquiryFacilities.map((falility) => <Tag>{falility.facility?.name}</Tag>),
  },
  {
    title: L("DESCRIPTION"),
    dataIndex: "description",
    width: 200,
    ellipsis: true,
    render: (description) => description,
  },
  {
    title: L("ACTIVE_STATUS"),
    dataIndex: "isActive",
    key: "isActive",
    width: 100,
    align: align.center,
    render: renderIsActive,
  },
  SystemColumn,
  // {
  //   title: L("ACTION"),
  //   key: "action",
  //   fixed: align.right,
  //   align: align.right,
  //   width: 90,
  //   render: (text, item: any) => {
  //     return (
  //       <div>
  //         {/* {isGranted(appPermissions.feedbackCategory.update) && ( */}
  //         <Button
  //           size="small"
  //           className="ml-1"
  //           shape="circle"
  //           icon={<EditOutlined />}
  //           onClick={() => onShowCreateOrUpdateModal(item.id)}
  //         />
  //         {/* )} */}
  //         {/* {isGranted(appPermissions.feedbackCategory.delete) && ( */}
  //         <Button
  //           size="small"
  //           className="ml-1"
  //           shape="circle"
  //           icon={item.isActive ? <CloseOutlined /> : <CheckOutlined />}
  //           onClick={() => activateOrDeactivate([item.id], !item.isActive)}
  //         />
  //         {/* )} */}
  //       </div>
  //     );
  //   },
  // },
];
