import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface ISiteVisitProps {}

export interface ISiteVisitState {}

@inject()
@observer
class SiteVisits extends AppComponentListBase<
  ISiteVisitProps,
  ISiteVisitState
> {
  formRef: any = React.createRef();
  state = {};

  public render() {
    return (
      <>
        <h1>SiteVisit</h1>
      </>
    );
  }
}

export default SiteVisits;
