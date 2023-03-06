import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import DataTable from "@components/DataTable";
import { portalLayouts } from "@components/Layout/Router/router.config";
import { L } from "@lib/abpUtility";
import AppConsts, { AppConfiguration } from "@lib/appconst";
import AppDataStore from "@stores/appDataStore";
import InquiryStore from "@stores/communication/inquiryStore";
import ListingStore from "@stores/projects/listingStore";
import UnitStore from "@stores/projects/unitStore";
import Stores from "@stores/storeIdentifier";
import { Card, Col, Image, Row, Table } from "antd";
import { inject, observer } from "mobx-react";
import moment from "moment";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
const { tableMaxHeight } = AppConsts;
const { remoteServiceBaseUrl } = AppConfiguration;

type Props = {
  unitStore: UnitStore;
  inquiryStore: InquiryStore;
  listingStore: ListingStore;
  appDataStore: AppDataStore;
};
const columns = [
  {
    title: L("LISTING"),
    dataIndex: "name",
    key: "name",
    width: "100%",
    ellipsis: true,
    render: (text, row) => {
      let price = new Intl.NumberFormat().format(row.price);
      return (
        <>
          <Card hoverable>
            <div className="w-100 d-flex justify-content-center align-items-center">
              <div className="w-75">
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <Link
                    to={{
                      pathname: portalLayouts.listingDetail.path.replace(
                        ":id",
                        row.id
                      ),
                    }}
                  >
                    <div className="h5">{row.listingName}</div>
                    <div className="h6">
                      {row.unitName} - {row.floorName}
                    </div>
                  </Link>
                  <span className="h6 text-success">$ {price}</span>
                </div>

                <Row gutter={16}>
                  <Col
                    sm={{ span: 24, offset: 0 }}
                    className="d-flex justify-content-start align-items-center"
                  >
                    <span className="text-primary">{L("IS_PUBLISH")}:</span>
                    {row.description ? (
                      <CheckCircleOutlined
                        style={{
                          color: "green",
                          padding: "0 6px",
                          fontSize: "16px",
                        }}
                      />
                    ) : (
                      <CloseCircleOutlined style={{ color: "red" }} />
                    )}
                  </Col>
                  <Col sm={{ span: 12, offset: 0 }}>
                    <span className="text-primary">{L("TYPE")}:</span>
                    <span className="text-muted ml-1">{row.typeName}</span>
                  </Col>
                  <Col sm={{ span: 12, offset: 0 }}>
                    <span className="text-primary">{L("STATUS")}:</span>
                    <span className="text-muted ml-1">{row.statusName}</span>
                  </Col>
                  <Col sm={{ span: 12, offset: 0 }}>
                    <span className="text-primary">{L("PUBLISH_DATE")}:</span>
                    <span className="text-muted ml-1">
                      {moment(row.publishDate).format("DD-MM-YYYY")}
                    </span>
                  </Col>
                  <Col sm={{ span: 12, offset: 0 }}>
                    <span className="text-primary">{L("AVAILABLE_DATE")}:</span>
                    <span className="text-muted ml-1">
                      {moment(row.dateAvailable).format("DD-MM-YYYY")}
                    </span>
                  </Col>
                  <Col sm={{ span: 24, offset: 0 }}>
                    <span className="text-primary">{L("DESCRIPTION")}:</span>
                    <span className="text-muted ml-1">
                      {row.description.length > 80
                        ? row.description.substring(0, 80 - 3) + "..."
                        : row.description}
                    </span>
                  </Col>
                </Row>
              </div>
              <div className="w-25 d-flex justify-content-end">
                <Image
                  width="160px"
                  height="120px"
                  src={
                    row.urlMainPhoto
                      ? remoteServiceBaseUrl + row.urlMainPhoto
                      : "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  }
                />
              </div>
            </div>
          </Card>
        </>
      );
    },
  },
];
const MatchingListing = inject(
  Stores.AppDataStore,
  Stores.InquiryStore,
  Stores.UnitStore,
  Stores.ListingStore
)(
  observer((props: Props) => {
    const match: any = useRouteMatch();
    React.useEffect(() => {
      if (match.params.id)
        props.inquiryStore.getMatchingListing(match.params.id);
    }, []);
    return (
      <div className="h-100 w-100">
        <DataTable>
          <Table
            size="middle"
            className="custom-ant-table"
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            loading={props.inquiryStore.isLoading}
            dataSource={props.inquiryStore.matchingListing?.items || []}
            scroll={{
              x: 800,
              y: tableMaxHeight,
              scrollToFirstRowOnChange: true,
            }}
          />
        </DataTable>
      </div>
    );
  })
);

export default MatchingListing;
