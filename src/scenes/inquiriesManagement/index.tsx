import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface IInquiriesProps {}

export interface IInquiriesState {}

@inject()
@observer
class Inquiries extends AppComponentListBase<IInquiriesProps, IInquiriesState> {
  formRef: any = React.createRef();
  public render() {
    return <></>;
  }
}

export default Inquiries;
