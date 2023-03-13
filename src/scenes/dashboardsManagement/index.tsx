import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";

export interface IDashboardsProps {}

export interface IDashboardsState {}
const tabKeys = {
  tabOverview: "TAB_OVERVIEW",
  tabLeasing: "TAB_LEASING",
  tabClients: "TAB_CLIENTS ",
  tabContract: "TAB_CONTRACTS",
  tabInquiries: "TAB_INQUIRIES",
  tabTasks: "TAB_TASKS",
  tabStaff: "TAB_STAFF",
};
@inject()
@observer
class Dashboards extends AppComponentListBase<
  IDashboardsProps,
  IDashboardsState
> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabOverview,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div className="container-element">
          <h1>{L("INQUIRIES")}</h1>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"antd-tab-cusstom"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabOverview)}
              key={tabKeys.tabOverview}
              className={"color-tab"}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabLeasing)}
              key={tabKeys.tabLeasing}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabClients)}
              key={tabKeys.tabClients}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabContract)}
              key={tabKeys.tabContract}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabInquiries)}
              key={tabKeys.tabInquiries}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabTasks)}
              key={tabKeys.tabTasks}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabStaff)}
              key={tabKeys.tabStaff}
            ></Tabs.TabPane>
          </Tabs>
        </div>
      </>
    );
  }
}

export default Dashboards;
