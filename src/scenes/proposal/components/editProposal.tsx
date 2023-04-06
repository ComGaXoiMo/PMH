import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

import { L } from "@lib/abpUtility";
import { Col, Form, Row } from "antd";
import CKEditorInputProposal from "@components/Inputs/CKEditInputProposal";

export interface IeditProposalProps {}

export interface IeditProposalState {}

@inject()
@observer
class editProposal extends AppComponentListBase<
  IeditProposalProps,
  IeditProposalState
> {
  formRef: any = React.createRef();
  state = {};

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div className="proposal-info-element">
          <strong>{L("editProposal")}</strong>
          <Form
            layout={"vertical"}
            //  onFinish={this.onSave}
            // validateMessages={validateMessages}
            size="large"
          >
            <Row gutter={[16, 0]}>
              <Col sm={{ span: 24 }}>
                <CKEditorInputProposal />
              </Col>
            </Row>
          </Form>
        </div>
      </>
    );
  }
}

export default editProposal;
