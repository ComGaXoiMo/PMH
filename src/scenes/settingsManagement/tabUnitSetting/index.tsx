import * as React from "react";

import { Col, Dropdown, Input, Menu, Modal, Row, Table } from "antd";
import { inject, observer } from "mobx-react";

import AppComponentBase from "../../../components/AppComponentBase";
import { EntityDto } from "../../../services/dto/entityDto";
import { L, LNotification } from "../../../lib/abpUtility";
import DataTable from "../../../components/DataTable";
import { MoreOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";
import getColumns from "./columns";
import withRouter from "@components/Layout/Router/withRouter";
import AppDataStore from "@stores/appDataStore";
import Stores from "@stores/storeIdentifier";
import CreateUnitSettingModal from "./components/createModal";

export interface IUnitSettingProps {
  appDataStore: AppDataStore;
}

export interface IUnitSettingState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  UnitSettingId: number;
  filter: string;
  data: any;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject(Stores.AppDataStore)
@observer
class UnitSetting extends AppComponentBase<
  IUnitSettingProps,
  IUnitSettingState
> {
  formRef: any = React.createRef();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    data: {},
    UnitSettingId: 0,
    filter: "",
  };

  get currentPage() {
    return Math.floor(this.state.skipCount / this.state.maxResultCount) + 1;
  }

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {
    this.props.appDataStore.getUnitCategories({});
  }

  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };

  toggleModal = async (id?) => {
    const {
      appDataStore: { unitStatus },
    } = this.props;
    if (id) {
      const res = (unitStatus || []).find((item) => item.id === id);

      await this.setState((prevState) => ({
        modalVisible: !prevState.modalVisible,
        data: res,
      }));
    } else {
      this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
    }
  };
  handleImport = async () => {
    this.toggleModal();
    await this.getAll();
  };
  delete(input: EntityDto) {
    confirm({
      title: LNotification("DO_YOU_WANT_TO_DEACTIVATE_THIS_ITEM"),
      okText: L("BTN_YES"),
      cancelText: L("BTN_NO"),
      onOk() {},
      onCancel() {},
    });
  }

  updateSearch = debounce((event) => {
    this.setState({ filter: event.target?.value });
  }, 100);

  handleSearch = (value: string) => {
    this.setState(
      { filter: value, skipCount: 0 },
      async () => await this.getAll()
    );
  };

  renderFilterComponent = () => {
    const keywordPlaceHolder = `${this.L("ST_UnitSetting_UNIQUE_NAME")}`;
    return (
      <Row gutter={[8, 8]}>
        <Col sm={{ span: 8, offset: 0 }}>
          <Search
            placeholder={keywordPlaceHolder}
            onChange={this.updateSearch}
            onSearch={this.handleSearch}
          />
        </Col>
      </Row>
    );
  };

  public render() {
    const {
      appDataStore: { unitStatus },
    } = this.props;
    const columns = getColumns({
      title: L("UNIT_STATUS"),
      dataIndex: "name",
      key: "name",
      width: "15%",
      render: (text: string, item: any) => (
        <Row>
          <Col sm={{ span: 21, offset: 0 }}>
            <a
              onClick={() => this.toggleModal(item.id)}
              className="link-text-table"
            >
              {text}
            </a>
          </Col>
          <Col sm={{ span: 3, offset: 0 }}>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <Menu.Item
                    key={1}
                    onClick={() => this.delete({ id: item.id })}
                  >
                    {L(item.isActive ? "BTN_DEACTIVATE" : "BTN_ACTIVATE")}
                  </Menu.Item>
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
        <DataTable
          title={this.L("UNIT_SETTING_LIST")}
          onCreate={() => this.toggleModal()}
          pagination={{
            pageSize: this.state.maxResultCount,
            current: this.currentPage,
            onChange: this.handleTableChange,
          }}
          filterComponent={this.renderFilterComponent()}
        >
          <Table
            size="middle"
            className="custom-ant-table custom-ant-row"
            rowKey="id"
            pagination={false}
            bordered
            columns={columns}
            dataSource={unitStatus ?? []}
          />
        </DataTable>
        <CreateUnitSettingModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleImport}
          data={this.state.data}
        />
      </>
    );
  }
}

export default withRouter(UnitSetting);
