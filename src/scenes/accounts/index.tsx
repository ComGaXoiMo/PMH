import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import MyProfile from "./AccountConfig/MyProfile";
import Role from "@scenes/administrator/Roles";

export interface IAccountConfigProps {}

export interface IAccountConfigState {}
const tabKeys = {
  tabInfomation: "TAB_INFOMATION",
  tabDecentrallization: "TAB_DECENTRALLIZATION",
};
@inject()
@observer
class AccountConfig extends AppComponentListBase<
  IAccountConfigProps,
  IAccountConfigState
> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabInfomation,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <div className="container-element">
        <strong>{L("ACCOUNT")}</strong>
        <Tabs
          activeKey={this.state.tabActiveKey}
          onTabClick={this.changeTab}
          className={"antd-tab-cusstom"}
          type="card"
        >
          <Tabs.TabPane
            tab={L(tabKeys.tabInfomation)}
            key={tabKeys.tabInfomation}
            className={"color-tab"}
          >
            <MyProfile />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabDecentrallization)}
            key={tabKeys.tabDecentrallization}
          >
            <Role />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default AccountConfig;
