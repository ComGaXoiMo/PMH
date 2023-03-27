import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import ContactsAndLead from "./contactsAndLead";
import Company from "./company";
import Tenants from "./tenants";

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
        <div className="container-element">
          <div className="modul-lable-name">
            <strong>{L("CLIENTS")}</strong>
          </div>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"antd-tab-cusstom"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabContacts_Lead)}
              key={tabKeys.tabContacts_Lead}
              className={"color-tab"}
            >
              <ContactsAndLead />
            </Tabs.TabPane>
            <Tabs.TabPane tab={L(tabKeys.tabCompany)} key={tabKeys.tabCompany}>
              <Company />
            </Tabs.TabPane>
            <Tabs.TabPane tab={L(tabKeys.tabTenant)} key={tabKeys.tabTenant}>
              <Tenants />
            </Tabs.TabPane>
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
