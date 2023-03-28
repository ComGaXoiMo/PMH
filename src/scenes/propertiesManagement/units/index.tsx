import * as React from "react";
import gettColumns from "./components/unitColumn";

import { inject, observer } from "mobx-react";
import UnitFilterPanel from "./components/unitFilterPanel";
import AppConsts from "@lib/appconst";
import { L } from "@lib/abpUtility";
import { Button, Table } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons/lib/icons";
import DataTable from "@components/DataTable";
import Stores from "@stores/storeIdentifier";
import UnitStore from "@stores/projects/unitStore";
import { withRouter } from "react-router-dom";
import UnitModal from "./components/unitModal";
import StackPland from "./components/stackPland";
// import { Table } from "antd";
const { align } = AppConsts;

export interface IUnitProps {
  history: any;

  unitStore: UnitStore;
}

export interface IUnitState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  projectId: number;
  visible: boolean;
  title: string;
  tabView: string;
}
const tabKeys = {
  gridView: L("GRID_VIEW"),
  listView: L("LIST_VIEW"),
};
@inject(Stores.UnitStore)
@observer
class Units extends React.Component<any> {
  formRef: any = React.createRef();
  state = {
    maxResultCount: 10,
    skipCount: 0,
    projectId: 0,
    projectProvinces: [],
    filters: {},
    visible: false,
    title: L("CREATE"),
    tabView: tabKeys.gridView,
  };

  async componentDidMount() {
    await this.getAll();

    await Promise.all([]);
  }

  getAll = async () => {
    await this.props.unitStore.getAllRes({
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
      unitStore: { isLoading, tableData },
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
          <UnitFilterPanel
            tabKeys={tabKeys}
            changeTab={this.changeTab}
            onCreate={() => {
              this.gotoDetail(null);
            }}
          />
          {this.state.tabView === tabKeys.listView && (
            <DataTable
              // extraFilterComponent={filterComponent}
              // onRefresh={this.getAll}
              // onCreate={() => this.gotoDetail(null)}
              pagination={{
                pageSize: this.state.maxResultCount,
                total: tableData === undefined ? 0 : tableData.totalCount,
                onChange: this.handleTableChange,
              }}
            >
              <Table
                size="middle"
                className=""
                rowKey={(record) => record.id}
                columns={columns}
                loading={isLoading}
                pagination={false}
                dataSource={tableData === undefined ? [] : tableData.items}
                scroll={{ x: 800, y: 500, scrollToFirstRowOnChange: true }}
                bordered
              />
            </DataTable>
          )}
          {this.state.tabView === tabKeys.gridView && (
            <div>
              <StackPland loading={isLoading} projectId={82} />
            </div>
          )}
          <UnitModal
            title={this.state.title}
            id={1}
            visible={this.state.visible}
            onCancel={() => {
              this.getAll(), this.setState({ visible: false });
            }}
          />
        </div>
      </>
    );
  }
}

export default withRouter(Units);
