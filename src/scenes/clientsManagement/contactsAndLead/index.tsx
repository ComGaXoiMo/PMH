import * as React from "react";

import { inject, observer } from "mobx-react";
import DataTable from "@components/DataTable";
import gettColumns from "./components/contactsAndLeadColumn";
import { Col, Dropdown, Menu, Row, Table } from "antd";
import AppDataStore from "@stores/appDataStore";
import { L } from "@lib/abpUtility";

import { MoreOutlined } from "@ant-design/icons/lib/icons";
import ContactsAndLeadFilterPanel from "./components/contactsAndLeadFilterPanel";
import ContactStore from "@stores/clientManagement/contactStore";
import Stores from "@stores/storeIdentifier";
import withRouter from "@components/Layout/Router/withRouter";
import CreateContractModal from "./components/createContractModal";
import ContractDetailModal from "./components/contractDetailModal";

export interface IContactProps {
  history: any;
  appDataStore: AppDataStore;
  contactStore: ContactStore;
}

export interface IContactState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  modalVisible: boolean;
  projectId: number;
  visible: boolean;
  title: string;
}

@inject(Stores.ContactStore)
@inject(Stores.AppDataStore)
@inject()
@observer
class ContactsAndLead extends React.Component<IContactProps, IContactState> {
  formRef: any = React.createRef();

  state = {
    maxResultCount: 10,
    skipCount: 0,
    modalVisible: false,
    projectId: 0,
    projectProvinces: [],
    filters: {},
    visible: false,
    title: L("CREATE"),
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
    await this.props.contactStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      isShowInActive: false,
      isShowNotVerified: false,
      ...this.state.filters,
    });
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
  gotoDetail = async (id) => {
    if (id) {
      await this.props.contactStore.get(id, false);
      this.setState({ visible: true });
    } else {
      // this.setState({ idBatch: null })
      this.setState({ visible: true });
    }
  };
  handleFilterChange = (filters) => {
    this.setState({ filters }, this.getAll);
  };

  public render() {
    const {
      contactStore: { tableData, isLoading },
    } = this.props;
    const columns = gettColumns({
      title: L("CONTACTS_NAME"),
      dataIndex: "contactName",
      key: "contactName",
      width: "15%",
      render: (contactName: string, item: any) => (
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
              {contactName}
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
        <ContactsAndLeadFilterPanel
          onCreate={() => {
            this.toggleModal();
          }}
        />
        <DataTable
          // extraFilterComponent={filterComponent}
          // onRefresh={this.getAll}
          // onCreate={this.toggleModal}
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
            dataSource={tableData === undefined ? [] : tableData.items}
            loading={isLoading}
            bordered
            scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
          />
        </DataTable>
        <ContractDetailModal
          data={this.props.contactStore?.editContact}
          visible={this.state.visible}
          onCancel={() => {
            this.getAll(), this.setState({ visible: false });
          }}
        />
        <CreateContractModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleImport}
        />
      </>
    );
  }
}
export default withRouter(ContactsAndLead);
