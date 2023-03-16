import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import { Card, Col, Form, Input, Row, Select } from "antd";
import { L } from "@lib/abpUtility";
import Stores from "@stores/storeIdentifier";
import ProjectStore from "@stores/projects/projectStore";
// import FileUploadWrap from "@components/FileUpload/FileUploadCRM";
import FileStore from "@stores/common/fileStore";
import Monition from "./components/Monition";
import AppConsts, { moduleNames } from "@lib/appconst";
import UnitStore from "@stores/projects/unitStore";
import withRouter from "@components/Layout/Router/withRouter";
import { renderOptions } from "@lib/helper";
import { debounce } from "lodash";
import companyService from "@services/clientManagement/companyService";
import AppDataStore from "@stores/appDataStore";
import CurrencyInput from "@components/Inputs/CurrencyInput";
import TextArea from "antd/lib/input/TextArea";
import ImageUploadWrapCRM from "@components/FileUpload/ImageUploadCRM";

export interface ISummaryProps {
  projectStore: ProjectStore;
  unitStore: UnitStore;
  params: any;
  appDataStore: AppDataStore;
  fileStore: FileStore;
}

const fakedata = [
  {
    data: {
      title: "Booking Confirmation",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#27AE60",
      type: 2,
    },
  },
  {
    data: {
      title: "Send Proposal",
      link: "",
      file: "BOC-22012023.PDF",
      color: "#9B51E0",
      type: 2,
    },
  },
  {
    data: {
      title: "Update",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#F2994A",
      type: 1,
    },
  },
  {
    data: {
      title: "Send Mail",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "BOC-22012023.PDF",
      color: "#9B51E0",
      type: 2,
    },
  },
  {
    data: {
      title: "Update",
      link: "https://mail.google.com/mail/u/0/#inbox/FMfcgzGrbvJjGgpnmqmxSFx",
      file: "",
      color: "#F2994A",
      type: 1,
    },
  },
];
export interface ISummaryState {}
const { formVerticalLayout } = AppConsts;

@inject(Stores.ProjectStore, Stores.UnitStore, Stores.AppDataStore)
@observer
class Summary extends AppComponentListBase<ISummaryProps, any> {
  formRef: any = React.createRef();
  formRefProjectAddress: any = React.createRef();

  constructor(props: ISummaryProps) {
    super(props);
    this.state = {
      isDirty: false,
      companies: [],
      propertyManagements: [],
      contacts: [],
    };
  }

  async componentDidMount() {
    await Promise.all([
      this.props.appDataStore.getPropertyTypes(),
      this.props.appDataStore.getFacilities(),
      this.props.appDataStore.getGrades(),
      this.props.appDataStore.getCountries({}),
      this.props.projectStore.getTransportations(""),
      this.getDetail(this.props.params?.id),
    ]);
    this.initData();
  }
  initData = () => {
    if (
      this.props.projectStore.editProject &&
      this.props.projectStore.editProject.id
    ) {
      const {
        contactId,
        contact,
        landlordId,
        landlord,
        propertyManagementId,
        propertyManagement,
      } = this.props.projectStore.editProject;
      this.setState({
        contacts: contactId
          ? [{ id: contactId, name: contact.contactName }]
          : [],
        propertyManagements: propertyManagementId
          ? [{ ...propertyManagement, name: propertyManagement.businessName }]
          : [],
        companies: landlordId
          ? [{ id: landlordId, name: landlord.businessName }]
          : [],
      });
    }
  };
  getDetail = async (id?) => {
    // Init properties & custom field for workflow first
    if (!id) {
      await this.props.projectStore.createProject();
    } else {
      await this.props.projectStore.get(id);
    }

    this.formRef.current.setFieldsValue({
      ...this.props.projectStore.editProject,
    });
    this.formRef.current.setFieldsValue({
      address: this.props.projectStore.editProject?.projectAddress.address,
    });
  };
  findCompanies = debounce(async (keyword) => {
    let result = await companyService.getAll({
      keyword,
      pageSize: 20,
      pageNumber: 1,
    });
    this.setState({ companies: result.items || [] });
  }, 300);
  findPropertyManagement = debounce(async (keyword) => {
    let result = await companyService.getAll({
      keyword,
      pageSize: 20,
      pageNumber: 1,
    });
    this.setState({ propertyManagements: result.items || [] });
  }, 300);
  public render() {
    let { companies, propertyManagements } = this.state;
    let { propertyTypes } = this.props.appDataStore;

    return (
      <>
        <Form
          ref={this.formRef}
          onValuesChange={() => this.setState({ isDirty: true })}
          layout="vertical"
        >
          <Row gutter={[8, 0]}>
            <Col sm={{ span: 13 }}>
              <Card
                style={{
                  backgroundColor: "white",
                  minHeight: "80vh",
                  height: "max-content",
                  padding: "10px",
                  borderRadius: "16px",
                }}
              >
                <strong>{L("PROJECT_DETAIL")}</strong>

                <Row gutter={[8, 0]}>
                  <Col sm={{ span: 24, offset: 0 }}>
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
                      name="address"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_OWNER")}
                      {...formVerticalLayout}
                      name="landlordId"
                    >
                      <Select
                        showSearch
                        allowClear
                        filterOption={false}
                        className="full-width"
                        onSearch={this.findCompanies}
                      >
                        {renderOptions(companies)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_MANAGER")}
                      {...formVerticalLayout}
                      name="propertyManagementId"
                    >
                      <Select
                        showSearch
                        allowClear
                        filterOption={false}
                        className="full-width"
                        onSearch={this.findPropertyManagement}
                      >
                        {renderOptions(propertyManagements)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_TYPES")}
                      {...formVerticalLayout}
                      name="projectTypeIds"
                    >
                      <Select
                        showSearch
                        allowClear
                        showArrow
                        filterOption={false}
                        className="full-width"
                        mode="multiple"
                      >
                        {renderOptions(propertyTypes)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("FLOOR")}
                      {...formVerticalLayout}
                      name="numberOfFloors"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("UNIT")}
                      {...formVerticalLayout}
                      name="numberOfUnits"
                    >
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_ELECTRICITY_COST_kWh")}
                      {...formVerticalLayout}
                      name="electricityCost"
                    >
                      <CurrencyInput locale={"en"} symbol={"$"} />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_WATER_COST_CUBIC_METRE")}
                      {...formVerticalLayout}
                      name="waterCost"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_MANAGEMENT_FEE_$_MONTH")}
                      {...formVerticalLayout}
                      name="managementFee"
                    >
                      <CurrencyInput locale={"en"} symbol={"$"} />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 24, offset: 0 }}>
                    <Form.Item
                      label={L("PROJECT_DESCRIPTION")}
                      {...formVerticalLayout}
                      name="description"
                    >
                      <TextArea rows={5} />
                    </Form.Item>
                  </Col>

                  <Col sm={{ span: 24, offset: 0 }}>
                    <p>{L("PROJECT_IMAGE")}</p>
                    <ImageUploadWrapCRM
                      moduleId={moduleNames.project}
                      parentId={this.props.projectStore?.editProject?.uniqueId}
                      fileStore={this.props.fileStore || new FileStore()}
                      type="IMAGE"
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm={{ span: 11 }}>
              <Card
                style={{
                  backgroundColor: "white",
                  minHeight: "80vh",
                  height: "max-content",
                  padding: "10px",
                  borderRadius: "16px",
                }}
              >
                <strong>{L("PROJECT_ACTIVITY")}</strong>
                <Row>
                  {fakedata.map((item) => (
                    <Monition data={item.data} />
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default withRouter(Summary);
