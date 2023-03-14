import * as React from "react";

import { inject, observer } from "mobx-react";
import "./pipeline.less";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
// import { Table } from "antd";

export interface IUnitProps {}

export interface IInquiriesListtate {}

@inject()
@observer
class AllTaskBoardItem extends React.Component<any> {
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
          }}
          key={this.props.index}
        >
          <div className="h-100 board-item">
            <strong>Inquiries Name 02</strong>
            <label>Unit:302C</label>
            <label>Customer: Zaire Dorwart</label>
          </div>
        </Card>
        <Card
          style={{
            display: "flex",
            textAlign: "left",
            padding: "8px",
            borderRadius: "12px",
            marginBottom: "10px",
          }}
          key={this.props.index}
        >
          <div className="h-100 board-item">
            <strong>Inquiries Name 02</strong>
            <label>Unit:302C</label>
            <label>Customer: Zaire Dorwart</label>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(AllTaskBoardItem);
