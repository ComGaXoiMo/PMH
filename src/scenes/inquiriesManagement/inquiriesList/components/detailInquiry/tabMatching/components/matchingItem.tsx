import * as React from "react";

import { inject, observer } from "mobx-react";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
// import { Table } from "antd";

export interface IMailItemProps {
  data: any;
}

export interface IMailItemState {}

@inject()
@observer
class MatchingItem extends AppComponentListBase<
  IMailItemProps,
  IMailItemState
> {
  formRef: any = React.createRef();
  state = {};

  async componentDidMount() {}

  public render() {
    const { data } = this.props;

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
            <strong>{data?.name}</strong>
            <label>Area: {data?.area ?? "-"}</label>
            <label>price: {data?.price ?? "-"} </label>
            <label>Note: {data?.note ?? "-"}</label>
            <label>Attack link: {data?.area ?? "-"}</label>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(MatchingItem);
