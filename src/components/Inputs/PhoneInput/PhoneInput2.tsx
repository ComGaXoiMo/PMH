import React, { useState, useEffect, useRef } from "react";
import { Input, Select, Tooltip } from "antd";
import { IPhoneModel, PhoneModel } from "../../../models/common/phoneModel";
import isEqual from "lodash/isEqual";
import {
  DeleteOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons/lib";
import { filterOptions, renderOptions } from "@lib/helper";
import Button from "antd/es/button";
import { L } from "@lib/abpUtility";
const { Option } = Select;

interface PhonesInputProps {
  value?: IPhoneModel[];
  onChange?: (value: IPhoneModel[]) => void;
  maxLength?: number;
  phoneTypes?: any[];
  countries?: any[];
  disableProps?: boolean;
}

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const defaultValue = {
  phoneType: 2, // Mobile
  countryId: 232, // Viet Nam
};

const PhonesInput2: React.FC<PhonesInputProps> = ({
  value = [
    new PhoneModel("", defaultValue.countryId, defaultValue.phoneType, true),
  ],
  onChange,
  phoneTypes,
  countries,
  disableProps,
}) => {
  const previousValue = usePrevious(value);
  const [currentValue, setCurrentValue] = useState(
    value?.length
      ? value
      : [
          new PhoneModel(
            "",
            defaultValue.countryId,
            defaultValue.phoneType,
            true
          ),
        ]
  );

  useEffect(() => {
    if (previousValue && !isEqual(previousValue, value)) {
      setCurrentValue(value);
    }
  }, [value]);

  const triggerChange = (value) => {
    setCurrentValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const onPhoneChange = (index, value) => {
    const values = [...currentValue];
    values[index].phone = value;
    triggerChange(values);
  };

  const onPhoneTypeChange = (index, value) => {
    const values = [...currentValue];
    values[index].phoneTypeId = value;
    triggerChange(values);
  };

  const onCountryCodeChange = (index, value) => {
    const values = [...currentValue];
    values[index].countryId = value;
    triggerChange(values);
  };

  const onChangePrimary = (index) => {
    currentValue.forEach(
      (item, phoneIndex) => (item.isPrimary = index === phoneIndex)
    );
    triggerChange([...currentValue]);
  };

  const addPhone = () => {
    triggerChange([
      ...currentValue,
      new PhoneModel(
        "",
        defaultValue.countryId,
        defaultValue.phoneType,
        !currentValue.length
      ),
    ]);
  };

  const deletePhone = (phone, index) => {
    if (!currentValue || !currentValue.length) {
      triggerChange([new PhoneModel()]);
      return;
    }
    triggerChange([
      ...currentValue.filter((item, phoneIndex) => index !== phoneIndex),
    ]);
  };

  const phoneActions = (phone, index) => (
    <>
      {index === currentValue?.length - 1 && (
        <PlusOutlined className="ml-1" onClick={addPhone} />
      )}
      {
        <Tooltip placement="topLeft" title={L("PRIMARY_PHONE")}>
          {phone.isPrimary ? (
            <StarFilled className="ml-1" />
          ) : (
            <StarOutlined
              className="ml-1"
              onClick={() => onChangePrimary(index)}
            />
          )}
        </Tooltip>
      }
      <Button
        type="text"
        size="small"
        className="icon-button"
        disabled={phone.isPrimary}
        onClick={() => deletePhone(phone, index)}
      >
        <DeleteOutlined className="ml-1" />
      </Button>
    </>
  );
  return (
    <>
      {(currentValue || []).map((phone: any, index) => {
        return (
          <Input.Group
            compact
            key={index}
            className="mb-1 d-flex justify-content-between w-100"
          >
            <Select
              style={{ width: "19%" }}
              value={phone.phoneTypeId}
              defaultValue={defaultValue.phoneType}
              onChange={(value) => onPhoneTypeChange(index, value)}
            >
              {renderOptions(phoneTypes)}
            </Select>
            <Select
              style={{ width: "29%" }}
              value={phone.countryId}
              defaultValue={defaultValue.countryId}
              onChange={(value) => onCountryCodeChange(index, value)}
              showSearch
              filterOption={filterOptions}
            >
              {(countries || []).map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.phoneCodeName}
                </Option>
              ))}
            </Select>
            <Input
              disabled={disableProps}
              style={{ width: "49%" }}
              value={phone.phone}
              suffix={phoneActions(phone, index)}
              onChange={(e) => onPhoneChange(index, e.target.value)}
              onBlur={() => triggerChange(currentValue)}
            />
          </Input.Group>
        );
      })}
      {(!currentValue || !currentValue.length) && (
        <Button type="dashed" block onClick={addPhone}>
          {L("BTN_ADD")}
        </Button>
      )}
    </>
  );
};

export default PhonesInput2;
