import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Input, Select, Tooltip } from "antd";
import { AddressModel, IAddressModel } from "@models/common/addressModel";
import isEqual from "lodash/isEqual";
import {
  DeleteOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons/lib";
import Col from "antd/lib/grid/col";
import { L } from "@lib/abpUtility";
import { filterOptions, renderOptions } from "@lib/helper";
import Row from "antd/lib/grid/row";
import appDataService from "@services/appDataService";
import Button from "antd/es/button";

interface AddressInputMultiProps {
  value?: IAddressModel[];
  onChange?: (value: IAddressModel[]) => void;
  countries?: any[];
  configOption?: {
    showProvince: boolean;
    showDistrict: boolean;
    showWard: boolean;
  };
  colSpan?: number;
  rowGutter?: any;
}

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const AddressInputMulti: React.FC<AddressInputMultiProps> = ({
  value = [],
  onChange,
  countries,
  colSpan = { span: 24, offset: 0 },
  rowGutter = [16, 8],
  configOption = {
    showProvince: true,
    showDistrict: true,
    showWard: true,
  },
}) => {
  const previousValue = usePrevious(value);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (previousValue && !isEqual(previousValue, value)) {
      setCurrentValue(value);
    }
    if (!value) {
      setCurrentValue([new AddressModel()]);
    }
  }, [value]);

  useEffect(() => {
    if (previousValue && !isEqual(previousValue, currentValue)) {
      triggerChange();
    }
  }, [currentValue]);

  const triggerChange = () => {
    if (onChange) {
      onChange(currentValue);
    }
  };

  const handleChange = (index, updateItem) => {
    if (currentValue && index < currentValue.length) {
      currentValue[index] = updateItem;
      triggerChange();
    }
  };

  const onChangePrimary = (index) => {
    currentValue.forEach(
      (item, addressIndex) => (item.isPrimary = index === addressIndex)
    );
    setCurrentValue([...currentValue]);
    triggerChange();
  };

  const addAddress = () => {
    setCurrentValue([
      ...currentValue,
      new AddressModel(null, null, null, null, !currentValue.length),
    ]);
  };

  const deleteAddress = (address, index) => {
    if (currentValue && currentValue.length === 1) {
      setCurrentValue([new AddressModel()]);
      return;
    }
    setCurrentValue([
      ...currentValue.filter((item, addressIndex) => index !== addressIndex),
    ]);
  };

  const addressActions = (item, index) => (
    <>
      {index === currentValue?.length - 1 && (
        <PlusOutlined className="ml-1" onClick={addAddress} />
      )}
      {
        <Tooltip placement="topLeft" title={L("PRIMARY_ADDRESS")}>
          {item.isPrimary ? (
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
        disabled={item.isPrimary}
        onClick={() => deleteAddress(item, index)}
      >
        <DeleteOutlined className="ml-1" />
      </Button>
    </>
  );

  return (
    <>
      {(currentValue || []).map((address: any, index) => {
        return (
          <AddressInput
            value={address}
            addressActions={() => addressActions(address, index)}
            onChange={(updateValue) => handleChange(index, updateValue)}
            countries={countries}
            configOption={configOption}
            rowGutter={rowGutter}
            key={index}
          />
        );
      })}
      {(!currentValue || !currentValue.length) && (
        <Button type="dashed" block onClick={addAddress}>
          {L("BTN_ADD")}
        </Button>
      )}
    </>
  );
};

interface AddressInput2Props {
  value: IAddressModel;
  onChange?: (value: IAddressModel) => void;
  countries?: any[];
  configOption?: {
    showProvince: boolean;
    showDistrict: boolean;
    showWard: boolean;
  };
  colSpan?: number;
  rowGutter?: any;
  addressActions: () => ReactNode;
}

const AddressInput: React.FC<AddressInput2Props> = ({
  value,
  onChange,
  countries,
  rowGutter = [16, 8],
  configOption = {
    showProvince: true,
    showDistrict: true,
    showWard: true,
  },
  addressActions,
}) => {
  const previousValue = usePrevious(value);
  const [currentValue, setCurrentValue] = useState(value);
  const [provinces, setProvinces] = useState([] as any);
  const [districts, setDistricts] = useState([] as any);
  let inputRef = React.createRef() as any;
  useEffect(() => {
    if (!isEqual(previousValue, value)) {
      setCurrentValue(value);
      if (inputRef && inputRef.current) {
        inputRef.current.value = value.address || "";
      }
      if (value.countryId) {
        initProvinces(value.countryId);
      }
      if (value.provinceId) {
        initDistrict(value.provinceId);
      }
    }
  }, [value]);

  if (countries) {
    let vncountry = countries.filter((country) => country.countryCode === "VN");
    countries.splice(countries.indexOf(vncountry[0]), 1);
    countries.splice(0, 0, vncountry[0]);
  }

  const triggerChange = (updatedValue) => {
    setCurrentValue(updatedValue);
    if (onChange) {
      onChange(updatedValue);
    }
  };

  const onAddressChange = (e) => {
    currentValue.address = e.target.value;
    triggerChange(currentValue);
  };

  // const updateAddress = () => {
  //   triggerChange(currentValue);
  // };

  const changeCountry = async (countryId) => {
    let updatedValue = {
      ...currentValue,
      countryId,
      provinceId: undefined,
      districtId: undefined,
    };
    if (configOption.showProvince) {
      initProvinces(countryId);
    }
    triggerChange(updatedValue);
  };

  const initProvinces = async (countryId) => {
    const data = countryId ? await appDataService.getProvinces(countryId) : [];
    setProvinces(data);
  };

  const changeProvince = async (provinceId) => {
    let updatedValue = { ...currentValue, provinceId, districtId: undefined };
    if (configOption.showDistrict) {
      initDistrict(provinceId);
    }
    triggerChange(updatedValue);
  };

  const initDistrict = async (provinceId) => {
    const data = provinceId
      ? await appDataService.getDistricts(provinceId)
      : [];
    setDistricts(data);
  };

  const changeDistrict = async (districtId) => {
    let updatedValue = { ...currentValue, districtId };
    triggerChange(updatedValue);
  };
  return (
    <Row gutter={rowGutter}>
      <Col sm={{ span: 24, offset: 0 }}>
        <Input
          style={{ width: "100%" }}
          suffix={addressActions()}
          // value={currentValue.address}
          defaultValue={currentValue.address}
          onChange={onAddressChange}
          // onBlur={updateAddress}
          // ref={inputRef}
        />
      </Col>
      <Col sm={{ span: 24, offset: 0 }}>
        <Select
          style={{ width: "100%" }}
          allowClear
          value={currentValue.countryId}
          showSearch
          filterOption={filterOptions}
          onChange={changeCountry}
          placeholder={L("COUNTRY")}
        >
          {renderOptions(countries)}
        </Select>
      </Col>
      {configOption.showProvince && (
        <Col sm={{ span: 24, offset: 0 }}>
          <Select
            style={{ width: "100%" }}
            allowClear
            value={currentValue.provinceId}
            showSearch
            filterOption={filterOptions}
            onChange={changeProvince}
            placeholder={L("PROVINCE")}
          >
            {renderOptions(provinces)}
          </Select>
        </Col>
      )}
      {configOption.showDistrict && (
        <Col sm={{ span: 24, offset: 0 }}>
          <Select
            style={{ width: "100%" }}
            allowClear
            value={currentValue.districtId}
            showSearch
            filterOption={filterOptions}
            onChange={changeDistrict}
            placeholder={L("DISTRICT")}
          >
            {renderOptions(districts)}
          </Select>
        </Col>
      )}
    </Row>
  );
};

export default AddressInputMulti;
