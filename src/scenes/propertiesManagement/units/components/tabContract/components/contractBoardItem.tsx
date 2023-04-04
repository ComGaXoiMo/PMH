import * as React from "react";

import { inject, observer } from "mobx-react";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
// import { Table } from "antd";

export interface IContractItemProps {}

export interface IContractItemState {}

@inject()
@observer
class ContractBoardItem extends AppComponentListBase<
  IContractItemProps,
  IContractItemState
> {
  formRef: any = React.createRef();
  state = {};

  async componentDidMount() {}

  public render() {
    const {} = this.props;

    return (
      <>
        <Card className="card-detail-modal">
          <div className="h-100 board-item">
            <strong>CT-0000000001</strong>
            <label>Create by: You</label>
            <label>Client name: 000808080</label>
            <label>Arrival Date: 3-Feb-23 - Departure Date: 4-Feb-23</label>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(ContractBoardItem);
