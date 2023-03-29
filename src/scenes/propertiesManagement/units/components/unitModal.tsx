import { inject, observer } from "mobx-react";
import React from "react";
import CustomDrawer from "@components/Drawer/CustomDrawer";
import { useForm } from "antd/es/form/Form";
import { Card, Tabs } from "antd";
import { L } from "@lib/abpUtility";
import TabInfo from "./tabInfo";

type Props = {
  visible: boolean;
  id: any;
  title: string;
  //   genFeeStore: GenFeeStore
  onCancel: () => void;
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
const UnitModal = inject()(
  observer((props: Props) => {
    const [form] = useForm();
    const [tabActiveKey, setTabActiveKey] = React.useState(tabKeys.tabInfo);
    React.useEffect(() => {
      if (props.id) {
        console.log("init");
        //   form.setFieldsValue(data)
      } else {
        form.resetFields();
      }
      console.log(props.title);
    }, [props.visible]);
    const changeTab = (tabKey) => {
      setTabActiveKey(tabKey);
    };
    return (
      <CustomDrawer
        useBottomAction
        title={props.title}
        visible={props.visible}
        onClose={() => {
          form.resetFields(), props.onCancel();
        }}
        onFullView={() => console.log(1)}
        getContainer={false}
      >
        {" "}
        <Tabs
          activeKey={tabActiveKey}
          onTabClick={changeTab}
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
              <TabInfo />
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabActivity)}
            key={tabKeys.tabActivity}
          ></Tabs.TabPane>
          {/* <Tabs.TabPane
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
          ></Tabs.TabPane> */}
        </Tabs>
      </CustomDrawer>
    );
  })
);

export default UnitModal;
