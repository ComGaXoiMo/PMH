import * as React from "react";

import { inject, observer } from "mobx-react";
import DataTable from "@components/DataTable";
import gettColumns from "./components/leaseColumn";
import { Col, Dropdown, Menu, Row, Table } from "antd";
import AppDataStore from "@stores/appDataStore";
import { L } from "@lib/abpUtility";
import { MoreOutlined } from "@ant-design/icons/lib/icons";
import LeaseFilterPanel from "./components/leaseFilterPanel";

import Stores from "@stores/storeIdentifier";
import withRouter from "@components/Layout/Router/withRouter";
import LeaseModal from "./components/leaseModal";

export interface ILeaseProps {
  history: any;
  appDataStore: AppDataStore;
}

export interface ILeaseState {
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
class Leases extends React.Component<ILeaseProps, ILeaseState> {
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

  handleImport = async () => {
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
        <LeaseFilterPanel />
        <DataTable
          // extraFilterComponent={filterComponent}
          // onRefresh={this.getAll}
          onCreate={this.toggleModal}
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
        <LeaseModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleImport}
        />
      </>
    );
  }
}
export default withRouter(Leases);
const dataFake = {
  items: [
    {
      id: 66,
      contractNumber: "CT00000001",
      clientName: "Maria Saris",
      company: "CTCP COSCO",
      phone: "+84 9008079",
      unit: 302,
      rt: "6 Tháng",
      pPeriod: "1 Tháng",
      pDue: "0 Ngày",
      startDate: "3-Feb-23",
      endDate: "4-Feb-23",
      exchangeRate: "23.000",
      deposit: "15.000.000",
      rent: "15.000.000",
      paymentStatus: "Chưa thanh toán",
      contractStatus: "Hiệu lực",
    },
    {
      id: 67,
      contractNumber: "CT00000002",
      clientName: "Madelyn Culhane",
      company: "CTCP COSCO",
      phone: "+84 3138079",
      unit: 310,
      rt: "2 Tháng",
      pPeriod: "1 Tháng",
      pDue: "2 Ngày",
      startDate: "21-Feb-23",
      endDate: "29-Feb-23",
      exchangeRate: "23.000",
      deposit: "15.000.000",
      rent: "15.000.000",
      paymentStatus: "Chưa thanh toán",
      contractStatus: "Hiệu lực",
    },
    {
      id: 68,
      contractNumber: "CT00000003",
      clientName: "Jaxson Bator",
      // company:"CTCP COSCO",
      phone: "+84 9001239",
      unit: 212,
      rt: "1 Tháng",
      pPeriod: "1 Tháng",
      pDue: "4 Ngày",
      startDate: "13-Nov-23",
      endDate: "14-Nov-23",
      exchangeRate: "23.000",
      deposit: "15.000.000",
      rent: "15.000.000",
      paymentStatus: "6 Tháng",
      contractStatus: "Hiệu lực",
    },
  ],
};
