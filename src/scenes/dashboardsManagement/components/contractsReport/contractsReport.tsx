import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Row, Col, Table } from "antd";
import DoughnutChart from "../overview/doughnutChart";
// import Doughnut from "./doughnutChart";
// import BarChart from "./barChart";

export interface IContractsReportProps {}

export interface IContractsReportState {}
const columns = [
  {
    title: "No.",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Contract Number",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Tenant",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Company",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Project",
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
    title: "Price Rent(USD)",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "End Date",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Payment Status",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Deposit Status",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
];
@inject()
@observer
class ContractsReport extends AppComponentListBase<
  IContractsReportProps,
  IContractsReportState
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
            <Col sm={{ span: 8, offset: 0 }}>
              <DoughnutChart Title="Lease Contract" />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <DoughnutChart Title="Deposit" />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <DoughnutChart Title="Expiring leased" />
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

export default ContractsReport;
