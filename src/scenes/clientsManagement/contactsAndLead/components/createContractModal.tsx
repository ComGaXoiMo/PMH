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

export default class CreateContractModal extends React.PureComponent<
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
        title={L("CREATE_NEW_CONTRACT")}
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
          <Row gutter={[16, 8]}>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("FIRST_NAME")} name="fisrtName">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("LAST_NAME")} name="lastName">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("GENDER")} name="gender">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("PHONE_NUMBER")} name="phone">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("EMAIL")} name="mail">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("CITY")} name="city">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("DISTRICT")} name="district">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("WARD")} name="ward">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("STAGE")} name="stage">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("TEXT_AREA")} name="textArea">
                <TextArea placeholder={L("ENTER_INFOMATION")}></TextArea>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
