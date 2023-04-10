import * as React from "react";

import { inject, observer } from "mobx-react";
import "./pipeline-view.less";

import { Button, Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import InquiriesBoardItem from "./inquiriesBoardItem";
import CreateInquiriesModal from "./createInquiriesModal";
import { portalLayouts } from "@components/Layout/Router/router.config";
import { AppComponentListBase } from "@components/AppComponentBase";
// import { Table } from "antd";

export interface IUnitProps {
  history: any;
  index: any;
  status: any;
  modalVisible: false;
}

export interface IInquiriesListtate {
  modalVisible: boolean;
}

@inject()
@observer
class InquiriesList extends AppComponentListBase<
  IUnitProps,
  IInquiriesListtate
> {
  formRef: any = React.createRef();
  state = {
    modalVisible: false,
  };

  async componentDidMount() {}
  toggleModal = () =>
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));

  handleOk = async () => {
    this.toggleModal();
  };
  gotoDetail = (id?) => {
    const { history } = this.props;
    id
      ? history.push(portalLayouts.inquiriesDetail.path.replace(":id", id))
      : history.push(portalLayouts.inquiriesCreate.path);
  };
  public render() {
    const {} = this.props;

    return (
      <>
        <Card
          className="iqr-pipeline-view-container"
          style={{ borderColor: this.props.status?.borderColorCode }}
          key={this.props.index}
        >
          <div className="h-100 ">
            <div className="iqr-title-card">
              <strong>{this.props.status?.name}</strong>
            </div>
            <div className="b">
              <InquiriesBoardItem goDetail={() => this.gotoDetail()} />
              <InquiriesBoardItem />
            </div>
          </div>
          <Button onClick={this.toggleModal}>Add new</Button>
        </Card>
        <CreateInquiriesModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleOk}
        />
      </>
    );
  }
}

export default withRouter(InquiriesList);
