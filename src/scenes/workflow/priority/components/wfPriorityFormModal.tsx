import * as React from 'react'

import { Modal, Form, Col, Row } from 'antd'
import { L } from '../../../../lib/abpUtility'
import rules from './validation'
import { modules } from '../../../../lib/appconst'
import AppComponentBase from '../../../../components/AppComponentBase'
import { validateMessages } from '../../../../lib/validation'
import FormCheckbox from '@components/FormItem/FormCheckbox'
import FormSelect from '@components/FormItem/FormSelect'
import { OptionModel } from '@models/global'
import FormInputMultiLanguage from '@components/FormItem/FormInputMultiLanguage'

export interface ICreateOrUpdateWfPriorityProps {
  visible: boolean
  onCancel: () => void
  modalType: string
  onCreate: () => void
  formRef: any
  id?: number
  isLoading: boolean
  moduleId?: number
}

class WfPriorityFormModal extends AppComponentBase<ICreateOrUpdateWfPriorityProps> {
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
              <FormInputMultiLanguage label="WF_PRIORITY_NAME" name="names" rule={rules.names} />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormCheckbox label="WF_PRIORITY_IS_DEFAULT" name="isDefault" />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormCheckbox label="WF_PRIORITY_IS_ACTIVE" name="isActive" />
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

export default WfPriorityFormModal
