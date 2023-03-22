import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface IInquiriessDetailProps {
  params: any;
}

export interface IInquiriessDetailState {}
import { Card, Col, Row, Select } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import Stores from "@stores/storeIdentifier";
import { L } from "@lib/abpUtility";
import General from "./detailInquiry/general";
import Info from "./detailInquiry/info";

const tabKeys = {
  tabSummaries: "TAB_SUMMARY",
  tabUnits: "TAB_UNITS",
  tabInquiries: "TAB_INQUIRIES",
  tabContracts: "TAB_CONTRACTS",
  tabDocuments: "TAB_DOCUMENTS",
};
@inject(Stores.CompanyStore)
@observer
class InquiriessDetail extends AppComponentListBase<
  IInquiriessDetailProps,
  IInquiriessDetailState
> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabSummaries,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };

  public render() {
    return (
      <>
        <div>
          <strong>{this.props.params?.id ?? "Create"} </strong>
          <Card className="w-100 h-100">
            <Row gutter={[8, 8]}>
              <Col sm={{ span: 22 }}>
                <div className="wrap">
                  <div className="progress">
                    <strong>Prospect</strong>
                  </div>
                  <div className="progress">
                    <strong>Offer</strong>
                  </div>
                  <div className="progress">
                    <strong>Lease Agrement</strong>
                  </div>
                  <div className="progress">
                    <strong>Close</strong>
                  </div>
                  <div className="progress">
                    <strong>Dropped</strong>
                  </div>
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
                <General />
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
