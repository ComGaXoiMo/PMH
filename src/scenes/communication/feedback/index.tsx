import * as React from 'react'

import { Col, Dropdown, Input, Menu, Modal, Row, Table, Select } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

import { AppComponentListBase } from '../../../components/AppComponentBase'
import DataTable from '../../../components/DataTable'
import { L, LNotification } from '../../../lib/abpUtility'
import FeedbackStore from '../../../stores/communication/feedbackStore'
import { inject, observer } from 'mobx-react'
import Stores from '../../../stores/storeIdentifier'
import AppConst, { appPermissions, moduleIds } from '../../../lib/appconst'
import { portalLayouts } from '../../../components/Layout/Router/router.config'
import WorkflowStore from '../../../stores/workflow/workflowStore'
import staffService from '@services/member/staff/staffService'
import debounce from 'lodash/debounce'
import getColumns from './columns'

const { align, activeStatus } = AppConst
const { Option } = Select

export interface IFeedbacksProps {
  history: any
  routedata?: any
  workflowStore: WorkflowStore
  feedbackStore: FeedbackStore
}

export interface IFeedbacksState {
  maxResultCount: number
  skipCount: number
  listStatus: any[]
  filters: any
  employees: any[]
  listTracker: any[]
}

const confirm = Modal.confirm
const Search = Input.Search

@inject(Stores.FeedbackStore, Stores.WorkflowStore)
@observer
class Feedbacks extends AppComponentListBase<IFeedbacksProps, IFeedbacksState> {
  formRef: any = React.createRef()

  state = {
    maxResultCount: 10,
    skipCount: 0,
    listStatus: [],
    filters: { isActive: 'true' },
    employees: [],
    listTracker: []
  }

  get currentPage() {
    return Math.floor(this.state.skipCount / this.state.maxResultCount) + 1
  }

  async componentDidMount() {
    await Promise.all([
      this.props.workflowStore.getListWfStatus(undefined, moduleIds.feedback),
      this.props.workflowStore.getListWfTracker(moduleIds.feedback),
      this.findEmployees(''),
      this.getAll()
    ])
    this.setState({ listStatus: this.props.workflowStore.wfStatus, listTracker: this.props.workflowStore.wfTrackers })
  }

  getAll = async () => {
    await this.props.feedbackStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      ...this.state.filters
    })
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll())
  }

  findEmployees = async (keyword) => {
    const employees = await staffService.filterOptions({ keyword })
    this.setState({ employees })
  }

  activateOrDeactivate = async (id: number, isActive) => {
    const self = this
    confirm({
      title: LNotification(isActive ? 'DO_YOU_WANT_TO_ACTIVATE_THIS_ITEM' : 'DO_YOU_WANT_TO_DEACTIVATE_THIS_ITEM'),
      okText: L('BTN_YES'),
      cancelText: L('BTN_NO'),
      onOk: async () => {
        await self.props.feedbackStore.activateOrDeactivate(id, isActive)
        self.handleTableChange({ current: 1 })
      },
      onCancel() {}
    })
  }

  handleSearch = (name, value) => {
    const { filters } = this.state
    this.setState({ filters: { ...filters, [name]: value }, skipCount: 0 }, async () => {
      await this.getAll()
    })
  }

  updateSearch = debounce((name, value) => {
    const { filters } = this.state
    this.setState({ filters: { ...filters, [name]: value } })
  }, 100)

  handleExportFeedback = async () => {
    const { feedbackStore } = this.props
    await feedbackStore.exportFeedbacks(this.state.filters)
  }

  gotoDetail = (id?) => {
    const { history } = this.props
    id
      ? history.push(portalLayouts.communicationFeedbackDetail.path.replace(':id', id))
      : history.push(portalLayouts.communicationFeedbackCreate.path)
  }

  renderFilterComponent = () => {
    const { listStatus } = this.state
    const keywordPlaceholder = `#${this.L('SEARCH_ID')}, ${this.L('RESIDENT_PHONE')}, ${this.L('RESIDENT_EMAIL')}`
    return (
      <Row gutter={[16, 8]}>
        <Col md={{ span: 8, offset: 0 }}>
          <Search
            onChange={(value) => this.updateSearch('keyword', value.target?.value)}
            placeholder={keywordPlaceholder}
            onSearch={(value) => this.handleSearch('keyword', value)}
          />
        </Col>
        <Col md={{ span: 8, offset: 0 }}>
          <Select
            mode="multiple"
            showSearch
            showArrow
            allowClear
            onChange={(value) => this.handleSearch('statusIds', value)}
            style={{ width: '100%' }}
            placeholder={L("FEEDBACK_STATUS")}
          >
            {(listStatus || []).map((status: any, index) => (
              <Option key={index} value={status.id}>
                {status.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col md={{ span: 8, offset: 0 }}>
          <Select
            showSearch
            showArrow
            allowClear
            onChange={(value) => this.handleSearch('isActive', value)}
            style={{ width: '100%' }}
            placeholder={L("IS_ACTIVE")}
          >
            {this.renderOptions(activeStatus)}
          </Select>
        </Col>
        {/*<Col md={{ span: 8, offset: 0 }}>*/}
        {/*  <Select*/}
        {/*    showSearch*/}
        {/*    showArrow*/}
        {/*    className="full-width"*/}
        {/*    onSearch={this.findEmployees}*/}
        {/*    filterOption={false}*/}
        {/*    mode="multiple"*/}
        {/*    onChange={(value) => this.handleSearch('assignedIds', value)}*/}
        {/*  >*/}
        {/*    {(employees || []).map((item: any, index) => (*/}
        {/*      <Option key={index} value={item.id}>*/}
        {/*        {item.displayName}*/}
        {/*      </Option>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</Col>*/}
      </Row>
    )
  }

  public render() {
    const {
      feedbackStore: { feedbacks }
    } = this.props

    const columns = getColumns({
      title: L('ACTIONS'),
      dataIndex: 'operation',
      key: 'operation',
      fixed: align.right,
      align: align.right,
      width: 120,
      render: (text: string, item: any) => (
        <div>
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                {this.isGranted(appPermissions.feedback.update) && (
                  <Menu.Item onClick={() => this.gotoDetail(item.id)}>{L('BTN_EDIT')}</Menu.Item>
                )}
                {this.isGranted(appPermissions.feedback.delete) && (
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

    return (
      <>
        <DataTable
          title={this.L('FEEDBACK_LIST')}
          onCreate={this.gotoDetail}
          pagination={{
            pageSize: this.state.maxResultCount,
            current: this.currentPage,
            total: feedbacks === undefined ? 0 : feedbacks.totalCount,
            onChange: this.handleTableChange
          }}
          createPermission={appPermissions.feedback.create}
          filterComponent={this.renderFilterComponent()}
        >
          <Table
            size="middle"
            className="custom-ant-table"
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            loading={this.props.feedbackStore.isLoading}
            dataSource={feedbacks === undefined ? [] : feedbacks.items}
            scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
          />
        </DataTable>
      </>
    )
  }
}

export default Feedbacks
