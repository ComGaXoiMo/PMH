import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Row, Col, Table } from "antd";
import DoughnutChart from "../overview/doughnutChart";
// import Doughnut from "./doughnutChart";
// import BarChart from "./barChart";

export interface IInquiriesReportProps {}

export interface IInquiriesReportState {}
const columns = [
  {
    title: "No.",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Booking code",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Unit No.",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Unit",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Unit type",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Tenant's name",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Nationality",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Arrival Date",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Contract Status",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Remark",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
];
@inject()
@observer
class InquiriesReport extends AppComponentListBase<
  IInquiriesReportProps,
  IInquiriesReportState
> {
  formRef: any = React.createRef();
  state = {};

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div className="dashboard-style">
          <Row gutter={[16, 20]}>
            <Col sm={{ span: 5, offset: 0 }}>
              <DoughnutChart Title="Prospect" />
            </Col>
            <Col sm={{ span: 5, offset: 0 }}>
              <DoughnutChart Title="Offer" />
            </Col>
            <Col sm={{ span: 5, offset: 0 }}>
              <DoughnutChart Title="Lease Agreement" />
            </Col>
            <Col sm={{ span: 5, offset: 0 }}>
              <DoughnutChart Title="Close" />
            </Col>
            <Col sm={{ span: 4, offset: 0 }}>
              <DoughnutChart Title="Dropped" />
            </Col>
            <Col sm={{ span: 24, offset: 0 }}>
              <Table
                scroll={{ y: 250 }}
                pagination={false}
                columns={columns}
                dataSource={[]}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default InquiriesReport;
