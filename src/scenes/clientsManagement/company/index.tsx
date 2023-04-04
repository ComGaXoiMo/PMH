import * as React from "react";

import { inject, observer } from "mobx-react";
import DataTable from "@components/DataTable";
import gettColumns from "./components/companyColumn";
import { Col, Dropdown, Menu, Row, Table } from "antd";
import AppDataStore from "@stores/appDataStore";
import { L } from "@lib/abpUtility";
import { MoreOutlined } from "@ant-design/icons/lib/icons";
import Stores from "@stores/storeIdentifier";
import withRouter from "@components/Layout/Router/withRouter";
import CompanyFilterPanel from "./components/companyFilterPanel";
import CompanyStore from "@stores/clientManagement/companyStore";
import CompanyModal from "./components/companyModal";
import CompanyCreateModal from "./components/companyCreateModal";

export interface IContactProps {
  history: any;
  appDataStore: AppDataStore;
  companyStore: CompanyStore;
}

export interface IContactState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  modalVisible: boolean;
  visible: boolean;
  projectId: number;
  dataModal: any;
}

@inject(Stores.CompanyStore)
@inject(Stores.AppDataStore)
@inject()
@observer
class Company extends React.Component<IContactProps, IContactState> {
  state = {
    maxResultCount: 10,
    skipCount: 0,
    modalVisible: false,
    projectId: 0,
    projectProvinces: [],
    filters: {},
    visible: false,
    dataModal: {},
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
    await this.props.companyStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      isShowInActive: false,
      isShowNotVerified: false,
      ...this.state.filters,
    });
  };
  gotoDetail = async (id) => {
    if (id) {
      await this.props.companyStore.get(id);

      this.setState({ visible: true });
    } else {
      // this.setState({ idBatch: null })
      this.setState({ visible: true });
    }
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

  public render() {
    const {
      companyStore: { isLoading, tableData },
    } = this.props;
    const columns = gettColumns({
      title: L("COMPANY_NAME"),
      dataIndex: "businessName",
      key: "businessName",
      width: "15%",
      render: (businessName: string, item: any) => (
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
              {businessName}
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
        <CompanyFilterPanel
          onCreate={() => {
            this.toggleModal();
          }}
        />
        <DataTable
          // extraFilterComponent={filterComponent}
          // onRefresh={this.getAll}
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
        {this.state.visible && (
          <CompanyModal
            companyStore={this.props.companyStore}
            appDataStore={this.props.appDataStore}
            data={this.props.companyStore?.editCompany}
            visible={this.state.visible}
            onCancel={() => {
              this.getAll(), this.setState({ visible: false });
            }}
          />
        )}
        <CompanyCreateModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleImport}
        />
      </>
    );
  }
}
export default withRouter(Company);
