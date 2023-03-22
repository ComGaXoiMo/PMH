import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Row, Col, Card } from "antd";
import Doghnut from "./overview/doughnut";

export interface IOverviewProps {}

export interface IOverviewState {}

@inject()
@observer
class Overviews extends AppComponentListBase<IOverviewProps, IOverviewState> {
  formRef: any = React.createRef();
  state = {};

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div className="dashboard-style">
          <Row gutter={[16, 20]}>
            <Col sm={{ span: 8, offset: 0 }}>
              <Doghnut Title="Top 5 Clients" />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <Doghnut Title="Top 5 Client Industry" />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <Doghnut Title="Expiring leased" />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <Doghnut Title="Lease Contract" />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <Doghnut Title="Deposit" />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <Doghnut Title="Payment" />
            </Col>
            <Col sm={{ span: 16, offset: 0 }}>
              <Card />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <Doghnut Title="Inquiries" />
            </Col>
            <Col sm={{ span: 24, offset: 0 }}>
              <Doghnut Title="Inquiries" />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Overviews;
