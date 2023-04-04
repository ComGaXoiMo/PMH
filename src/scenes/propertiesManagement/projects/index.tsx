import * as React from "react";

import { inject, observer } from "mobx-react";
import DataTable from "@components/DataTable";
import gettColumns from "./components/projectColumn";
import { Col, Dropdown, Menu, Row, Table } from "antd";
import Stores from "@stores/storeIdentifier";
import { MoreOutlined } from "@ant-design/icons";
import { L } from "@lib/abpUtility";
import ProjectFilterPanel from "./components/projectFilterPanel";
import AppDataStore from "@stores/appDataStore";
import { portalLayouts } from "@components/Layout/Router/router.config";
import ProjectStore from "@stores/projects/projectStore";
import { withRouter } from "react-router-dom";

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
      projectStore: { isLoading, tableData },
    } = this.props;

    const columns = gettColumns({
      title: L("PROPERTY"),
      dataIndex: "projectName",
      key: "projectName",
      width: "15%",
      // ellipsis: true,

      render: (projectName: string, item: any) => (
        <Row>
          <Col sm={{ span: 21, offset: 0 }}>
            <a
              onClick={
                // this.isGranted(appPermissions.unit.update)
                //   ? () => this.gotoDetail(item.id)
                //   : () => console.log()
                () => this.gotoDetail(item.id)
              }
              className="link-text-table"
            >
              {projectName}
            </a>
          </Col>
          <Col sm={{ span: 3, offset: 0 }}>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  {/* {this.isGranted(appPermissions.unit.delete) && ( */}
                  <Menu.Item
                    key={1}
                    // onClick={() =>
                    //   this.activateOrDeactivate(item.id, !item.isActive)
                    // }
                  >
                    {L(item.isActive ? "BTN_DEACTIVATE" : "BTN_ACTIVATE")}
                  </Menu.Item>
                  {/* )} */}
                </Menu>
              }
              placement="bottomLeft"
            >
              <button className="button-action-hiden-table-cell">
                <MoreOutlined />
              </button>
            </Dropdown>
          </Col>
        </Row>
      ),
    });
    return (
      <>
        <ProjectFilterPanel
          onCreate={() => {
            this.gotoDetail(null);
          }}
        />
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
            className="custom-ant-row"
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            loading={isLoading}
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
