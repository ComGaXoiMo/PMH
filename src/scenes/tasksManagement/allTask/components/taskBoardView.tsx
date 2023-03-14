import * as React from "react";

import { inject, observer } from "mobx-react";
import "./pipeline.less";

import { Button, Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import InquiriesBoardItem from "./taskBoardItem";
import CreateInquiriesModal from "./allTaskModal";
// import { Table } from "antd";

export interface IUnitProps {
  index: any;
  status: any;
  modalVisible: false;
}

export interface IAllTaskBoardViewtate {
  modalVisible: boolean;
}

@inject()
@observer
class AllTaskBoardView extends React.Component<
  IUnitProps,
  IAllTaskBoardViewtate
> {
  formRef: any = React.createRef();
  state = {
    modalVisible: false,
  };

  async componentDidMount() {
    console.log("index:", this.props.index);
    console.log("status:", this.props.status);
  }
  toggleModal = () =>
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));

  handleImport = async () => {
    this.toggleModal();
  };
  public render() {
    const {} = this.props;

    return (
      <>
        <Card className="pipeline-view-container" key={this.props.index}>
          <div className="h-100 ">
            <div
              style={{ backgroundColor: this.props.status?.borderColorCode }}
              className="title-card"
            >
              <strong>{this.props.status?.name}</strong>
            </div>
            <div className="b">
              <InquiriesBoardItem />
            </div>
          </div>
          <Button onClick={this.toggleModal}>Add new</Button>
        </Card>
        <CreateInquiriesModal
          visible={this.state.modalVisible}
          onClose={this.toggleModal}
          onOk={this.handleImport}
        />
      </>
    );
  }
}

export default withRouter(AllTaskBoardView);
