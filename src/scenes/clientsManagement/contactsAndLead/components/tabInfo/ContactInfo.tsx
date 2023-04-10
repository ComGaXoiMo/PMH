import React from "react";

import { Col, Form, Row, Select, Card, Modal, Button, Input } from "antd";
import { isGranted, isGrantedAny, L, LNotification } from "@lib/abpUtility";
import { validateMessages } from "@lib/validation";
import AppConsts, { appPermissions, GENDERS } from "@lib/appconst";
import { inject, observer } from "mobx-react";
import Stores from "@stores/storeIdentifier";
import AppComponentBase from "@components/AppComponentBase";
import AppDataStore from "@stores/appDataStore";
import ContactStore from "@stores/clientManagement/contactStore";
import { portalLayouts } from "@components/Layout/Router/router.config";
import { filterOptions, notifyWarning, renderOptions } from "@lib/helper";
import contactService from "@services/clientManagement/contactService";
import rules from "./validation";
import EmailsInput from "@components/Inputs/EmailsInput";
import { CompaniesSelect } from "@components/Select/CompaniesSelect";
import userService from "@services/administrator/user/userService";
import OpportunityStore from "@stores/opportunity/opportunityStore";
import Switch from "antd/lib/switch";
import CampaignStore from "@stores/campaign/campaignStore";
import CommentStore from "@stores/common/commentStore";
import TargetStore from "@stores/campaign/targetStore";
import ActivityStore from "@stores/activity/activityStore";
import SessionStore from "@stores/sessionStore";
import companyService from "@services/clientManagement/companyService";
import AddressInput2 from "@components/Inputs/AddressInput2";
import TextArea from "antd/lib/input/TextArea";
import PhonesInput2 from "@components/Inputs/PhoneInput/PhoneInput2";
import withRouter from "@components/Layout/Router/withRouter";

const { formVerticalLayout } = AppConsts;
const { confirm } = Modal;
const { Option } = Select;

export interface IContactFormProps {
  match: any;
  history: any;
  appDataStore: AppDataStore;
  contactStore: ContactStore;
  opportunityStore: OpportunityStore;
  campaignStore: CampaignStore;
  targetStore: TargetStore;
  activityStore: ActivityStore;
  commentStore: CommentStore;
  sessionStore: SessionStore;
  isShowFull: boolean;
  id: any;
}

@inject(
  Stores.AppDataStore,
  Stores.ContactStore,
  Stores.OpportunityStore,
  Stores.CampaignStore,
  Stores.TargetStore,
  Stores.ActivityStore,
  Stores.CommentStore,
  Stores.SessionStore
)
@observer
class ContactDetail extends AppComponentBase<IContactFormProps> {
  state = {
    isDirty: false,
    tabActiveKey: "CONTACT_INFO",
    parentCompanies: [] as any,
    industriesLv2: [] as any,
    files: [] as any,
    assignedUsers: [] as any,
    loading: true,
    isShowFull: false,
  };
  formRef: any = React.createRef();
  componentDidUpdate = async (prevProps) => {
    if (prevProps.id !== this.props.id) {
      this.getDetail(this.props.id);
      await this.getDetail(this.props.id);
      await this.initData();
    }
  };
  async componentDidMount() {
    if (!this.props.match?.params?.id) {
      this.setState({ isShowFull: true });
    }
    await Promise.all([
      this.props.appDataStore.getOtherTypes({}),
      this.props.appDataStore.getCountries({}),
      this.props.appDataStore.getCountryFull(),
      this.props.appDataStore.getPositionLevels({}),
      this.findParentCompanies(""),
    ]);
    await this.getDetail(this.props.id);
    await this.initData();
    await console.log(this.props.contactStore.editContact);
    this.setState({ loading: false });
  }

  getDetail = async (id?: number) => {
    if (!id) {
      await this.props.contactStore.createContact();
    } else {
      await this.props.contactStore.get(id, this.state.isShowFull);
    }

    this.formRef.current?.setFieldsValue({
      ...this.props.contactStore.editContact,
    });
  };

  initData = () => {
    if (
      this.props.contactStore.editContact &&
      this.props.contactStore.editContact.id
    ) {
      const { contactUser } = this.props.contactStore.editContact;
      this.setState({
        assignedUsers: (contactUser || []).map((user) => ({
          id: user.userId,
          displayName: user.user.displayName,
        })),
      });
    }
  };

  findParentCompanies = async (keyword: string) => {
    let result = await contactService.getAll({
      keyword,
      pageSize: 20,
      pageNumber: 1,
    });
    this.setState({ parentCompanies: result.items || [] });
  };

  findAssignedUsers = async (keyword: string) => {
    let result = await userService.findUsers({
      keyword,
      pageSize: 20,
      pageNumber: 1,
    });
    this.setState({ assignedUsers: result || [] });
  };

  handleUseCompanyAddress = async (companyId: number) => {
    let company = await companyService.get(companyId);
    if (company && company.companyAddress) {
      const primaryAddress = (company.companyAddress || []).find(
        (item: { isPrimary: any }) => item.isPrimary
      );
      const form = this.formRef.current;
      if (!primaryAddress) {
        notifyWarning(
          L("NOTICE"),
          LNotification("COMPANY_HAVE_NOT_GOT_PRIMARY_ADDRESS_YET")
        );
        return;
      }
      let newAddress = { ...primaryAddress, id: undefined };
      // let contactAddress = form.getFieldValue('contactAddress')
      // let isHasPrimaryAddress = (contactAddress || []).findIndex(item => item.isPrimary) !== -1
      let contactAddress = [{ ...newAddress, isPrimary: true }];

      form.setFieldsValue({ contactAddress });
    }
  };

  onSave = () => {
    const form = this.formRef.current;

    form.validateFields().then(async (values: any) => {
      if (this.props.contactStore.editContact?.id) {
        await this.props.contactStore.update({
          ...this.props.contactStore.editContact,
          ...values,
        });
      } else {
        await this.props.contactStore.create(values);
      }
      this.props.history.push(portalLayouts.contact.path);
      // notification.success({ message: L('SAVE_SUCCESSFUL') })
    });
  };

  onCancel = () => {
    if (this.state.isDirty) {
      confirm({
        title: LNotification("ARE_YOU_SURE"),
        okText: L("BTN_YES"),
        cancelText: L("BTN_NO"),
        onOk: () => {
          this.props.history.push(portalLayouts.contact.path);
        },
      });
      return;
    }
    this.props.history.push(portalLayouts.contact.path);
  };

  changeContact = (name: string, value: boolean) => {
    if (!this.props.contactStore.editContact) {
      return;
    }

    this.props.contactStore.editContact = {
      ...this.props.contactStore.editContact,
      [name]: value,
    };
  };

  renderActions = (
    isLoading?: boolean | { delay?: number | undefined } | undefined
  ) => {
    const { editContact } = this.props.contactStore;
    return (
      <div className="d-flex justify-content-between align-items-center px-3  flex-wrap">
        <div className="d-flex align-items-center">
          <span className="mr-3">
            <Switch
              defaultChecked
              size="small"
              checked={!!editContact?.isVerified}
              onChange={(value) => this.changeContact("isVerified", value)}
            />
            &nbsp;
            {L("IS_VERIFIED")}
          </span>
          <span>
            <Switch
              defaultChecked
              size="small"
              checked={!!editContact?.isActive}
              onChange={(value) => this.changeContact("isActive", value)}
            />
            &nbsp;
            {L("IS_ACTIVE")}
          </span>
        </div>
        <div className="d-flex align-items-center  justify-content-end">
          <Button className="mr-1" onClick={this.onCancel}>
            {L("BTN_CANCEL")}
          </Button>
          {isGrantedAny(
            appPermissions.contact.create,
            appPermissions.contact.update
          ) && (
            <Button type="primary" onClick={this.onSave} loading={isLoading}>
              {L("BTN_SAVE")}
            </Button>
          )}

          {isGranted(appPermissions.contact.viewFull) &&
            this.props.match?.params?.id && (
              <Button
                className="mx-1"
                type="primary"
                danger
                disabled={this.state.isShowFull}
                onClick={() => {
                  this.setState({ isShowFull: true }, () =>
                    this.getDetail(this.props.match?.params?.id)
                  );
                }}
                loading={isLoading}
              >
                {L("BTN_VIEW_FULL")}
              </Button>
            )}
        </div>
      </div>
    );
  };

  render() {
    const {
      appDataStore: {
        otherTypes,
        countries,
        countryFull,
        positionLevels,
        departments,
      },
      // contactStore: { isLoading },
    } = this.props;
    const { assignedUsers } = this.state;

    return (
      <Form
        layout="vertical"
        ref={this.formRef}
        onFinish={this.onSave}
        onAbort={this.onCancel}
        onValuesChange={() => this.setState({ isDirty: true })}
        validateMessages={validateMessages}
      >
        <Row gutter={[8, 0]}>
          <Col sm={{ span: 16, offset: 0 }}>
            <Card bordered={false} id="contact-detail">
              <Row gutter={[8, 0]}>
                <Col sm={{ span: 12, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_GENDER")}
                    {...formVerticalLayout}
                    name="gender"
                    rules={rules.gender}
                  >
                    <Select
                      allowClear
                      filterOption={false}
                      className="full-width"
                    >
                      {renderOptions(GENDERS)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col sm={{ span: 12, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_NAME")}
                    {...formVerticalLayout}
                    name="contactName"
                    rules={rules.contactName}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 12, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_POSITION_TITLE")}
                    {...formVerticalLayout}
                    name="title"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 12, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_POSITION_LEVEL")}
                    {...formVerticalLayout}
                    name="levelId"
                  >
                    <Select
                      allowClear
                      filterOption={filterOptions}
                      className="full-width"
                    >
                      {renderOptions(positionLevels)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col sm={{ span: 12, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_TYPE")}
                    {...formVerticalLayout}
                    name="contactTypeIds"
                  >
                    <Select
                      showSearch
                      allowClear
                      filterOption={filterOptions}
                      className="full-width"
                      mode="multiple"
                    >
                      {renderOptions(otherTypes.contactTypes)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col sm={{ span: 12, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_NATIONALITY")}
                    {...formVerticalLayout}
                    name="nationalityId"
                    rules={rules.nationalityId}
                  >
                    <Select
                      showSearch
                      allowClear
                      filterOption={filterOptions}
                      className="full-width"
                    >
                      {renderOptions(countries)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_EMAIL")}
                    {...formVerticalLayout}
                    name="contactEmail"
                    rules={
                      this.state.isShowFull ? rules.contactEmail : undefined
                    }
                  >
                    <EmailsInput disabledProps={!this.state.isShowFull} />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_PHONE")}
                    {...formVerticalLayout}
                    name="contactPhone"
                    rules={
                      this.state.isShowFull ? rules.contactPhone : undefined
                    }
                  >
                    <PhonesInput2
                      disableProps={!this.state.isShowFull}
                      // phoneTypes={otherTypes.phoneTypes}
                      // countries={countries}
                    />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 12, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_EMAIL_OPT_OUT")}
                    {...formVerticalLayout}
                    name="emailOptOut"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            {/* ---- */}
            <Row gutter={[8, 0]}>
              <Col sm={{ span: 24 }}>
                <Card bordered={false} className="mt-3">
                  <Form.Item
                    label={L("CONTACT_COMPANY")}
                    {...formVerticalLayout}
                    name="companyContact"
                  >
                    <CompaniesSelect
                      handleUseCompanyAddress={this.handleUseCompanyAddress}
                    />
                  </Form.Item>
                </Card>
              </Col>
            </Row>
            {/* ---- */}

            <Card bordered={false} className="mt-3">
              <Row gutter={[8, 0]}>
                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_ASSIGNED_USERS")}
                    {...formVerticalLayout}
                    name="contactUserIds"
                  >
                    <Select
                      showSearch
                      allowClear
                      showArrow
                      filterOption={false}
                      mode="multiple"
                      style={{ width: "100%" }}
                      onSearch={(text) => this.findAssignedUsers(text)}
                    >
                      {(assignedUsers || []).map(
                        (item, index: string | number | undefined) => (
                          <Option key={index} value={item.id}>
                            {item.displayName}
                            <div className="text-muted small">{item.email}</div>
                          </Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_ASSIGNED_DEPARTMENTS")}
                    {...formVerticalLayout}
                    name="contactOrganizationUnitIds"
                  >
                    <Select
                      showSearch
                      allowClear
                      showArrow
                      mode="multiple"
                      style={{ width: "100%" }}
                      filterOption={filterOptions}
                    >
                      {renderOptions(departments)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={{ span: 8, offset: 0 }}>
            <Card bordered={false}>
              <Row>
                {this.props.contactStore.editContact &&
                  !this.props.contactStore.editContact.contactAddress[0] && (
                    <Col
                      sm={{ span: 24, offset: 0 }}
                      className="d-flex justify-content-center align-items-center mb-3"
                    >
                      <Button
                        onClick={() =>
                          this.handleUseCompanyAddress(
                            this.props.contactStore.editContact
                              .contactCompany[0].companyId
                          )
                        }
                      >
                        {L("USE_COMPANY_ADDRESS")}
                      </Button>
                    </Col>
                  )}

                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_LOCATION")}
                    {...formVerticalLayout}
                    name="contactAddress"
                    rules={rules.contactAddress}
                  >
                    <AddressInput2 countries={countryFull} />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("CONTACT_DESCRIPTION")}
                    {...formVerticalLayout}
                    name="description"
                  >
                    <TextArea />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default withRouter(ContactDetail);
