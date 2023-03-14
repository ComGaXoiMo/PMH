import * as React from "react";

import { inject, observer } from "mobx-react";
import "./pipeline-view.less";

import { Button, Card } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import InquiriesBoardItem from "./inquiriesBoardItem";
import CreateInquiriesModal from "./createInquiriesModal";
// import { Table } from "antd";

export interface IUnitProps {
  index: any;
  status: any;
  modalVisible: false;
}

export interface IInquiriesListtate {
  modalVisible: boolean;
}

@inject()
@observer
class InquiriesList extends React.Component<IUnitProps, IInquiriesListtate> {
  formRef: any = React.createRef();
  state = {
    modalVisible: false,
  };

  async componentDidMount() {}
  toggleModal = () =>
    this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));

  handleImport = async () => {
    this.toggleModal();
  };
  public render() {
    const {} = this.props;

    return (
      <>
        <Card
          className="pipeline-view-container"
          style={{ borderColor: this.props.status?.borderColorCode }}
          key={this.props.index}
        >
          <div className="h-100 ">
            <div className="title-card">
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

export default withRouter(InquiriesList);
