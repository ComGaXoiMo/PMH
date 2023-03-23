import * as React from "react";

import { inject, observer } from "mobx-react";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
// import { Table } from "antd";

export interface AllTaskBoardItemProps {}

export interface AllTaskBoardItemState {}

@inject()
@observer
class AllTaskBoardItem extends AppComponentListBase<
  AllTaskBoardItemProps,
  AllTaskBoardItemState
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
            <strong>Task Name 02</strong>
            <label>Inquiries:CT Name</label>
            <label>Customer: Zaire Dorwart</label>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(AllTaskBoardItem);