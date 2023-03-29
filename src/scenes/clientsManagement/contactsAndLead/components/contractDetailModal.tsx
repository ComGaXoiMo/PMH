import { inject, observer } from "mobx-react";
import React from "react";
import CustomDrawer from "@components/Drawer/CustomDrawer";
import { useForm } from "antd/es/form/Form";
import { Card, Tabs } from "antd";
import { L } from "@lib/abpUtility";
import ContactActivity from "./tabActivity/ContactActivity";
const fakedata = [
  {
    data: {
      title: "Booking Confirmation",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#27AE60",
      type: 2,
    },
  },
  {
    data: {
      title: "Send Proposal",
      link: "",
      file: "BOC-22012023.PDF",
      color: "#9B51E0",
      type: 2,
    },
  },
  {
    data: {
      title: "Update",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#F2994A",
      type: 1,
    },
  },
  {
    data: {
      title: "Send Mail",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#9B51E0",
      type: 2,
    },
  },
  {
    data: {
      title: "Update",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "",
      color: "#F2994A",
      type: 1,
    },
  },
];
type Props = {
  visible: boolean;
  title: string;
  data: any;
  onCancel: () => void;
};
const tabKeys = {
  tabActivity: "TAB_ACTIVITY",
  tabInquiries: "TAB_INQUIRIES",
  tabContracts: "TAB_CONTRACTS",
  tabDocuments: "TAB_DOCUMENT",
  tabAssociateParty: "TAB_ASSOCIATE_PARTY",
};
const ContractDetailModal = inject()(
  observer((props: Props) => {
    const [form] = useForm();
    const [tabActiveKey, setTabActiveKey] = React.useState(tabKeys.tabActivity);
    React.useEffect(() => {
      if (props.data) {
        //   form.setFieldsValue(data)
      } else {
        form.resetFields();
      }
    }, [props.visible]);
    const changeTab = (tabKey) => {
      setTabActiveKey(tabKey);
    };
    return (
      <CustomDrawer
        useBottomAction
        title={props.data?.contactName}
        visible={props.visible}
        onClose={() => {
          form.resetFields(), props.onCancel();
        }}
        onFullView={() => console.log(1)}
        getContainer={false}
      >
        <Tabs
          activeKey={tabActiveKey}
          onTabClick={changeTab}
          className={"antd-tab-cusstom h-100"}
          type="card"
        >
          <Tabs.TabPane tab={L(tabKeys.tabActivity)} key={tabKeys.tabActivity}>
            <Card className="card-detail w-100 h-100">
              {fakedata.map((item) => (
                <ContactActivity data={item.data} />
              ))}
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabInquiries)}
            key={tabKeys.tabInquiries}
          ></Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabContracts)}
            key={tabKeys.tabContracts}
          ></Tabs.TabPane>{" "}
          <Tabs.TabPane
            tab={L(tabKeys.tabDocuments)}
            key={tabKeys.tabDocuments}
          ></Tabs.TabPane>
          <Tabs.TabPane
            tab={L(tabKeys.tabAssociateParty)}
            key={tabKeys.tabAssociateParty}
          ></Tabs.TabPane>
        </Tabs>
      </CustomDrawer>
    );
  })
);

export default ContractDetailModal;
