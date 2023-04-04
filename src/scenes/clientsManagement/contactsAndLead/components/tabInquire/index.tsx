import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Card, Col, Row } from "antd";
import Stores from "@stores/storeIdentifier";
import ProjectStore from "@stores/projects/projectStore";
// import FileUploadWrap from "@components/FileUpload/FileUploadCRM";
import FileStore from "@stores/common/fileStore";
import UnitStore from "@stores/projects/unitStore";
import withRouter from "@components/Layout/Router/withRouter";
import AppDataStore from "@stores/appDataStore";
import CreateInquiriContactModal from "./components/createInquiriContactModal";
import InquiriFilter from "./components/inquiriFilter";
import InquiriItem from "./components/inquiriItem";
import { L } from "@lib/abpUtility";

export interface IBookingProps {
  projectStore: ProjectStore;
  unitStore: UnitStore;
  params: any;
  appDataStore: AppDataStore;
  fileStore: FileStore;
}
export interface IBookingState {
  modalVisible: boolean;
}
const fakedata = [
  {
    data: {
      name: "Alex Nguyeeuwn",
      project: "Haappy",
      unit: "302C",
      customerName: "Zaire Dorwart",
      date: "",
    },
  },

  {
    data: {
      name: "Alex Nguyeeuwn",

      customerName: "Zaire Dorwart",
      date: "",
    },
  },
];

@inject(Stores.ProjectStore, Stores.UnitStore, Stores.AppDataStore)
@observer
class InquirieContact extends AppComponentListBase<
  IBookingProps,
  IBookingState
> {
  formRef: any = React.createRef();
  formRefProjectAddress: any = React.createRef();

  constructor(props: IBookingProps) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  async componentDidMount() {
    await Promise.all([]);
    this.initData();
  }
  initData = () => {};

  toggleModal = () =>
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));

  handleImport = async () => {
    this.toggleModal();
  };
  public render() {
    return (
      <>
        <InquiriFilter
          onCreate={() => {
            this.toggleModal();
          }}
        />

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
              <strong>{L("INQUIRIES")}</strong>
              <Row>
                {fakedata.map((item) => (
                  <Col sm={{ span: 24 }}>
                    <InquiriItem data={item} />
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
        <CreateInquiriContactModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleImport}
        />
      </>
    );
  }
}

export default withRouter(InquirieContact);
