import FormInput from "@components/FormItem/FormInput";
import FormNumber from "@components/FormItem/FormNumber";
import FormRangeInput from "@components/FormItem/FormRangeInput";
import FormSelect from "@components/FormItem/FormSelect";
import FormTextArea from "@components/FormItem/FormTextArea";
import AddressInputMulti from "@components/Inputs/AddressInput2";
import WrapPageScroll from "@components/WrapPageScroll";
import { isGrantedAny, L } from "@lib/abpUtility";
import AppConsts, { appPermissions } from "@lib/appconst";
import userService from "@services/administrator/user/userService";
import AppDataStore from "@stores/appDataStore";
import InquiryStore from "@stores/communication/inquiryStore";
import ListingStore from "@stores/projects/listingStore";
import UnitStore from "@stores/projects/unitStore";
import Stores from "@stores/storeIdentifier";
import { Button, Card, Col, Form, Row, Spin, Tabs } from "antd";
import { debounce } from "lodash";
import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import MatchingListing from "./MatchingListing";
import rules from "./validations";
const { TabPane } = Tabs;
const { formVerticalLayout } = AppConsts;

interface Props {
  unitStore: UnitStore;
  inquiryStore: InquiryStore;
  listingStore: ListingStore;
  appDataStore: AppDataStore;
}

const InquiryDetail = inject(
  Stores.AppDataStore,
  Stores.InquiryStore,
  Stores.UnitStore,
  Stores.ListingStore
)(
  observer((props: Props) => {
    const [assignedUsers, setAssignedUsers] = React.useState<any[]>([]);
    const searchUser = debounce(async (keyword) => {
      let result = await userService.findUsers({
        keyword,
      });
      setAssignedUsers(result || []);
    }, 300);
    const [form] = Form.useForm();
    const history = useHistory();
    const match: any = useRouteMatch();
    const getDetail = async (id) => {
      await props.inquiryStore.get(id);
      setAssignedUsers(props.inquiryStore.inquiryDetail.users);
      if (props.inquiryStore.inquiryDetail.contact) {
        props.appDataStore.contacts = [
          props.inquiryStore.inquiryDetail.contact,
        ];
      }
      if (props.inquiryStore.inquiryDetail.client) {
        props.appDataStore.clients = [props.inquiryStore.inquiryDetail?.client];
      }
      form.setFieldsValue(props.inquiryStore.inquiryDetail);
    };
    useEffect(() => {
      props.appDataStore.getCountryFull();
      props.appDataStore.getInquiryTypes({});
      props.appDataStore.getPropertyTypes();
      props.appDataStore.getInquirySourceAndStatus();
      props.unitStore.getFacilities();
      props.unitStore.getFacing();
      props.unitStore.getView();
      if (match.params.id) {
        getDetail(match.params.id);
      } else {
        props.inquiryStore.inquiryDetail = {};
      }
    }, []);
    const onCancel = () => {
      history.goBack();
    };

    const onSave = async () => {
      const values = await form.validateFields();
      const body = {
        ...values,
      };
      if (props.inquiryStore.inquiryDetail?.id) {
        await props.inquiryStore.update({
          ...props.inquiryStore.inquiryDetail,
          ...body,
        });
      } else {
        await props.inquiryStore.create(body);
      }
      history.goBack();
    };
    const renderActions = () => {
      return (
        <Row style={{ alignItems: "center" }}>
          <Col flex="auto" className="text-left">
            <Button className="mr-1" onClick={onCancel}>
              {L("BTN_CANCEL")}
            </Button>
            {isGrantedAny(
              appPermissions.inquiryManagement.create,
              appPermissions.inquiryManagement.update
            ) && (
              <Button
                type="primary"
                onClick={onSave}
                loading={props.inquiryStore.isLoading}
              >
                {L("BTN_SAVE")}
              </Button>
            )}
          </Col>
        </Row>
      );
    };
    return (
      <WrapPageScroll renderActions={renderActions}>
        <Tabs>
          <TabPane tab={L("INQUIRY_INFO")} key="INQUIRY_INFO">
            <Form
              layout="vertical"
              form={form}
              className="w-100 d-flex justify-content-center"
            >
              {props.inquiryStore.isLoading && (
                <>
                  <Spin />
                </>
              )}
              {!props.inquiryStore.isLoading && (
                <Row gutter={[16, 16]} className="w-100">
                  <Col sm={{ span: 16, offset: 0 }}>
                    <Card bordered={false} className="w-100">
                      <Row gutter={[8, 0]}>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <FormInput
                            label={L("INQUIRY_NAME")}
                            name="inquiryName"
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormSelect
                            selectProps={{
                              onSearch: debounce(
                                props.appDataStore.getClients,
                                300
                              ),
                            }}
                            options={props.appDataStore.clients}
                            label={L("CLIENT")}
                            name="clientId"
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormSelect
                            options={props.appDataStore.contacts}
                            selectProps={{
                              onSearch: debounce(
                                props.appDataStore.getContacts,
                                300
                              ),
                            }}
                            label={L("CONTACT")}
                            name="contactId"
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormSelect
                            options={props.appDataStore.inquiryTypes}
                            label={L("TYPE")}
                            name="typeId"
                            rule={rules.required}
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormSelect
                            options={props.appDataStore.propertyTypes}
                            label={L("PROPERTY_TYPE")}
                            name="propertyTypeId"
                            rule={rules.required}
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormSelect
                            options={props.appDataStore.inquirySources}
                            label={L("SOURCE")}
                            name="sourceId"
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormSelect
                            options={props.appDataStore.inquiryStatus}
                            label={L("STATUS")}
                            name="statusId"
                            rule={rules.required}
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormSelect
                            options={props.unitStore.facing}
                            label={L("FACING")}
                            name="facingId"
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormSelect
                            options={props.unitStore.view}
                            label={L("VIEWS")}
                            name="viewIds"
                            selectProps={{ mode: "multiple" }}
                          />
                        </Col>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <FormSelect
                            options={props.unitStore.facilities}
                            label={L("FACILITIES")}
                            selectProps={{ mode: "multiple" }}
                            name="facilityIds"
                          />
                        </Col>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <h3 style={{ fontWeight: 600, margin: "0.75rem" }}>
                            {L("DETAILS")}
                          </h3>
                        </Col>

                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormRangeInput
                            isCurrency
                            label={L("PRICE")}
                            name="fromPrice"
                            seccondName="toPrice"
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormRangeInput
                            label={L("SQUARE")}
                            name="fromSize"
                            seccondName="toSize"
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormNumber
                            label={L("BEDROOM_COUNT")}
                            name="bedRoom"
                          />
                        </Col>
                        <Col sm={{ span: 12, offset: 0 }}>
                          <FormNumber
                            label={L("BATHROOM_COUNT")}
                            name="bathRoom"
                          />
                        </Col>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <FormTextArea
                            label={L("DESCRIPTION")}
                            name="description"
                          />
                        </Col>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <Form.Item
                            label={L("COMPANY_LOCATION")}
                            {...formVerticalLayout}
                            name="inquiryAddress"
                          >
                            <AddressInputMulti
                              countries={props.appDataStore.countryFull}
                            />
                          </Form.Item>

                          {/* <SelectAddress
                            groupName="inquiryAddress"
                            appDataStore={props.appDataStore}
                          /> */}
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Card bordered={false} className="w-100">
                      <Row gutter={[8, 0]}>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <FormSelect
                            options={assignedUsers}
                            label={L("ASSIGNED_USER")}
                            name="userIds"
                            selectProps={{
                              mode: "multiple",
                              onSearch: searchUser,
                            }}
                          />
                        </Col>
                        <Col sm={{ span: 24, offset: 0 }}>
                          <FormSelect
                            options={props.appDataStore.departments}
                            label={L("ASSIGNED_DEPARTMENTS")}
                            name="organizationUnitIds"
                            selectProps={{ mode: "multiple" }}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              )}
            </Form>
          </TabPane>
          <TabPane tab={L("LISTING")} key="LISTING" disabled={!match.params.id}>
            <MatchingListing
              unitStore={props.unitStore}
              inquiryStore={props.inquiryStore}
              listingStore={props.listingStore}
              appDataStore={props.appDataStore}
            />
          </TabPane>
        </Tabs>
      </WrapPageScroll>
    );
  })
);

export default InquiryDetail;
