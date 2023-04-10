import { L } from "@lib/abpUtility";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import { FormInstance } from "antd/lib/form";
import InquiryStore from "@stores/communication/inquiryStore";
import ListingStore from "@stores/projects/listingStore";
import AppDataStore from "@stores/appDataStore";
import UnitStore from "@stores/projects/unitStore";
import { AppComponentListBase } from "@components/AppComponentBase";
import withRouter from "@components/Layout/Router/withRouter";
import FormSelect from "@components/FormItem/FormSelect";
import { inject, observer } from "mobx-react";
import Stores from "@stores/storeIdentifier";
import { debounce } from "lodash";
import FormNumber from "@components/FormItem/FormNumber";
import FormRangeInput from "@components/FormItem/FormRangeInput";
import AddressInputMulti from "@components/Inputs/AddressInput2";
import FormTextArea from "@components/FormItem/FormTextArea";
import rules from "./validations";

interface Props {
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
  // onOk: (file, packageId) => Promise<any>;
  inquiryStore: InquiryStore;
  listingStore: ListingStore;
  unitStore: UnitStore;
  appDataStore: AppDataStore;
}

interface State {
  file?: any;
  uploading?: boolean;
}
@inject(
  Stores.AppDataStore,
  Stores.InquiryStore,
  Stores.UnitStore,
  Stores.ListingStore
)
@observer
class InquiriesCreateModal extends AppComponentListBase<Props, State> {
  form = React.createRef<FormInstance>();

  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    await Promise.all([]);
    await this.initData();
  }
  initData = async () => {};
  onCreate = async () => {
    const values = await this.form.current?.validateFields();
    const body = {
      ...values,
    };
    await this.props.inquiryStore.create(body);
    await this.props.onOk;
  };
  render(): React.ReactNode {
    const { visible, onClose } = this.props;

    return (
      <Modal
        open={visible}
        destroyOnClose
        style={{ top: 20 }}
        title={L("CREATE_NEW_INQUIRIES")}
        cancelText={L("BTN_CANCEL")}
        onOk={this.onCreate}
        bodyStyle={{ height: "80vh", overflowY: "scroll" }}
        onCancel={() => {
          onClose();
        }}
        confirmLoading={this.state.uploading}
      >
        <Form
          ref={this.form}
          layout={"vertical"}
          //  onFinish={this.onSave}
          // validateMessages={validateMessages}
          size="middle"
        >
          <Row gutter={[8, 0]}>
            <Col sm={{ span: 12 }}>
              <FormSelect
                options={this.props.appDataStore?.inquiryStatus}
                label={L("STATUS")}
                name="statusId"
                rule={rules.required}
              />
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
              <FormSelect
                options={this.props.appDataStore?.contacts}
                selectProps={{
                  onSearch: debounce(this.props.appDataStore.getContacts, 300),
                }}
                label={L("CONTACT")}
                name="contactId"
                rule={rules.required}
              />
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
              <FormSelect
                selectProps={{
                  onSearch: debounce(this.props.appDataStore.getClients, 300),
                }}
                options={this.props.appDataStore.clients}
                label={L("COMPANY_NAME")}
                name="clientId"
                rule={rules.required}
              />
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("INQUIRIES_NAME")} name="">
                <Input placeholder={L("")}></Input>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12 }}>
              <FormSelect
                options={this.props.appDataStore.inquiryTypes}
                label={L("CATEGORY")}
                name="typeId"
                rule={rules.required}
              />
            </Col>
            <Col sm={{ span: 12 }}>
              <FormSelect
                options={this.props.appDataStore.inquirySources}
                label={L("SOURCE")}
                name="sourceId"
                rule={rules.required}
              />
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
              <FormSelect
                options={this.props.appDataStore.propertyTypes}
                label={L("PROPERTY_TYPE")}
                name="propertyTypeId"
                rule={rules.required}
              />
            </Col>
            <Col sm={{ span: 12 }}>
              <Form.Item label={L("BR_WC")} name="">
                <Select placeholder={L("")}></Select>
              </Form.Item>
            </Col>
            <Col sm={6}>
              <FormNumber label={L("BEDROOM_COUNT")} name="bedRoom" />
            </Col>
            <Col sm={6}>
              <FormNumber label={L("BATHROOM_COUNT")} name="bathRoom" />
            </Col>
            <Col sm={{ span: 12 }}>
              <FormSelect
                options={this.props.unitStore.view}
                label={L("VIEWS")}
                name="viewIds"
                selectProps={{ mode: "multiple" }}
              />
            </Col>
            <Col sm={{ span: 12 }}>
              <FormSelect
                options={this.props.unitStore.facilities}
                label={L("SPECAL_REQUESR")}
                selectProps={{ mode: "multiple" }}
                name="facilityIds"
              />
            </Col>
            <Col sm={{ span: 12 }}>
              <FormRangeInput
                label={L("AREA")}
                name="fromSize"
                seccondName="toSize"
              />
            </Col>
            <Col sm={{ span: 12 }}>
              <FormRangeInput
                isCurrency
                label={L("BUDGET")}
                name="fromPrice"
                seccondName="toPrice"
              />
            </Col>
            <Col sm={{ span: 24 }}>
              <Form.Item label={L("COMPANY_LOCATION")} name="inquiryAddress">
                <AddressInputMulti
                  countries={this.props.appDataStore.countryFull}
                />
              </Form.Item>

              {/* <SelectAddress
                            groupName="inquiryAddress"
                            appDataStore={props.appDataStore}
                          /> */}
            </Col>
            <Col sm={{ span: 24 }}>
              <FormTextArea label={L("DESCRIPTION")} name="description" />
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default withRouter(InquiriesCreateModal);
