import { inject, observer } from "mobx-react";
import React from "react";
import CustomDrawer from "@components/Drawer/CustomDrawer";
import { L } from "@lib/abpUtility";
import { Card, Col, Form, Input, Row, Select, Tabs } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
// import FormInput from "@components/FormItem/FormInput";
// import PhonesInput from "@components/Inputs/PhoneInput/PhoneInput";
// import FormSelect from "@components/FormItem/FormSelect";
import AppDataStore from "@stores/appDataStore";
import CompanyStore from "@stores/clientManagement/companyStore";
import Stores from "@stores/storeIdentifier";
import { AppComponentListBase } from "@components/AppComponentBase";
import { debounce } from "lodash";
import companyService from "@services/clientManagement/companyService";
import AppConsts, { moduleIds, moduleNames } from "@lib/appconst";
import AddressInput2 from "@components/Inputs/AddressInput2";
import PhoneInput2 from "@components/Inputs/PhoneInput/PhoneInput2";
import { filterOptions, renderOptions } from "@lib/helper";
import rules from "./validation";
// import rules from "@scenes/accounts/ForgotPassword/index.validation";
import TextArea from "antd/lib/input/TextArea";
import userService from "@services/administrator/user/userService";
import CommentStore from "@stores/common/commentStore";
import TabPane from "antd/lib/tabs/TabPane";
import CompanyContacts from "../CompanyContacts";
import ContactStore from "@stores/clientManagement/contactStore";
import CommentList from "@components/CommentList";
import FileUploadWrap from "@components/FileUpload/FileUploadCRM";
import SessionStore from "@stores/sessionStore";
import FileStore from "@stores/common/fileStore";
const { formVerticalLayout } = AppConsts;
const { Option } = Select;
const tabKeys = {
  tabCompanyInfo: "TAB_COMPANY_INFO",
  tabCompanyDocuments: "TAB_COMPANY_DOCUMENTS",
  tabCompanyContacts: "TAB_COMPANY_CONTACTS",
  tabCompanyOpportunities: "TAB_COMPANY_OPPORTUNITIES",
  tabCompanyActivities: "TAB_COMPANY_ACTIVITIES",
  tabCompanyComments: "TAB_COMPANY_COMMENTS",
};
type Props = {
  visible: boolean;
  id: any;
  data: any;
  history: any;
  onCancel: () => void;
  appDataStore: AppDataStore;
  contactStore: ContactStore;
  fileStore: FileStore;
  commentStore: CommentStore;
  sessionStore: SessionStore;
  companyStore: CompanyStore;
};
type States = {
  industriesLv2: any;
  parentCompanies: any;
  assignedUsers: any;
  tabActiveKey: any;
};
inject(
  Stores.AppDataStore,
  Stores.CompanyStore,
  Stores.ContactStore,
  Stores.OpportunityStore,
  Stores.FileStore,
  Stores.ActivityStore,
  Stores.CommentStore,
  Stores.SessionStore
);
observer;
class CompanyModal extends AppComponentListBase<Props, States> {
  formRef = React.createRef<any>();
  state = {
    parentCompanies: [] as any,
    industriesLv2: [] as any,
    assignedUsers: [] as any,
    tabActiveKey: tabKeys.tabCompanyInfo,
  };
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
      this.props.appDataStore.getOtherTypes({}),
      this.props.appDataStore.getLeadSources({}),
      this.props.appDataStore.getClientTypes({}),
      this.findParentCompanies(""),
    ]);
    await this.updateIndustriesLv2(
      this.props.companyStore.editCompany.industryId
    );
  }

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
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
  findAssignedUsers = debounce(async (keyword) => {
    let result = await userService.findUsers({
      keyword,
      pageSize: 20,
      pageNumber: 1,
    });
    this.setState({ assignedUsers: result || [] });
  }, 200);

  findParentCompanies = debounce(async (keyword) => {
    let result = await companyService.getAll({
      keyword,
      pageSize: 20,
      pageNumber: 1,
    });
    this.setState({ parentCompanies: result.items || [] });
  }, 200);
  render() {
    // const {
    //   appDataStore: { industriesLv1, industriesLv2 },
    // } = this.props;
    // const { parentCompanies } = this.state;
    const {
      appDataStore: {
        otherTypes,
        countries,
        countryFull,
        leadSources,
        industriesLv1,
        clientTypes,
        departments,
      },
    } = this.props;
    const { parentCompanies, industriesLv2, assignedUsers } = this.state;
    return (
      <CustomDrawer
        useBottomAction
        title={this.props.data?.businessName ?? "CREATE"}
        visible={this.props.visible}
        onClose={this.handleClose}
        onEdit={this.handleSave}
        getContainer={false}
      >
        <Tabs
          activeKey={this.state.tabActiveKey}
          onTabClick={this.changeTab}
          className={"antd-tab-cusstom"}
          type="card"
        >
          <TabPane tab={L(tabKeys.tabCompanyInfo)} key={tabKeys.tabCompanyInfo}>
            <Card className="card-detail-modal">
              <strong>{L("COMPANY_DETAIL")}</strong>
              <Form
                ref={this.formRef}
                layout={"vertical"}
                //  onFinish={this.onSave}
                // validateMessages={validateMessages}
                size="middle"
              >
                {/* <Row gutter={[16, 8]}>
                <Col sm={{ span: 12 }}>
                  <FormInput label="COMPANY_NAME" name={"businessName"} />
                </Col>
                <Col sm={{ span: 12 }}>
                  <FormInput label="COMPANY_LEGAL_NAME" name={"legalName"} />
                </Col>
                <Col sm={{ span: 12 }}>
                  <FormSelect
                    options={parentCompanies}
                    label="COMPANY_PARENT"
                    name={"parentId"}
                  />
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
              </Row> */}{" "}
                <Row gutter={[8, 0]}>
                  <Col sm={{ span: 24, offset: 0 }}>
                    <Card bordered={false} id="company-detail">
                      <Row gutter={[8, 0]}>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_BUSINESS_NAME")}
                            {...formVerticalLayout}
                            name="businessName"
                            rules={rules.businessName}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_LEGAL_NAME")}
                            {...formVerticalLayout}
                            name="legalName"
                            rules={rules.legalName}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_PARENT")}
                            {...formVerticalLayout}
                            name="parentId"
                          >
                            <Select
                              showSearch
                              allowClear
                              filterOption={false}
                              className="full-width"
                              onSearch={this.findParentCompanies}
                            >
                              {(parentCompanies || []).map(
                                (item: any, index) => (
                                  <Option key={index} value={item.id}>
                                    {item.businessName}
                                  </Option>
                                )
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_NATIONALITY")}
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
                        <Col sm={{ span: 12, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_VAT_CODE")}
                            {...formVerticalLayout}
                            name="vatcode"
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_LEAD_SOURCE")}
                            {...formVerticalLayout}
                            name="leadSourceId"
                            rules={rules.leadSourceId}
                          >
                            <Select
                              showSearch
                              allowClear
                              filterOption={filterOptions}
                              className="full-width"
                            >
                              {renderOptions(leadSources)}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_COMPANY_TYPE")}
                            {...formVerticalLayout}
                            name="companyTypeIds"
                          >
                            <Select
                              showSearch
                              allowClear
                              showArrow
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
                            label={L("COMPANY_INDUSTRY")}
                            {...formVerticalLayout}
                            name="industryId"
                            rules={rules.industryId}
                          >
                            <Select
                              showSearch
                              allowClear
                              filterOption={filterOptions}
                              className="full-width"
                              onChange={(value) =>
                                this.updateIndustriesLv2(value, true)
                              }
                            >
                              {renderOptions(industriesLv1, null, true)}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_INDUSTRY_LV2")}
                            {...formVerticalLayout}
                            name="industryLevel2Id"
                          >
                            <Select
                              showSearch
                              allowClear
                              filterOption={filterOptions}
                              className="full-width"
                              disabled={
                                !this.formRef.current?.getFieldValue(
                                  "industryId"
                                )
                              }
                            >
                              {renderOptions(industriesLv2)}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_TYPE")}
                            {...formVerticalLayout}
                            name="clientTypeId"
                            rules={rules.clientTypeId}
                          >
                            <Select
                              showSearch
                              allowClear
                              filterOption={filterOptions}
                              className="full-width"
                            >
                              {renderOptions(clientTypes)}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_WEBSITE")}
                            {...formVerticalLayout}
                            name="website"
                            rules={rules.website}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 24 }}>
                          <Form.Item
                            label={L("COMPANY_PHONE")}
                            {...formVerticalLayout}
                            name="companyPhone"
                            rules={rules.companyPhone}
                          >
                            <PhoneInput2 />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                    <Card bordered={false} className="mt-3">
                      <Row gutter={[8, 0]}>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_ASSIGNED_USERS")}
                            {...formVerticalLayout}
                            name="companyUserIds"
                          >
                            <Select
                              showSearch
                              allowClear
                              showArrow
                              filterOption={false}
                              mode="multiple"
                              style={{ width: "100%" }}
                              onSearch={this.findAssignedUsers}
                            >
                              {(assignedUsers || []).map((item, index) => (
                                <Option key={index} value={item.id}>
                                  {item.displayName}
                                  <div className="text-muted small">
                                    {item.email}
                                  </div>
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_ASSIGNED_DEPARTMENTS")}
                            {...formVerticalLayout}
                            name="companyOrganizationUnitIds"
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
                        <Col sm={{ span: 24, offset: 0 }}>
                          <Row>
                            <Col sm={{ span: 24, offset: 0 }}>
                              <Form.Item
                                label={L("COMPANY_LOCATION")}
                                {...formVerticalLayout}
                                name="companyAddress"
                                rules={rules.companyAddress}
                              >
                                <AddressInput2 countries={countryFull} />
                              </Form.Item>
                            </Col>
                            <Col sm={{ span: 24, offset: 0 }}>
                              <Form.Item
                                label={L("COMPANY_NOTE")}
                                {...formVerticalLayout}
                                name="description"
                              >
                                <TextArea />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  {/* <Col sm={{ span: 8, offset: 0 }}>
                    <Card bordered={false}>
                      <Row>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_LOCATION")}
                            {...formVerticalLayout}
                            name="companyAddress"
                            rules={rules.companyAddress}
                          >
                            <AddressInput2 countries={countryFull} />
                          </Form.Item>
                        </Col>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_NOTE")}
                            {...formVerticalLayout}
                            name="description"
                          >
                            <TextArea />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  </Col> */}
                </Row>
              </Form>
            </Card>
          </TabPane>
          <TabPane
            tab={L(tabKeys.tabCompanyContacts)}
            key={tabKeys.tabCompanyContacts}
          >
            <CompanyContacts
              companyId={this.props.companyStore.editCompany?.id}
              history={this.props.history}
            />
          </TabPane>
          {this.props.companyStore.editCompany?.id && (
            <TabPane
              tab={L(tabKeys.tabCompanyComments)}
              key={tabKeys.tabCompanyComments}
            >
              <Card className="card-detail-modal w-100 h-100">
                <CommentList
                  moduleId={moduleIds.company}
                  parentId={this.props.companyStore.editCompany?.uniqueId}
                  isPrivate={false}
                  sessionStore={this.props.sessionStore}
                />
              </Card>
            </TabPane>
          )}
          {this.props.companyStore.editCompany?.id && (
            <TabPane
              tab={L(tabKeys.tabCompanyDocuments)}
              key={tabKeys.tabCompanyDocuments}
            >
              <Card className="card-detail-modal">
                <FileUploadWrap
                  moduleId={moduleNames.company}
                  parentId={this.props.companyStore.editCompany?.uniqueId}
                  fileStore={this.props.fileStore}
                />
              </Card>
            </TabPane>
          )}
        </Tabs>
      </CustomDrawer>
    );
  }
}

export default withRouter(CompanyModal);
