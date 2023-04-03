import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Row, Col, Table } from "antd";
import DoughnutChart from "../overview/doughnutChart";
// import Doughnut from "./doughnutChart";
// import BarChart from "./barChart";

export interface IStaffsReportProps {}

export interface IStaffsReportState {}
const columns = [
  {
    title: "Id",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Modul",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Subject",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Description",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Pic",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Due Date",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
  {
    title: "Status",
    dataIndex: "",
    key: "",
    width: "",
    render: () => <>{}</>,
  },
];
@inject()
@observer
class StaffsReport extends AppComponentListBase<
  IStaffsReportProps,
  IStaffsReportState
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
              <DoughnutChart Title="Inquiries " />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <DoughnutChart Title="Contracts" />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <DoughnutChart Title="Tasks" />
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

export default StaffsReport;
