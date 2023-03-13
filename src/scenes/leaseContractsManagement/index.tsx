import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";

export interface ILeaseContractsProps {}

export interface ILeaseContractsState {}
const tabKeys = {
  tabLease: "TAB_LEASE",
  tabDeposit: "TAB_DEPOSIT",
  tabPayment: "TAB_PAYMENT",
  tabReport: "TAB_REPORT",
};
@inject()
@observer
class LeaseContracts extends AppComponentListBase<
  ILeaseContractsProps,
  ILeaseContractsState
> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabLease,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div className="container-element">
          <h1>{L("CONTRACTS")}</h1>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"antd-tab-cusstom"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabLease)}
              key={tabKeys.tabLease}
              className={"color-tab"}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabDeposit)}
              key={tabKeys.tabDeposit}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabPayment)}
              key={tabKeys.tabPayment}
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

export default LeaseContracts;
