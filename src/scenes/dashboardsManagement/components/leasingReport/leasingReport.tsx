import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Row, Col, Table } from "antd";
import BarChart from "../overview/barChart";
import { L } from "@lib/abpUtility";
import InOutChart from "./inOutChart";
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
const columnsInOut = [
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
    width: "project",
    render: (project) => <>{project}</>,
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
    width: "unit",
    render: (unit) => <>{unit}</>,
  },
  {
    title: "Tenant",
    dataIndex: "tenant",
    key: "tenant",
    width: "tenant",
    render: (tenant) => <>{tenant ?? "---"}</>,
  },
  {
    title: "Count Day Free",
    dataIndex: "count",
    key: "count",
    width: "count",
    render: (count) => <>{count}</>,
  },
  {
    title: "type ",
    dataIndex: "type",
    key: "type",
    width: "type",
    render: (type) => <>{type?.name}</>,
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
            <Col sm={{ span: 12, offset: 0 }}>
              <BarChart Title="Leasing" />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Table
                scroll={{ y: 250 }}
                pagination={false}
                columns={columns}
                dataSource={[]}
              />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <InOutChart Title="In - Out" data={dataInOut} />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Table
                scroll={{ y: 250 }}
                pagination={false}
                columns={columnsInOut}
                dataSource={dataInOut === undefined ? [] : dataInOut}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default LeasingsReport;

const dataInOut = [
  {
    project: "project 01",
    count: 9,
    typeId: 1,
    type: {
      id: 1,
      name: "0-15",
    },
    unit: "a1",
    tenant: "ms. He",
  },
  {
    project: "project 02",
    count: 12,
    typeId: 2,
    type: {
      id: 2,
      name: "15-30",
    },
    unit: "a2",
    tenant: "mr. Hoang",
  },
  {
    project: "project 03",
    count: 23,
    typeId: 3,
    type: {
      id: 3,
      name: "30-45",
    },
    unit: "b2",
    tenant: "ms. Hoa",
  },
  {
    project: "project 04",
    count: 93,
    typeId: 4,
    type: {
      id: 4,
      name: "45-...",
    },
    unit: "c4",
    tenant: null,
  },
];
