import * as React from 'react'

import { Button, Col, Input, Modal, Row, Select, Table } from 'antd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'

import { AppComponentListBase } from '../../../components/AppComponentBase'
import WfCustomFieldFormModal from './components/wfCustomFieldFormModal'
import { L, LNotification } from '../../../lib/abpUtility'
import Stores from '../../../stores/storeIdentifier'
import WfCustomFieldStore from '../../../stores/workflow/wfCustomFieldStore'
import DataTable from '../../../components/DataTable'
import AppConsts, { appPermissions } from '../../../lib/appconst'
import { CheckOutlined } from '@ant-design/icons'
import debounce from 'lodash/debounce'
import getColumns from './columns'

const { align, activeStatus } = AppConsts

export interface IWfCustomFieldProps {
  history: any
  wfCustomFieldStore: WfCustomFieldStore
  moduleId?: number
}

export interface IWfCustomFieldState {
  modalVisible: boolean
  maxResultCount: number
  skipCount: number
  wfCustomFieldId: number
  filters: any
}

const confirm = Modal.confirm
const Search = Input.Search

@inject(Stores.WfCustomFieldStore)
@observer
class WfCustomField extends AppComponentListBase<IWfCustomFieldProps, IWfCustomFieldState> {
  formRef: any = React.createRef()

  state = {
    modalVisible: false,
    maxResultCount: 10,
    skipCount: 0,
    wfCustomFieldId: 0,
    filters: { isActive: 'true' }
  }

  get currentPage() {
    return Math.floor(this.state.skipCount / this.state.maxResultCount) + 1
  }

  async componentDidMount() {
    await this.getAll()
  }

  async getAll() {
    await this.props.wfCustomFieldStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      ModuleId: this.props.moduleId,
      ...this.state.filters
    })
  }

  handleTableChange = (pagination: any) => {
    this.setState({ skipCount: (pagination.current - 1) * this.state.maxResultCount! }, async () => await this.getAll())
  }

  Modal = () => {
    const modalVisible = !this.state.modalVisible
    this.setState({ modalVisible })
    if (!modalVisible) {
      this.formRef.current.resetFields()
    }
  }

  createOrUpdateModalOpen = async (id?) => {
    if (!id) {
      await this.props.wfCustomFieldStore.createWfCustomField()
    } else {
      await this.props.wfCustomFieldStore.get(id)
    }

    this.setState({ wfCustomFieldId: id })
    this.Modal()
    this.formRef.current.setFieldsValue({
      ...this.props.wfCustomFieldStore.editWfCustomField
    })
  }

  delete(id, isActive) {
    const self = this
    confirm({
      title: LNotification(isActive ? 'DO_YOU_WANT_TO_ACTIVATE_THIS_ITEM' : 'DO_YOU_WANT_TO_DEACTIVATE_THIS_ITEM'),
      okText: L('BTN_YES'),
      cancelText: L('BTN_NO'),
      onOk: async () => {
        await self.props.wfCustomFieldStore.activateOrDeactivate(id, isActive)
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
      if (!this.props.wfCustomFieldStore.editWfCustomField?.id) {
        await this.props.wfCustomFieldStore.create(values)
      } else {
        await this.props.wfCustomFieldStore.update({
          ...this.props.wfCustomFieldStore.editWfCustomField,
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
    this.setState({ filters: { ...this.state.filters, [name]: value }, skipCount: 0 }, async () => await this.getAll())
  }

  renderFilterComponent = () => {
    const { filters } = this.state
    return (
      <Row gutter={[8, 8]}>
        <Col sm={{ span: 8, offset: 0 }}>
          <Search
            placeholder={this.L('WF_CUSTOM_FIELD_NAME')}
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

  public render() {
    const { wfCustomField } = this.props.wfCustomFieldStore
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
          title={this.L('WF_CUSTOM_FIELD_LIST')}
          onCreate={() => this.createOrUpdateModalOpen()}
          pagination={{
            pageSize: this.state.maxResultCount,
            current: this.currentPage,
            total: wfCustomField === undefined ? 0 : wfCustomField.totalCount,
            onChange: this.handleTableChange
          }}
          createPermission={appPermissions.workflow.create}
          filterComponent={this.renderFilterComponent()}
        >
          <Table
            size="middle"
            className="custom-ant-table"
            rowKey={(record) => record.id.toString()}
            columns={columns}
            pagination={false}
            loading={this.props.wfCustomFieldStore.isLoading}
            dataSource={wfCustomField === undefined ? [] : wfCustomField.items}
          />
        </DataTable>
        <WfCustomFieldFormModal
          formRef={this.formRef}
          visible={this.state.modalVisible}
          onCancel={this.Modal}
          initModel={this.props.wfCustomFieldStore.editWfCustomField}
          modalType={this.state.wfCustomFieldId === 0 ? 'edit' : 'create'}
          onCreate={this.handleCreate}
          isLoading={this.props.wfCustomFieldStore.isLoading}
          id={this.props.wfCustomFieldStore.editWfCustomField?.id}
          moduleId={this.props.moduleId}
        />
      </>
    )
  }
}

export default WfCustomField
