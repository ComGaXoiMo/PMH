import * as React from 'react'

import { Col, Input, Modal, Row, Select, Table } from 'antd'
import { inject, observer } from 'mobx-react'

import { AppComponentListBase } from '@components/AppComponentBase'
import AnnouncementFormModal from './components/announcementFormModal'
import { L, LNotification } from '@lib/abpUtility'
import Stores from '../../../stores/storeIdentifier'
import AnnouncementStore from '../../../stores/communication/announcementStore'
import DataTable from '../../../components/DataTable'
import AppConsts, { appPermissions } from '../../../lib/appconst'
import debounce from 'lodash/debounce'
import getColumns from './columns'
import ExpenseMandateStore from '@stores/finance/expenseMandateStore'
import FinanceStore from '@stores/finance/financeStore'
import FileStore from '@stores/common/fileStore'

const { activeStatus } = AppConsts

export interface IAnnouncementProps {
  history: any
  announcementStore: AnnouncementStore
  expenseMandateStore: ExpenseMandateStore
  financeStore: FinanceStore
  fileStore: FileStore
}

export interface IAnnouncementState {
  visible: boolean
  visibleExpenseMandateModal: boolean
  expenseMandateData: any
  maxResultCount: number
  skipCount: number
  announcementId: number
  selectedIds: number[]
  filters: any
}

const Search = Input.Search

@inject(Stores.AnnouncementStore, Stores.ExpenseMandateStore, Stores.FinanceStore, Stores.FileStore)
@observer
class AnnouncementScreen extends AppComponentListBase<IAnnouncementProps, IAnnouncementState> {
  state = {
    visible: false,
    visibleExpenseMandateModal: false,
    expenseMandateData: {},
    maxResultCount: 10,
    skipCount: 0,
    announcementId: 0,
    selectedIds: [],
    filters: { isActive: 'true', keyword: '' }
  }

  get currentPage() {
    return Math.floor(this.state.skipCount / this.state.maxResultCount) + 1
  }

  async componentDidMount() {
    await Promise.all([this.getAll(),
      this.props.financeStore.getPaymentChannels(),
      this.props.announcementStore.getAnnouncementTypes()])
  }

  async getAll() {
    await this.props.announcementStore.filter({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      ...this.state.filters
    })
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll())
  }

  openOrCloseModal = async (id?) => {
    if (!id) {
      await this.props.announcementStore.createAnnouncement()
    } else {
      await this.props.announcementStore.get(id)
    }

    this.setState({ announcementId: id, visible: !this.state.visible })
  }

  activateOrDeactivate = (ids, isActive: boolean) => {
    const { announcementStore } = this.props
    Modal.confirm({
      title: LNotification(isActive ? 'DO_YOU_WANT_TO_ACTIVATE_THIS_ITEM' : 'DO_YOU_WANT_TO_DEACTIVATE_THIS_ITEM'),
      okText: this.L('BTN_YES'),
      cancelText: this.L('BTN_NO'),
      onOk: async () => {
        await announcementStore.activateOrDeactivate(ids, isActive)
        await this.handleSearch('keyword', this.state.filters.keyword)
        this.setState({ selectedIds: [] })
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  updateSearch = debounce((name, value) => {
    const { filters } = this.state
    this.setState({ filters: { ...filters, [name]: value } })
  }, 100)

  handleSearch = (name, value) => {
    const { filters } = this.state
    this.setState({ filters: { ...filters, [name]: value }, skipCount: 0 }, async () => {
      await this.getAll()
    })
  }

  renderFilterComponent = () => {
    const { filters } = this.state
    const keywordPlaceHolder = `${this.L('ANNOUNCEMENT_SUBJECT')}`
    const {announcementTypes} = this.props.announcementStore

    return (
      <Row gutter={[8, 8]}>
        <Col sm={{ span: 8, offset: 0 }}>
          <Search
            placeholder={keywordPlaceHolder}
            onChange={(value) => this.updateSearch('keyword', value.target?.value)}
            onSearch={(value) => this.handleSearch('keyword', value)}
          />
        </Col>
        <Col md={{ span: 8, offset: 0 }}>
          <Select
            showArrow
            allowClear
            onChange={(value) => this.handleSearch('typeId', value)}
            style={{ width: '100%' }}
            placeholder={L('ANNOUNCEMENT_TYPE')}
          >
            {this.renderOptions(announcementTypes)}
          </Select>
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
      </Row>
    )
  }

  public render() {
    const { pagedData } = this.props.announcementStore
    const columns = getColumns(this.openOrCloseModal, this.activateOrDeactivate)

    return (
      <>
        <DataTable
          title={this.L('ANNOUNCEMENT_LIST')}
          onCreate={() => this.openOrCloseModal()}
          pagination={{
            pageSize: this.state.maxResultCount,
            current: this.currentPage,
            total: pagedData === undefined ? 0 : pagedData.totalCount,
            onChange: this.handleTableChange
          }}
          createPermission={appPermissions.announcement.create}
          filterComponent={this.renderFilterComponent()}
        >
          <Table
            size="middle"
            className="custom-ant-table"
            rowKey={(record) => record.id || 0}
            columns={columns}
            pagination={false}
            loading={this.props.announcementStore.isLoading}
            dataSource={pagedData === undefined ? [] : pagedData.items}
            onChange={this.handleTableChange}
            scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
          />
        </DataTable>
        <AnnouncementFormModal
          visible={this.state.visible}
          announcementStore={this.props.announcementStore}
          fileStore={this.props.fileStore}
          handleOK={this.handleSearch}
          handleCancel={this.openOrCloseModal}
          data={this.props.announcementStore.editAnnouncement}
        />
      </>
    )
  }
}

export default AnnouncementScreen
