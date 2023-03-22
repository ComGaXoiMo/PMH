import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Button, Table } from "antd";
import { L } from "@lib/abpUtility";
import Stores from "@stores/storeIdentifier";
import ProjectStore from "@stores/projects/projectStore";
// import FileUploadWrap from "@components/FileUpload/FileUploadCRM";
import FileStore from "@stores/common/fileStore";
import UnitStore from "@stores/projects/unitStore";
import withRouter from "@components/Layout/Router/withRouter";
import AppDataStore from "@stores/appDataStore";
import DocumentFilter from "./components/documentTrailFilter";
import gettColumns from "./components/documentColumn";
import DataTable from "@components/DataTable";
import { CheckOutlined, CloseOutlined, FileFilled } from "@ant-design/icons";
import CreateDocumentModal from "./components/createDocumentModal";

export interface IDocumentProps {
  projectStore: ProjectStore;
  unitStore: UnitStore;
  params: any;
  appDataStore: AppDataStore;
  fileStore: FileStore;
}
export interface IDocumentState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  projectId: number;
  visible: boolean;
  modalVisible: boolean;

  title: string;
  tabView: string;
}

@inject(Stores.ProjectStore, Stores.UnitStore, Stores.AppDataStore)
@observer
class Document extends AppComponentListBase<IDocumentProps, IDocumentState> {
  formRef: any = React.createRef();
  formRefProjectAddress: any = React.createRef();

  constructor(props: IDocumentProps) {
    super(props);
    this.state = {
      maxResultCount: 10,
      skipCount: 0,
      projectId: 0,
      projectProvinces: [],
      filters: {},
      visible: false,
      title: L("CREATE"),
      modalVisible: false,

      tabView: L("LISTING"),
    };
  }

  async componentDidMount() {
    await Promise.all([this.getDetail(this.props.params?.id)]);
    this.initData();
  }
  initData = () => {};
  getDetail = async (id?) => {};
  toggleModal = () =>
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));

  handleImport = async () => {
    this.toggleModal();
  };

  public render() {
    const columns = gettColumns({
      title: L("ACTIONS"),
      dataIndex: "operation",
      key: "operation",
      width: "20%",
      render: (text: string, item: any) => (
        <div>
          {/* {this.isGranted(appPermissions.a.update) && ( */}
          <Button
            size="small"
            className="ml-1"
            shape="circle"
            icon={<FileFilled />}
            onClick={() => console.log("go detail")}
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
        <DocumentFilter
          onCreate={() => {
            this.toggleModal();
          }}
        />

        <DataTable
          // extraFilterComponent={filterComponent}
          // onRefresh={this.getAll}
          // onCreate={() => this.gotoDetail(null)}
          pagination={{
            pageSize: this.state.maxResultCount,
            // total: tableData === undefined ? 0 : tableData.totalCount,
          }}
        >
          <Table
            size="middle"
            className=""
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            // dataSource={tableData === undefined ? [] : tableData.items}
            scroll={{ x: 800, y: 500, scrollToFirstRowOnChange: true }}
            bordered
          />
        </DataTable>
        <CreateDocumentModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleImport}
        />
      </>
    );
  }
}

export default withRouter(Document);
