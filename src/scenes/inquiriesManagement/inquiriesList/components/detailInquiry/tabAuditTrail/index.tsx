import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Table } from "antd";
import { L } from "@lib/abpUtility";
import Stores from "@stores/storeIdentifier";
import ProjectStore from "@stores/projects/projectStore";
// import FileUploadWrap from "@components/FileUpload/FileUploadCRM";
import FileStore from "@stores/common/fileStore";
import UnitStore from "@stores/projects/unitStore";
import withRouter from "@components/Layout/Router/withRouter";
import AppDataStore from "@stores/appDataStore";
import AuditTrailFilter from "./components/auditTrailFilter";
import gettColumns from "./components/auditTrailColumn";
import DataTable from "@components/DataTable";

export interface IAuditTrailProps {
  projectStore: ProjectStore;
  unitStore: UnitStore;
  params: any;
  appDataStore: AppDataStore;
  fileStore: FileStore;
}
export interface IAuditTrailState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  projectId: number;
  visible: boolean;
  title: string;
  tabView: string;
}

@inject(Stores.ProjectStore, Stores.UnitStore, Stores.AppDataStore)
@observer
class AuditTrail extends AppComponentListBase<
  IAuditTrailProps,
  IAuditTrailState
> {
  formRef: any = React.createRef();
  formRefProjectAddress: any = React.createRef();

  constructor(props: IAuditTrailProps) {
    super(props);
    this.state = {
      maxResultCount: 10,
      skipCount: 0,
      projectId: 0,
      projectProvinces: [],
      filters: {},
      visible: false,
      title: L("CREATE"),
      tabView: L("LISTING"),
    };
  }

  async componentDidMount() {
    await Promise.all([this.getDetail(this.props.params?.id)]);
    this.initData();
  }
  initData = () => {};
  getDetail = async (id?) => {};
  changeTab = async (value) => {
    console.log(value.target);
    await this.setState({ tabView: value.target.value });
  };

  public render() {
    const columns = gettColumns({});
    return (
      <>
        <AuditTrailFilter changeTab={this.changeTab} />

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
      </>
    );
  }
}

export default withRouter(AuditTrail);
