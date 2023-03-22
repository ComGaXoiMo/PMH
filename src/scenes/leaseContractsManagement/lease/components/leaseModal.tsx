import { L } from "@lib/abpUtility";
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";

interface Props {
  visible: boolean;
  onClose: () => void;
  onOk: (file, packageId) => Promise<any>;
}

interface State {
  file?: any;
  uploading?: boolean;
}

export default class LeaseModal extends React.PureComponent<Props, State> {
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
        title={L("CREATE_NEW_LEASE_EXECUTION")}
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
              <Form.Item label={L("LEASING_LEAD")} name="">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("SHARING")} name="">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>

            <Col sm={{ span: 24 }}>
              <strong>Inquiries</strong>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("INQUIRIES_DEAL_NAME")} name="">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("PROJECT")} name="">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("SPACE_UNIT")} name="">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("LANDLORD_COMPANY")} name="">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("LANDLORD_CONTRACT")} name="">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <strong>Commission</strong>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("DEAL_COMMISSION")} name="">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("OTHER_FEE")} name="">
                <Input placeholder={L("ENTER_INFOMATION")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <strong>Lease Execution</strong>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("LEASE_TERM")} name="">
                <Select placeholder={L("ENTER_INFOMATION")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("LEASE_COMMENECEMENT")} name="stage">
                <DatePicker
                  className="w-100"
                  placeholder={L("ENTER_INFOMATION")}
                ></DatePicker>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("LEASE_EXPIRATION")} name="stage">
                <DatePicker
                  className="w-100"
                  placeholder={L("ENTER_INFOMATION")}
                ></DatePicker>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
