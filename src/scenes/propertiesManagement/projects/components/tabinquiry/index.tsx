import * as React from "react";
import gettColumns from "./components/inquiruesColumn";

import { inject, observer } from "mobx-react";
import UnitFilterPanel from "./components/inquiriesFilterPanel";
import AppConsts from "@lib/appconst";
import { L } from "@lib/abpUtility";
import { Button, Col, Row, Table } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons/lib/icons";
import DataTable from "@components/DataTable";
import { withRouter } from "react-router-dom";
import InquiriesBoardView from "./components/inquiriesBoardView";
// import { Table } from "antd";
const { align } = AppConsts;
import "./components/pipeline-view.less";
export interface IInquiriesProps {
  history: any;
}

export interface IInquiriesstate {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  projectId: number;
  visible: boolean;
  title: string;
  tabView: string;
}
const typeF = [
  {
    id: 1,
    name: "Prospect",
    value: "Prospect",
    label: "Prospect",
    borderColorCode: "red",
  },
  {
    id: 2,
    name: "Offer",
    value: "Offer",
    label: "Offer",
    borderColorCode: "blue",
  },
  {
    id: 3,
    name: "LeaseAgreement",
    value: "LeaseAgreement",
    label: "LeaseAgreement",
    borderColorCode: "black",
  },
  {
    id: 4,
    name: "Close",
    value: "Close",
    label: "Close",
    borderColorCode: "pink",
  },
  {
    id: 5,
    name: "Dropped",
    value: "Dropped",
    label: "Dropped",
    borderColorCode: "yellow",
  },
];
@inject()
@observer
class Inquiries extends React.Component<any> {
  formRef: any = React.createRef();
  state = {
    maxResultCount: 10,
    skipCount: 0,
    projectId: 0,
    projectProvinces: [],
    filters: {},
    visible: false,
    title: L("CREATE"),
    tabView: "BOARD_VIEW",
  };

  async componentDidMount() {
    await this.getAll();
    await Promise.all([]);
  }
  getAll = async () => {
    await this.props.InquiriesListtore.getAllRes({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      ...this.state.filters,
    });
  };
  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };
  gotoDetail = (id?, title?) => {
    if (id) {
      this.setState({ title: title });
      this.setState({ visible: true });
    } else {
      // this.setState({ idBatch: null })
      this.setState({ visible: true });
    }
  };
  changeTab = async (value) => {
    await this.setState({ tabView: value.target.value });
  };

  public render() {
    const {
      // InquiriesListtore: { tableData },
    } = this.props;
    const columns = gettColumns({
      title: L("ACTIONS"),
      dataIndex: "operation",
      key: "operation",
      align: align.right,
      width: "150px",
      render: (text: string, item: any) => (
        <div>
          {/* {this.isGranted(appPermissions.a.update) && ( */}
          <Button
            size="small"
            className="ml-1"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => this.gotoDetail(item.id, item.name)}
          />
          {/* )} */}
          {/* {this.isGranted(appPermissions.a.delete) && ( */}
          <Button
            size="small"
            className="ml-1"
            shape="circle"
            icon={item.isActive ? <CloseOutlined /> : <CheckOutlined />}
            // onClick={() => this.activateOrDeactivate(item.id, !item.isActive)}
          />
          {/* )} */}
        </div>
      ),
    });
    return (
      <>
        <div>
          <UnitFilterPanel changeTab={this.changeTab} />
          {this.state.tabView === "LIST_VIEW" && (
            <DataTable
              // extraFilterComponent={filterComponent}
              // onRefresh={this.getAll}
              // onCreate={() => this.gotoDetail(null)}
              pagination={{
                pageSize: this.state.maxResultCount,
                // total: tableData === undefined ? 0 : tableData.totalCount,
                onChange: this.handleTableChange,
              }}
            >
              <Table
                size="middle"
                className=""
                rowKey={(record) => record.id}
                columns={columns}
                pagination={false}
                // dataSource={tableData === undefined ? [] : tableData.items}
                scroll={{ x: 800, y: 500, scrollToFirstRowOnChange: true }}
                bordered
              />
            </DataTable>
          )}
          {this.state.tabView === "BOARD_VIEW" && (
            <Row gutter={[16, 10]} className="mt-3 iqr-wrap-pipeline-flex">
              <Col
                sm={{ span: 24, offset: 0 }}
                className="iqr-pipeline-view-wrapper"
              >
                {typeF.map((status, index) => (
                  <InquiriesBoardView
                    index={index}
                    key={index}
                    status={status}
                  />
                ))}
              </Col>
            </Row>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(Inquiries);
