import React from "react";

import {
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  DatePicker,
  Card,
  Tabs,
  Modal,
  Button,
  Checkbox,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { L, LNotification, isGrantedAny } from "../../../../lib/abpUtility";
import rules from "./validation";
import AppConsts, {
  moduleAvatar,
  dateFormat,
  appPermissions,
  defaultAvatar,
} from "../../../../lib/appconst";
import { inject, observer } from "mobx-react";
import Stores from "../../../../stores/storeIdentifier";
import StaffStore from "../../../../stores/member/staff/staffStore";
import RoleStore from "../../../../stores/administrator/roleStore";
import WrapPageScroll from "../../../../components/WrapPageScroll";
import AppComponentBase from "../../../../components/AppComponentBase";
import AvatarUpload from "../../../../components/FileUpload/AvatarUpload";
import UserStore from "../../../../stores/administrator/userStore";
import { validateMessages } from "../../../../lib/validation";
import groupBy from "lodash/groupBy";

const { align, formVerticalLayout, genders } = AppConsts;
const { confirm } = Modal;

export interface IStaffFormProps {
  match: any;
  history: any;
  staffStore: StaffStore;
  roleStore: RoleStore;
  userStore: UserStore;
}

@inject(Stores.StaffStore, Stores.UserStore, Stores.RoleStore)
@observer
class StaffDetail extends AppComponentBase<IStaffFormProps> {
  state = {
    isDirty: false,
    tabActiveKey: "STAFF_INFO",
    selectingStaffProject: {} as any,
    staffProjects: [] as any,
    displayNames: [],
    selectedProjectId: undefined,
    groupRoles: [] as any,
    columns: [
      {
        title: L("UNIT_PROJECT"),
        dataIndex: "project",
        key: "project",
        width: 150,
        render: (project) => <div>{project?.name}</div>,
      },
    ],
  };
  formRef: any = React.createRef();

  async componentDidMount() {
    // Need to wait to get all role first. If not -> the logic will be wrong
    await this.props.roleStore.getAllRoles();
    await this.getDetail(this.props.match?.params?.id);
    const { allRoles } = this.props.roleStore;

    let columns = [] as any;
    columns.push({
      title: L("ACTIONS"),
      dataIndex: `operation`,
      key: `operation`,
      width: 90,
      align: align.right,
      render: (role, record) => {
        return (
          <Button
            size="small"
            className="ml-1"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => this.onRemoveStaffProject(record)}
          />
        );
      },
    });
    this.setState({
      columns: [...this.state.columns, ...columns],
      groupRoles: groupBy(allRoles, "group"),
    });
  }

  componentWillUnmount() {
    this.props.userStore.editUserProfilePicture = defaultAvatar;
    this.props.staffStore.createStaff();
  }

  getDetail = async (id?) => {
    if (!id) {
      await this.props.staffStore.createStaff();
    } else {
      // Need to wait to get all role first. If not -> the logic will be wrong
      // await this.props.staffStore.getProjectRoles({ id: this.props.match?.params?.id }, this.props.roleStore.allRoles)
      await this.props.staffStore.get(id);
    }
    this.formRef.current.setFieldsValue({ ...this.props.staffStore.editStaff });
  };

  changeSelectingStaffProject = (id, project) => {
    this.setState({ selectingStaffProject: project });
  };

  addStaffProject = async () => {
    if (
      !this.state.selectingStaffProject ||
      !this.state.selectingStaffProject.value
    ) {
      return;
    }
    let project = {
      id: this.state.selectingStaffProject.value,
      name: this.state.selectingStaffProject?.children,
    };
    this.props.staffStore.createStaffProject(
      project,
      this.props.roleStore.allRoles
    );
    this.setState({
      staffProjects: [...this.state.staffProjects, { project }],
    });
  };

  buildDisplayName = () => {
    let name = this.formRef.current.getFieldValue("name") || "";
    let surname = this.formRef.current.getFieldValue("surname") || "";
    if (name.length && surname.length) {
      name = name.trim();
      surname = surname.trim();
      this.setState({
        displayNames: [`${name} ${surname}`, `${surname} ${name}`],
      });
    }
  };

  onUpdateStaffProject = async () => {
    await this.props.staffStore.updateProjectRoles(
      this.props.staffStore.editStaff.id
    );
    this.props.history.goBack();
  };

  onRemoveStaffProject = async (project) => {
    await this.props.staffStore.removeStaffProject(project);
  };

  onSave = () => {
    const form = this.formRef.current;

    form.validateFields().then(async (values: any) => {
      if (this.props.staffStore.editStaff?.id) {
        await this.props.staffStore.update({
          ...this.props.staffStore.editStaff,
          ...values,
        });
      } else {
        await this.props.staffStore.create({
          ...values,
          setRandomPassword: true,
        });
      }

      this.props.history.goBack();
    });
  };

  onCancel = () => {
    if (this.state.isDirty) {
      confirm({
        title: LNotification("ARE_YOU_SURE"),
        okText: L("BTN_YES"),
        cancelText: L("BTN_NO"),
        onOk: () => {
          this.props.history.goBack();
        },
      });
      return;
    }
    this.props.history.goBack();
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };

  renderActions = (isLoading?) => {
    const { tabActiveKey } = this.state;
    return (
      <Row>
        <Col
          sm={{ span: 24, offset: 0 }}
          className="d-flex justify-content-between"
        >
          <span className="d-flex align-items-center">
            {/* <span className="mr-2 text-muted">{L('IS_ACTIVATED')}</span> */}
            <span>
              <Form.Item
                label={L("STAFF_ACTIVE_STATUS")}
                name="isActive"
                valuePropName="checked"
                className="mb-0"
              >
                <Switch defaultChecked />
              </Form.Item>
            </span>
          </span>
          <span>
            <Button className="mr-1" onClick={this.onCancel} shape="round">
              {L("BTN_CANCEL")}
            </Button>
            {tabActiveKey === "PROJECT_ROLE" &&
              isGrantedAny(
                appPermissions.staff.create,
                appPermissions.staff.update
              ) && (
                <Button
                  type="primary"
                  className="mr-1"
                  onClick={this.onUpdateStaffProject}
                  loading={isLoading}
                  shape="round"
                >
                  {L("BTN_UPDATE_PROJECT_ROLE")}
                </Button>
              )}
            {tabActiveKey === "STAFF_INFO" &&
              isGrantedAny(
                appPermissions.staff.create,
                appPermissions.staff.update
              ) && (
                <Button
                  type="primary"
                  onClick={this.onSave}
                  loading={isLoading}
                  shape="round"
                >
                  {L("BTN_SAVE")}
                </Button>
              )}
          </span>
        </Col>
      </Row>
    );
  };
  renderSwitch = (service) => {
    const GoogleIcon = (
      <img
        src="/assets/icons/GoogleIcon.svg"
        height="20px"
        className="mb-1 mx-2"
      />
    );
    const AppleIcon = (
      <img
        src="/assets/icons/AppleIcon.svg"
        height="20px"
        className="mb-1 mx-2"
      />
    );
    const MicrosoftIcon = (
      <img
        src="/assets/icons/MicrosoftIcon.svg"
        height="20px"
        className="mb-1 mx-2"
      />
    );
    switch (service) {
      case "google.com":
        return GoogleIcon;
      case "apple.com":
        return AppleIcon;
      case "microsoft.com":
        return MicrosoftIcon;
      default:
        return;
    }
  };

  render() {
    const { groupRoles } = this.state;
    const {
      staffStore: { isLoading },
    } = this.props;
    // const profilePictureUrl = this.props.userStore.editUserProfilePicture;
    return (
      <WrapPageScroll renderActions={() => this.renderActions(isLoading)}>
        <Form
          ref={this.formRef}
          // layout={'vertical'}
          onFinish={this.onSave}
          onAbort={this.onCancel}
          onValuesChange={() => this.setState({ isDirty: true })}
          validateMessages={validateMessages}
          size="large"
        >
          <Card
            bordered={false}
            id="staff-detail"
            cover={
              <div style={{ position: "relative" }}>
                {/* <img
                  className="cover-avatar"
                  src={profilePictureUrl}
                  alt=""
                /> */}
                <div className="cover-avatar" />
                <div style={{ position: "absolute", bottom: 0, right: "30px" }}>
                  <AvatarUpload
                    userStore={this.props.userStore}
                    module={moduleAvatar.staff}
                    parentId={this.props.staffStore.editStaff?.id}
                    profilePictureId={
                      this.props.staffStore.editStaff?.profilePictureId
                    }
                  ></AvatarUpload>
                </div>
              </div>
            }
          >
            <Row gutter={[8, 8]}>
              <Col sm={{ span: 8, offset: 0 }}>
                <Form.Item
                  label={L("STAFF_FULL_NAME")}
                  {...formVerticalLayout}
                  name="displayName"
                  rules={rules.displayName}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col sm={{ span: 8, offset: 0 }}>
                <Form.Item
                  label={L("STAFF_EMAIL")}
                  {...formVerticalLayout}
                  name="emailAddress"
                  rules={rules.emailAddress}
                >
                  <Input
                    prefix={<MailOutlined />}
                    suffix={
                      this.props.staffStore.editStaff?.userInfo
                        ?.isEmailConfirmed ? (
                        <CheckCircleOutlined className="text-success" />
                      ) : (
                        <ExclamationCircleOutlined className="text-danger" />
                      )
                    }
                  />
                </Form.Item>
              </Col>
              <Col sm={{ span: 8, offset: 0 }}>
                <Form.Item
                  label={L("STAFF_PHONE")}
                  {...formVerticalLayout}
                  name="phoneNumber"
                  rules={rules.phoneNumber}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    suffix={
                      this.props.staffStore.editStaff?.userInfo
                        ?.isPhoneConfirmed ? (
                        <CheckCircleOutlined className="text-success" />
                      ) : (
                        <ExclamationCircleOutlined className="text-danger" />
                      )
                    }
                  />
                </Form.Item>
              </Col>

              <Col sm={{ span: 8, offset: 0 }}>
                <Form.Item
                  label={L("STAFF_DOB")}
                  {...formVerticalLayout}
                  name="birthDate"
                >
                  <DatePicker
                    className="full-width"
                    format={dateFormat}
                    placeholder={L("SELECT_DATE")}
                  />
                </Form.Item>
              </Col>
              <Col sm={{ span: 8, offset: 0 }}>
                <Form.Item
                  label={L("STAFF_GENDER")}
                  {...formVerticalLayout}
                  name="gender"
                >
                  <Select style={{ width: "100%" }}>
                    {genders.map((gender: any, index) => (
                      <Select.Option key={index} value={gender.value}>
                        {L(gender.name)}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={{ span: 24, offset: 0 }}>
                <span>{L("ACCOUNT_LOGIN_SERVICE")}:</span>
                {this.props.staffStore.editStaff?.userInfo?.userLogins.map(
                  (service) => this.renderSwitch(service)
                )}
              </Col>
            </Row>
            <Tabs
              activeKey={this.state.tabActiveKey}
              onTabClick={this.changeTab}
            >
              <Tabs.TabPane tab={L("STAFF_TAB_ROLES")} key="STAFF_INFO">
                <Row gutter={[16, 0]}>
                  <Col sm={{ span: 24, offset: 0 }}>
                    <Form.Item {...formVerticalLayout} name="roleNames">
                      <Checkbox.Group className="full-width">
                        {Object.keys(groupRoles).map((group, index) => (
                          <Row key={index}>
                            <Col span={24}>
                              <b>{group}</b>
                            </Col>
                            {(groupRoles[group] || []).map(
                              (role, childIndex) => (
                                <Col span={8} key={childIndex}>
                                  <Checkbox
                                    value={role.normalizedName}
                                    className="text-truncate"
                                  >
                                    {role.displayName}
                                  </Checkbox>
                                </Col>
                              )
                            )}
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={L("STAFF_TAB_HISTORY")}
                key="STAFF_INFO_HISTORY"
              ></Tabs.TabPane>
            </Tabs>
          </Card>
        </Form>
      </WrapPageScroll>
    );
  }
}

export default StaffDetail;
