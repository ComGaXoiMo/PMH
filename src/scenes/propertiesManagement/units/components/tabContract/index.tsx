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
import ActivityFilter from "./components/contractFilter";
import ContractBoardItem from "./components/contractBoardItem";

export interface IContractProps {
  projectStore: ProjectStore;
  unitStore: UnitStore;
  params: any;
  appDataStore: AppDataStore;
  fileStore: FileStore;
}
export interface IContractState {
  modalVisible: boolean;
}
const fakedata = [
  {
    data: {
      title: "Contract Confirmation",
      link: "https://Contract.google.com/Contract/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#27AE60",
      type: 2,
    },
  },

  {
    data: {
      title: "Update",
      link: "https://Contract.google.com/Contract/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "",
      color: "#F2994A",
      type: 1,
    },
  },
];

@inject(Stores.ProjectStore, Stores.UnitStore, Stores.AppDataStore)
@observer
class Contract extends AppComponentListBase<IContractProps, IContractState> {
  formRef: any = React.createRef();
  formRefProjectAddress: any = React.createRef();

  constructor(props: IContractProps) {
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
            <Card className="card-detail-modal">
              <Row>
                {fakedata.map((item) => (
                  <Col sm={{ span: 24 }}>
                    <ContractBoardItem />
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(Contract);
