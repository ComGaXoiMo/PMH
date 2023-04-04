import * as React from "react";

import { inject, observer } from "mobx-react";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
// import { Table } from "antd";

export interface IBookingItemProps {}

export interface IBookingItemState {}

@inject()
@observer
class BookingBoardItem extends AppComponentListBase<
  IBookingItemProps,
  IBookingItemState
> {
  formRef: any = React.createRef();
  state = {};

  async componentDidMount() {}

  public render() {
    const {} = this.props;

    return (
      <>
        <Card className="card-item-detail-modal">
          <div className="h-100 board-item">
            <strong>29122022 - 12</strong>
            <label>Arrival Date: 3-Feb-23 Departure Date: 4-Feb-23</label>
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

export default withRouter(BookingBoardItem);
