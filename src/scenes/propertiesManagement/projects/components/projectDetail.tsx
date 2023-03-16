import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import Units from "./tabUnit";
import Inquiries from "./tabinquiry";
interface IProjectsDetailProps extends RouteComponentProps {
  projectStore: ProjectStore;
  unitStore: UnitStore;
  params: any;
}

export interface IProjectsDetailState {}
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import withRouter from "@components/Layout/Router/withRouter";
import Stores from "@stores/storeIdentifier";
import Summary from "./tabSummary";
import ProjectStore from "@stores/projects/projectStore";
import UnitStore from "@stores/projects/unitStore";
import { RouteComponentProps } from "react-router-dom";

const tabKeys = {
  tabSummaries: "TAB_SUMMARY",
  tabUnits: "TAB_UNITS",
  tabInquiries: "TAB_INQUIRIES",
  tabContracts: "TAB_CONTRACTS",
  tabDocuments: "TAB_DOCUMENTS",
};
@inject(Stores.CompanyStore, Stores.UnitStore)
@observer
class ProjectsDetail extends AppComponentListBase<IProjectsDetailProps, any> {
  formRef: any = React.createRef();
  formRefProjectAddress: any = React.createRef();

  constructor(props: IProjectsDetailProps) {
    super(props);
    this.state = {
      tabActiveKey: tabKeys.tabSummaries,
      isDirty: false,
      companies: [],
      propertyManagements: [],
      contacts: [],
    };
  }
  componentDidMount = async () => {
    await console.log(this.props.projectStore);
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };

  public render() {
    return (
      <>
        <div className="container-element">
          <strong>{1}</strong>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"antd-tab-cusstom"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabSummaries)}
              key={tabKeys.tabSummaries}
            >
              <Summary />
            </Tabs.TabPane>
            <Tabs.TabPane tab={L(tabKeys.tabUnits)} key={tabKeys.tabUnits}>
              <Units />
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabInquiries)}
              key={tabKeys.tabInquiries}
            >
              <Inquiries />
            </Tabs.TabPane>
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
