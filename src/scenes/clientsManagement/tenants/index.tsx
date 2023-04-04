import * as React from "react";

import { inject, observer } from "mobx-react";
import DataTable from "@components/DataTable";
import gettColumns from "./components/tenantsColumn";
import { Col, Dropdown, Menu, Row, Table } from "antd";
import AppDataStore from "@stores/appDataStore";
import ProjectStore from "@stores/projects/projectStore";
import { withRouter } from "react-router-dom";
import { L } from "@lib/abpUtility";

import { MoreOutlined } from "@ant-design/icons/lib/icons";
import TenantsFilterPanel from "./components/tenantsFilterPanel";

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
class Tenants extends React.Component<any> {
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
      title: L("BOOKING_CODE"),
      dataIndex: "bookingCode",
      key: "bookingCode",
      width: "15%",
      render: (bookingCode: string, item: any) => (
        <Row>
          <Col sm={{ span: 19, offset: 0 }}>
            <a
              onClick={
                // this.isGranted(appPermissions.unit.update)
                //   ? () => this.gotoDetail(item.id)
                //   : () => console.log()
                () => this.gotoDetail(item.id)
              }
              className="link-text-table"
            >
              {bookingCode}
            </a>
          </Col>
          <Col sm={{ span: 5, offset: 0 }}>
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
        <TenantsFilterPanel />
        <DataTable
          // extraFilterComponent={filterComponent}
          // onRefresh={this.getAll}
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
export default withRouter(Tenants);

const dataFake = {
  items: [
    {
      id: 31,
      bookingCode: "29122022 - 01",
      unitNo: "The Antonia",
      unit: 302,
      unitType: "2BR",
      tenantName: "Mr. Takuda",
      nationality: "JAPANESE",
      arrivalDate: "3-Feb-23",
      derpartureDate: "4-Feb-23",
      contractStatus: "Complete",
      remark: "BILLS TO GUEST - 35% OFF",
    },
    {
      id: 32,
      bookingCode: "24112022 - 01",
      unitNo: "The Antonia",
      unit: 303,
      unitType: "2BR",
      tenantName: "MR. PARK",
      nationality: "KOREAN",
      arrivalDate: "3-Feb-23",
      derpartureDate: "4-Feb-23",
      contractStatus: "Complete",
      remark: "BILLS TO GUEST - 35% OFF",
    },
    {
      id: 33,
      bookingCode: "29112022 -02",
      unitNo: "The Antonia",
      unit: 403,
      unitType: "2BR",
      tenantName: "Mr. Takuda",
      nationality: "JAPANESE",
      arrivalDate: "3-Feb-23",
      derpartureDate: "4-Feb-23",
      contractStatus: "Complete",
      remark: "BILLS TO GUEST - 35% OFF",
    },
    {
      id: 34,
      bookingCode: "29112022 - 11",
      unitNo: "The Antonia",
      unit: 502,
      unitType: "2BR",
      tenantName: "Ms. Lan",
      nationality: "VIETNAMESE",
      arrivalDate: "3-Feb-23",
      derpartureDate: "4-Feb-23",
      contractStatus: "Complete",
      remark: "BILLS TO GUEST - 35% OFF",
    },
  ],
};
