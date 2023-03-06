import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface IDashboardsProps {}

export interface IDashboardsState {}

@inject()
@observer
class Dashboards extends AppComponentListBase<
  IDashboardsProps,
  IDashboardsState
> {
  formRef: any = React.createRef();
  public render() {
    return <></>;
  }
}

export default Dashboards;
