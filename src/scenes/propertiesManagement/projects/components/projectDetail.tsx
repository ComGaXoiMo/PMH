import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import Units from "./tabUnit";
import Inquiries from "./tabinquiry";

export interface IProjectsDetailState {}
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import withRouter from "@components/Layout/Router/withRouter";
import Stores from "@stores/storeIdentifier";
import Summary from "./tabSummary";
import ProjectStore from "@stores/projects/projectStore";
import UnitStore from "@stores/projects/unitStore";
import { RouteComponentProps } from "react-router-dom";
import Leases from "@scenes/leaseContractsManagement/lease";
import { LeftOutlined } from "@ant-design/icons";
import { portalLayouts } from "@components/Layout/Router/router.config";
interface IProjectsDetailProps extends RouteComponentProps {
  projectStore: ProjectStore;
  unitStore: UnitStore;
  params: any;
}
const tabKeys = {
  tabSummaries: "TAB_SUMMARY",
  tabUnits: "TAB_UNITS",
  tabInquiries: "TAB_INQUIRIES",
  tabContracts: "TAB_CONTRACTS",
  tabDocuments: "TAB_DOCUMENTS",
};
@inject(Stores.ProjectStore, Stores.UnitStore)
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
  goBack = () => {
    const { history } = this.props;
    history.push(portalLayouts.properties.path);
  };
  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };

  public render() {
    return (
      <>
        <div className="container-element">
          <div className="modul-lable-name">
            <a onClick={this.goBack} style={{ color: "black" }}>
              <LeftOutlined
                style={{
                  backgroundColor: "#F3F5F6",
                  borderRadius: "8px",
                  padding: "6px",
                }}
              />{" "}
              Back
            </a>
            <br />
            <strong>
              {this.props.projectStore.editProject?.name ?? "Create"}
            </strong>
          </div>
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
            {this.props.projectStore.editProject?.name && (
              <Tabs.TabPane tab={L(tabKeys.tabUnits)} key={tabKeys.tabUnits}>
                <Units />
              </Tabs.TabPane>
            )}
            {this.props.projectStore.editProject?.name && (
              <Tabs.TabPane
                tab={L(tabKeys.tabInquiries)}
                key={tabKeys.tabInquiries}
              >
                <Inquiries />
              </Tabs.TabPane>
            )}
            {this.props.projectStore.editProject?.name && (
              <Tabs.TabPane
                tab={L(tabKeys.tabContracts)}
                key={tabKeys.tabContracts}
              >
                <Leases />
              </Tabs.TabPane>
            )}
            {this.props.projectStore.editProject?.name && (
              <Tabs.TabPane
                tab={L(tabKeys.tabDocuments)}
                key={tabKeys.tabDocuments}
              ></Tabs.TabPane>
            )}
          </Tabs>
        </div>
      </>
    );
  }
}

export default withRouter(ProjectsDetail);
