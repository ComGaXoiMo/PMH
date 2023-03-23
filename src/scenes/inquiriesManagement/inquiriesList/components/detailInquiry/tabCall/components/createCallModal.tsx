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

export default class CreateCallModal extends React.PureComponent<Props, State> {
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
        destroyOnClose
        title={L("NEW_TASK")}
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
          <Row gutter={[16, 8]}>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("PHONE_NUMBER")} name="">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("TIME_LOG")} name="">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>

            <Col sm={{ span: 12 }}>
              <Form.Item label={L("DATE_LOG")} name="">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>

            <Col sm={{ span: 24 }}>
              <Form.Item label={L("ATTACK_RECORD")} name="">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("ATTACK_LINK_RECORD")} name="">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>

            <Col sm={{ span: 24 }}>
              <Form.Item label={L("RECAP_YOUR_CALL")} name="">
                <TextArea placeholder={L("ENTER_INFOMATION")}></TextArea>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}