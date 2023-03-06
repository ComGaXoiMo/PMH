import React from 'react'

import { Col, Form, Input, Row, Select, DatePicker, Card, Tabs, Modal, Button, Radio, Rate } from 'antd'
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
import AvatarUpload2 from '@components/FileUpload/AvatarUpload2'
import { formatNumber } from '@lib/helper'
import CustomerStore from '@stores/member/customer/customerStore'
import MasterDataStore from '@stores/master-data/masterDataStore'
import { portalLayouts } from '@components/Layout/Router/router.config'

const { formVerticalLayout, genders, activeStatus, escrowOptions } = AppConsts
const { confirm } = Modal

export interface IStaffFormProps {
  match: any
  history: any
  roleStore: RoleStore
  userStore: UserStore
  customerStore: CustomerStore
  masterDataStore: MasterDataStore
}

@inject(Stores.CustomerStore, Stores.UserStore, Stores.RoleStore, Stores.MasterDataStore)
@observer
class CustomerDetail extends AppComponentBase<IStaffFormProps> {
  state = {
    isDirty: false,
    tabActiveKey: 'CUSTOMER_INFORMATION',
    selectingStaffProject: {} as any,
    staffProjects: [] as any,
    displayNames: [],
    selectedProjectId: undefined,
    dataSource: [{}],
    escrow: undefined
  }
  formRef: any = React.createRef()

  async componentDidMount() {
    // Need to wait to get all role first. If not -> the logic will be wrong
    await this.getDetail(this.props.match?.params?.id)

    if (this.props.masterDataStore.paymentOptions.length === 0) {
      await this.props.masterDataStore.getPaymentOption()
    }
  }

  componentWillUnmount() {
    this.props.userStore.editUserProfilePicture = defaultAvatar
    this.props.customerStore.createStaff()
  }

  getDetail = async (id?) => {
    if (!id) {
      await this.props.customerStore.createStaff()
    } else {
      await Promise.all([this.props.masterDataStore.getUserStatus(id), this.props.customerStore.get(id)])
    }
    this.formRef.current?.setFieldsValue({
      ...this.props.customerStore.editCustomer,
      isActive: this.props.customerStore.editCustomer?.isActive ? 'true' : 'false'
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
    this.props.customerStore.createStaffProject(project, this.props.roleStore.allRoles)
    this.setState({ staffProjects: [...this.state.staffProjects, { project }] })
  }

  onSave = () => {
    const form = this.formRef.current

    form.validateFields().then(async (values: any) => {
      if (this.props.customerStore.editCustomer?.id) {
        await this.props.customerStore.update({
          ...this.props.customerStore.editCustomer,
          ...values
        })
      } else {
        await this.props.customerStore.create({ ...values, setRandomPassword: true })
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
      search: `?keyword=${this.props.customerStore.editCustomer.displayName}`
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
            {tabActiveKey === 'CUSTOMER_INFORMATION' &&
              isGrantedAny(appPermissions.customer.create, appPermissions.customer.update) && (
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
      customerStore: { isLoading }
    } = this.props
    // const profilePictureUrl = this.props.userStore.editUserProfilePicture
    return (
      <Form
        ref={this.formRef}
        layout={'vertical'}
        onFinish={this.onSave}
        onAbort={this.onCancel}
        onValuesChange={() => this.setState({ isDirty: true })}
        validateMessages={validateMessages}
        size="large"
      >
        <WrapPageScroll renderActions={() => this.renderActions(isLoading)}>
          <Card bordered={false} id="truck-detail">
            <Row>
              <Col sm={{ span: 4, offset: 0 }} className="d-flex flex-column justify-content-center align-items-center">
                <AvatarUpload2
                  userStore={this.props.userStore}
                  module={moduleAvatar.staff}
                  parentId={this.props.customerStore.editCustomer?.id}
                  profilePictureId={this.props.customerStore.editCustomer?.profilePictureId}
                ></AvatarUpload2>
                {this.props.match?.params?.id && <Rate disabled defaultValue={5} className="mt-3" />}
              </Col>
              <Col sm={{ span: 20, offset: 0 }}>
                <Row gutter={[8, 8]}>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L('CUSTOMER_FULL_NAME')}
                      {...formVerticalLayout}
                      name="displayName"
                      rules={rules.displayName}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L('CUSTOMER_EMAIL')}
                      {...formVerticalLayout}
                      name="emailAddress"
                      rules={rules.emailAddress}
                    >
                      <Input prefix={<MailOutlined />} />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item
                      label={L('CUSTOMER_PHONE')}
                      {...formVerticalLayout}
                      name="phoneNumber"
                      rules={rules.phoneNumber}
                    >
                      <Input prefix={<PhoneOutlined />} />
                    </Form.Item>
                  </Col>

                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item label={L('CUSTOMER_DOB')} {...formVerticalLayout} name="birthDate">
                      <DatePicker className="full-width" format={dateFormat} placeholder={L('SELECT_DATE')} />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 8, offset: 0 }}>
                    <Form.Item label={L('CUSTOMER_GENDER')} {...formVerticalLayout} name="gender">
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
                              {formatNumber(this.props.customerStore.editCustomer?.feeCashAdvance?.balanceAmount || 0)}
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
              <Tabs.TabPane tab={L('CUSTOMER_INFORMATION')} key="CUSTOMER_INFORMATION">
                {!this.props.match?.params?.id && (
                  <>
                    <h3>{L('ESCROW')}</h3>
                    <Form.Item name={['customerDeposit', 'totalAmount']}>
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
                          label={L('CUSTOMER_PAYMENT_TYPE')}
                          {...formVerticalLayout}
                          name={['customerDeposit', 'cashChanelId']}
                          rules={rules.paymentType}
                        >
                          <Select>{this.renderOptions(this.props.masterDataStore.paymentOptions)}</Select>
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 12, offset: 0 }}>
                        <Form.Item
                          label={L('CUSTOMER_PAYMENT_DATE')}
                          {...formVerticalLayout}
                          name={['customerDeposit', 'cashReceiptDate']}
                          rules={rules.paymentDate}
                        >
                          <DatePicker className="w-100" />
                        </Form.Item>
                      </Col>
                      <Col sm={{ span: 24, offset: 0 }}>
                        <Form.Item
                          label={L('CUSTOMER_NOTE')}
                          {...formVerticalLayout}
                          name={['customerDeposit', 'description']}
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
                            onClick={() => this.handleRedirect('dismantlingRequest')}
                          >
                            <h5>{L('DISASSEMBLE')}</h5>
                            <h3>{this.props.customerStore.editCustomer?.disassemble || 0}</h3>
                          </Card>
                        </Col>
                        <Col sm={{ span: 8, offset: 0 }}>
                          <Card
                            className="w-100 rounded-pill hover-pointer"
                            onClick={() => this.handleRedirect('touchRequest')}
                          >
                            <h5>{L('TOUCH')}</h5>
                            <h3>{this.props.customerStore.editCustomer?.touch || 0}</h3>
                          </Card>
                        </Col>
                        <Col sm={{ span: 8, offset: 0 }}>
                          <Card
                            className="w-100 rounded-pill hover-pointer"
                            onClick={() => this.handleRedirect('leasingRequest')}
                          >
                            <h5>{L('LEASE')}</h5>
                            <h3>{this.props.customerStore.editCustomer?.lease || 0}</h3>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </>
                )}
              </Tabs.TabPane>
              <Tabs.TabPane tab={L('CUSTOMER_TAB_HISTORY')} key="CUSTOMER_INFO_HISTORY"></Tabs.TabPane>
            </Tabs>
          </Card>
        </WrapPageScroll>
      </Form>
    )
  }
}

export default CustomerDetail
