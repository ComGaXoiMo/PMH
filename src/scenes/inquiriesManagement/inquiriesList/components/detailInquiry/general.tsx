import * as React from "react";

import { inject, observer } from "mobx-react";

import { AppComponentListBase } from "@components/AppComponentBase";
import withRouter from "@components/Layout/Router/withRouter";
import { Button, Card, Col, Form, Input, Row, Spin } from "antd";
import { L } from "@lib/abpUtility";
import InquiryStore from "@stores/communication/inquiryStore";
import ListingStore from "@stores/projects/listingStore";
import UnitStore from "@stores/projects/unitStore";
import AppDataStore from "@stores/appDataStore";
import Stores from "@stores/storeIdentifier";
import FormSelect from "@components/FormItem/FormSelect";
import { debounce } from "lodash";
import FormNumber from "@components/FormItem/FormNumber";
import FormRangeInput from "@components/FormItem/FormRangeInput";
import AddressInputMulti from "@components/Inputs/AddressInput2";

export interface IGeneralProps {
  params: any;
  inquiryStore: InquiryStore;
  listingStore: ListingStore;
  unitStore: UnitStore;
  appDataStore: AppDataStore;
}

export interface IGeneralState {
  assignedUsers: any;
}

@inject(
  Stores.AppDataStore,
  Stores.InquiryStore,
  Stores.UnitStore,
  Stores.ListingStore
)
@observer
class general extends AppComponentListBase<IGeneralProps, IGeneralState> {
  formRef: any = React.createRef();

  state = {
    assignedUsers: [],
  };
  async componentDidMount() {
    await Promise.all([
      this.props.appDataStore.getCountryFull(),
      this.props.appDataStore.getInquiryTypes({}),
      this.props.appDataStore.getPropertyTypes(),
      this.props.appDataStore.getInquirySourceAndStatus(),
      this.props.unitStore.getFacilities(),
      this.props.unitStore.getFacing(),
      this.props.unitStore.getView(),
    ]);
    await this.initData(this.props.params?.id);
  }
  initData = async (id?) => {
    await this.props.inquiryStore.get(id);
    this.setState({
      assignedUsers: this.props.inquiryStore.inquiryDetail.users,
    });
    if (this.props.inquiryStore.inquiryDetail.contact) {
      this.props.appDataStore.contacts = [
        this.props.inquiryStore.inquiryDetail.contact,
      ];
    }
    if (this.props.inquiryStore.inquiryDetail.client) {
      this.props.appDataStore.clients = [
        this.props.inquiryStore.inquiryDetail?.client,
      ];
    }
    this.formRef.current.setFieldsValue(this.props.inquiryStore.inquiryDetail);
    console.log(this.props.inquiryStore.inquiryDetail);
  };
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
            onValuesChange={() => this.setState({})}
            layout="vertical"
          >
            {this.props.inquiryStore.isLoading && (
              <>
                <Spin />
              </>
            )}
            {!this.props.inquiryStore.isLoading && (
              <Row gutter={[8, 8]}>
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
                      <FormSelect
                        options={this.props.appDataStore?.contacts}
                        selectProps={{
                          onSearch: debounce(
                            this.props.appDataStore.getContacts,
                            300
                          ),
                        }}
                        label={L("CONTACT")}
                        name="contactId"
                      />
                    </Col>
                    <Col sm={12}>
                      <Form.Item label={L("PHONE")} name="">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={12}>
                      <Form.Item label={L("EMAIL")} name="">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={12}></Col>
                    <Col sm={12}>
                      <FormSelect
                        selectProps={{
                          onSearch: debounce(
                            this.props.appDataStore.getClients,
                            300
                          ),
                        }}
                        options={this.props.appDataStore.clients}
                        label={L("CLIENT_NAME")}
                        name="clientId"
                      />
                    </Col>
                    <Col sm={12}>
                      <Form.Item label={L("INQUIRY_NAME")} name="">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col sm={{ span: 12, offset: 0 }}>
                      <FormSelect
                        options={this.props.appDataStore.inquiryTypes}
                        label={L("CATEGORY")}
                        name="typeId"
                        // rule={rules.required}
                      />
                    </Col>
                    <Col sm={{ span: 12, offset: 0 }}>
                      <FormSelect
                        options={this.props.appDataStore.inquirySources}
                        label={L("SOURCE")}
                        name="sourceId"
                      />
                    </Col>
                    <Col sm={12}>
                      <FormSelect
                        options={this.props.appDataStore.propertyTypes}
                        label={L("PROPERTY_TYPE")}
                        name="propertyTypeId"
                        // rule={rules.required}
                      />
                    </Col>
                    <Col sm={{ span: 12, offset: 0 }}>
                      <FormSelect
                        options={this.props.appDataStore.inquiryStatus}
                        label={L("STATUS")}
                        name="statusId"
                        // rule={rules.required}
                      />
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
                    <Col sm={4}>
                      <FormNumber label={L("BEDROOM_COUNT")} name="bedRoom" />
                    </Col>
                    <Col sm={4}>
                      <FormNumber label={L("BATHROOM_COUNT")} name="bathRoom" />
                    </Col>
                    <Col sm={{ span: 8, offset: 0 }}>
                      <FormSelect
                        options={this.props.unitStore.view}
                        label={L("VIEWS")}
                        name="viewIds"
                        selectProps={{ mode: "multiple" }}
                      />
                    </Col>
                    <Col sm={8}>
                      <FormSelect
                        options={this.props.unitStore.facilities}
                        label={L("SPECAL_REQUESR")}
                        selectProps={{ mode: "multiple" }}
                        name="facilityIds"
                      />
                    </Col>
                    <Col sm={8}>
                      <FormRangeInput
                        label={L("AREA")}
                        name="fromSize"
                        seccondName="toSize"
                      />
                    </Col>
                    <Col sm={{ span: 16, offset: 0 }}>
                      <Form.Item
                        label={L("COMPANY_LOCATION")}
                        name="inquiryAddress"
                      >
                        <AddressInputMulti
                          countries={this.props.appDataStore.countryFull}
                        />
                      </Form.Item>

                      {/* <SelectAddress
                            groupName="inquiryAddress"
                            appDataStore={props.appDataStore}
                          /> */}
                    </Col>
                    <Col sm={8}>
                      <FormRangeInput
                        isCurrency
                        label={L("BUDGET")}
                        name="fromPrice"
                        seccondName="toPrice"
                      />
                    </Col>

                    <Col sm={8}>
                      <Form.Item label={L("OTHER_REQUEST")} name="">
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
              </Row>
            )}
          </Form>
        </Card>
      </>
    );
  }
}
export default withRouter(general);
