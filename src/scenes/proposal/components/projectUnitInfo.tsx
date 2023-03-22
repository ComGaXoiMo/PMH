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
    unit: "a1",
    type: "open",
    totalArea: 2000,
    balconyArea: 100,
    view: "beach",
    carParkingSlot: 1,
    MotoParkingSlot: 4,
  },
  {
    id: 2,
    unitName: "River Park Premier - A - 201",
    unit: "a1",
    type: "open",
    totalArea: 2000,
    balconyArea: 100,
    view: "beach",
    carParkingSlot: 1,
    MotoParkingSlot: 4,
  },
  {
    id: 3,
    unitName: "River Park Premier - A - 122",
    unit: "a1",
    type: "open",
    totalArea: 2000,
    balconyArea: 100,
    view: "beach",
    carParkingSlot: 1,
    MotoParkingSlot: 4,
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
            <Row>
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
