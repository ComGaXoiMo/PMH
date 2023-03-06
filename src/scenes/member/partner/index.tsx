import * as React from 'react'

import { Col, DatePicker, Dropdown, Input, Menu, Modal, Row, Select, Table } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

import { AppComponentListBase } from '../../../components/AppComponentBase'
// import Filter from '../../../components/Filter'
import DataTable from '../../../components/DataTable'
import { L, LNotification } from '../../../lib/abpUtility'
import StaffStore from '../../../stores/member/staff/staffStore'
import { inject, observer } from 'mobx-react'
import Stores from '../../../stores/storeIdentifier'
import AppConst, { appPermissions } from '../../../lib/appconst'
import { portalLayouts } from '../../../components/Layout/Router/router.config'
import ResetPasswordFormModal from '../../../components/Modals/ResetPassword'
import debounce from 'lodash/debounce'
import getColumns from './columns'
import PartnerStore from '@stores/member/partner/partnerStore'
import moment from 'moment'
import masterDataService from '@services/master-data/masterDataService'
const { align, activeStatus, phoneAuthenticationStatus, emailAuthenticationStatus, authenticationOptions } = AppConst

export interface IStaffsProps {
  history: any
  staffStore: StaffStore
  partnerStore: PartnerStore
}

export interface IStaffsState {
  modalResetPasswordVisible: boolean
  modalVisible: boolean
  maxResultCount: number
  skipCount: number
  partnerId?: number
  filters: any
}

const confirm = Modal.confirm

@inject(Stores.StaffStore, Stores.PartnerStore)
@observer
class Partner extends AppComponentListBase<IStaffsProps, IStaffsState> {
  formRef: any = React.createRef()

  state = {
    modalResetPasswordVisible: false,
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    partnerId: 0,
    filters: { isActive: 'true', status: undefined, isEmailConfirmed: undefined, isPhoneConfirmed: undefined }
  }

  get currentPage() {
    return Math.floor(this.state.skipCount / this.state.maxResultCount) + 1
  }

  async componentDidMount() {
    await this.getAll()
  }

  getAll = async () => {
    await this.props.partnerStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      ...this.state.filters
    })
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll())
  }

  Modal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  createOrUpdateModalOpen = async (id?: number) => {
    if (!id) {
      await this.props.partnerStore.createStaff()
    } else {
      await this.props.partnerStore.get(id)
    }

    this.setState({ partnerId: id })
    this.Modal()

    this.formRef.current.setFieldsValue({})
  }

  activateOrDeactivate = async (id: number, isActive) => {
    const self = this
    confirm({
      title: LNotification(isActive ? 'DO_YOU_WANT_TO_ACTIVATE_THIS_ITEM' : 'DO_YOU_WANT_TO_DEACTIVATE_THIS_ITEM'),
      okText: L('BTN_YES'),
      cancelText: L('BTN_NO'),
      onOk: async () => {
        await self.props.partnerStore.activateOrDeactivate(id, isActive)
        self.handleTableChange({ current: 1 })
      },
      onCancel() {}
    })
  }

  gotoDetail = (id) => {
    const { history } = this.props
    id
      ? history.push(portalLayouts.partnerDetail.path.replace(':id', id))
      : history.push(portalLayouts.partnerCreate.path)
  }

  handleCreate = () => {
    const form = this.formRef.current

    form.validateFields().then(async (values: any) => {
      if (this.state.partnerId === 0) {
        await this.props.partnerStore.create(values)
      } else {
        await this.props.partnerStore.update({
          id: this.state.partnerId,
          ...values
        })
      }

      await this.getAll()
      this.setState({ modalVisible: false })
      form.resetFields()
    })
  }

  updateSearch = debounce((name, value) => {
    const { filters } = this.state
    this.setState({ filters: { ...filters, [name]: value } })
  }, 100)

  handleSearch = (name, value) => {
    const { filters } = this.state
    if (name === '') {
      value
        ? this.setState(
            {
              filters: {
                ...filters,
                fromDate: moment(value[0]).toISOString(),
                toDate: moment(value[1]).toISOString()
              },
              skipCount: 0
            },
            async () => {
              await this.getAll()
            }
          )
        : this.setState(
            {
              filters: {
                ...filters,
                fromDate: undefined,
                toDate: undefined
              },
              skipCount: 0
            },
            async () => {
              await this.getAll()
            }
          )
    } else {
      this.setState({ filters: { ...filters, [name]: value }, skipCount: 0 }, async () => {
        await this.getAll()
      })
    }
  }

  showChangePasswordModal = (id) => {
    this.setState({ partnerId: id, modalResetPasswordVisible: true })
  }
  renderFilterComponent = () => {
    const { filters } = this.state
    const keywordPlaceHolder = `${this.L('PHONE')}, ${this.L('EMAIL')}, ${this.L('NAME')}`
    return (
      <Row gutter={[8, 8]}>
        <Col sm={{ span: 8, offset: 0 }}>
          <Input.Search placeholder={keywordPlaceHolder} onSearch={(value) => this.handleSearch('keyword', value)} />
        </Col>
        <Col md={{ span: 8, offset: 0 }}>
          <DatePicker.RangePicker
            allowClear
            onChange={(value) => this.handleSearch('', value)}
            style={{ width: '100%' }}
          />
        </Col>
        <Col md={{ span: 8, offset: 0 }}>
          <Select
            showArrow
            allowClear
            value={filters.isActive}
            onChange={(value) => this.handleSearch('isActive', value)}
            style={{ width: '100%' }}
            placeholder={L('IS_ACTIVE')}
          >
            {this.renderOptions(activeStatus)}
          </Select>
        </Col>
        <Col md={{ span: 8, offset: 0 }}>
          <Select
            showArrow
            allowClear
            value={filters.status}
            onChange={(value) => this.handleSearch('status', value)}
            style={{ width: '100%' }}
            placeholder={L('STATUS')}
          >
            {this.renderOptions(authenticationOptions)}
          </Select>
        </Col>
        <Col md={{ span: 8, offset: 0 }}>
          <Select
            showArrow
            allowClear
            value={filters.isPhoneConfirmed}
            onChange={(value) => this.handleSearch('isPhoneConfirmed', value)}
            style={{ width: '100%' }}
            placeholder={L('IS_PHONE_CONFIRMED')}
          >
            {this.renderOptions(phoneAuthenticationStatus)}
          </Select>
        </Col>
        <Col md={{ span: 8, offset: 0 }}>
          <Select
            showArrow
            allowClear
            value={filters.isEmailConfirmed}
            onChange={(value) => this.handleSearch('isEmailConfirmed', value)}
            style={{ width: '100%' }}
            placeholder={L('IS_EMAIL_CONFIRMED')}
          >
            {this.renderOptions(emailAuthenticationStatus)}
          </Select>
        </Col>
      </Row>
    )
  }
  sendActiveEmail = async (id) => {
    await masterDataService.sendActiveEmail(id)
  }

  public render() {
    const {
      partnerStore: { partners, isLoading }
    } = this.props
    // const {filters} = this.state
    const columns = getColumns({
      title: L('ACTIONS'),
      dataIndex: 'operation',
      key: 'operation',
      fixed: align.right,
      align: align.right,
      width: 90,
      render: (text: string, item: any) => (
        <div>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                {this.isGranted(appPermissions.partner.update) && (
                  <Menu.Item onClick={() => this.gotoDetail(item.id)}>{L('BTN_EDIT')}</Menu.Item>
                )}
                {this.isGranted(appPermissions.partner.update) && (
                  <>
                    <Menu.Item onClick={() => this.showChangePasswordModal(item.id)}>
                      {L('BTN_RESET_PASSWORD')}
                    </Menu.Item>
                    {item.warningInformation?.isEmailConfirmed === false && (
                      <Menu.Item onClick={() => this.sendActiveEmail(item.id)}>{L('BTN_SEND_ACTIVE_EMAIL')}</Menu.Item>
                    )}
                  </>
                )}
                {this.isGranted(appPermissions.partner.delete) && (
                  <Menu.Item onClick={() => this.activateOrDeactivate(item.id, !item.isActive)}>
                    {L(item.isActive ? 'BTN_DEACTIVATE' : 'BTN_ACTIVATE')}
                  </Menu.Item>
                )}
              </Menu>
            }
            placement="bottomLeft"
          >
            <MoreOutlined />
          </Dropdown>
        </div>
      )
    })

    // const keywordPlaceholder = `${this.L('STAFF_FULL_NAME')}, ${this.L('STAFF_EMAIL')}`
    return (
      <>
        <DataTable
          title={this.L('PARTNER_LIST')}
          onCreate={() => this.gotoDetail(null)}
          pagination={{
            pageSize: this.state.maxResultCount,
            current: this.currentPage,
            total: partners === undefined ? 0 : partners.totalCount,
            onChange: this.handleTableChange
          }}
          createPermission={appPermissions.partner.create}
          filterComponent={this.renderFilterComponent()}
        >
          <Table
            size="middle"
            className="custom-ant-table"
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            loading={isLoading}
            dataSource={partners === undefined ? [] : partners.items}
            scroll={{ x: 1024, scrollToFirstRowOnChange: true }}
          />
        </DataTable>
        <ResetPasswordFormModal
          visible={this.state.modalResetPasswordVisible}
          userId={this.state.partnerId}
          onCancel={() =>
            this.setState({
              modalResetPasswordVisible: false,
              partnerId: 0
            })
          }
        />
      </>
    )
  }
}

export default Partner
