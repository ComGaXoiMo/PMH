import * as React from 'react'

import { Modal, Form, Row, Col } from 'antd'
import { L } from '../../../../lib/abpUtility'
import rules from './validation'
import { modules } from '../../../../lib/appconst'
import AppComponentBase from '../../../../components/AppComponentBase'
import { validateMessages } from '../../../../lib/validation'
import FormCheckbox from '@components/FormItem/FormCheckbox'
import FormSelect from '@components/FormItem/FormSelect'
import { OptionModel } from '@models/global'
import FormInputMultiLanguage from '@components/FormItem/FormInputMultiLanguage'
import FormInput from '@components/FormItem/FormInput'

export interface ICreateOrUpdateWfStatusProps {
  visible: boolean
  onCancel: () => void
  modalType: string
  onCreate: () => void
  formRef: any
  id?: number
  isLoading: boolean
  moduleId?: number
}

class WfStatusFormModal extends AppComponentBase<ICreateOrUpdateWfStatusProps> {
  wfModules = OptionModel.assigns(modules)
  state = {
    confirmDirty: false
  }

  render() {
    const { visible, onCancel, onCreate, id } = this.props
    return (
      <Modal
        visible={visible}
        cancelText={L('BTN_CANCEL')}
        okText={L('BTN_SAVE')}
        onCancel={onCancel}
        onOk={onCreate}
        title={L(id ? 'EDIT' : 'CREATE')}
        confirmLoading={this.props.isLoading}
      >
        <Form ref={this.props.formRef} layout={'vertical'} validateMessages={validateMessages} size="large">
          <Row gutter={[16, 0]}>
            <Col sm={{ span: 24, offset: 0 }}>
              <FormInputMultiLanguage label="WF_STATUS_NAME" name="names" rule={rules.names} />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormInput label="WF_STATUS_COLOR_CODE" name="colorCode" rule={rules.colorCode} />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormInput label="WF_STATUS_BORDER_COLOR_CODE" name="borderColorCode" rule={rules.borderColorCode} />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormCheckbox label="WF_STATUS_IS_DEFAULT" name="isDefault" />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormCheckbox label="WF_STATUS_IS_CLOSED_ISSUE" name="isIssueClosed" />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormCheckbox label="ACTIVE_STATUS" name="isActive" />
            </Col>
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
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default WfStatusFormModal
