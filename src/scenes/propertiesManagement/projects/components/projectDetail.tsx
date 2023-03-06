import * as React from "react";

import { observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface IProjectsDetailProps {}

export interface IProjectsDetailState {}
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import withRouter from "@components/Layout/Router/withRouter";

const tabKeys = {
  tabSummaries: "TAB_SUMMARY",
  tabUnits: "TAB_UNITS",
  tabInquiries: "TAB_INQUIRIES",
  tabContracts: "TAB_CONTRACTS",
  tabDocuments: "TAB_DOCUMENTS",
};
@observer
class ProjectsDetail extends AppComponentListBase<
  IProjectsDetailProps,
  IProjectsDetailState
> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabSummaries,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };

  public render() {
    return (
      <>
        <div className="header-element">
          <h1>{L("PROJECTS_UNIT")}</h1>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"color-tabs"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabSummaries)}
              key={tabKeys.tabSummaries}
              className={"color-tab"}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabUnits)}
              key={tabKeys.tabUnits}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabInquiries)}
              key={tabKeys.tabInquiries}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabContracts)}
              key={tabKeys.tabContracts}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabDocuments)}
              key={tabKeys.tabDocuments}
            ></Tabs.TabPane>
          </Tabs>
        </div>
      </>
    );
  }
}

export default withRouter(ProjectsDetail);
