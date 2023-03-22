import * as React from "react";

import { inject, observer } from "mobx-react";
import "./pipeline-view.less";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
// import { Table } from "antd";

export interface IInquiriesListProps {
  goDetail: () => void;
}

export interface IInquiriesListState {}

@inject()
@observer
class InquiriesBoardItem extends React.Component<
  IInquiriesListProps,
  IInquiriesListState
> {
  formRef: any = React.createRef();
  state = {};

  async componentDidMount() {}

  public render() {
    const {} = this.props;

    return (
      <>
        <a>
          <Card
            onClick={() => this.props.goDetail()}
            style={{
              display: "flex",
              textAlign: "left",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "12px",
            }}
            key={""}
          >
            <div className="h-100 board-item">
              <strong>Inquiries Name 02</strong>
              <label>Unit:302C</label>
              <label>Customer: Zaire Dorwart</label>
            </div>
          </Card>
        </a>
      </>
    );
  }
}

export default withRouter(InquiriesBoardItem);
