import { inject, observer } from "mobx-react";
import * as React from "react";
import CustomDrawer from "@components/Drawer/CustomDrawer";
import { Card, Tabs } from "antd";
import { L } from "@lib/abpUtility";
// import TabInfo from "./tabInfo";
import withRouter from "@components/Layout/Router/withRouter";
import Stores from "@stores/storeIdentifier";
import UnitStore from "@stores/projects/unitStore";
import UnitCreate from "./tabInfo/unitResDetail";

type Props = {
  visible: boolean;
  id: any;
  //   genFeeStore: GenFeeStore
  onCancel: () => void;
  unitStore: UnitStore;
};
type State = {
  tabActiveKey: any;
};
const tabKeys = {
  tabInfo: "TAB_INFO",
  tabActivity: "TAB_ACTIVITY",
  tabBooking: "TAB_BOOKING",
  tabSiteVisit: "TAB_SITE_VISITS",
  tabContracts: "TAB_CONTRACTS",
  tabInquiries: "TAB_INQUIRIES",
  tabDocuments: "TAB_DOCUMENTS",
};
@inject(Stores.UnitStore)
@observer
class UnitModal extends React.Component<Props, State> {
  form: any = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = {
      tabActiveKey: tabKeys.tabInfo,
    };
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.id !== prevProps.id) {
      if (this.props.id) {
        this.getDetail(this.props.id);
      } else {
        this.form.current.resetFields();
      }
    }
  }
  getDetail = async (id) => {
    await this.props.unitStore.getUnitRes(id);
  };
  changeTab(tabKey: string) {
    this.setState({
      tabActiveKey: tabKey,
    });
  }

  render() {
    const {
      visible,
      unitStore: { editUnitRes },
    } = this.props;
    const { tabActiveKey } = this.state;
    return (
      <CustomDrawer
        useBottomAction
        title={editUnitRes?.unitName}
        visible={visible}
        onClose={() => {
          this.props.onCancel();
        }}
        onFullView={() => console.log(1)}
        getContainer={false}
      >
        <Tabs
          activeKey={tabActiveKey}
          onTabClick={this.changeTab}
          className={"antd-tab-cusstom h-100"}
          type="card"
        >
          <Tabs.TabPane
            tab={L(tabKeys.tabInfo)}
            key={tabKeys.tabInfo}
            className={"color-tab h-100"}
            style={{ paddingBottom: "10px" }}
          >
            <Card className="card-detail w-100 h-100">
              {/* <TabInfo /> */}
              <UnitCreate id={this.props.id} />
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabActivity)}
            key={tabKeys.tabActivity}
          ></Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabBooking)}
            key={tabKeys.tabBooking}
          ></Tabs.TabPane>{" "}
          <Tabs.TabPane
            tab={L(tabKeys.tabSiteVisit)}
            key={tabKeys.tabSiteVisit}
          ></Tabs.TabPane>{" "}
          <Tabs.TabPane
            tab={L(tabKeys.tabContracts)}
            key={tabKeys.tabContracts}
          ></Tabs.TabPane>{" "}
          <Tabs.TabPane
            tab={L(tabKeys.tabInquiries)}
            key={tabKeys.tabInquiries}
          ></Tabs.TabPane>{" "}
          <Tabs.TabPane
            tab={L(tabKeys.tabDocuments)}
            key={tabKeys.tabDocuments}
          ></Tabs.TabPane>
        </Tabs>
      </CustomDrawer>
    );
  }
}
export default withRouter(UnitModal);
