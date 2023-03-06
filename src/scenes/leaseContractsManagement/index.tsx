import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface ILeaseContractsProps {}

export interface ILeaseContractsState {}

@inject()
@observer
class LeaseContracts extends AppComponentListBase<
  ILeaseContractsProps,
  ILeaseContractsState
> {
  formRef: any = React.createRef();
  public render() {
    return <></>;
  }
}

export default LeaseContracts;
