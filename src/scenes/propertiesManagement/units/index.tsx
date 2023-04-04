import * as React from "react";
import gettColumns from "./components/unitColumn";

import { inject, observer } from "mobx-react";
import UnitFilterPanel from "./components/unitFilterPanel";
import { L } from "@lib/abpUtility";
import { Col, Dropdown, Menu, Row, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons/lib/icons";
import DataTable from "@components/DataTable";
import Stores from "@stores/storeIdentifier";
import UnitStore from "@stores/projects/unitStore";
import UnitModal from "./components/unitModal";
import StackPland from "./components/stackPland";
import { AppComponentListBase } from "@components/AppComponentBase";
import withRouter from "@components/Layout/Router/withRouter";
// import { Table } from "antd";

export interface IUnitProps {
  history: any;
  projectId: any;
  unitStore: UnitStore;
}

export interface IUnitState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  visible: boolean;
  tabView: string;
  unitId: any;
}
const tabKeys = {
  gridView: L("GRID_VIEW"),
  listView: L("LIST_VIEW"),
};
@inject(Stores.UnitStore)
@observer
class Units extends AppComponentListBase<IUnitProps, IUnitState> {
  formRef: any = React.createRef();
  state = {
    maxResultCount: 10,
    skipCount: 0,
    projectProvinces: [],
    unitId: undefined,
    filters: {
      time: "",
      projectId: this.props.projectId ?? undefined,
      floorId: 0,
      typeId: 0,
      statusId: 0,
    },
    visible: false,
    tabView: tabKeys.listView,
  };

  async componentDidMount() {
    await this.getAll();

    await Promise.all([]);
  }

  getAll = async () => {
    await this.props.unitStore.getAllRes({
      ProjectId: this.props.projectId,
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
  handleFilterChange = async (filters) => {
    await this.setState({ filters }, this.getAll);
  };

  gotoDetail = (id?) => {
    if (id) {
      this.setState({ unitId: id, visible: true });
    } else {
      // this.setState({ idBatch: null })
      this.setState({ unitId: undefined, visible: true });
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
      // title: L("PROPERTY"),
      // dataIndex: "projectName",
      // key: "projectName",
      // width: "15%",
      // ellipsis: true,
      title: L("UNIT"),
      children: [
        {
          dataIndex: "unitName",
          key: "unitName",
          fixed: "left",
          width: "250px",
          // ellipsis: true,
          render: (unitName: string, item: any) => (
            <Row>
              <Col sm={{ span: 20, offset: 0 }}>
                <a
                  onClick={
                    // this.isGranted(appPermissions.unit.update)
                    //   ? () => this.gotoDetail(item.id)
                    //   : () => console.log()
                    () => this.gotoDetail(item.id)
                  }
                  className="link-text-table"
                >
                  {unitName}
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
        },
      ],
    });
    return (
      <>
        <div>
          <UnitFilterPanel
            projectId={this.props.projectId}
            tabKeys={tabKeys}
            changeTab={this.changeTab}
            handleSearch={this.handleFilterChange}
            onCreate={() => {
              this.gotoDetail(undefined);
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
                className="custom-ant-row"
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
            <div style={{ maxHeight: "75vh", overflowY: "scroll" }}>
              <StackPland
                goDetail={this.gotoDetail}
                loading={isLoading}
                projectId={this.state.filters?.projectId}
              />
            </div>
          )}
        </div>
        <UnitModal
          id={this.state.unitId}
          visible={this.state.visible}
          onCancel={() => {
            this.getAll(), this.setState({ visible: false });
          }}
        />
      </>
    );
  }
}

export default withRouter(Units);
