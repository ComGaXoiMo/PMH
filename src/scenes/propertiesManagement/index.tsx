import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import Projects from "./projects";
import Units from "./units";
import ArrivalDepartures from "./arrivalDeparture";
import SiteVisits from "./siteVisit";

export interface IPropertiesProps {}

export interface IPropertiesState {}
const tabKeys = {
  tabProjects: "TAB_PROJECTS",
  tabUnits: "TAB_UNITS",
  tabArrival_Departure: "TAB_ARRIVAL_DEPARTURE",
  tabSiteVisit: "TAB_SITE_VISIT",
};
@inject()
@observer
class Properties extends AppComponentListBase<
  IPropertiesProps,
  IPropertiesState
> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabProjects,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };

  public render() {
    return (
      <>
        <div className="container-element">
          <strong>{L("PROJECTS_UNIT")}</strong>
        </div>

        <Tabs
          activeKey={this.state.tabActiveKey}
          onTabClick={this.changeTab}
          className={"antd-tab-cusstom"}
          type="card"
        >
          <Tabs.TabPane
            tab={L(tabKeys.tabProjects)}
            key={tabKeys.tabProjects}
            className={"color-tab"}
          >
            <Projects />
          </Tabs.TabPane>
          <Tabs.TabPane tab={L(tabKeys.tabUnits)} key={tabKeys.tabUnits}>
            <Units />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabArrival_Departure)}
            key={tabKeys.tabArrival_Departure}
          >
            <ArrivalDepartures />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabSiteVisit)}
            key={tabKeys.tabSiteVisit}
          >
            <SiteVisits />
          </Tabs.TabPane>
        </Tabs>
      </>
    );
  }
}

export default Properties;
