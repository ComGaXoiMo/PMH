import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

import { Col, Image, Row } from "antd";

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

  componentDidMount(): void {}
  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey });
  };
  public render() {
    const {
      value: { moreInfor },
    } = this.props;
    return (
      <>
        <div
          style={{
            // border: "1px solid #858685",
            borderRadius: "12px",
            padding: "18px",
          }}
        >
          <Row gutter={[0, 16]}>
            <Col sm={{ span: 24 }}>
              <strong>{this.props.value?.unitName}</strong>
            </Col>
            <Col sm={{ span: 24 }}>
              <div style={{ backgroundColor: "white" }}>
                <Image
                  width={100}
                  height={100}
                  style={{
                    borderRadius: "12px",
                    border: "2px solid white",
                  }}
                  src="https://assets.reedpopcdn.com/skyrim-houses-how-to-buy-houses-in-whiterun-windhelm-riften-solitude-markarth-1477649051426.jpg/BROK/thumbnail/1200x900/quality/100/skyrim-houses-how-to-buy-houses-in-whiterun-windhelm-riften-solitude-markarth-1477649051426.jpg"
                />
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  marginTop: -100,
                  marginLeft: 40,
                }}
              >
                <Image
                  style={{
                    borderRadius: "12px",
                    border: "2px solid white",
                  }}
                  width={100}
                  height={100}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0pCQJSorK1BAEbnIiU2ECq-kd4a1ocsFGBPgE4pDptw&s"
                />
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  marginTop: -100,
                  marginLeft: 80,
                }}
              >
                <Image
                  width={100}
                  height={100}
                  style={{
                    borderRadius: "12px",
                    border: "2px solid white",
                  }}
                  src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
              </div>
            </Col>
            {Object.keys(moreInfor).map((key) => {
              return (
                <Col sm={{ span: 24 }}>
                  {[key]}: <strong>{moreInfor[key] ?? "--"}</strong>
                </Col>
              );
            })}
          </Row>
        </div>
      </>
    );
  }
}

export default ProjectUnitInfo;
