import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";
import AllTask from "./allTask";

export interface ITasksProps {}

export interface ITasksState {}
const tabKeys = {
  tabMyTask: "TAB_MY_TASK",
  tabAll: "TAB_ALL",
};
@inject()
@observer
class Tasks extends AppComponentListBase<ITasksProps, ITasksState> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabMyTask,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div className="container-element">
          <strong>{L("TASKS")}</strong>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"antd-tab-cusstom"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabMyTask)}
              key={tabKeys.tabMyTask}
              className={"color-tab"}
            >
              {" "}
              <AllTask />
            </Tabs.TabPane>
            <Tabs.TabPane tab={L(tabKeys.tabAll)} key={tabKeys.tabAll}>
              <AllTask />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
    );
  }
}

export default Tasks;
