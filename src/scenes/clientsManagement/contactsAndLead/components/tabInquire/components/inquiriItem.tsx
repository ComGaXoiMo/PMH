import * as React from "react";

import { inject, observer } from "mobx-react";

import { Card } from "antd";
import { AppComponentListBase } from "@components/AppComponentBase";
// import { Table } from "antd";

export interface IInquiriItemProps {
  data: any;
}

export interface IInquiriItemState {}

@inject()
@observer
class InquiriItem extends AppComponentListBase<
  IInquiriItemProps,
  IInquiriItemState
> {
  formRef: any = React.createRef();
  state = {};

  async componentDidMount() {}

  public render() {
    const { data } = this.props;

    return (
      <>
        <Card className="card-item-detail-modal">
          <div className="h-100 board-item">
            <label>by:{data.name}</label>
            <label>Tenant's Name: Mr. Takuda</label>
            <label>Waiting in line: 1</label>
            <label>Nationality: JAPANESE</label>
            <label>Remark: BILLS TO GUEST - 35% OFF</label>
            <label>Appointment time: 29/12/2022 - 12:00</label>
          </div>
        </Card>
      </>
    );
  }
}

export default InquiriItem;
