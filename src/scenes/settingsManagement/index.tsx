import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import User from "./tabUser";
import Role from "./tabRole";
import TabLanguage from "./tabLanguage";
import TabDepartment from "./tabDepartment";

export interface ISettingsProps {}

export interface ISettingsState {}
const tabKeys = {
  tabUser: "TAB_USER",
  tabRole: "TAB_ROLE",
  tabLanguage: "TAB_LANGUAGE",
  tabDepartment: "TAB_DEPARTMENT",
};
@inject()
@observer
class Settings extends AppComponentListBase<ISettingsProps, ISettingsState> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabUser,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div className="container-element">
          <div className="modul-lable-name">
            <strong>{L("SETTINGS")}</strong>
          </div>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"antd-tab-cusstom"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabUser)}
              key={tabKeys.tabUser}
              className={"color-tab"}
            >
              <User />
            </Tabs.TabPane>
            <Tabs.TabPane tab={L(tabKeys.tabRole)} key={tabKeys.tabRole}>
              <Role />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabLanguage)}
              key={tabKeys.tabLanguage}
            >
              <TabLanguage />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabDepartment)}
              key={tabKeys.tabDepartment}
            >
              <TabDepartment />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    );
  }
}

export default Settings;
