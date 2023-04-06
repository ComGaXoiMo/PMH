import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";

import { L } from "@lib/abpUtility";
import { Col, Divider, Form, Row } from "antd";
import FormLabelCheckbox from "@components/FormItem/FormCheckbox/formLabelCheckBox";
import UnitItem from "./unitItem";

export interface IProjectUnitInfoProps {}

export interface IProjectUnitInfoState {}

const unitItems = [
  {
    id: 1,
    unitName: "River Park Premier - A - 302",
    moreInfor: {
      unit: "u4-1i-13",
      type: "open",
      totalArea: "7000m2",
      balconyArea: "600m2",
      view: "beach",
      carParkingSlot: "1",
      MotoParkingSlot: "44",
      MotoParkingFee: "300000đ",
    },
  },
  {
    id: 2,
    unitName: "River Park Premier - A - 201",
    moreInfor: {
      unit: "e2-9-31",
      type: "close",
      totalArea: "3000m2",
      balconyArea: "130m2",
      view: "mounth",
      carParkingSlot: "13",
      MotoParkingSlot: 4,
      MotoParkingFee: undefined,
    },
  },
  {
    id: 3,
    unitName: "River Park Premier - A - 122",
    moreInfor: {
      unit: "a1-2-31",
      type: "open",
      totalArea: "2000m2",
      balconyArea: "100m2",
      view: "bridge",
      carParkingSlot: "12",
      MotoParkingSlot: 24,
      MotoParkingFee: undefined,
    },
  },
];
const typeItems = [
  {
    id: 1,
    name: "Property",
  },
  {
    id: 2,
    name: "Unit",
  },
  {
    id: 3,
    name: "Picture",
  },
  {
    id: 4,
    name: "Type",
  },
  {
    id: 5,
    name: "Total Area",
  },
  {
    id: 6,
    name: "Balcony Area",
  },
  {
    id: 7,
    name: "View",
  },
  {
    id: 8,
    name: "Management Fee",
  },
  {
    id: 9,
    name: "Moto Parking Slot",
  },
  {
    id: 10,
    name: "Moto Parking Fee",
  },
  {
    id: 11,
    name: "Car Parking Slot",
  },
  {
    id: 12,
    name: "Car Parking Fee",
  },
  {
    id: 13,
    name: "Electricity Capacity",
  },
  {
    id: 14,
    name: "Smoke & odour ex...",
  },
  {
    id: 15,
    name: "Allocated parking l...",
  },
  {
    id: 16,
    name: "Rent Fee",
  },
];
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
        <div className="proposal-info-element">
          <strong>{L("ProjectUnitInfo")}</strong>
          <Form
            layout={"vertical"}
            //  onFinish={this.onSave}
            // validateMessages={validateMessages}
            size="large"
          >
            <Row gutter={[16, 0]}>
              {typeItems.map((item) => (
                <Col sm={{ span: 4 }}>
                  <FormLabelCheckbox label={item.name} name={item.name} />
                </Col>
              ))}
            </Row>
            <Divider />
            <Row gutter={[16, 0]}>
              {unitItems.map((item, index) => (
                <Col sm={{ span: 6 }} key={index}>
                  <UnitItem value={item} />
                </Col>
              ))}
            </Row>
          </Form>
        </div>
      </>
    );
  }
}

export default ProjectUnitInfo;
