import * as React from "react";

import { inject, observer } from "mobx-react";
import DataTable from "@components/DataTable";
import gettColumns from "./components/projectColumn";
import { Button, Table } from "antd";
import Stores from "@stores/storeIdentifier";
import AppConsts from "@lib/appconst";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { L } from "@lib/abpUtility";
import ProjectFilterPanel from "./components/projectFilterPanel";
import AppDataStore from "@stores/appDataStore";
import { portalLayouts } from "@components/Layout/Router/router.config";
import ProjectStore from "@stores/projects/projectStore";
import { withRouter } from "react-router-dom";

const { align } = AppConsts;
export interface IProjectProps {
  history: any;
  appDataStore: AppDataStore;
  projectStore: ProjectStore;
}

export interface IProjectState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  projectId: number;
}

@inject(Stores.ProjectStore)
@observer
class Projects extends React.Component<any> {
  formRef: any = React.createRef();

  state = {
    maxResultCount: 10,
    skipCount: 0,
    projectId: 0,
    projectProvinces: [],
    filters: {},
  };

  async componentDidMount() {
    await this.getAll();

    await Promise.all([]);
  }
  getAll = async () => {
    await this.props.projectStore.getAll({
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
  handleFilterChange = (filters) => {
    this.setState({ filters }, this.getAll);
  };
  gotoDetail = (id) => {
    const { history } = this.props;
    id
      ? history.push(portalLayouts.projectsDetail.path.replace(":id", id))
      : history.push(portalLayouts.projectsCreate.path);
  };

  public render() {
    const {
      projectStore: { tableData },
    } = this.props;

    const columns = gettColumns({
      title: L("ACTIONS"),
      dataIndex: "operation",
      key: "operation",
      align: align.right,
      width: "10%",
      render: (text: string, item: any) => (
        <div>
          {/* {this.isGranted(appPermissions.a.update) && ( */}
          <Button
            size="small"
            className="ml-1"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => this.gotoDetail(item.id)}
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
        <ProjectFilterPanel />
        <DataTable
          // extraFilterComponent={filterComponent}
          // onRefresh={this.getAll}
          onCreate={() => this.gotoDetail(null)}
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
            pagination={false}
            dataSource={tableData === undefined ? [] : tableData.items}
            bordered
            scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
          />
        </DataTable>
      </>
    );
  }
}
export default withRouter(Projects);
