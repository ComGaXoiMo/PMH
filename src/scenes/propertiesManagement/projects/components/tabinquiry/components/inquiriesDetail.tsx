import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

export interface IInquiriessDetailProps {
  params: any;
}

export interface IInquiriessDetailState {}
import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import Stores from "@stores/storeIdentifier";

const tabKeys = {
  tabSummaries: "TAB_SUMMARY",
  tabUnits: "TAB_UNITS",
  tabInquiries: "TAB_INQUIRIES",
  tabContracts: "TAB_CONTRACTS",
  tabDocuments: "TAB_DOCUMENTS",
};
@inject(Stores.CompanyStore)
@observer
class InquiriessDetail extends AppComponentListBase<
  IInquiriessDetailProps,
  IInquiriessDetailState
> {
  formRef: any = React.createRef();
  state = {
    tabActiveKey: tabKeys.tabSummaries,
  };

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };

  public render() {
    return (
      <>
        <div className="container-element">
          <strong>{this.props.params?.id}</strong>
          <Card />
          <Card />
        </div>
      </>
    );
  }
}

export default withRouter(InquiriessDetail);
