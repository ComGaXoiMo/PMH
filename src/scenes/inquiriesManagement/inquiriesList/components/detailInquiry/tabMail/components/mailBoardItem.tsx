import * as React from "react";

import { inject, observer } from "mobx-react";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
// import { Table } from "antd";

export interface IMailItemProps {}

export interface IMailItemState {}

@inject()
@observer
class MailBoardItem extends AppComponentListBase<
  IMailItemProps,
  IMailItemState
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
            <strong>Log Name</strong>
            <label>Log By:CT Name</label>
            <label>Name Log: Zaire Dorwart</label>
            <label>Time Log: 01/01/2023</label>
            <label>Attack Link: https://123.com</label>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(MailBoardItem);
