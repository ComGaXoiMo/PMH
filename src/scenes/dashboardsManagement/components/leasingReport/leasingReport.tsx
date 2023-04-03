import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Row, Col, Table } from "antd";
import BarChart from "../overview/barChart";
import { L } from "@lib/abpUtility";
// import Doughnut from "./doughnutChart";
// import BarChart from "./barChart";

export interface ILeasingProps {}

export interface ILeasingsReportState {}
const columns = [
  {
    title: L("STATUS"),
    children: [
      {
        dataIndex: "",
        width: "150px",
        render: () => <>{}</>,
      },
    ],
  },
  {
    title: L("TYPE"),
    children: [
      {
        title: "1:1",
        dataIndex: "",
        key: "",
        width: "",
        render: () => <>{}</>,
      },
      {
        title: "2:22",
        dataIndex: "",
        key: "",
        width: "",
        render: () => <>{}</>,
      },
      {
        title: "2:3",
        dataIndex: "",
        key: "",
        width: "",
        render: () => <>{}</>,
      },
      {
        title: "3:2",
        dataIndex: "",
        key: "",
        width: "",
        render: () => <>{}</>,
      },
      {
        title: "4:3",
        dataIndex: "",
        key: "",
        width: "",
        render: () => <>{}</>,
      },
      {
        title: "4:4",
        dataIndex: "",
        key: "",
        width: "",
        render: () => <>{}</>,
      },
    ],
  },
  {
    title: L("TOTAL"),
    children: [
      {
        title: "total",
        dataIndex: "",
        key: "",
        width: "",
        render: () => <>{}</>,
      },
    ],
  },
];
@inject()
@observer
class LeasingsReport extends AppComponentListBase<
  ILeasingProps,
  ILeasingsReportState
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
            <Col sm={{ span: 24, offset: 0 }}>
              <BarChart Title="Unit" />
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

export default LeasingsReport;
