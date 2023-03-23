import * as React from "react";

import { inject, observer } from "mobx-react";
import "./pipeline-view.less";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
// import { Table } from "antd";

export interface IInquiriesListProps {
  data: any;
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

  async componentDidMount() {
    console.log(this.props.data);
  }

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
              <strong>{this.props.data?.toPrice}$</strong>
              <label>Type: {this.props.data?.propertyType.name}</label>
              <label>Contact: {this.props.data?.contact.contactName}</label>
            </div>
          </Card>
        </a>
      </>
    );
  }
}

export default withRouter(InquiriesBoardItem);
