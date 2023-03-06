import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface ITasksProps {}

export interface ITasksState {}

@inject()
@observer
class Tasks extends AppComponentListBase<ITasksProps, ITasksState> {
  formRef: any = React.createRef();
  public render() {
    return <></>;
  }
}

export default Tasks;
