import * as React from "react";

import { inject, observer } from "mobx-react";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
import { portalLayouts } from "@components/Layout/Router/router.config";
// import { Table } from "antd";

export interface ICallItemProps {
  history: any;
}

export interface ICallItemState {}

@inject()
@observer
class CallBoardItem extends AppComponentListBase<
  ICallItemProps,
  ICallItemState
> {
  formRef: any = React.createRef();
  state = {};

  async componentDidMount() {}
  goProposal = (id?) => {
    const { history } = this.props;
    id
      ? history.push(portalLayouts.proposals.path)
      : history.push(portalLayouts.proposalCreate.path);
  };
  public render() {
    const {} = this.props;

    return (
      <>
        <Card
          className="card-item-detail-modal"
          onClick={() => this.goProposal()}
        >
          <div className="h-100 board-item">
            <strong>Proposal name</strong>
            <label>Create By: You</label>
            <label>Client name: Zaire Dorwart</label>
            <label>Time Log: 01/01/2023</label>
            <label>Note: </label>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(CallBoardItem);
