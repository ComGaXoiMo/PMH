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
import CreateInquiriesSettingModal from "./components/createModal";

export interface IInquiriesSettingProps {}

export interface IInquiriesSettingState {
  modalVisible: boolean;
  maxResultCount: number;
  skipCount: number;
  InquiriesSettingId: number;
  filter: string;
}

const confirm = Modal.confirm;
const Search = Input.Search;

@inject()
@observer
class InquiriesSetting extends AppComponentBase<
  IInquiriesSettingProps,
  IInquiriesSettingState
> {
  formRef: any = React.createRef();

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    InquiriesSettingId: 0,
    filter: "",
  };

  get currentPage() {
    return Math.floor(this.state.skipCount / this.state.maxResultCount) + 1;
  }

  async componentDidMount() {
    await this.getAll();
  }

  async getAll() {}

  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };

  toggleModal = () =>
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
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
    const keywordPlaceHolder = `${this.L("INQUIRIES")}`;
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
    const {} = this.props;
    const columns = getColumns({
      title: L("INQUIRIES_SUB_STAGES"),
      dataIndex: "name",
      key: "name",
      width: "15%",
      render: (text: string, item: any) => (
        <Row>
          <Col sm={{ span: 21, offset: 0 }}>
            <a onClick={() => this.toggleModal()} className="link-text-table">
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
            dataSource={[]}
          />
        </DataTable>
        <CreateInquiriesSettingModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleImport}
        />
      </>
    );
  }
}

export default withRouter(InquiriesSetting);
