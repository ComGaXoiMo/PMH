import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Card, Col, Row } from "antd";
import { L } from "@lib/abpUtility";
import Stores from "@stores/storeIdentifier";
import ProjectStore from "@stores/projects/projectStore";
// import FileUploadWrap from "@components/FileUpload/FileUploadCRM";
import FileStore from "@stores/common/fileStore";
import Monition from "./components/Monition";
import UnitStore from "@stores/projects/unitStore";
import withRouter from "@components/Layout/Router/withRouter";
import AppDataStore from "@stores/appDataStore";
import ActivityFilter from "./components/taskFilter";

export interface ITaskProps {
  projectStore: ProjectStore;
  unitStore: UnitStore;
  params: any;
  appDataStore: AppDataStore;
  fileStore: FileStore;
}
export interface ITaskState {}
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

@inject(Stores.ProjectStore, Stores.UnitStore, Stores.AppDataStore)
@observer
class Task extends AppComponentListBase<ITaskProps, ITaskState> {
  formRef: any = React.createRef();
  formRefProjectAddress: any = React.createRef();

  constructor(props: ITaskProps) {
    super(props);
    this.state = {};
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
    return (
      <>
        <ActivityFilter changeTab={this.changeTab} />

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
              <strong>{L("PROJECT_ACTIVITY")}</strong>
              <Row>
                {fakedata.map((item) => (
                  <Monition data={item.data} />
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(Task);
