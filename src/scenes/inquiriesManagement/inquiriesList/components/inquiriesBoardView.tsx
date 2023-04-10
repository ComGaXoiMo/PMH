import * as React from "react";

import { inject, observer } from "mobx-react";
import "./pipeline-view.less";

import { Button, Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import InquiriesBoardItem from "./inquiriesBoardItem";
import CreateInquiriesModal from "./inquiriesCreateModal";
import { portalLayouts } from "@components/Layout/Router/router.config";
import { AppComponentListBase } from "@components/AppComponentBase";
import Stores from "@stores/storeIdentifier";

// import { Table } from "antd";

export interface IUnitProps {
  history: any;
  index: any;
  data: any;
  status: any;
  modalVisible: false;
}

export interface IInquiriesListtate {
  modalVisible: boolean;
}

@inject(Stores.InquiryStore)
@observer
class InquiriesList extends AppComponentListBase<
  IUnitProps,
  IInquiriesListtate
> {
  formRef: any = React.createRef();
  state = {
    modalVisible: false,
  };

  async componentDidMount() {
    await this.initData();
    await Promise.all([]);
  }
  initData = async () => {};
  toggleModal = () =>
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));

  handleOpenModal = async () => {
    await this.toggleModal();
  };
  handleOk = async () => {
    this.toggleModal();
  };
  getAll = async () => {};
  gotoDetail = (id?) => {
    const { history } = this.props;
    id
      ? history.push(portalLayouts.inquiriesDetail.path.replace(":id", id))
      : history.push(portalLayouts.inquiriesCreate.path);
  };
  public render() {
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
            {this.props.data.map((item) => (
              <InquiriesBoardItem
                data={item}
                goDetail={() => this.gotoDetail(item?.id)}
              />
            ))}
          </div>
          <Button onClick={this.handleOpenModal}>Add new</Button>
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
