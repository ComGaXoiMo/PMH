import { L } from "@lib/abpUtility";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";

interface Props {
  visible: boolean;
  onClose: () => void;
  onOk: () => Promise<any>;
}

interface State {
  file?: any;
  uploading?: boolean;
}

export default class CreateInquiriesSettingModal extends React.PureComponent<
  Props,
  State
> {
  form = React.createRef<FormInstance>();

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(): React.ReactNode {
    const { visible, onClose, onOk } = this.props;

    return (
      <Modal
        open={visible}
        destroyOnClose
        title={L("CREATE_NEW_SUB_STAGE")}
        cancelText={L("BTN_CANCEL")}
        onCancel={() => {
          onClose();
        }}
        onOk={() => {
          onOk();
        }}
        confirmLoading={this.state.uploading}
      >
        <Form
          layout={"vertical"}
          //  onFinish={this.onSave}
          // validateMessages={validateMessages}
          size="large"
        >
          <Row gutter={[16, 8]}>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("SUB_STAGE")} name="subStage">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>

            <Col sm={{ span: 12 }}>
              <Form.Item label={L("STATUS")} name="status">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("COLOR")} name="color">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("SORT")} name="sort">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
