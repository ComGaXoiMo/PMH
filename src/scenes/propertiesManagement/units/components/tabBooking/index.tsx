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
import ActivityFilter from "./components/bookingFilter";
import BookingBoardItem from "./components/bookingBoardItem";
import CreateBookingModal from "./components/createBookingModal";

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
      title: "Booking Confirmation",
      link: "https://Booking.google.com/Booking/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#27AE60",
      type: 2,
    },
  },

  {
    data: {
      title: "Update",
      link: "https://Booking.google.com/Booking/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "",
      color: "#F2994A",
      type: 1,
    },
  },
];

@inject(Stores.ProjectStore, Stores.UnitStore, Stores.AppDataStore)
@observer
class Booking extends AppComponentListBase<IBookingProps, IBookingState> {
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
        <ActivityFilter
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
              <Row>
                {fakedata.map((item) => (
                  <Col sm={{ span: 24 }}>
                    <BookingBoardItem />
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
        <CreateBookingModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleImport}
        />
      </>
    );
  }
}

export default withRouter(Booking);