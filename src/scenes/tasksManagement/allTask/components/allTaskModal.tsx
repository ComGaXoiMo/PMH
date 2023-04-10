import { L } from "@lib/abpUtility";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";

interface Props {
  visible: boolean;
  onClose: () => void;
  onOk: (file, packageId) => Promise<any>;
}

interface State {
  file?: any;
  uploading?: boolean;
}

export default class createAllTaskModal extends React.PureComponent<
  Props,
  State
> {
  form = React.createRef<FormInstance>();

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(): React.ReactNode {
    const { visible, onClose } = this.props;

    return (
      <Modal
        open={visible}
        style={{ top: 20 }}
        destroyOnClose
        title={L("CREATE_TASKS")}
        cancelText={L("BTN_CANCEL")}
        onCancel={() => {
          onClose();
        }}
        confirmLoading={this.state.uploading}
      >
        <Form
          layout={"vertical"}
          //  onFinish={this.onSave}
          // validateMessages={validateMessages}
          size="middle"
        >
          <Row gutter={[16, 0]}>
            <Col sm={{ span: 24 }}>
              <strong>Tenant Details</strong>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("DEAL_NAME")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("CUSTOMER_INVOLVE")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("PROJECT")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("UNIT")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("ASSIGN_TO")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("SHARING")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("SUBJECT")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("DUE_DATE")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("OFFER_NAME")} name="textArea">
                <TextArea placeholder={L("")}></TextArea>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <strong>Additional information</strong>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("STATUS")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("PRORITY")} name="">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
