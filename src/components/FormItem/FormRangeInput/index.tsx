import React from "react";
import { Col, Form, Input, InputNumber, Row } from "antd";
import { L } from "@lib/abpUtility";
import AppConsts from "@lib/appconst";
import CurrencyInput from "@components/Inputs/CurrencyInput";

const { formVerticalLayout } = AppConsts;
interface FormInputProps {
  label: string;
  name: string | string[];
  seccondName: string | string[];
  rule?;
  disabled?: boolean;
  isCurrency?: boolean;
}

const FormRangeInput: React.FC<FormInputProps> = ({
  label,
  name,
  rule,
  disabled,
  seccondName,
  isCurrency,
}) => {
  return (
    <Input.Group size="large">
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label={L(label)}
            name={name}
            rules={rule}
            {...formVerticalLayout}
          >
            {isCurrency ? (
              <CurrencyInput disabled={disabled} min={0} />
            ) : (
              <InputNumber disabled={disabled} className="w-100" />
            )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            style={{ marginTop: 40 }}
            name={seccondName}
            rules={rule}
            {...formVerticalLayout}
          >
            {isCurrency ? (
              <CurrencyInput disabled={disabled} min={0} />
            ) : (
              <InputNumber disabled={disabled} className="w-100" />
            )}
          </Form.Item>
        </Col>
      </Row>
    </Input.Group>
  );
};

export default FormRangeInput;
