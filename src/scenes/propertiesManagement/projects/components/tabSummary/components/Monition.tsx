import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import Stores from "@stores/storeIdentifier";
import ProjectStore from "@stores/projects/projectStore";
// import FileUploadWrap from "@components/FileUpload/FileUploadCRM";
import FileStore from "@stores/common/fileStore";
import {
  ClockCircleFilled,
  // EllipsisOutlined,
} from "@ant-design/icons/lib/icons";

export interface IMonitionProps {
  projectStore?: ProjectStore;
  fileStore?: FileStore;
}

export interface IMonitionState {}

@inject(Stores.ProjectStore)
@observer
class Monition extends AppComponentListBase<IMonitionProps, IMonitionState> {
  formRef: any = React.createRef();
  state = {};

  public render() {
    return (
      <>
        {" "}
        <div className="monition-container">
          <div className="line-color"></div>
          <div className="monition-detail">
            <div className="icon-monition-detail">
              <ClockCircleFilled />
            </div>
            {/* <div style={{position:'relative' ,top: 0, right: 0 }}>
              <EllipsisOutlined />
            </div> */}
            <div className="monition-content">
              <strong>TITLE</strong>
              <p> Content</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Monition;
