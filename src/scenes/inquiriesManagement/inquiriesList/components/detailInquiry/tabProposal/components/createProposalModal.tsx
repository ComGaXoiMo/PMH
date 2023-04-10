import { L } from "@lib/abpUtility";
import { Card, Col, Modal, Row } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";
import { portalLayouts } from "@components/Layout/Router/router.config";
import { AppComponentListBase } from "@components/AppComponentBase";
import withRouter from "@components/Layout/Router/withRouter";

interface Props {
  id: any;
  history: any;
  visible: boolean;
  onClose: () => void;
  onOk: (file, packageId) => Promise<any>;
}

interface State {
  file?: any;
  uploading?: boolean;
}

class CreateProposalModal extends AppComponentListBase<Props, State> {
  form = React.createRef<FormInstance>();

  constructor(props) {
    super(props);
    this.state = {};
  }

  gotoDetail = (id?) => {
    const { history } = this.props;
    id
      ? history.push(portalLayouts.proposalCreate.path.replace(":id", id))
      : history.push(portalLayouts.proposals.path);
  };
  render(): React.ReactNode {
    const { visible, onClose } = this.props;

    return (
      <Modal
        open={visible}
        destroyOnClose
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        title={L("SELECT_PROPOSAL_TYPE")}
        onCancel={() => {
          onClose();
        }}
        confirmLoading={this.state.uploading}
      >
        <Row gutter={[16, 8]}>
          <Col sm={{ span: 12 }}>
            <strong>Start form scratch</strong>
            <Card
              onClick={() => console.log("a")}
              style={{ height: 260, borderRadius: "12px" }}
            ></Card>
          </Col>
          <Col sm={{ span: 12 }}>
            <strong>Use Template</strong>
            <Card
              onClick={() => this.gotoDetail(this.props.id)}
              style={{ height: 260, borderRadius: "12px" }}
            ></Card>
          </Col>
        </Row>
      </Modal>
    );
  }
}
export default withRouter(CreateProposalModal);
