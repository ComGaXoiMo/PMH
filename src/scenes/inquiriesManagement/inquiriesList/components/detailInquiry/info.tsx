import * as React from "react";

import { inject, observer } from "mobx-react";

import { AppComponentListBase } from "@components/AppComponentBase";
import withRouter from "@components/Layout/Router/withRouter";
import { Card, Tabs } from "antd";
import { L } from "@lib/abpUtility";
import TabActivity from "./tabActivity";
import TabTask from "./tabTask";
import TabMail from "./tabMail";
import TabCall from "./tabCall";
import TabProposal from "./tabProposal";
import TabAuditTrail from "./tabAuditTrail";
import TabOffer from "./tabOffer";
import TabDocument from "./tabDocument";
import TabLeaseAgreement from "./tabLeaseAgreement";
import TabSiteVisit from "./tabSiteVisit";
import TabBooking from "./tabBooking";
import TabMatching from "./tabMatching";

export interface IinfoInquiryProps {}

export interface IinfoInquiryState {
  tabActiveKey: any;
}
const tabKeys = {
  tabActivity: "TAB_ACTIVITY",
  tabTask: "TAB_TASK",
  tabMatching: "TAB_MATCHING",
  tabMail: "TAB_MAIL",
  tabCall: "TAB_CALL",
  tabProposal: "TAB_PROPOSAL",
  tabOffer: "TAB_OFFER",
  tabLeaseAgr: "TAB_LEASE_AGREEMENT",
  tabSiteVisit: "TAB_SITE_VISIT",
  tabBooking: "TAB_BOOKING",
  tabDocument: "TAB_DOCUMENT",
  tabAssociateParty: "TAB_ASSOCIATE_PARTY",
  tabAuditTrail: "TAB_AUDIT_TRAIL",
};
@inject()
@observer
class infoInquiry extends AppComponentListBase<
  IinfoInquiryProps,
  IinfoInquiryState
> {
  formRef: any = React.createRef();

  state = {
    tabActiveKey: tabKeys.tabActivity,
  };
  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    const {} = this.props;

    return (
      <>
        <Card
          style={{
            backgroundColor: "white",
            // minHeight: "80vh",
            height: "max-content",
            borderRadius: "16px",
          }}
        >
          {" "}
          <style>{`
        .ant-card .ant-card-body{
            padding:0px 
        }
        .ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap, 
        .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap{
            padding-left: 24px;

        }
        `}</style>
          <div style={{ padding: "14px" }}>
            <strong>More</strong>
          </div>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"antd-tab-cusstom"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabActivity)}
              key={tabKeys.tabActivity}
              className={"color-tab"}
            >
              <TabActivity />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabMatching)}
              key={tabKeys.tabMatching}
              className={"color-tab"}
            >
              <TabMatching />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabTask)}
              key={tabKeys.tabTask}
              className={"color-tab"}
            >
              <TabTask />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabMail)}
              key={tabKeys.tabMail}
              className={"color-tab"}
            >
              <TabMail />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabCall)}
              key={tabKeys.tabCall}
              className={"color-tab"}
            >
              <TabCall />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabProposal)}
              key={tabKeys.tabProposal}
              className={"color-tab"}
            >
              <TabProposal />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabOffer)}
              key={tabKeys.tabOffer}
              className={"color-tab"}
            >
              <TabOffer />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabLeaseAgr)}
              key={tabKeys.tabLeaseAgr}
              className={"color-tab"}
            >
              <TabLeaseAgreement />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabSiteVisit)}
              key={tabKeys.tabSiteVisit}
              className={"color-tab"}
            >
              <TabSiteVisit />
            </Tabs.TabPane>{" "}
            <Tabs.TabPane
              tab={L(tabKeys.tabBooking)}
              key={tabKeys.tabBooking}
              className={"color-tab"}
            >
              <TabBooking />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabDocument)}
              key={tabKeys.tabDocument}
              className={"color-tab"}
            >
              <TabDocument />
            </Tabs.TabPane>{" "}
            {/* <Tabs.TabPane
              tab={L(tabKeys.tabAssociateParty)}
              key={tabKeys.tabAssociateParty}
              className={"color-tab"}
            >
              <TabCall />
            </Tabs.TabPane>{" "} */}
            <Tabs.TabPane
              tab={L(tabKeys.tabAuditTrail)}
              key={tabKeys.tabAuditTrail}
              className={"color-tab"}
            >
              <TabAuditTrail />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </>
    );
  }
}

export default withRouter(infoInquiry);
