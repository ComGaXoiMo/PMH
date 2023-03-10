import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";

export interface IClientsProps {}

export interface IClientsState {}
const tabKeys = {
  tabContacts_Lead: "TAB_CONTACTS_LEAD",
  tabCompany: "TAB_COMPANY",
  tabTenant: "TAB_TENANT",
  tabReport: "TAB_REPORT",
};
@inject()
@observer
class Clients extends AppComponentListBase<IClientsProps, IClientsState> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabContacts_Lead,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div className="header-element">
          <h1>{L("CLIENTS")}</h1>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"color-tabs"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabContacts_Lead)}
              key={tabKeys.tabContacts_Lead}
              className={"color-tab"}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabCompany)}
              key={tabKeys.tabCompany}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabTenant)}
              key={tabKeys.tabTenant}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabReport)}
              key={tabKeys.tabReport}
            ></Tabs.TabPane>
          </Tabs>
        </div>
      </>
    );
  }
}

export default Clients;
