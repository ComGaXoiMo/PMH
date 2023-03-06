import * as React from 'react'

import { Button, Col, Input, Modal, Row, Select, Table } from 'antd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'

import { AppComponentListBase } from '../../../components/AppComponentBase'
import WfTrackerFormModal from './components/wfTrackerFormModal'
import { L, LNotification } from '../../../lib/abpUtility'
import Stores from '../../../stores/storeIdentifier'
import WfTrackerStore from '../../../stores/workflow/wfTrackerStore'
import DataTable from '../../../components/DataTable'
import AppConsts, { appPermissions } from '../../../lib/appconst'
import { CheckOutlined, SortAscendingOutlined } from '@ant-design/icons'
import debounce from 'lodash/debounce'
import getColumns from './columns'
import TrackerSortDrawer from '@components/SortDrawer'

const { align, activeStatus } = AppConsts

export interface IWfTrackerProps {
  history: any
  wfTrackerStore: WfTrackerStore
  moduleId?: number
  parentModuleId?: number
}

export interface IWfTrackerState {
  modalVisible: boolean
  visibleDrawer: boolean
  maxResultCount: number
  skipCount: number
  wfTrackerId: number
  filters: any
}

const confirm = Modal.confirm
const Search = Input.Search

@inject(Stores.WfTrackerStore)
@observer
class WfTracker extends AppComponentListBase<IWfTrackerProps, IWfTrackerState> {
  formRef: any = React.createRef()

  state = {
    modalVisible: false,
    visibleDrawer: false,
    maxResultCount: 10,
    skipCount: 0,
    wfTrackerId: 0,
    filters: { isActive: 'true' }
  }

  get currentPage() {
    return Math.floor(this.state.skipCount / this.state.maxResultCount) + 1
  }

  async componentDidMount() {
    await this.getAll()
  }

  async getAll() {
    await this.props.wfTrackerStore.filter({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      moduleId: this.props.moduleId,
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

  createOrUpdateModalOpen = async (id?) => {
    if (!id) {
      await this.props.wfTrackerStore.createWfTracker()
    } else {
      await this.props.wfTrackerStore.get(id)
    }

    this.setState({ wfTrackerId: id })
    this.Modal()

    this.formRef.current.setFieldsValue({
      ...this.props.wfTrackerStore.editWfTracker
    })
  }

  openOrCloseSortingDrawer = () => {
    let visibleDrawer = !this.state.visibleDrawer
    this.setState({ visibleDrawer }, async () => {
      if (visibleDrawer) {
        await this.props.wfTrackerStore.getAll({ moduleId: this.props.moduleId })
      }
    })
  }

  delete(id, isActive) {
    const self = this
    confirm({
      title: LNotification(isActive ? 'DO_YOU_WANT_TO_ACTIVATE_THIS_ITEM' : 'DO_YOU_WANT_TO_DEACTIVATE_THIS_ITEM'),
      okText: L('BTN_YES'),
      cancelText: L('BTN_NO'),
      onOk: async () => {
        await self.props.wfTrackerStore.activateOrDeactivate(id, isActive)
        self.handleTableChange({ current: 1 })
      },
      onCancel() {
        console.log('BTN_CANCEL')
      }
    })
  }

  handleCreate = () => {
    const form = this.formRef.current

    form.validateFields().then(async (values: any) => {
      if (this.props.moduleId) {
        values.moduleIds = [this.props.moduleId]
      }
      if (!this.props.wfTrackerStore.editWfTracker?.id) {
        await this.props.wfTrackerStore.create(values)
      } else {
        await this.props.wfTrackerStore.update({
          ...this.props.wfTrackerStore.editWfTracker,
          ...values
        })
      }

      await this.getAll()
      this.setState({ modalVisible: false })
      form.resetFields()
    })
  }

  updateOrder = async (ids) => {
    const { wfTrackerStore } = this.props
    return await wfTrackerStore.updateSortList(ids)
  }

  updateSearch = debounce((name, value) => {
    const { filters } = this.state
    this.setState({ filters: { ...filters, [name]: value } })
  }, 100)

  handleSearch = (name, value) => {
    this.setState({ filters: { ...this.state.filters, [name]: value }, skipCount: 0 }, async () => await this.getAll())
  }

  renderFilterComponent = () => {
    const { filters } = this.state
    return (
      <Row gutter={[8, 8]}>
        <Col sm={{ span: 8, offset: 0 }}>
          <Search
            placeholder={this.L('FILTER_KEYWORD')}
            onChange={(value) => this.updateSearch('keyword', value.target?.value)}
            onSearch={(value) => this.handleSearch('keyword', value)}
          />
        </Col>
        <Col md={{ span: 8, offset: 0 }}>
          <Select
            showArrow
            allowClear
            value={filters.isActive}
            onChange={(value) => this.handleSearch('isActive', value)}
            style={{ width: '100%' }}
            placeholder={L('FILTER_ACTIVE_STATUS')}
          >
            {this.renderOptions(activeStatus)}
          </Select>
        </Col>
      </Row>
    )
  }

  renderActionGroups = () => {
    return (
      <>
        {this.isGranted(appPermissions.feedbackType.update) && (
          <Button
            shape="circle"
            className="mr-1"
            onClick={this.openOrCloseSortingDrawer}
            icon={<SortAscendingOutlined />}
          ></Button>
        )}
      </>
    )
  }

  public render() {
    const { wfTrackerPage } = this.props.wfTrackerStore
    let columns = getColumns({
      title: L('ACTIONS'),
      width: 150,
      align: align.right,
      render: (text: string, item: any) => (
        <div>
          {this.isGranted(appPermissions.workflow.update) && (
            <Button
              size="small"
              className="ml-1"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => this.createOrUpdateModalOpen(item.id)}
            />
          )}
          {this.isGranted(appPermissions.workflow.delete) && (
            <Button
              size="small"
              className="ml-1"
              shape="circle"
              icon={item.isActive ? <CloseOutlined /> : <CheckOutlined />}
              onClick={() => this.delete(item.id, !item.isActive)}
            />
          )}
        </div>
      )
    })

    if (this.props.moduleId) {
      columns = columns.filter((item) => item.key !== 'modules')
    }

    return (
      <>
        <DataTable
          title={this.L('WF_TRACKER_LIST')}
          onCreate={() => this.createOrUpdateModalOpen()}
          pagination={{
            pageSize: this.state.maxResultCount,
            current: this.currentPage,
            total: wfTrackerPage === undefined ? 0 : wfTrackerPage.totalCount,
            onChange: this.handleTableChange
          }}
          createPermission={appPermissions.workflow.create}
          filterComponent={this.renderFilterComponent()}
          actionComponent={this.renderActionGroups}
        >
          <Table
            size="middle"
            className="custom-ant-table"
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            loading={this.props.wfTrackerStore.isLoading}
            dataSource={wfTrackerPage === undefined ? [] : wfTrackerPage.items}
          />
        </DataTable>
        <WfTrackerFormModal
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false
            })
          }
          modalType={this.state.wfTrackerId === 0 ? 'EDIT' : 'CREATE'}
          onCreate={this.handleCreate}
          isLoading={this.props.wfTrackerStore.isLoading}
          moduleId={this.props.moduleId}
          parentModuleId={this.props.parentModuleId}
        />
        <TrackerSortDrawer
          visible={this.state.visibleDrawer}
          setVisibleDrawer={this.openOrCloseSortingDrawer}
          data={this.props.wfTrackerStore.wfTrackers}
          handleSave={this.updateOrder}
        />
      </>
    )
  }
}

export default WfTracker
