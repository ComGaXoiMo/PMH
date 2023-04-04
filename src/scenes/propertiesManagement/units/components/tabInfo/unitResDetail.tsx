import React from "react";
import {
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import _ from "lodash";
import rules from "./validation";
import { validateMessages } from "@lib/validation";
import { L } from "@lib/abpUtility";
import projectService from "@services/projects/projectService";
import { filterOptions, renderOptions } from "@lib/helper";
import Stores from "@stores/storeIdentifier";
import { inject, observer } from "mobx-react";
import AppConsts from "@lib/appconst";
import AppDataStore from "@stores/appDataStore";
import UnitStore from "@stores/projects/unitStore";
import TextArea from "antd/lib/input/TextArea";
import withRouter from "@components/Layout/Router/withRouter";
import { AppComponentListBase } from "@components/AppComponentBase";
import CurrencyInput from "@components/Inputs/CurrencyInput";

const { formVerticalLayout } = AppConsts;
type Props = {
  visible: boolean;
  id: any;
  unitStore: UnitStore;
  appDataStore: AppDataStore;
};
type State = {
  loading: boolean;
  projects: any[];
  projectId: any;
  floorResult: any[];
};
@inject(Stores.AppDataStore, Stores.UnitStore)
@observer
class UnitCreate extends AppComponentListBase<Props, State> {
  form: any = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      projects: [],
      projectId: null,
      floorResult: [],
    };
  }
  componentDidMount(): void {
    this.getDetail(this.props?.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props?.id) {
      let callAPI = Promise.all([
        this.setState({ loading: true }),
        this.props.appDataStore.getUnitCategories({}),
        this.props.unitStore?.getFacing(),
        this.props.unitStore?.getFacilities(),
        this.props.unitStore?.getView(),
        this.props.appDataStore.getCountryFull(),
        this.getDetail(this.props?.id),
      ]);
      callAPI.finally(() => this.setState({ loading: false }));
    }
  }

  getProject = async (keyword) => {
    const res = await projectService.getAll({
      maxResultCount: 10,
      skipCount: 0,
      keyword,
    });
    this.setState({
      projects: res.items.map((i) => {
        return { id: i.id, name: i.projectName };
      }),
    });
  };

  getFloorResult = async (id, keyword) => {
    const res = await projectService.getFloors(id, {
      pageSize: 20,
      pageNumber: 1,
      keyword,
    });
    this.setState({ floorResult: res });
  };

  getDetail = async (id?) => {
    if (id) {
      await this.props.unitStore.getUnitRes(id);
      this.form.current.setFieldsValue(this.props.unitStore.editUnitRes);
      let newFloorResult = [
        ...this.state.floorResult,
        {
          id: this.props.unitStore.editUnitRes?.floorId,
          name: this.props.unitStore.editUnitRes?.floorName,
        },
      ];
      this.setState({ floorResult: newFloorResult });
      this.setState({
        projects: [
          {
            id: this.props.unitStore.editUnitRes?.projectId,
            name: this.props.unitStore.editUnitRes?.projectName,
          },
        ],
      });
      this.setState({ projectId: this.props.unitStore.editUnitRes?.projectId });
    } else {
      this.form.current.resetFields();
      await this.props.unitStore.createUnit();
    }
  };

  render() {
    const { projects, projectId, floorResult } = this.state;
    const {
      appDataStore: { unitStatus, unitTypes },
      unitStore: { facing, facilities, view },
    } = this.props;

    return (
      <Form
        ref={this.form}
        layout={"vertical"}
        validateMessages={validateMessages}
      >
        <Card bordered={false} id="unit-detail">
          <Row gutter={[8, 0]}>
            <Col sm={{ span: 24, offset: 0 }}>
              <Form.Item
                label={L("UNIT_NAME")}
                {...formVerticalLayout}
                name="unitName"
                rules={rules.unitName}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Form.Item
                label={L("UNIT_PROJECT")}
                name="projectId"
                {...formVerticalLayout}
              >
                <Select
                  showSearch
                  allowClear
                  filterOption={false}
                  className="full-width"
                  onChange={(e) => {
                    if (!e) {
                      this.setState({ projectId: null });
                      return;
                    }
                    this.setState({ projectId: e });
                    this.getFloorResult(e, "");
                  }}
                  onSearch={_.debounce((e) => this.getProject(e), 1000)}
                >
                  {renderOptions(projects)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Form.Item
                label={L("UNIT_FLOOR")}
                {...formVerticalLayout}
                name="floorId"
              >
                <Select
                  showSearch
                  allowClear
                  filterOption={filterOptions}
                  className="full-width"
                  disabled={projectId ? false : true}
                >
                  {renderOptions(floorResult)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Form.Item
                label={L("UNIT_STATUS")}
                {...formVerticalLayout}
                name="statusId"
                rules={rules.statusId}
              >
                <Select
                  showSearch
                  allowClear
                  filterOption={filterOptions}
                  className="full-width"
                >
                  {renderOptions(unitStatus)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Form.Item
                label={L("UNIT_TYPE")}
                {...formVerticalLayout}
                name="unitTypeId"
                rules={rules.unitTypeId}
              >
                <Select
                  showSearch
                  allowClear
                  filterOption={filterOptions}
                  className="full-width"
                >
                  {renderOptions(unitTypes)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Form.Item
                label={L("UNIT_SIZE")}
                {...formVerticalLayout}
                name="size"
                rules={rules.size}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Form.Item
                label={L("UNIT_PRICE_VND")}
                {...formVerticalLayout}
                name="price"
              >
                <CurrencyInput />
              </Form.Item>
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Form.Item
                label={L("UNIT_FACING")}
                {...formVerticalLayout}
                name="facingId"
              >
                <Select
                  showSearch
                  allowClear
                  filterOption={filterOptions}
                  className="full-width"
                >
                  {renderOptions(facing)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Form.Item
                label={L("UNIT_VIEW")}
                {...formVerticalLayout}
                name="viewIds"
              >
                <Select
                  showSearch
                  allowClear
                  filterOption={filterOptions}
                  className="full-width"
                  mode="multiple"
                >
                  {renderOptions(view)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <Form.Item
                label={L("UNIT_FACILITIES")}
                {...formVerticalLayout}
                name="facilityIds"
              >
                <Select
                  showSearch
                  allowClear
                  filterOption={filterOptions}
                  className="full-width"
                  mode="multiple"
                >
                  {renderOptions(facilities)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 0 }}>
              <Form.Item
                label={L("MOTOBIKE_PARK")}
                {...formVerticalLayout}
                name="motobikePark"
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 0 }}>
              <Form.Item
                label={L("CAR_PARK")}
                {...formVerticalLayout}
                name="carPark"
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 0 }}>
              <Form.Item
                label={L("BALCONY")}
                {...formVerticalLayout}
                name="bancony"
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 0 }}>
              <Form.Item
                label={L("IS_PET")}
                {...formVerticalLayout}
                name="isPet"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 0 }}>
              <Form.Item
                label={L("HELPER_ROOM")}
                {...formVerticalLayout}
                name="helperRoom"
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 0 }}>
              <Form.Item
                label={L("BED_ROOM")}
                {...formVerticalLayout}
                name="bedRoom"
                rules={[{ required: true }]}
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 0 }}>
              <Form.Item
                label={L("LIVING_ROOM")}
                {...formVerticalLayout}
                name="livingRoom"
                rules={[{ required: true }]}
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 6, offset: 0 }}>
              <Form.Item
                label={L("BATH_ROOM")}
                {...formVerticalLayout}
                name="bathRoom"
                rules={[{ required: true }]}
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col sm={{ span: 24, offset: 0 }}>
              <Form.Item
                label={L("UNIT_DESCRIPTION")}
                {...formVerticalLayout}
                name="description"
              >
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  }
}

export default withRouter(UnitCreate);
