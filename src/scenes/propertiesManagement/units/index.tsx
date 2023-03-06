import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface IUnitProps {}

export interface IUnitState {}

@inject()
@observer
class Units extends AppComponentListBase<IUnitProps, IUnitState> {
  formRef: any = React.createRef();
  state = {};

  public render() {
    return (
      <>
        <h1>Unit</h1>
      </>
    );
  }
}

export default Units;
