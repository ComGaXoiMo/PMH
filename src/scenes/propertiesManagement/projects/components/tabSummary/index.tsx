import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Col, Form, Input, Row } from "antd";
import { L } from "@lib/abpUtility";
import AppConsts from "@lib/appconst";
import Stores from "@stores/storeIdentifier";
import ProjectStore from "@stores/projects/projectStore";
// import FileUploadWrap from "@components/FileUpload/FileUploadCRM";
import FileStore from "@stores/common/fileStore";

export interface ISummaryProps {
  projectStore?: ProjectStore;
  fileStore?: FileStore;
}

export interface ISummaryState {}
const { formVerticalLayout } = AppConsts;

@inject(Stores.ProjectStore)
@observer
class Summary extends AppComponentListBase<ISummaryProps, ISummaryState> {
  formRef: any = React.createRef();
  state = {};

  public render() {
    return (
      <>
        <Form>
          <Row gutter={[8, 8]}>
            <Col sm={{ span: 13 }}>
              <div
                style={{
                  backgroundColor: "white",
                  height: "80vh",
                  borderRadius: "16px",
                  padding: "10px",
                }}
              >
                <strong>{L("PROJECT_DETAIL")}</strong>
                <Row gutter={[8, 0]}>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_NAME")}
                      {...formVerticalLayout}
                      name="projectName"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_LOCATION")}
                      {...formVerticalLayout}
                      name="location"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_OWNER")}
                      {...formVerticalLayout}
                      name="owner"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_MANAGER")}
                      {...formVerticalLayout}
                      name="manager"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_TYPE")}
                      {...formVerticalLayout}
                      name="type"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("UNIT")}
                      {...formVerticalLayout}
                      name="unit"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("OCCUPIED")}
                      {...formVerticalLayout}
                      name="occupied"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("YEAR_BUILD")}
                      {...formVerticalLayout}
                      name="yeaBuild"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  {/* <Col sm={{ span: 4, offset: 0 }}>
                    <FileUploadWrap
                      moduleId={moduleNames.project}
                      parentId={this.props.projectStore?.editProject?.uniqueId}
                      fileStore={this.props.fileStore || new FileStore()}
                      type="IMAGE"
                    />
                  </Col> */}
                </Row>
              </div>
            </Col>
            <Col sm={{ span: 11 }}>
              <div
                style={{
                  backgroundColor: "white",
                  height: "80vh",
                  padding: "10px",
                  borderRadius: "16px",
                }}
              >
                <strong>{L("PROJECT_ACTIVITY")}</strong>
              </div>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default Summary;
