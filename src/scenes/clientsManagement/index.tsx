import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface IClientsProps {}

export interface IClientsState {}

@inject()
@observer
class Clients extends AppComponentListBase<IClientsProps, IClientsState> {
  formRef: any = React.createRef();
  public render() {
    return <></>;
  }
}

export default Clients;
