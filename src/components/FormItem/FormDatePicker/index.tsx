import React from 'react'
import { DatePicker, Form } from 'antd'
import { L } from '@lib/abpUtility'
import AppConsts, { dateFormat } from '@lib/appconst'
import { PickerProps } from 'antd/lib/date-picker/generatePicker'
import moment from 'moment-timezone/moment-timezone'

const { formVerticalLayout } = AppConsts
interface FormDatePickerProps {
  label: string
  name: string | string[]
  rule?
  disabled?: boolean
  placeholder?: string
  dateTimeFormat?: string
  dateTimeProps?: PickerProps<moment>
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  name,
  rule,
  disabled,
  placeholder,
  dateTimeFormat = dateFormat,
  dateTimeProps
}) => {
  return (
    <Form.Item label={L(label)} name={name} rules={rule} {...formVerticalLayout}>
      <DatePicker
        className="full-width"
        format={dateTimeFormat}
        placeholder={placeholder ? L(placeholder) : ''}
        disabled={disabled}
        {...dateTimeProps}
      />
    </Form.Item>
  )
}

export default FormDatePicker
