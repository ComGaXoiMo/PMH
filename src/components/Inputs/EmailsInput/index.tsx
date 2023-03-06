import React, { useState, useEffect, useRef } from "react";
import Input from "antd/lib/input";
import { IEmailModel, EmailModel } from "../../../models/common/emailModel";
import isEqual from "lodash/isEqual";
import {
  DeleteOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons/lib";
import Button from "antd/es/button";
import { L } from "@lib/abpUtility";
import { Tooltip } from "antd";

interface EmailsInputProps {
  value?: IEmailModel[];
  onChange?: (value: IEmailModel[]) => void;
  maxLength?: number;
  disabledProps?: boolean;
}

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const EmailsInput: React.FC<EmailsInputProps> = ({
  value = [new EmailModel("", true)],
  onChange,
  disabledProps,
}) => {
  const previousValue = usePrevious(value);
  const [currentValue, setCurrentValue] = useState(value);

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

  const onEmailChange = (index, value) => {
    const values = [...currentValue];
    values[index].email = value;
    triggerChange(values);
  };

  const onChangeInvalid = (index) => {
    currentValue.forEach(
      (item, emailIndex) =>
        (item.isInvalid =
          index === emailIndex ? !item.isInvalid : item.isInvalid)
    );
    triggerChange([...currentValue]);
  };

  const onChangePrimary = (index) => {
    currentValue.forEach(
      (item, emailIndex) => (item.isPrimary = index === emailIndex)
    );
    triggerChange([...currentValue]);
  };

  const addEmail = () => {
    triggerChange([...currentValue, new EmailModel("", !currentValue.length)]);
  };

  const deleteEmail = (email, index) => {
    if (!currentValue || !currentValue.length) {
      triggerChange([new EmailModel("", true)]);
      return;
    }

    triggerChange([
      ...currentValue.filter((item, emailIndex) => index !== emailIndex),
    ]);
  };

  const emailActions = (email, index) => (
    <>
      {index === currentValue?.length - 1 && (
        <PlusOutlined className="ml-1" onClick={addEmail} />
      )}
      {email.isInvalid ? (
        <Tooltip placement="topLeft" title={L("INVALID_EMAIL")}>
          <InfoCircleFilled
            className="ml-1"
            onClick={() => onChangeInvalid(index)}
          />
        </Tooltip>
      ) : (
        <Tooltip placement="topLeft" title={L("MARK_AS_INVALID_EMAIL")}>
          <InfoCircleOutlined
            className="ml-1"
            onClick={() => onChangeInvalid(index)}
          />
        </Tooltip>
      )}
      {
        <Tooltip placement="topLeft" title={L("PRIMARY_EMAIL")}>
          {email.isPrimary ? (
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
        disabled={email.isPrimary}
        onClick={() => deleteEmail(email, index)}
      >
        <DeleteOutlined className="ml-1" />
      </Button>
    </>
  );

  return (
    <>
      {(currentValue || []).map((email: any, index) => {
        return (
          <Input
            disabled={disabledProps}
            style={{ width: "100%" }}
            value={email.email}
            key={index}
            className={index > 0 ? "mt-1" : ""}
            suffix={emailActions(email, index)}
            onChange={(e) => onEmailChange(index, e.target.value)}
            onBlur={() => triggerChange(currentValue)}
          />
        );
      })}
      {(!currentValue || !currentValue.length) && (
        <Button type="dashed" block onClick={addEmail}>
          {L("BTN_ADD")}
        </Button>
      )}
    </>
  );
};

export default EmailsInput;
