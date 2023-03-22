import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

import { L } from "@lib/abpUtility";

export interface IProposalProps {}

export interface IProposalState {}

@inject()
@observer
class Proposal extends AppComponentListBase<IProposalProps, IProposalState> {
  formRef: any = React.createRef();
  state = {};

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div className="container-element">
          <h1>{L("Proposal")}</h1>
        </div>
      </>
    );
  }
}

export default Proposal;
