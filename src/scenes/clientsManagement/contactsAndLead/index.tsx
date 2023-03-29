import * as React from "react";

import { inject, observer } from "mobx-react";
import DataTable from "@components/DataTable";
import gettColumns from "./components/contactsAndLeadColumn";
import { Button, Table } from "antd";
import AppDataStore from "@stores/appDataStore";
import { L } from "@lib/abpUtility";
import AppConsts from "@lib/appconst";
import { EditOutlined } from "@ant-design/icons";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons/lib/icons";
import ContactsAndLeadFilterPanel from "./components/contactsAndLeadFilterPanel";
import ContactStore from "@stores/clientManagement/contactStore";
import Stores from "@stores/storeIdentifier";
import withRouter from "@components/Layout/Router/withRouter";
import CreateContractModal from "./components/createContractModal";
import ContractDetailModal from "./components/contractDetailModal";

const { align } = AppConsts;
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
            className=""
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
          title={this.state.title}
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
