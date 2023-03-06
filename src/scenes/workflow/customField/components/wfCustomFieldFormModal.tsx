import * as React from 'react'

import { Modal, Form, Col, Row } from 'antd'
import { L } from '../../../../lib/abpUtility'
import rules from './validation'
import { modules, wfFieldTypes } from '../../../../lib/appconst'
import AppComponentBase from '../../../../components/AppComponentBase'
import { validateMessages } from '../../../../lib/validation'
import FormCheckbox from '@components/FormItem/FormCheckbox'
import FormSelect from '@components/FormItem/FormSelect'
import FormInputMultiLanguage from '@components/FormItem/FormInputMultiLanguage'
import FormInput from '@components/FormItem/FormInput'
import { OptionModel } from '@models/global'

export interface ICreateOrUpdateWfCustomFieldProps {
  visible: boolean
  onCancel: () => void
  modalType: string
  onCreate: () => void
  formRef: any
  initModel?: any
  id?: number
  isLoading: boolean
  moduleId?: number
}

class WfCustomFieldFormModal extends AppComponentBase<ICreateOrUpdateWfCustomFieldProps> {
  wfModules = OptionModel.assigns(modules)
  state = {
    confirmDirty: false,
    fieldTypeId: undefined,
    wfFieldTypes: Object.keys(wfFieldTypes).map((key) => {
      return new OptionModel(wfFieldTypes[key], `WF_FIELD_TYPE_${key.toUpperCase()}`)
    })
  }

  componentDidUpdate(prevProps): void {
    if (!prevProps.visible && this.props.visible && this.props.initModel) {
      this.setState({ fieldTypeId: this.props.initModel.fieldType })
    }
  }

  changeFieldType = (value) => {
    this.setState({ fieldTypeId: value })
  }

  selectFieldTypeProps = {
    onChange: this.changeFieldType
  }

  render() {
    const { visible, onCancel, onCreate, id, formRef } = this.props
    const { fieldTypeId } = this.state
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
        <Form ref={formRef} layout={'vertical'} validateMessages={validateMessages} size="large">
          <Row gutter={[16, 0]}>
            <Col sm={{ span: 24, offset: 0 }}>
              <FormInputMultiLanguage label="WF_CUSTOM_FIELD_NAME" name="names" rule={rules.names} />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormSelect
                label="WF_CUSTOM_FIELD_TYPE"
                name="fieldType"
                rule={rules.fieldType}
                options={this.state.wfFieldTypes}
                selectProps={this.selectFieldTypeProps}
              />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormInput label="WF_CUSTOM_FIELD_POSITION" name="position" />
            </Col>
            {fieldTypeId !== wfFieldTypes.list && fieldTypeId !== wfFieldTypes.dateTime && (
              <Col sm={{ span: 12, offset: 0 }}>
                <FormInput label="WF_CUSTOM_FIELD_MIN_LENGTH" name="minLength" />
              </Col>
            )}
            {fieldTypeId !== wfFieldTypes.list && fieldTypeId !== wfFieldTypes.dateTime && (
              <Col sm={{ span: 12, offset: 0 }}>
                <FormInput label="WF_CUSTOM_FIELD_MAX_LENGTH" name="maxLength" />
              </Col>
            )}
            <Col sm={{ span: 12, offset: 0 }}>
              <FormInput label="WF_CUSTOM_FIELD_REGEXP" name="regexp" />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormInput label="WF_CUSTOM_FIELD_DEFAULT_VALUE" name="defaultValue" />
            </Col>
            {fieldTypeId === wfFieldTypes.list && (
              <Col sm={{ span: 12, offset: 0 }}>
                <FormInput label="WF_CUSTOM_FIELD_POSSIBLE_VALUE" name="possibleValues" rule={rules.possibleValues} />
              </Col>
            )}
            <Col sm={{ span: 12, offset: 0 }}>
              <FormCheckbox label="WF_CUSTOM_FIELD_IS_REQUIRED" name="isRequired" />
            </Col>
            <Col sm={{ span: 12, offset: 0 }}>
              <FormCheckbox label="ACTIVE_STATUS" name="isActive" />
            </Col>
            <Col sm={{ span: 24, offset: 0 }}>
              <FormInputMultiLanguage label="WF_CUSTOM_FIELD_DESCRIPTION" name="descriptions" />
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

export default WfCustomFieldFormModal
