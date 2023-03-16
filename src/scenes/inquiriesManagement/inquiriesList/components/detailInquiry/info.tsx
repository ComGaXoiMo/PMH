import * as React from "react";

import { inject, observer } from "mobx-react";

import { AppComponentListBase } from "@components/AppComponentBase";
import withRouter from "@components/Layout/Router/withRouter";
import { Card, Tabs } from "antd";
import { L } from "@lib/abpUtility";
import TabActivity from "./tabActivity";
import TabTask from "./tabTask";

export interface IinfoInquiryProps {}

export interface IinfoInquiryState {
  tabActiveKey: any;
}
const tabKeys = {
  tabActivity: "TAB_ACTIVITY",
  tabTask: "TAB_TASK",
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
          <strong>More</strong>
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
              tab={L(tabKeys.tabTask)}
              key={tabKeys.tabTask}
              className={"color-tab"}
            >
              <TabTask />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </>
    );
  }
}
export default withRouter(infoInquiry);
