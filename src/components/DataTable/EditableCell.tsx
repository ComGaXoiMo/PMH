import * as React from "react";
import { InputNumber, Form, Checkbox, Input } from "antd";
import appConsts, { dateFormat } from "@lib/appconst";
import { IRowDealPayment } from "@models/dealContract/dealPaymentRowModel";
import DatePicker from "antd/lib/date-picker";
import CurrencyInput from "@components/Inputs/CurrencyInput";
import Select from "antd/lib/select";
import PercentInput from "@components/Inputs/PercentInput";
import TextArea from "antd/lib/input/TextArea";
const { formHorizontalLayout } = appConsts;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType:
    | "number"
    | "percent"
    | "checkbox"
    | "text"
    | "date"
    | "currency"
    | "select"
    | "textarea";
  record: IRowDealPayment;
  index: number;
  children: React.ReactNode;
  options: any[];
  required: boolean;
  onBlur?: (value) => void;
  locale?: string;
  symbol?: string;
}

export const buildEditableCell = (
  record,
  inputType,
  dataIndex,
  title,
  isEditing,
  options?,
  required?,
  onBlur?,
  locale?,
  symbol?
) => ({
  record,
  inputType,
  dataIndex,
  title,
  editing: isEditing(record),
  options,
  required,
  onBlur,
  locale,
  symbol,
});

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  options,
  required,
  onBlur,
  locale,
  symbol,
  ...restProps
}) => {
  let inputNode;
  switch (inputType) {
    case "number": {
      inputNode = <InputNumber className="full-width" />;
      break;
    }
    case "percent": {
      inputNode = <PercentInput onChange={onBlur} />;
      break;
    }
    case "checkbox": {
      inputNode = (
        <Checkbox onChange={onBlur} defaultChecked={record[dataIndex]} />
      );
      break;
    }
    case "currency": {
      inputNode = <CurrencyInput locale={locale} symbol={symbol} />;
      break;
    }
    case "date": {
      inputNode = <DatePicker format={dateFormat} />;
      break;
    }
    case "textarea": {
      inputNode = <TextArea autoSize={{ maxRows: 5 }} />;
      break;
    }
    case "select": {
      inputNode = (
        <Select className="full-width">
          {(options || []).map((option, index) => (
            <Select.Option key={index} value={option.value || option.id}>
              {option.label || option.name}
            </Select.Option>
          ))}
        </Select>
      );
      break;
    }
    default: {
      inputNode = <Input />;
    }
  }

  return (
    <td {...restProps}>
      {editing ? (
        inputType === "checkbox" ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required }]}
            label={title}
            valuePropName="checked"
            {...formHorizontalLayout}
          >
            <div>{inputNode}</div>
          </Form.Item>
        ) : (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required }]}
            label={title}
            {...formHorizontalLayout}
          >
            {inputNode}
          </Form.Item>
        )
      ) : (
        children
      )}
    </td>
  );
};
