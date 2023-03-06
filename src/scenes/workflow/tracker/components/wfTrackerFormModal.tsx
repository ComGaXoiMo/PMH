import * as React from 'react'

import { Modal, Form, Col, Row } from 'antd'
import { L } from '../../../../lib/abpUtility'
import rules from './validation'
import { modules } from '../../../../lib/appconst'
import AppComponentBase from '../../../../components/AppComponentBase'
import { validateMessages } from '../../../../lib/validation'
import wfTrackerService from '@services/workflow/wfTrackerService'
import FormInputMultiLanguage from '@components/FormItem/FormInputMultiLanguage'
import FormInput from '@components/FormItem/FormInput'
import FormNumber from '@components/FormItem/FormNumber'
import FormSelect from '@components/FormItem/FormSelect'
import FormTextArea from '@components/FormItem/FormTextArea'
import FormCheckbox from '@components/FormItem/FormCheckbox'
import { OptionModel } from '@models/global'

export interface ICreateOrUpdateWfTrackerProps {
  visible: boolean
  onCancel: () => void
  modalType: string
  onCreate: () => void
  formRef: any
  id?: number
  isLoading: boolean
  moduleId?: number
  parentModuleId?: number
}

class WfTrackerFormModal extends AppComponentBase<ICreateOrUpdateWfTrackerProps> {
  wfModules = OptionModel.assigns(modules)
  state = {
    confirmDirty: false,
    parents: []
  }

  componentDidMount(): void {
    this.getParents('')
  }

  getParents = async (keyword) => {
    if (!this.props.parentModuleId) {
      return
    }
    const data = await wfTrackerService.getAll({ isActive: true, keyword, moduleId: this.props.parentModuleId })
    this.setState({ parents: data })
  }

  render() {
    const { visible, onCancel, onCreate, modalType, parentModuleId } = this.props
    const { parents } = this.state
    return (
      <Modal
        visible={visible}
        cancelText={L('BTN_CANCEL')}
        okText={L('BTN_SAVE')}
        onCancel={onCancel}
        onOk={onCreate}
        title={L(modalType)}
        confirmLoading={this.props.isLoading}
      >
        <Form ref={this.props.formRef} layout={'vertical'} validateMessages={validateMessages} size="large">
          <Row gutter={16}>
            <Col sm={{ span: 24 }}>
              <FormInputMultiLanguage label="WF_TRACKER_NAME" name="names" rule={rules.names} />
            </Col>
            <Col md={{ span: 12 }}>
              <FormInput label="WF_TRACKER_CODE" name="code" rule={rules.code} />
            </Col>
            <Col md={{ span: 12 }}>
              <FormNumber label="WF_TRACKER_ORDER" name="sortNumber" rule={rules.sortNumber} />
            </Col>
            {parentModuleId !== undefined && parentModuleId > 0 && (
              <Col md={{ span: 24 }}>
                <FormSelect label="WF_TRACKER_PARENT" name="parentId" options={parents} />
              </Col>
            )}
            <Col md={{ span: 24 }}>
              <FormTextArea label="WF_TRACKER_DESCRIPTION" name="description" rule={rules.description} />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormCheckbox label="WF_TRACKER_IS_DEFAULT" name="isDefault" />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormCheckbox label="ACTIVE_STATUS" name="isActive" />
            </Col>
          </Row>
          {!this.props.moduleId && (
            <Col sm={{ span: 24, offset: 0 }}>
              <FormSelect
                label="WF_MODULE"
                name="moduleIds"
                options={this.wfModules}
                selectProps={{ mode: 'multiple' }}
              />
            </Col>
          )}
        </Form>
      </Modal>
    )
  }
}

export default WfTrackerFormModal
