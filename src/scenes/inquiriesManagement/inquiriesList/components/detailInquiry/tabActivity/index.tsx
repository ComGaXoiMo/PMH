import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Card, Col, Row, Table } from "antd";
import { L } from "@lib/abpUtility";
import Stores from "@stores/storeIdentifier";
import ProjectStore from "@stores/projects/projectStore";
// import FileUploadWrap from "@components/FileUpload/FileUploadCRM";
import FileStore from "@stores/common/fileStore";
import Monition from "./components/Monition";
import UnitStore from "@stores/projects/unitStore";
import withRouter from "@components/Layout/Router/withRouter";
import AppDataStore from "@stores/appDataStore";
import ActivityFilter from "./components/activityFilter";
import gettColumns from "./components/activityColumn";
import DataTable from "@components/DataTable";

export interface IActivityProps {
  projectStore: ProjectStore;
  unitStore: UnitStore;
  params: any;
  appDataStore: AppDataStore;
  fileStore: FileStore;
}
export interface IActivityState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  projectId: number;
  visible: boolean;
  title: string;
  tabView: string;
}
const fakedata = [
  {
    data: {
      title: "Booking Confirmation",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#27AE60",
      type: 2,
    },
  },
  {
    data: {
      title: "Send Proposal",
      link: "",
      file: "BOC-22012023.PDF",
      color: "#9B51E0",
      type: 2,
    },
  },
  {
    data: {
      title: "Update",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#F2994A",
      type: 1,
    },
  },
  {
    data: {
      title: "Send Mail",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#9B51E0",
      type: 2,
    },
  },
  {
    data: {
      title: "Update",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "",
      color: "#F2994A",
      type: 1,
    },
  },
];
export interface IActivityState {}

@inject(Stores.ProjectStore, Stores.UnitStore, Stores.AppDataStore)
@observer
class Activity extends AppComponentListBase<IActivityProps, IActivityState> {
  formRef: any = React.createRef();
  formRefProjectAddress: any = React.createRef();

  constructor(props: IActivityProps) {
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
    await Promise.all([
      this.props.appDataStore.getPropertyTypes(),
      this.props.appDataStore.getFacilities(),
      this.props.appDataStore.getGrades(),
      this.props.appDataStore.getCountries({}),
      this.props.projectStore.getTransportations(""),
      this.getDetail(this.props.params?.id),
    ]);
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
        <ActivityFilter changeTab={this.changeTab} />

        {this.state.tabView === L("REPORT") && (
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
        )}
        {this.state.tabView === L("LISTING") && (
          <Row gutter={[8, 0]}>
            <Col sm={{ span: 24 }}>
              <Card
                style={{
                  backgroundColor: "white",
                  minHeight: "60vh",
                  height: "max-content",
                  padding: "10px",
                  borderRadius: "16px",
                }}
              >
                <Row>
                  {fakedata.map((item) => (
                    <Monition data={item.data} />
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        )}
      </>
    );
  }
}

export default withRouter(Activity);
