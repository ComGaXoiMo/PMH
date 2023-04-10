import * as React from "react";

import { inject, observer } from "mobx-react";
import DataTable from "@components/DataTable";
import gettColumns from "./components/depositColumn";
import { Col, Dropdown, Menu, Row, Table } from "antd";
import AppDataStore from "@stores/appDataStore";
import { L } from "@lib/abpUtility";
import { MoreOutlined } from "@ant-design/icons/lib/icons";
import DepositFilterPanel from "./components/depositFilterPanel";

import Stores from "@stores/storeIdentifier";
import withRouter from "@components/Layout/Router/withRouter";

export interface IDepositProps {
  history: any;
  appDataStore: AppDataStore;
}

export interface IDepositState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  modalVisible: boolean;
  projectId: number;
}

@inject(Stores.AppDataStore)
@inject()
@observer
class Deposits extends React.Component<IDepositProps, IDepositState> {
  formRef: any = React.createRef();

  state = {
    maxResultCount: 10,
    skipCount: 0,
    modalVisible: false,
    projectId: 0,
    projectProvinces: [],
    filters: {},
  };

  async componentDidMount() {
    await this.getAll();

    await Promise.all([]);
  }
  getAll = async () => {
    await Promise.all([
      this.props.appDataStore.getPositionLevels({}),
      this.props.appDataStore.getCountries({}),
    ]);
  };
  toggleModal = () =>
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));

  handleOk = async () => {
    await this.getAll();
    this.toggleModal();
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
  gotoDetail = (id) => {};

  public render() {
    const {} = this.props;
    const columns = gettColumns({
      title: L("CONTACTS_NUMBER"),
      dataIndex: "contractNumber",
      key: "contractNumber",
      width: "200px",
      ellipsis: true,

      render: (contractNumber: string, item: any) => (
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
              {contractNumber}
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
        <DepositFilterPanel />
        <DataTable
          // extraFilterComponent={filterComponent}
          // onRefresh={this.getAll}
          // onCreate={this.toggleModal}
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
export default withRouter(Deposits);
const dataFake = {
  items: [
    {
      id: 31,
      contractNumber: "CT00000001",
      tenant: "Maria Saris",
      project: "The Horizon",
      unit: 302,
      priceDeposit: "150.000",
      endDate: "30/01/2022",
      princeRent: "450.000",
      paymentStatus: "Wait for pay",
    },
    {
      id: 11,
      contractNumber: "CT00000002",
      tenant: "Julia Aris",
      project: "The Antonia",
      unit: 302,
      priceDeposit: "150.000",
      endDate: "30/01/2022",
      princeRent: "150.000",
      paymentStatus: "Wait for pay",
    },
    {
      id: 32,
      contractNumber: "CT00000003",
      tenant: "Marilyn Calzoni",
      project: "The Antonia",
      unit: 302,
      priceDeposit: "150.000",
      endDate: "30/01/2022",
      princeRent: "350.000",
      paymentStatus: "Wait for pay",
    },
  ],
};
