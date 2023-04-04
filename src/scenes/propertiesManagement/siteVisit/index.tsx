import * as React from "react";

import { inject, observer } from "mobx-react";
import DataTable from "@components/DataTable";
import gettColumns from "./components/siteVisitColumn";
import { Col, Dropdown, Menu, Row, Table } from "antd";
import SiteVisitFilterPanel from "./components/siteVisitFilterPanel";
import AppDataStore from "@stores/appDataStore";
import ProjectStore from "@stores/projects/projectStore";
import { withRouter } from "react-router-dom";
import { L } from "@lib/abpUtility";
import { MoreOutlined } from "@ant-design/icons/lib/icons";

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

@inject()
@observer
class SiteVisit extends React.Component<any> {
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
  getAll = async () => {};

  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };
  handleFilterChange = (filters) => {
    this.setState({ filters }, this.getAll);
  };
  gotoDetail = (id) => {};

  public render() {
    const {
      // projectStore: { tableData },
    } = this.props;
    const columns = gettColumns({
      title: L("PROPERTY"),
      dataIndex: "property",
      key: "property",
      width: "10%",
      ellipsis: true,

      render: (property: string, item: any) => (
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
              {property}
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
        <SiteVisitFilterPanel />
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
            className="custom-ant-row"
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            dataSource={dataFake === undefined ? [] : dataFake.items}
            bordered
            scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
          />
        </DataTable>
      </>
    );
  }
}
export default withRouter(SiteVisit);

const dataFake = {
  items: [
    {
      id: 11,
      property: "The Horizon",
      unit: "803A",
      agent: "Agent 01",
      date: "29/12/2022 - 12:00",
    },
    {
      id: 12,
      property: "The Horizon",
      unit: "401C",
      agent: "Agent 02",
      date: "29/12/2022 - 12:00",
    },
    {
      id: 13,
      property: "The Horizon",
      unit: "303A",
      agent: "Agent 03",
      date: "29/12/2022 - 12:00",
    },
    {
      id: 14,
      property: "The Horizon",
      unit: "503A",
      agent: "Agent 04",
      date: "29/12/2022 - 12:00",
    },
  ],
};
