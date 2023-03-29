import { inject, observer } from "mobx-react";
import React from "react";
import CustomDrawer from "@components/Drawer/CustomDrawer";
import { L } from "@lib/abpUtility";
import { Card, Col, Form, Row } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import FormInput from "@components/FormItem/FormInput";
import PhonesInput from "@components/Inputs/PhoneInput/PhoneInput";
import FormSelect from "@components/FormItem/FormSelect";
import AppDataStore from "@stores/appDataStore";
import CompanyStore from "@stores/clientManagement/companyStore";
import Stores from "@stores/storeIdentifier";
import { AppComponentListBase } from "@components/AppComponentBase";

type Props = {
  visible: boolean;
  id: any;
  data: any;
  onCancel: () => void;
  appDataStore: AppDataStore;
  companyStore: CompanyStore;
};
type States = {};
inject(Stores.AppDataStore, Stores.CompanyStore);
observer;
class CompanyModal extends AppComponentListBase<Props, States> {
  formRef = React.createRef<any>();
  state = {};
  async componentDidMount() {
    if (this.props.data.id) {
      console.log(this.props.data);
      this.formRef.current?.setFieldsValue(this.props.data);
    } else {
      this.formRef.current?.resetFields();
    }
    await Promise.all([
      this.props.appDataStore.getCountries({}),
      this.props.appDataStore.getCountryFull(),
      this.props.appDataStore.getIndustries({}),
    ]);
  }

  handleSave = () => {
    console.log(this.props.id);
  };

  handleClose = () => {
    this.formRef.current?.resetFields();
    this.props.onCancel();
  };
  updateIndustriesLv2 = (industryId, isResetLv2?) => {
    const industriesLv2 = (this.props.appDataStore.industriesLv2 || []).filter(
      (item) => item.parentId === industryId
    );
    this.setState({ industriesLv2 });
    if (isResetLv2) {
      this.formRef.current?.setFieldsValue({ industryLevel2Id: undefined });
    }
  };
  render() {
    const {
      appDataStore: { industriesLv1, industriesLv2 },
    } = this.props;
    return (
      <CustomDrawer
        useBottomAction
        title={this.props.data?.businessName ?? "CREATE"}
        visible={this.props.visible}
        onClose={this.handleClose}
        onFullView={this.handleSave}
        getContainer={false}
      >
        <div className="padding-modal h-100">
          <Card className="card-detail w-100 h-100">
            <strong>{L("COMPANY_DETAIL")}</strong>
            <Form
              ref={this.formRef}
              layout={"vertical"}
              //  onFinish={this.onSave}
              // validateMessages={validateMessages}
              size="middle"
            >
              <Row gutter={[16, 8]}>
                <Col sm={{ span: 12 }}>
                  <FormInput label="COMPANY_NAME" name={"businessName"} />
                </Col>
                <Col sm={{ span: 12 }}>
                  <FormInput label="COMPANY_LEGAL_NAME" name={"legalName"} />
                </Col>
                <Col sm={{ span: 12 }}>
                  <FormInput label="REPRESENTATIVE" name={""} />
                </Col>
                <Col sm={{ span: 12 }}>
                  <FormInput label="TAX_CODE" name={"vatcode"} />
                </Col>
                <Col sm={{ span: 12 }}>
                  <PhonesInput />
                </Col>
                <Col sm={{ span: 12 }}>
                  <FormInput label="EMAIL" name={""} />
                </Col>
                <Col sm={{ span: 12 }}>
                  <FormSelect
                    options={industriesLv1}
                    label="COMPANY_INDUSTRY"
                    name={"industryId"}
                    onChange={(value) => this.updateIndustriesLv2(value, true)}
                  />
                </Col>
                <Col sm={{ span: 12 }}>
                  <FormSelect
                    options={industriesLv2}
                    label="COMPANY_INDUSTRY_LV2"
                    name={"industryLevel2Id"}
                  />
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </CustomDrawer>
    );
  }
}

export default withRouter(CompanyModal);
