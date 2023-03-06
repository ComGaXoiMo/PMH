import React, { useEffect, useState } from "react";
import CKEditor from "ckeditor4-react";
import isEqual from "lodash/isEqual";
import { ckeditorToolbar } from "@lib/appconst";
import debounce from "lodash/debounce";
import { usePrevious } from "@lib/appconst";

interface CKEditorInputProps {
  value?: string;
  onChange?: (value) => void;
}

const CKEditorInput: React.FC<CKEditorInputProps> = ({ value, onChange }) => {
  const previousValue = usePrevious(value);
  const [currentValue, setCurrentValue] = useState(value || "");

  useEffect(() => {
    if (!isEqual(previousValue, value)) {
      setCurrentValue(value || "");
    }
  }, [value]);

  const triggerChange = (value?) => {
    if (onChange) {
      onChange(value || currentValue);
    }
  };

  const onTextChange = debounce((event) => {
    setCurrentValue(event.editor.getData());

    triggerChange(event.editor.getData());
  }, 200);

  return (
    <CKEditor
      config={{
        language: abp.localization?.currentLanguage?.name || "en",
        ...ckeditorToolbar,
      }}
      data={currentValue || ""}
      onChange={onTextChange}
      onBlur={triggerChange}
    />
  );
};

export default CKEditorInput;
