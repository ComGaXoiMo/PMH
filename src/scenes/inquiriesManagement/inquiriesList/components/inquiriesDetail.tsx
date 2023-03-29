import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

import { Card, Col, Row, Select } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import Stores from "@stores/storeIdentifier";
import { L } from "@lib/abpUtility";
import General from "./detailInquiry/general";
import Info from "./detailInquiry/info";
import InquiryStore from "@stores/communication/inquiryStore";
import AppDataStore from "@stores/appDataStore";
import ListingStore from "@stores/projects/listingStore";
import { LeftOutlined } from "@ant-design/icons";
import { portalLayouts } from "@components/Layout/Router/router.config";

const tabKeys = {
  tabSummaries: "TAB_SUMMARY",
  tabUnits: "TAB_UNITS",
  tabInquiries: "TAB_INQUIRIES",
  tabContracts: "TAB_CONTRACTS",
  tabDocuments: "TAB_DOCUMENTS",
};
export interface IInquiriessDetailProps {
  params: any;
  history: any;
  inquiryStore: InquiryStore;
  listingStore: ListingStore;
  appDataStore: AppDataStore;
}

export interface IInquiriessDetailState {
  tabActiveKey: any;
}
@inject(
  Stores.AppDataStore,
  Stores.InquiryStore,
  Stores.UnitStore,
  Stores.ListingStore
)
@observer
class InquiriessDetail extends AppComponentListBase<
  IInquiriessDetailProps,
  IInquiriessDetailState
> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabSummaries,
  };
  async componentDidMount() {
    await this.getAll();
    await Promise.all([]);
  }
  getAll = async () => {
    this.props.appDataStore.getInquirySourceAndStatus();
    this.props.inquiryStore.getAll("");
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  goBack = () => {
    const { history } = this.props;
    history.push(portalLayouts.inquiries.path);
  };
  public render() {
    const {
      appDataStore: { inquiryStatus },
      inquiryStore: {},
    } = this.props;
    return (
      <>
        <div>
          <div className="modul-lable-name">
            <a onClick={this.goBack} style={{ color: "black" }}>
              <LeftOutlined
                style={{
                  backgroundColor: "#F3F5F6",
                  borderRadius: "8px",
                  padding: "6px",
                }}
              />{" "}
              Back
            </a>
            <br />
            <strong>{this.props.params?.id ?? "Create"} </strong>
          </div>
          <Card className="w-100 h-100">
            <Row gutter={[8, 8]}>
              <Col sm={{ span: 22 }}>
                <div className="wrap">
                  {inquiryStatus.map((inquiry, index) => (
                    <div className="progress">
                      <strong>{inquiry.name}</strong>
                    </div>
                  ))}
                </div>
              </Col>
              <Col sm={{ span: 2 }}>
                <Select placeholder={L("SUB_STAGE")}></Select>
              </Col>
            </Row>
          </Card>
          <div style={{ padding: "17px" }}>
            <Row gutter={[8, 0]}>
              <Col sm={12}>
                <General params={this.props.params?.id} />
              </Col>
              <Col sm={12}>
                <Info />
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(InquiriessDetail);
