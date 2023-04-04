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
import ActivityFilter from "./components/associatePartyFilter";
import AssociatePartyBoardItem from "./components/associatePartyBoardItem";

export interface IAssociatePartyProps {
  projectStore: ProjectStore;
  unitStore: UnitStore;
  params: any;
  appDataStore: AppDataStore;
  fileStore: FileStore;
}
export interface IAssociatePartyState {
  modalVisible: boolean;
}

@inject(Stores.ProjectStore, Stores.UnitStore, Stores.AppDataStore)
@observer
class AssociateParty extends AppComponentListBase<
  IAssociatePartyProps,
  IAssociatePartyState
> {
  formRef: any = React.createRef();
  formRefProjectAddress: any = React.createRef();

  constructor(props: IAssociatePartyProps) {
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
                    <AssociatePartyBoardItem data={item.data} />
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

export default withRouter(AssociateParty);
const fakedata = [
  {
    data: {
      avt: "https://pict.sindonews.net/dyn/850/pena/news/2022/08/16/53/857833/kehidupan-liar-masa-muda-ronaldo-usia-14-tahun-dikeluarkan-dari-sekolah-xgk.jpg",
      name: "Alex Nguyễn",
      deal: "$ 100.000",
      feeType: "Percentage (%)",
      otherFee: "$750.00",
      type: "Can Edit",
    },
  },

  {
    data: {
      avt: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf4eb6706ceb9fae4/63a55c06b6f2166a77aaa1db/GettyImages-1435623465.jpg",
      name: "Cristofer Rhiel Madsen",
      deal: "$ 100.000",
      feeType: "Percentage (%)",
      otherFee: "$750.00",
      type: "Can View 01",
    },
  },
  {
    data: {
      avt: "https://s.hs-data.com/bilder/spieler/gross/26622.jpg",
      name: "Miracle Passaquindici Arcand",
      deal: "$ 100.000",
      feeType: "Percentage (%)",
      otherFee: "$750.00",
      type: "Owner",
    },
  },
];
