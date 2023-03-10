import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Tabs } from "antd";
import { L } from "@lib/abpUtility";

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
        <div className="header-element">
          <h1>{L("TASKS")}</h1>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            className={"color-tabs"}
            type="card"
          >
            <Tabs.TabPane
              tab={L(tabKeys.tabMyTask)}
              key={tabKeys.tabMyTask}
              className={"color-tab"}
            ></Tabs.TabPane>
            <Tabs.TabPane
              tab={L(tabKeys.tabAll)}
              key={tabKeys.tabAll}
            ></Tabs.TabPane>
          </Tabs>
        </div>
      </>
    );
  }
}

export default Tasks;
