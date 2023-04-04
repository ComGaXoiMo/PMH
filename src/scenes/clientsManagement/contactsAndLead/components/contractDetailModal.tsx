import React from "react";
import { inject, observer } from "mobx-react";
import CustomDrawer from "@components/Drawer/CustomDrawer";
import { Avatar, Card, Col, Row, Tabs } from "antd";
import { L } from "@lib/abpUtility";
import ContactActivity from "./tabActivity/ContactActivity";
import ContractInfo from "./tabInfo/ContactInfo";
import { AppComponentListBase } from "@components/AppComponentBase";
import withRouter from "@components/Layout/Router/withRouter";
import {
  MessageOutlined,
  PhoneOutlined,
  MailOutlined,
  StarFilled,
  PlusSquareFilled,
} from "@ant-design/icons";
import InquirieContact from "./tabInquire";
import TabContract from "@scenes/propertiesManagement/units/components/tabContract";
import TabDocument from "@scenes/inquiriesManagement/inquiriesList/components/detailInquiry/tabDocument";
import TabAP from "./tabAP";

const fakedata = [
  {
    data: {
      title: "Booking Confirmation",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#27AE60",
      type: 2,
    },
  },
  {
    data: {
      title: "Send Proposal",
      link: "",
      file: "BOC-22012023.PDF",
      color: "#9B51E0",
      type: 2,
    },
  },
  {
    data: {
      title: "Update",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#F2994A",
      type: 1,
    },
  },
  {
    data: {
      title: "Send Mail",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#9B51E0",
      type: 2,
    },
  },
  {
    data: {
      title: "Update",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "",
      color: "#F2994A",
      type: 1,
    },
  },
];
const tabKeys = {
  tabContactInfo: "CONTACT_INFO",
  tabActivity: "TAB_ACTIVITY",
  tabInquiries: "TAB_INQUIRIES",
  tabContracts: "TAB_CONTRACTS",
  tabDocuments: "TAB_DOCUMENT",
  tabAssociateParty: "TAB_ASSOCIATE_PARTY",
};

type Props = {
  visible: boolean;
  data: any;
  onCancel: () => void;
};

@inject()
@observer
class ContractDetailModal extends AppComponentListBase<Props> {
  formRef = React.createRef<any>();

  state = {
    tabActiveKey: tabKeys.tabContactInfo,
  };

  // componentDidMount() {
  //   const { data } = this.props;
  //   console.log(data);
  //   if (data) {
  //     // this.form.setFieldsValue(data)
  //   } else {
  //   }
  // }

  componentDidUpdate(prevProps: Props) {
    const { data } = this.props;
    if (data && data !== prevProps.data) {
    } else if (!data && data !== prevProps.data) {
    }
  }

  changeTab = (tabKey: string) => {
    this.setState({
      tabActiveKey: tabKey,
    });
  };

  render() {
    const { visible, data, onCancel } = this.props;
    const { tabActiveKey } = this.state;

    return (
      <CustomDrawer
        useBottomAction
        title={data?.contactName ?? ""}
        visible={visible}
        onClose={() => {
          onCancel();
        }}
        onFullView={() => console.log(1)}
        getContainer={false}
      >
        <div style={{ backgroundColor: "white" }}>
          <Row gutter={[4, 8]} style={{ padding: 15 }}>
            <Col sm={{ span: 2, offset: 0 }}>
              <Avatar
                size={64}
                src={
                  <img
                    src={
                      "https://media.gq-magazine.co.uk/photos/5f5b668ceadd3a2aff8f3232/16:9/w_2560%2Cc_limit/Crouchy.jpg"
                    }
                    alt="avatar"
                  />
                }
              />
            </Col>
            <Col sm={{ span: 21, offset: 0 }}>
              <Col sm={{ span: 24, offset: 0 }}>Description</Col>
              <Col sm={{ span: 24, offset: 0 }}>
                <MessageOutlined className="icon-cusstom-pmh" />
                &nbsp;
                <PhoneOutlined className="icon-cusstom-pmh" />
                &nbsp;
                <MailOutlined className="icon-cusstom-pmh" />
                &nbsp;
                <PlusSquareFilled
                  style={{ color: "#F2994A", backgroundColor: "#FFF5D6" }}
                  className="icon-cusstom-pmh"
                />
              </Col>
            </Col>
            <Col sm={{ span: 1, offset: 0 }}>
              <StarFilled
                style={{ color: "#F2994A", backgroundColor: "#FFF5D6" }}
                className="icon-cusstom-pmh"
              />
            </Col>
          </Row>
        </div>
        <Tabs
          activeKey={tabActiveKey}
          onTabClick={this.changeTab}
          className={"antd-tab-cusstom h-100"}
          type="card"
        >
          <Tabs.TabPane
            tab={L(tabKeys.tabContactInfo)}
            key={tabKeys.tabContactInfo}
          >
            <Card className="card-detail-modal">
              <ContractInfo id={this.props.data?.id} />
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab={L(tabKeys.tabActivity)} key={tabKeys.tabActivity}>
            <Card className="card-detail-modal">
              {fakedata.map((item) => (
                <ContactActivity data={item.data} />
              ))}
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabInquiries)}
            key={tabKeys.tabInquiries}
          >
            <InquirieContact />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabContracts)}
            key={tabKeys.tabContracts}
          >
            <TabContract />
          </Tabs.TabPane>{" "}
          <Tabs.TabPane
            tab={L(tabKeys.tabDocuments)}
            key={tabKeys.tabDocuments}
          >
            <TabDocument />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabAssociateParty)}
            key={tabKeys.tabAssociateParty}
          >
            <TabAP />
          </Tabs.TabPane>
        </Tabs>
      </CustomDrawer>
    );
  }
}

export default withRouter(ContractDetailModal);
