import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface IProjectsDetailProps {
  projectStore: ProjectStore;
  params: any;
}

export interface IProjectsDetailState {}
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import withRouter from "@components/Layout/Router/withRouter";
import Stores from "@stores/storeIdentifier";
import Summary from "./tabSummary";
import ProjectStore from "@stores/projects/projectStore";

const tabKeys = {
  tabSummaries: "TAB_SUMMARY",
  tabUnits: "TAB_UNITS",
  tabInquiries: "TAB_INQUIRIES",
  tabContracts: "TAB_CONTRACTS",
  tabDocuments: "TAB_DOCUMENTS",
};
@inject(Stores.CompanyStore)
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
        <div className="container-element">
          <strong>{this.props.params?.id}</strong>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"antd-tab-cusstom"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabSummaries)}
              key={tabKeys.tabSummaries}
              className={"color-tab"}
            >
              <Summary projectStore={this.props.projectStore} />
            </Tabs.TabPane>
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
