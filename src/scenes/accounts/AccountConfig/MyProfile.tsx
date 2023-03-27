import * as React from "react";
import { Button, Card, Col, Divider, Form, Input, Row, Switch } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { L } from "@lib/abpUtility";
import rules from "./validation";
import { useEffect } from "react";
import SessionStore from "@stores/sessionStore";
import AppConsts, { moduleAvatar } from "@lib/appconst";
import AvatarUpload from "@components/FileUpload/AvatarUpload";
import { inject } from "mobx-react";
import Stores from "@stores/storeIdentifier";
import { observer } from "mobx-react-lite";
// import WrapPageScroll from "@components/WrapPageScroll";
// import PhoneInput from "@components/Inputs/PhoneInput/PhoneInput";
import ModalChangePhoneNumber from "./components/ModalChangePhoneNumber";
import withRouter from "@components/Layout/Router/withRouter";
const { formVerticalLayout } = AppConsts;
const { TextArea } = Input;
interface Props {
  sessionStore: SessionStore;
}

const MyProfile = inject(Stores.SessionStore)(
  observer((props: Props) => {
    const [changePhoneVisible, setChangePhoneVisible] = React.useState(false);
    // const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    // const GoogleIcon = (
    //   <img
    //     src="/assets/icons/GoogleIcon.svg"
    //     height="20px"
    //     className="mb-1 mx-2"
    //   />
    // );
    // const AppleIcon = (
    //   <img
    //     src="/assets/icons/AppleIcon.svg"
    //     height="20px"
    //     className="mb-1 mx-2"
    //   />
    // );
    // const MicrosoftIcon = (
    //   <img
    //     src="/assets/icons/MicrosoftIcon.svg"
    //     height="20px"
    //     className="mb-1 mx-2"
    //   />
    // );
    useEffect(() => {
      const formValues = {
        ...props.sessionStore?.currentLogin?.user,
        userName: props.sessionStore?.currentLogin?.user.userName.slice(3),
        prefixuserName: props.sessionStore?.currentLogin?.user.userName.slice(
          0,
          3
        ),
      };
      form.setFieldsValue(formValues);
    }, []);

    // const onUpdate = () => {
    //   form.validateFields().then(async (values: any) => {
    //     setLoading(true);
    //     await props.sessionStore
    //       .updateMyProfile({
    //         ...values,
    //         userName: values.prefixuserName + values.userName,
    //       })
    //       .finally(() => setLoading(false));
    //   });
    // };

    // const renderActions = (loading?) => {
    //   return (
    //     <Row>
    //       <Col sm={{ span: 24, offset: 0 }}>
    //         <Button
    //           type="primary"
    //           onClick={() => onUpdate()}
    //           loading={loading}
    //           shape="round"
    //         >
    //           {L("BTN_SAVE")}
    //         </Button>
    //       </Col>
    //     </Row>
    //   );
    // };

    const handleUpdateUsername = async (values) => {
      await props.sessionStore.updateUsername(values);
    };
    // const renderSwitch = (service, index) => {
    //   switch (service) {
    //     case "google.com":
    //       return <span key={index}>{GoogleIcon}</span>;
    //     case "apple.com":
    //       return <span key={index}>{AppleIcon}</span>;
    //     case "microsoft.com":
    //       return <span key={index}>{MicrosoftIcon}</span>;
    //     default:
    //       return;
    //   }
    // };
    return (
      // <WrapPageScroll renderActions={() => renderActions(loading)}>
      <Row gutter={[16, 16]}>
        <Col sm={{ span: 15, offset: 0 }}>
          <Card style={{ overflow: "auto", minHeight: "95%" }}>
            <strong>{L("ACCOUNT_PAGE_PERSONAL_ACC")}</strong>
            <Divider />
            <Form
              form={form}
              layout={"vertical"}
              initialValues={props.sessionStore?.currentLogin?.user}
              size="large"
            >
              <Row gutter={[16, 0]}>
                <Col sm={{ span: 5, offset: 0 }}>
                  <AvatarUpload
                    module={moduleAvatar.myProfile}
                    uploadClass="avatar-wrapper"
                    sessionStore={props.sessionStore}
                  ></AvatarUpload>
                </Col>
                <Col sm={{ span: 19, offset: 0 }}></Col>
                <Col sm={{ span: 12, offset: 0 }}>
                  <Form.Item
                    label={L("MY_PROFILE_SURNAME")}
                    {...formVerticalLayout}
                    name="surname"
                    rules={rules.surname}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 12, offset: 0 }}>
                  <Form.Item
                    label={L("MY_PROFILE_NAME")}
                    {...formVerticalLayout}
                    name="name"
                    rules={rules.name}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("MY_PROFILE_DISPLAY_NAME")}
                    {...formVerticalLayout}
                    name="displayName"
                    rules={rules.displayName}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col sm={{ span: 24, offset: 0 }}>
                  <PhoneInput
                    disabled
                    fieldName="userName"
                    label="User Name"
                    suffix={
                      props.sessionStore?.currentLogin?.user.userInfo
                        .isPhoneConfirmed ? (
                        <CheckCircleOutlined className="text-success" />
                      ) : (
                        <ExclamationCircleOutlined className="text-danger" />
                      )
                    }
                  />
                  <div className="w-100 d-flex justify-content-end">
                    <Button
                      type="link"
                      className="p-0"
                      onClick={() => setChangePhoneVisible(true)}
                    >
                      {L("CHANGE_USER_NAME")}
                    </Button>
                  </div>
                </Col> */}
                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("MY_PROFILE_EMAIL")}
                    {...formVerticalLayout}
                    name="emailAddress"
                    rules={rules.emailAddress}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      suffix={
                        props.sessionStore?.currentLogin?.user.userInfo
                          .isEmailConfirmed ? (
                          <CheckCircleOutlined className="text-success" />
                        ) : (
                          <ExclamationCircleOutlined className="text-danger" />
                        )
                      }
                    />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("MY_PROFILE_POSITION")}
                    {...formVerticalLayout}
                    name="displayName"
                    rules={rules.displayName}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("MY_PROFILE_ABOUT_YOURSELF")}
                    {...formVerticalLayout}
                    name="displayName"
                    rules={rules.displayName}
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>
                <Col sm={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label={L("MY_PROFILE_ACCOUNT_ROLES")}
                    {...formVerticalLayout}
                    name="displayName"
                    rules={rules.displayName}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col sm={{ span: 12, offset: 0 }}>
                  <span>{L("ACCOUNT_LOGIN_SERVICE")}:</span>
                  {props.sessionStore?.currentLogin?.user.userInfo.userLogins.map(
                    (service, index) => renderSwitch(service, index)
                  )}
                </Col> */}
                <Col sm={{ span: 24, offset: 0 }}>
                  <Button type="primary">{L("BTN_SAVE")}</Button>
                </Col>
              </Row>
            </Form>

            <ModalChangePhoneNumber
              handleChangeUsername={(values) => handleUpdateUsername(values)}
              visible={changePhoneVisible}
              handleClose={() => setChangePhoneVisible(false)}
              phoneNumberAsUserName={
                props.sessionStore?.currentLogin?.user.userName
              }
            />
          </Card>
        </Col>

        <Col sm={{ span: 9, offset: 0 }}>
          <Card style={{ borderRadius: 16 }}>
            <Row style={{ height: "40vh" }}>
              <Col sm={{ span: 24, offset: 0 }}>
                <strong>{L("ACCOUNT_PAGE_PASSWORD")}</strong>
                <Divider />
                <Form
                  form={form}
                  layout={"vertical"}
                  initialValues={props.sessionStore?.currentLogin?.user}
                  size="large"
                >
                  <Col sm={{ span: 24, offset: 0 }}>
                    <Form.Item
                      label={L("MY_PROFILE_CURRENT_PASSWORD")}
                      {...formVerticalLayout}
                      name="surname"
                      rules={rules.surname}
                    >
                      <Input type="password" />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 24, offset: 0 }}>
                    <Form.Item
                      label={L("MY_PROFILE_NEW_PASSWORD")}
                      {...formVerticalLayout}
                      name="name"
                      rules={rules.name}
                    >
                      <Input type="password" />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 24, offset: 0 }}>
                    <Form.Item
                      label={L("MY_PROFILE_VERIFy_PASSWORD")}
                      {...formVerticalLayout}
                      name="displayName"
                      rules={rules.displayName}
                    >
                      <Input type="password" />
                    </Form.Item>
                  </Col>
                </Form>
              </Col>
            </Row>
          </Card>
          <Card style={{ minHeight: "20vh", marginTop: 10, borderRadius: 16 }}>
            <Row gutter={[8, 16]} style={{ height: "40%" }}>
              <strong>{L("ACCOUNT_PAGE_NOTIFICATION")}</strong>
              <Divider />
              <Col sm={{ span: 21, offset: 0 }}>
                <label>{L("EMAIL_NOTIFICATION")}</label>
              </Col>
              <Col sm={{ span: 3, offset: 0 }}>
                <Switch />
              </Col>
              <Col sm={{ span: 21, offset: 0 }}>
                <label>{L("WEBSITE_NORIFATION")}</label>
              </Col>
              <Col sm={{ span: 3, offset: 0 }}>
                <Switch />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      // </WrapPageScroll>
    );
  })
);

export default withRouter(MyProfile);
