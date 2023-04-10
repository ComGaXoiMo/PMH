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

export default class createInquiriesModal extends React.PureComponent<
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
        destroyOnClose
        title={L("CREATE_NEW_INQUIRIES")}
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
          size="large"
        >
          <Row gutter={[16, 4]}>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("STATUS")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("SUB_STATUS")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <strong>General</strong>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("CONTRACT")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("PHONE")} name="">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("EMAIL")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("COMPANY_NAME")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("INQUIRIES_NAME")} name="">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("CATEGORY")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("SOURCE")} name="">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <strong>Inquiry Detail</strong>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("PROPERTY")} name="">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("PROPERTY_TYPE")} name="">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("BR_WC")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("VIEW")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("SPECIAL_REQUEST")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("AREA")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("BUDGET")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("LOCATION")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("OTHER_REQUIRMENT")} name="textArea">
                <TextArea placeholder={L("")}></TextArea>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
