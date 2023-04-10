import { L } from "@lib/abpUtility";
import { Col, Form, Input, Modal, Row } from "antd";
import React from "react";
import withRouter from "@components/Layout/Router/withRouter";
import { validateMessages } from "@lib/validation";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface Props {
  visible: boolean;
  onClose: () => void;
  data: any;
  onOk: () => Promise<any>;
}

export interface State {
  file?: any;
  uploading?: boolean;
}

class CreateUnitSettingModal extends AppComponentListBase<Props, State> {
  formRef: any = React.createRef();

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate = async (prevProps) => {
    if (prevProps.data !== this.props.data) {
      await console.log(this.props.data);
      await this.formRef.current?.setFieldsValue({
        name: "viet",
        sortOrder: 2,
      });

      await console.log(this.formRef);
    }
  };
  render(): React.ReactNode {
    const { visible, onClose, onOk } = this.props;

    return (
      <Modal
        open={visible}
        destroyOnClose
        title={L("CREATE_NEW_UNIT_STATUS")}
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
          ref={this.formRef}
          //  onFinish={this.onSave}
          validateMessages={validateMessages}
          size="middle"
        >
          <Row gutter={[16, 8]}>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("STATUS")} name="name">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>

            <Col sm={{ span: 12 }}>
              <Form.Item label={L("COLOR")} name="color">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("SORT")} name="sortOrder">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default withRouter(CreateUnitSettingModal);
