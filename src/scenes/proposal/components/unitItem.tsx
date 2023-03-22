import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

import { Form } from "antd";

export interface IProjectUnitInfoProps {
  value: any;
}

export interface IProjectUnitInfoState {}

@inject()
@observer
class ProjectUnitInfo extends AppComponentListBase<
  IProjectUnitInfoProps,
  IProjectUnitInfoState
> {
  formRef: any = React.createRef();
  state = {};

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    return (
      <>
        <div>
          <Form layout={"vertical"} size="large">
            <strong>{this.props.value?.unitName}</strong>
          </Form>
        </div>
      </>
    );
  }
}

export default ProjectUnitInfo;
