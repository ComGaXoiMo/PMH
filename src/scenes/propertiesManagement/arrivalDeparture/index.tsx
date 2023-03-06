import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface IArrivalDepartureProps {}

export interface IArrivalDepartureState {}

@inject()
@observer
class ArrivalDepartures extends AppComponentListBase<
  IArrivalDepartureProps,
  IArrivalDepartureState
> {
  formRef: any = React.createRef();
  state = {};

  public render() {
    return (
      <>
        <h1>ArrivalDeparture</h1>
      </>
    );
  }
}

export default ArrivalDepartures;
