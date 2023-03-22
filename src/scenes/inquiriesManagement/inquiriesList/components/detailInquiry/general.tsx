import * as React from "react";

import { inject, observer } from "mobx-react";

import { AppComponentListBase } from "@components/AppComponentBase";
import withRouter from "@components/Layout/Router/withRouter";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { L } from "@lib/abpUtility";

export interface IGeneralProps {}

export interface IGeneralState {}

@inject()
@observer
class general extends AppComponentListBase<IGeneralProps, IGeneralState> {
  formRef: any = React.createRef();

  state = {};

  public render() {
    const {} = this.props;

    return (
      <>
        <Card
          style={{
            backgroundColor: "white",
            minHeight: "80vh",
            overflow: "auto",
            padding: "10px",
            borderRadius: "16px",
          }}
        >
          <Form
            ref={this.formRef}
            onValuesChange={() => this.setState({ isDirty: true })}
            layout="vertical"
          >
            <Row gutter={[8, 8]}>
              <Row gutter={[8, 0]}>
                <Col sm={12}>
                  <strong>General</strong>
                </Col>
                <div style={{ position: "absolute", right: 40 }}>
                  <Button
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#DEE3ED",
                    }}
                  >
                    {L("Edit")}
                  </Button>
                </div>
              </Row>
              <Row gutter={[8, 0]}>
                <Col sm={12}>
                  <Form.Item label={L("CONTACT")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Form.Item label={L("PHONE")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Form.Item label={L("EMAIL")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={12}></Col>
                <Col sm={12}>
                  <Form.Item label={L("COMPANY_NAME")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Form.Item label={L("INQUIRY_NAME")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Form.Item label={L("CATEGORY")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Form.Item label={L("SOURCE")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Row>
            <Row gutter={[8, 8]}>
              <Row gutter={[8, 0]}>
                <Col sm={12}>
                  <strong>{L("INQUIRY_DETAIL")}</strong>
                </Col>
              </Row>
              <Row gutter={[8, 0]}>
                <Col sm={8}>
                  <Form.Item label={L("PROPERTY")} name="">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={8}>
                  <Form.Item label={L("PROPERTY_TYPE")} name="">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={8}>
                  <Form.Item label={L("BR_WC")} name="">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={8}>
                  <Form.Item label={L("VIEW")} name="">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={8}>
                  <Form.Item label={L("SPECAL_REQUESR")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={8}>
                  <Form.Item label={L("AREA")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={8}>
                  <Form.Item label={L("BUDGET")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={8}>
                  <Form.Item label={L("LOCATION")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={8}>
                  <Form.Item label={L("OTHER_REQUEST")} name="address">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Row>
            <Row gutter={[8, 8]}>
              <Col sm={24}>
                <strong>Note</strong>
              </Col>

              <Row gutter={[8, 0]}>
                <Col sm={24}>
                  <Form.Item label={L("LABEL")} name="">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Row>
          </Form>
        </Card>
      </>
    );
  }
}
export default withRouter(general);
