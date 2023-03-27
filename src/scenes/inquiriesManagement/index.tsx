import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import InquiriesList from "./inquiriesList";

export interface IInquiriesProps {}

export interface IInquiriesState {}
const tabKeys = {
  tabInquiriesList: "TAB_INQUIRIES_LIST",
  tabReports: "TAB_REPORTS",
};
@inject()
@observer
class Inquiries extends AppComponentListBase<IInquiriesProps, IInquiriesState> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabInquiriesList,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div className="container-element">
          <div className="modul-lable-name">
            <strong>{L("INQUIRIES")}</strong>
          </div>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"antd-tab-cusstom"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabInquiriesList)}
              key={tabKeys.tabInquiriesList}
              className={"color-tab"}
            >
              <InquiriesList />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabReports)}
              key={tabKeys.tabReports}
            ></Tabs.TabPane>
          </Tabs>
        </div>
      </>
    );
  }
}

export default Inquiries;
