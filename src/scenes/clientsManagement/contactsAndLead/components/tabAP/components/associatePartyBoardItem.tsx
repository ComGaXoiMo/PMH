import * as React from "react";

import { inject, observer } from "mobx-react";

import { Avatar, Card, Col, Row } from "antd";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
import { CaretDownOutlined } from "@ant-design/icons";
// import { Table } from "antd";
export interface IContractItemProps {
  data: any;
}

export interface IContractItemState {}

@inject()
@observer
class ContractBoardItem extends AppComponentListBase<
  IContractItemProps,
  IContractItemState
> {
  formRef: any = React.createRef();
  state = {};

  async componentDidMount() {}

  public render() {
    const { data } = this.props;

    return (
      <>
        <Card
          className="card-item-detail-modal"
          style={{ border: "1px solid #1b1b1b68" }}
        >
          {/* <div className="h-100 board-item"> */}
          <Row gutter={[16, 16]}>
            <Col sm={{ span: 2 }}>
              <Avatar size={64} src={<img src={data.avt} alt="avatar" />} />
            </Col>
            <Col sm={{ span: 22 }}>
              <Row>
                <Col sm={{ span: 12 }}>
                  <strong>{data?.name ?? "-"}</strong>
                </Col>
                <Col
                  sm={{ span: 12 }}
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                  <a style={{ color: "black" }}>
                    {data.type}
                    <CaretDownOutlined className="icon-cusstom-pmh" />
                  </a>
                </Col>
              </Row>
              <Row>
                <Col sm={{ span: 7 }}>
                  <label>Deal Comission (Net)</label>
                  <strong>{data.deal ?? "-"}</strong>
                </Col>
                <Col sm={{ span: 7 }}>
                  <label>Fee Type (% or $)</label>
                  <strong>{data.feeType ?? "-"}</strong>
                </Col>
                <Col sm={{ span: 7 }}>
                  <label>Other Fee</label>
                  <strong>{data.otherFee ?? "-"}</strong>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* </div> */}
        </Card>
        <style scoped>{`
      .ant-card .ant-card-body {
        padding: 15px 20px;
        width: 100%;
        // height: 100px;
      }
    
      `}</style>
      </>
    );
  }
}

export default withRouter(ContractBoardItem);
