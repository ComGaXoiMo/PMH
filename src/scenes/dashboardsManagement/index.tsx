import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import Overviews from "./components/overview/overviews";
import Leasings from "./components/leasingReport/leasingReport";
import Clients from "./components/clientsReport/clientsReport";
import Contracts from "./components/contractsReport/contractsReport";
import Inquiries from "./components/inquiriesReport/inquiriesReport";
import Tasks from "./components/tasksReport/tasksReport";
import Staffs from "./components/staffsReport/staffsReport";

export interface IDashboardsProps {}

export interface IDashboardsState {}
const tabKeys = {
  tabOverview: "TAB_OVERVIEW",
  tabLeasing: "TAB_LEASING",
  tabClients: "TAB_CLIENTS",
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
          <div className="modul-lable-name">
            <strong>{L("DASHBOARD")}</strong>
          </div>
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
            >
              <Overviews />
            </Tabs.TabPane>
            <Tabs.TabPane tab={L(tabKeys.tabLeasing)} key={tabKeys.tabLeasing}>
              <Leasings />
            </Tabs.TabPane>
            <Tabs.TabPane tab={L(tabKeys.tabClients)} key={tabKeys.tabClients}>
              <Clients />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabContract)}
              key={tabKeys.tabContract}
            >
              <Contracts />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabInquiries)}
              key={tabKeys.tabInquiries}
            >
              <Inquiries />
            </Tabs.TabPane>
            <Tabs.TabPane tab={L(tabKeys.tabTasks)} key={tabKeys.tabTasks}>
              <Tasks />
            </Tabs.TabPane>
            <Tabs.TabPane tab={L(tabKeys.tabStaff)} key={tabKeys.tabStaff}>
              <Staffs />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    );
  }
}

export default Dashboards;
