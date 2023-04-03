import * as React from "react";
import gettColumns from "./components/allTaskColumn";

import { inject, observer } from "mobx-react";
import UnitFilterPanel from "./components/taskFilterPanel";
import AppConsts from "@lib/appconst";
import { L } from "@lib/abpUtility";
import { Button, Col, Row, Table } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons/lib/icons";
import DataTable from "@components/DataTable";
import TaskBoardView from "./components/taskBoardView";
// import { Table } from "antd";
const { align } = AppConsts;
import "./components/pipeline.less";
import withRouter from "@components/Layout/Router/withRouter";
import AllTaskModal from "./components/allTaskModal";
export interface IAllTaskProps {
  history: any;
}

export interface IAllTaskState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  projectId: number;
  visible: boolean;
  title: string;
  tabView: string;
  modalVisible: boolean;
}
const typeF = [
  {
    id: 1,
    name: "NotStart",
    value: "NotStart",
    label: "NotStart",
    borderColorCode: "#ff000030",
  },
  {
    id: 2,
    name: "Overdue",
    value: "Overdue",
    label: "Overdue",
    borderColorCode: "#1890ff30",
  },
  {
    id: 3,
    name: "DueToday",
    value: "DueToday",
    label: "DueToday",
    borderColorCode: "#52c41a30",
  },
  {
    id: 4,
    name: "Complete",
    value: "Complete",
    label: "Complete",
    borderColorCode: "#ffea002e",
  },
  {
    id: 5,
    name: "Cancle",
    value: "Cancle",
    label: "Cancle",
    borderColorCode: "#00ff2254e",
  },
  {
    id: 6,
    name: "Close",
    value: "Close",
    label: "Close",
    borderColorCode: "#5d2feb30",
  },
];
const tabKeys = {
  boardView: L("BOARD_VIEW"),
  listView: L("LIST_VIEW"),
};
@inject()
@observer
class AllTask extends React.Component<IAllTaskProps, IAllTaskState> {
  formRef: any = React.createRef();
  state = {
    maxResultCount: 10,
    skipCount: 0,
    projectId: 0,
    projectProvinces: [],
    filters: {},
    visible: false,
    title: L("CREATE"),
    tabView: tabKeys.boardView,
    modalVisible: false,
  };

  async componentDidMount() {
    await this.getAll();
    await Promise.all([]);
  }
  getAll = async () => {
    console.log(1);
  };
  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };
  toggleModal = () =>
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));

  handleImport = async () => {
    await this.getAll();
    this.toggleModal();
  };
  changeTab = async (value) => {
    await this.setState({ tabView: value.target.value });
  };

  public render() {
    const {
      // AllTasktore: { tableData },
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
            onClick={() => this.toggleModal()}
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
          <UnitFilterPanel
            changeTab={this.changeTab}
            onCreate={() => {
              this.toggleModal();
            }}
          />
          {this.state.tabView === tabKeys.listView && (
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
          {this.state.tabView === tabKeys.boardView && (
            <Row gutter={[16, 10]} className="mt-3 wrap-pipeline-flex">
              <Col
                sm={{ span: 24, offset: 0 }}
                className="pipeline-view-wrapper"
              >
                {typeF.map((status, index) => (
                  <TaskBoardView index={index} key={index} status={status} />
                ))}
              </Col>
            </Row>
          )}
        </div>
        <AllTaskModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleImport}
        />
      </>
    );
  }
}

export default withRouter(AllTask);
