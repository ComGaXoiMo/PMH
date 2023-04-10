import { L } from "@lib/abpUtility";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
// import FormSelect from "@components/FormItem/FormSelect";
import { GENDERS } from "@lib/appconst";
import { renderOptions } from "@lib/helper";
import FormInput from "@components/FormItem/FormInput";
import PhonesInput2 from "@components/Inputs/PhoneInput/PhoneInput2";
import AppDataStore from "@stores/appDataStore";
import { inject, observer } from "mobx-react";
import Stores from "@stores/storeIdentifier";
import contactService from "@services/clientManagement/contactService";
import rules from "./validation";

interface Props {
  visible: boolean;
  onClose: () => void;
  onOk: (file, packageId) => Promise<any>;
  onViewInfo: any;
  appDataStore: AppDataStore;
}

interface State {
  file?: any;
  uploading?: boolean;
  visible: boolean;
  isExistsEmail: boolean;
  idUser: any;
}
@inject(Stores.AppDataStore)
@observer
class ContractCreateModal extends AppComponentListBase<Props, State> {
  form = React.createRef<FormInstance>();

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isExistsEmail: false,
      idUser: undefined,
    };
  }
  async componentDidMount() {
    await Promise.all([
      // this.props.appDataStore.getOtherTypes({}),
      this.props.appDataStore.getClients,
    ]);
  }

  checkEmail = async (e?) => {
    const { value } = e.target;
    const res = await contactService.checkExistContact({
      keyword: value,
      isActive: "true",
    });

    // console.log(res.items[0].id);
    if (res.totalCount > 0) {
      this.setState({ isExistsEmail: true });
      this.setState({ idUser: res.items[0].id });
    } else {
      this.setState({ isExistsEmail: false });
    }
  };
  render(): React.ReactNode {
    const { visible, onClose } = this.props;
    const {
      appDataStore: { clients },
    } = this.props;
    return (
      <Modal
        open={visible}
        destroyOnClose
        style={{ top: 40 }}
        title={L("CREATE_NEW_CONTRACT")}
        cancelText={L("BTN_CANCEL")}
        onCancel={() => {
          this.setState({ isExistsEmail: false });
          onClose();
        }}
        confirmLoading={this.state.uploading}
      >
        <Form
          layout={"vertical"}
          ref={this.form}
          //  onFinish={this.onSave}
          // validateMessages={validateMessages}
          size="middle"
        >
          <Row gutter={[16, 0]}>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("CONTACT_GENDER")} name="gender">
                <Select allowClear filterOption={false} className="full-width">
                  {renderOptions(GENDERS)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("FIRST_NAME")} name="fisrtName">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <FormInput
                label="LAST_NAME"
                name="contactName"
                // rule={rules.subject}
              />
            </Col>
            {/* TODO: tên đang chỉ có 1 chưa có first name last name */}
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("CONTACT_PHONE")} name="contactPhone">
                <PhonesInput2 />
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item
                rules={rules.checkMail}
                label={L("CONTACT_EMAIL")}
                name="contactEmail"
              >
                <Input onBlur={this.checkEmail} placeholder={L("")}></Input>
                {this.state.isExistsEmail && (
                  <>
                    <a style={{ color: "red " }}>
                      Email already exists.
                      <a
                        onClick={() => {
                          this.setState({ isExistsEmail: false });
                          this.props.onViewInfo(this.state.idUser);
                        }}
                        style={{
                          textDecoration: "underline",
                          fontWeight: 600,
                          color: "red",
                        }}
                      >
                        View detail customer Information
                      </a>
                    </a>
                  </>
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("CONTACT_COMPANY")} name="companyContact">
                <Select allowClear filterOption={false} className="full-width">
                  {renderOptions(clients)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("DEPARTMENT")} name="city">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("TITLE")} name="district">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>

            <Col sm={{ span: 8 }}>
              <Form.Item label={L("CITY")} name="city">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("DISTRICT")} name="district">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("WARD")} name="ward">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("STAGE")} name="stage">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("PIC")} name="pic">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("CO_BROKER")} name="ckBroker">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 8 }}>
              <Form.Item label={L("SPURCE")} name="spurce">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("TEXT_AREA")} name="textArea">
                <TextArea placeholder={L("")}></TextArea>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default withRouter(ContractCreateModal);
