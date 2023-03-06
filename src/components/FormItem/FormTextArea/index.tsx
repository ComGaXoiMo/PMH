import React from 'react'
import { Form, Input } from 'antd'
import { L } from '@lib/abpUtility'
import AppConsts from '@lib/appconst'

const { formVerticalLayout } = AppConsts
interface FormTextAreaProps {
  label: string
  name: string
  rule?
  rows?: number
}

const FormTextArea: React.FC<FormTextAreaProps> = ({ label, name, rule, rows }) => {
  return (
    <Form.Item label={L(label)} name={name} rules={rule} {...formVerticalLayout}>
      <Input.TextArea rows={rows || 3} />
    </Form.Item>
  )
}

export default FormTextArea
