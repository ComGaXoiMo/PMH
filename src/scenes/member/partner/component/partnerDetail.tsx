import React from 'react'

import { Col, Form, Input, Row, Select, Switch, DatePicker, Card, Tabs, Modal, Button, Radio, Rate } from 'antd'
import { InfoCircleOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { L, LNotification, isGrantedAny } from '../../../../lib/abpUtility'
import rules from './validation'
import AppConsts, { moduleAvatar, dateFormat, appPermissions, defaultAvatar } from '../../../../lib/appconst'
import { inject, observer } from 'mobx-react'
import Stores from '../../../../stores/storeIdentifier'
import RoleStore from '../../../../stores/administrator/roleStore'
import WrapPageScroll from '../../../../components/WrapPageScroll'
import AppComponentBase from '../../../../components/AppComponentBase'
// import AvatarUpload from '../../../../components/FileUpload/AvatarUpload'
import UserStore from '../../../../stores/administrator/userStore'
import { validateMessages } from '../../../../lib/validation'
import PartnerStore from '@stores/member/partner/partnerStore'
import AvatarUpload2 from '@components/FileUpload/AvatarUpload2'
import ImageUpload from '@components/FileUpload/ImageUpload'
import FileStore from '@stores/common/fileStore'
import { formatNumber } from '@lib/helper'
import MasterDataStore from '@stores/master-data/masterDataStore'
import NumberInput from '@components/Inputs/NumberInput'
import debounce from 'lodash/debounce'
import { portalLayouts } from '@components/Layout/Router/router.config'

const { formVerticalLayout, genders, activeStatus, escrowOptions } = AppConsts
const { confirm } = Modal

export interface IStaffFormProps {
  match: any
  history: any
  partnerStore: PartnerStore
  roleStore: RoleStore
  userStore: UserStore
  masterDataStore: MasterDataStore
}

@inject(Stores.PartnerStore, Stores.UserStore, Stores.RoleStore, Stores.MasterDataStore)
@observer
class PartnerDetail extends AppComponentBase<IStaffFormProps> {
  state = {
    isDirty: false,
    tabActiveKey: 'PARTNER_INFORMATION',
    selectingStaffProject: {} as any,
    displayNames: [],
    selectedProjectId: undefined,
    dataSource: [{}],
    provinceId: undefined,
    escrow: undefined
  }
  formRef: any = React.createRef()

  async componentDidMount() {
    // Need to wait to get all role first. If not -> the logic will be wrong
    await this.getDetail(this.props.match?.params?.id)
    if (this.props.masterDataStore.paymentOptions.length === 0) {
      await this.props.masterDataStore.getPaymentOption()
    }
    if (this.props.masterDataStore.truckBrandOptions.length === 0) {
      await this.props.masterDataStore.getTruckBrandOptions({})
    }
    if (this.props.masterDataStore.truckTypeOptions.length === 0) {
      await this.props.masterDataStore.filterTruckTypeOptions({})
    }
    if (this.props.masterDataStore.provinceOptions.length === 0) {
      await this.props.masterDataStore.filterProvinceOptions({})
    }
  }

  componentWillUnmount() {
    this.props.userStore.editUserProfilePicture = defaultAvatar
    this.props.partnerStore.createStaff()
  }

  getDetail = async (id?) => {
    if (!id) {
      await this.props.partnerStore.createStaff()
    } else {
      await Promise.all([this.props.masterDataStore.getUserStatus(id), this.props.partnerStore.get(id)])
    }
    this.formRef.current?.setFieldsValue({
      ...this.props.partnerStore.editPartner,
      isActive: this.props.partnerStore.editPartner.isActive ? 'true' : 'false'
    })
  }

  changeSelectingStaffProject = (id, project) => {
    this.setState({ selectingStaffProject: project })
  }

  addStaffProject = async () => {
    if (!this.state.selectingStaffProject || !this.state.selectingStaffProject.value) {
      return
    }
    let project = {
      id: this.state.selectingStaffProject.value,
      name: this.state.selectingStaffProject?.children
    }
    this.props.partnerStore.createStaffProject(project, this.props.roleStore.allRoles)
  }

  onSave = () => {
    const form = this.formRef.current

    form.validateFields().then(async (values: any) => {
      let location = values.truckUserInformation?.truckUserLocation.districtId.map((id) => ({
        provinceId: values.truckUserInformation?.truckUserLocation.provinceId,
        districtId: id
      }))
      if (this.props.partnerStore.editPartner?.id) {
        await this.props.partnerStore.update({
          ...this.props.partnerStore.editPartner,
          ...values
        })
      } else {
        let body = {
          ...values,
          setRandomPassword: true,
          truckUserInformation: { ...values.truckUserInformation, truckUserLocation: location }
        }
        await this.props.partnerStore.create(body)
      }
      this.props.history.goBack()
    })
  }

  onCancel = () => {
    if (this.state.isDirty) {
      confirm({
        title: LNotification('ARE_YOU_SURE'),
        okText: L('BTN_YES'),
        cancelText: L('BTN_NO'),
        onOk: () => {
          this.props.history.goBack()
        }
      })
      return
    }
    this.props.history.goBack()
  }

  changeTab = (tabKey) => {
    this.setState({ tabActiveKey: tabKey })
  }

  handleRedirect = (key) => {
    this.props.history.push({
      pathname: portalLayouts[`${key}`].path,
      search: `?keyword=${this.props.partnerStore.editPartner.displayName}`
    })
  }

  renderActions = (isLoading?) => {
    const { tabActiveKey } = this.state
    return (
      <Row>
        <Col sm={{ span: 24, offset: 0 }} className="d-flex justify-content-between">
          <span className="d-flex align-items-center">
            <span>
              <Form.Item name="isActive" className="mb-0">
                <Select showArrow allowClear placeholder={L('IS_ACTIVE')}>
                  {this.renderOptions(activeStatus.filter((i) => i.value !== ' '))}
                </Select>
              </Form.Item>
            </span>
          </span>
          <span>
            <Button className="mr-1" onClick={this.onCancel} shape="round">
              {L('BTN_CANCEL')}
            </Button>

            {tabActiveKey === 'PARTNER_INFORMATION' &&
              isGrantedAny(appPermissions.partner.create, appPermissions.partner.update) && (
                <Button type="primary" onClick={this.onSave} loading={isLoading} shape="round">
                  {L('BTN_SAVE')}
                </Button>
              )}
          </span>
        </Col>
      </Row>
    )
  }

  render() {
    const {
      partnerStore: { isLoading }
    } = this.props
    return (
      <WrapPageScroll renderActions={() => this.renderActions(isLoading)}>
        <Form
          ref={this.formRef}
          layout={'vertical'}
          onFinish={this.onSave}
          onAbort={this.onCancel}
          onValuesChange={() => this.setState({ isDirty: true })}
          validateMessages={validateMessages}
          size="large"
        >
          <Card bordered={false} id="truck-detail">
            <Row>
              <Col sm={{ span: 4, offset: 0 }} className="d-flex flex-column justify-content-center align-items-center">
                <AvatarUpload2
                  userStore={this.props.userStore}
                  module={moduleAvatar.staff}
                  parentId={this.props.partnerStore.editPartner?.id}
                  profilePictureId={this.props.partnerStore.editPartner?.profilePictureId}
                ></AvatarUpload2>

                {this.props.match?.params?.id && <Rate disabled defaultValue={5} className="mt-3" />}
              </Col>
              <Col sm={{ span: 20, offset: 0 }}>
                <Row gutter={[8, 8]}>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L('PARTNER_FULL_NAME')}
                      {...formVerticalLayout}
                      name="displayName"
                      rules={rules.displayName}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L('PARTNER_EMAIL')}
                      {...formVerticalLayout}
                      name="emailAddress"
                      rules={rules.emailAddress}
                    >
                      <Input prefix={<MailOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L('PARTNER_PHONE')}
                      {...formVerticalLayout}
                      name="phoneNumber"
                      rules={rules.phoneNumber}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>

                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item label={L('PARTNER_DOB')} {...formVerticalLayout} name="birthDate">
                      <DatePicker className="full-width" format={dateFormat} placeholder={L('SELECT_DATE')} />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item label={L('PARTNER_GENDER')} {...formVerticalLayout} name="gender">
                      <Select style={{ width: '100%' }}>
                        {genders.map((gender: any, index) => (
                          <Select.Option key={index} value={gender.value}>
                            {L(gender.name)}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  {this.props.match?.params?.id && (
                    <Col sm={{ span: 8, offset: 0 }}>
                      <Card
                        className="w-100 mt-3 rounded-pill hover-pointer"
                        onClick={() => this.handleRedirect('cashAdvance')}
                      >
                        <div className="w-100 d-flex justify-content-between">
                          <span>{L('ACCOUNT_BALLANCE')}</span>
                          <span>
                            <strong>
                              {formatNumber(this.props.partnerStore.editPartner?.feeCashAdvance?.balanceAmount || 0)}
                            </strong>
                            <span className="text-muted">VND</span>
                          </span>
                        </div>
                      </Card>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>

            <Tabs activeKey={this.state.tabActiveKey} onTabClick={this.changeTab}>
              <Tabs.TabPane tab={L('PARTNER_INFORMATION')} key="PARTNER_INFORMATION">
                {!this.props.match?.params?.id && (
                  <>
                    <Row gutter={[8, 8]}>
                      <Col sm={{ span: 8, offset: 0 }}>
                        <Form.Item
                          label={L('TRUCK_BRAND')}
                          {...formVerticalLayout}
                          name={['truckUserInformation', 'truckBrandId']}
                          rules={rules.require}
                        >
                          <Select
                            filterOption={false}
                            onSearch={debounce(
                              (keyword) => this.props.masterDataStore.getTruckBrandOptions({ keyword }),
                              300
                            )}
                            showArrow
                            allowClear
                            showSearch
                            style={{ width: '100%' }}
                          >
                            {this.renderOptions(this.props.masterDataStore.truckBrandOptions)}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 8, offset: 0 }}>
                        <Form.Item
                          label={L('TRUCK_TYPE')}
                          {...formVerticalLayout}
                          name={['truckUserInformation', 'truckTypeId']}
                          rules={rules.require}
                        >
                          <Select
                            filterOption={false}
                            onSearch={debounce(
                              (keyword) => this.props.masterDataStore.filterTruckTypeOptions({ keyword }),
                              300
                            )}
                            showArrow
                            allowClear
                            showSearch
                            style={{ width: '100%' }}
                          >
                            {this.renderOptions(this.props.masterDataStore.truckTypeOptions)}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 8, offset: 0 }}>
                        <Form.Item
                          label={L('TRUCK_LICENSE_NUMBER')}
                          {...formVerticalLayout}
                          name={['truckUserInformation', 'numberPlates']}
                          rules={rules.license}
                        >
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col sm={{ span: 8, offset: 0 }}>
                        <Form.Item
                          label={L('RENT_PRICE')}
                          {...formVerticalLayout}
                          name={['truckUserInformation', 'priceForLease']}
                          rules={
                            this.formRef.current?.getFieldValue(['truckUserInformation', 'isAvailableForLease']) &&
                            rules.require
                          }
                        >
                          <NumberInput suffix={'VND'} />
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 4, offset: 0 }}>
                        <Form.Item
                          label={L('READY_FOR_RENT')}
                          {...formVerticalLayout}
                          valuePropName="checked"
                          name={['truckUserInformation', 'isAvailableForLease']}
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 4, offset: 0 }}>
                        <Form.Item
                          label={L('READY_TO_WORK')}
                          {...formVerticalLayout}
                          valuePropName="checked"
                          name={['truckUserInformation', 'isReceiveRequest']}
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 4, offset: 0 }}>
                        <Form.Item
                          label={L('COMFIRMED')}
                          {...formVerticalLayout}
                          valuePropName="checked"
                          name={['truckUserInformation', 'isConfirmed']}
                        >
                          <Switch />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                      <Col sm={{ span: 24, offset: 0 }}>
                        <div>
                          <span className="text-danger">* </span>
                          {L('TRUCK_REGISTRATION_CERTIFICATE')}
                        </div>
                        <Form.Item name={['truckUserInformation', 'identityCard']} rules={rules.require}>
                          <ImageUpload
                            fileStore={new FileStore()}
                            showMainPhoto={false}
                            changeFile={(fileList) =>
                              this.formRef.current.setFields([
                                { name: ['truckUserInformation', 'identityCard'], value: fileList }
                              ])
                            }
                          />
                        </Form.Item>
                        <div>
                          <span className="text-danger">* </span>
                          {L('VRTC_CERTIFICATE')}
                        </div>
                        <Form.Item name={['truckUserInformation', 'truckCard']} rules={rules.require}>
                          <ImageUpload
                            fileStore={new FileStore()}
                            showMainPhoto={false}
                            changeFile={(fileList) =>
                              this.formRef.current.setFields([
                                { name: ['truckUserInformation', 'truckCard'], value: fileList }
                              ])
                            }
                          />
                        </Form.Item>
                        <div>
                          <span className="text-danger">* </span>
                          {L('INSURENCE')}
                        </div>
                        <Form.Item name={['truckUserInformation', 'insurance']} rules={rules.require}>
                          <ImageUpload
                            fileStore={new FileStore()}
                            showMainPhoto={false}
                            changeFile={(fileList) =>
                              this.formRef.current.setFields([
                                { name: ['truckUserInformation', 'insurance'], value: fileList }
                              ])
                            }
                          />
                        </Form.Item>
                        <div>
                          <span className="text-danger">* </span>
                          {L('SAFETY_CERTIFICATE')}
                        </div>
                        <Form.Item name={['truckUserInformation', 'safetyCertification']} rules={rules.require}>
                          <ImageUpload
                            fileStore={new FileStore()}
                            showMainPhoto={false}
                            changeFile={(fileList) =>
                              this.formRef.current.setFields([
                                { name: ['truckUserInformation', 'safetyCertification'], value: fileList }
                              ])
                            }
                          />
                        </Form.Item>
                        <div>
                          <span className="text-danger">* </span>
                          {L('TRUCK_PHOTO')}
                        </div>
                        <Form.Item name={['truckUserInformation', 'truck']} rules={rules.require}>
                          <ImageUpload
                            fileStore={new FileStore()}
                            showMainPhoto={false}
                            changeFile={(fileList) =>
                              this.formRef.current.setFields([
                                { name: ['truckUserInformation', 'truck'], value: fileList }
                              ])
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      label={L('TRUCKDESCRIPTION')}
                      {...formVerticalLayout}
                      name={['truckUserInformation', 'description']}
                      rules={rules.description}
                    >
                      <Input />
                    </Form.Item>
                    <div>{L('LOCATION')}</div>
                    <Row gutter={[8, 8]}>
                      <Col sm={{ span: 8, offset: 0 }}>
                        <Form.Item
                          label={L('PROVINCE')}
                          {...formVerticalLayout}
                          name={['truckUserInformation', 'truckUserLocation', 'provinceId']}
                          rules={rules.require}
                        >
                          <Select
                            allowClear
                            showSearch
                            onSearch={debounce(
                              (e) => this.props.masterDataStore.filterProvinceOptions({ keyword: e }),
                              500
                            )}
                            onSelect={(e) => {
                              this.props.masterDataStore.filterDistrictOptions({ provinceId: e })
                              this.setState({ provinceId: e })
                            }}
                            filterOption={false}
                          >
                            {this.renderOptions(this.props.masterDataStore.provinceOptions)}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 16, offset: 0 }}>
                        <Form.Item
                          label={L('DISTRICT')}
                          {...formVerticalLayout}
                          name={['truckUserInformation', 'truckUserLocation', 'districtId']}
                          rules={rules.require}
                        >
                          <Select
                            mode="multiple"
                            allowClear
                            showSearch
                            onSearch={debounce(
                              (e) =>
                                this.props.masterDataStore.filterDistrictOptions({
                                  keyword: e,
                                  provinceId: this.state.provinceId
                                }),
                              500
                            )}
                            filterOption={false}
                          >
                            {this.renderOptions(this.props.masterDataStore.districtOptions)}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <h3>{L('ESCROW')}</h3>
                    <Form.Item name={['partnerDeposit', 'totalAmount']}>
                      <Radio.Group
                        className="w-100 d-flex justify-content-around align-items-center"
                        buttonStyle="solid"
                        onChange={(item) => {
                          this.setState({ escrow: item.target.value })
                        }}
                      >
                        {escrowOptions.map((item) => (
                          <Radio.Button
                            value={item}
                            key={item}
                            type={item !== this.state.escrow ? 'default' : 'primary'}
                          >
                            <strong>{formatNumber(item)} </strong>
                            <span className="text-muted">VND</span>
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                    <Row gutter={[8, 8]}>
                      <Col sm={{ span: 12, offset: 0 }}>
                        <Form.Item
                          label={L('PARTNER_PAYMENT_TYPE')}
                          {...formVerticalLayout}
                          name={['partnerDeposit', 'cashChanelId']}
                          rules={rules.require}
                        >
                          <Select>{this.renderOptions(this.props.masterDataStore.paymentOptions)}</Select>
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 12, offset: 0 }}>
                        <Form.Item
                          label={L('PARTNER_PAYMENT_DATE')}
                          {...formVerticalLayout}
                          name={['partnerDeposit', 'cashReceiptDate']}
                          rules={rules.require}
                        >
                          <DatePicker className="w-100" placeholder={L('SELECT_DATE')} />
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 24, offset: 0 }}>
                        <Form.Item
                          label={L('PARTNER_NOTE')}
                          {...formVerticalLayout}
                          name={['partnerDeposit', 'description']}
                        >
                          <Input.TextArea />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                )}

                {this.props.match?.params?.id && (
                  <>
                    {this.props.masterDataStore.haveUserWarning && (
                      <Card className="w-100 rounded bg-warning my-3">
                        {!this.props.masterDataStore.userStatus.isEmailConfirmed && (
                          <div>
                            <InfoCircleOutlined className="mx-3 text-danger" />
                            <span> {L('WARNING_EMAIL_NOT_VALIDATED')} </span>
                          </div>
                        )}
                        {!this.props.masterDataStore.userStatus.isPhoneConfirmed && (
                          <div>
                            <InfoCircleOutlined className="mx-3 text-danger" />
                            <span> {L('WARNING_PHONE_NOT_VALIDATED')} </span>
                          </div>
                        )}
                        {!this.props.masterDataStore.userStatus.isTruckConfirmed && (
                          <div>
                            <InfoCircleOutlined className="mx-3 text-danger" />
                            <span> {L('WARNING_DONT_HAVE_TRUCK')} </span>
                          </div>
                        )}
                        {this.props.masterDataStore.userStatus.isTopUp && (
                          <div>
                            <InfoCircleOutlined className="mx-3 text-danger" />
                            <span> {L('WARNING_MINIMUM_THRESHOLD')} </span>
                          </div>
                        )}
                      </Card>
                    )}
                    <div className="w-100 my-3">
                      <Row gutter={[18, 18]}>
                        <Col sm={{ span: 8, offset: 0 }}>
                          <Card
                            className="w-100 rounded-pill hover-pointer"
                            onClick={() => this.handleRedirect('truckManagement')}
                          >
                            <h5>{L('CARS_READY')}</h5>
                            <h3>{this.props.partnerStore.editPartner?.truck || 0}</h3>
                          </Card>
                        </Col>
                        <Col sm={{ span: 8, offset: 0 }}>
                          <Card
                            className="w-100 rounded-pill hover-pointer"
                            onClick={() => this.handleRedirect('touchRequest')}
                          >
                            <h5>{L('CARRIED_RECEIVED')}</h5>
                            <h3>{this.props.partnerStore.editPartner?.request || 0}</h3>
                          </Card>
                        </Col>
                        <Col sm={{ span: 8, offset: 0 }}>
                          <Card
                            className="w-100 rounded-pill hover-pointer"
                            onClick={() => this.handleRedirect('leasingRequest')}
                          >
                            <h5>{L('RENTAL_RECEIVED')}</h5>
                            <h3>{this.props.partnerStore.editPartner?.lease || 0}</h3>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
              </Tabs.TabPane>
              <Tabs.TabPane tab={L('TAB_HISTORY')} key="PARTNER_INFO_HISTORY"></Tabs.TabPane>
            </Tabs>
          </Card>
        </Form>
      </WrapPageScroll>
    )
  }
}

export default PartnerDetail
