import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Row, Col, Table } from "antd";
import DoughnutChart from "../overview/doughnutChart";
// import Doughnut from "./doughnutChart";
// import BarChart from "./barChart";

export interface IClientsReportProps {}

export interface IClientsReportState {}
const columns = [
  {
    title: "Company Name",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Industry",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Total Contract Amount",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Type",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Total Area (M2)",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Bacony",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Actual Area (M2)",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "View",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Lease Term",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
];
@inject()
@observer
class ClientsReport extends AppComponentListBase<
  IClientsReportProps,
  IClientsReportState
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
            <Col sm={{ span: 12, offset: 0 }}>
              <DoughnutChart Title="Top 5 Clients" />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <DoughnutChart Title="Top 5 Client Industry" />
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

export default ClientsReport;
