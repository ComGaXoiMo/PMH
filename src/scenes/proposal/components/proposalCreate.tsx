import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

import { L } from "@lib/abpUtility";
import { Button, Col, Row } from "antd";
import ProspectInfo from "./prospectInfo";
import withRouter from "@components/Layout/Router/withRouter";
import CustomSteps from "@components/Steps/CustomSteps";
import ProjectUnitInfo from "./projectUnitInfo";

export interface IProposalCreateProps {}

export interface IProposalCreateState {
  current: number;
}
const items = [
  {
    title: L("CLIENTS"),
  },
  {
    title: L("YOU"),
  },
  {
    title: L("PROJECT_UNIT_INFOR"),
  },
];
@inject()
@observer
class ProposalCreate extends AppComponentListBase<
  IProposalCreateProps,
  IProposalCreateState
> {
  formRef: any = React.createRef();
  state = {
    current: 0,
  };
  next = () => {
    this.setState({ current: this.state.current + 1 });
  };
  prev = () => {
    this.setState({ current: this.state.current - 1 });
  };
  onChange = (value: number) => {
    console.log("onChange:", value);
    this.setState({ current: value });
  };
  public render() {
    return (
      <>
        <div className="container-element">
          <strong>{L("ProposalCreate")}</strong>
        </div>
        <div className="proposal-create-body">
          <Row className="h-100" gutter={[0, 0]}>
            <Col className="h-100" sm={{ span: 20 }}>
              {this.state.current === 0 && <ProspectInfo />}
              {this.state.current === 2 && <ProjectUnitInfo />}
            </Col>
            <Col
              style={{
                backgroundColor: "#EAB001",
                padding: "20px",
                borderRadius: "0px 24px 24px 0px",
              }}
              sm={{ span: 4 }}
            >
              <CustomSteps
                current={this.state.current}
                onChange={this.onChange}
                direction="vertical"
                items={items}
              />

              <div style={{ position: "absolute", right: 20, bottom: 20 }}>
                {this.state.current > 0 && (
                  <Button
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#ffffff4c",
                      marginRight: 10,
                    }}
                    onClick={() => this.prev()}
                  >
                    {L("BACK")}
                  </Button>
                )}
                {this.state.current < 3 && (
                  <Button
                    style={{ borderRadius: "8px", backgroundColor: "#Ffffff" }}
                    onClick={() => this.next()}
                  >
                    {L("NEXT")}
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(ProposalCreate);
