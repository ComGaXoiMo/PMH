import * as React from "react";

import { inject, observer } from "mobx-react";

import { Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
// import { Table } from "antd";

export interface ISiteVisitItemProps {}

export interface ISiteVisitItemState {}

@inject()
@observer
class SiteVisitBoardItem extends AppComponentListBase<
  ISiteVisitItemProps,
  ISiteVisitItemState
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
            <label>Time: 29/12/2022 - 12:00</label>
            <label>unit: B-08-4</label>
            <label>Remark: BILLS TO GUEST - 35% OFF</label>
          </div>
        </Card>
      </>
    );
  }
}

export default withRouter(SiteVisitBoardItem);
