import * as React from "react";

import { inject, observer } from "mobx-react";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
// import { Table } from "antd";

export interface IProposalItemProps {}

export interface IProposalItemState {}

@inject()
@observer
class ProposalBoardItem extends AppComponentListBase<
  IProposalItemProps,
  IProposalItemState
> {
  formRef: any = React.createRef();
  state = {};

  async componentDidMount() {}

  public render() {
    const {} = this.props;

    return (
      <>
        <Card
          style={{
            display: "flex",
            textAlign: "left",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "12px",
            backgroundColor: "#F2F4F8",
          }}
        >
          <div className="h-100 board-item">
            <strong>CT10000000</strong>
            <label>Create by: You</label>
            <label>Log By:CT Name</label>
            <label>Name Log: Zaire Dorwart</label>
            <label>Time Log: 01/01/2023</label>
            <label></label>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(ProposalBoardItem);