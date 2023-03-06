import React, { useEffect, useState } from "react";
// import "./index.less";
import { L } from "@lib/abpUtility";
import Select from "antd/lib/select";
import debounce from "lodash/debounce";
import { usePrevious } from "@lib/appconst";
import isEqual from "lodash/isEqual";
import Axios from "axios";

const { Option } = Select;

interface IPlaceAutocompletedProps {
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  country?: string;
  // retrieveLevel: AdministrativeLevel;
  initLabel?: string;
  disabled?: boolean;
}

const PlaceAutocompleteWithGoong: React.FC<IPlaceAutocompletedProps> = ({
  onChange,
  placeholder,
  country = "vn",
  initLabel,
  disabled = false,
}) => {
  const goongAutocompleteKey = "PfYloCliA9FQUzua9XSDa2VXJ1F5Du16G6S6DaM9"; // key autocomplete
  const previousValue = usePrevious(initLabel);
  const [placePredictions, setPlacePredictions] = React.useState<any[]>([]);

  const [textValue, setTextValue] = useState(initLabel);

  const getPlacePredictions = async (keyword) => {
    const result = await Axios.get(
      "https://rsapi.goong.io/Place/AutoComplete",
      {
        params: {
          api_key: goongAutocompleteKey,
          input: keyword,
          more_compound: true,
        },
      }
    );
    if (result.data.predictions) {
      const returnData = result.data.predictions.filter(
        (item) => item.compound.district && item.compound.province
      );
      return returnData;
    } else {
      return [];
    }
  };

  const getPlaceDetail = async (place_id) => {
    const result = await Axios.get("https://rsapi.goong.io/Place/Detail", {
      params: {
        api_key: goongAutocompleteKey,
        place_id,
      },
    });
    return result.data.result;
  };
  useEffect(() => {
    if (!isEqual(previousValue, initLabel)) {
      setTextValue(initLabel);
    }
  }, [initLabel]);

  const handleSearch = debounce(async (keyword) => {
    // getPlacePredictions({ input: keyword })
    const data = await getPlacePredictions(keyword);
    setPlacePredictions(data);
  }, 400);

  const changeCurrentValue = async (placeId) => {
    if (placeId && placeId.length) {
      // placesService.getDetails({ placeId }, retrievePlaceInfo)
      getDetail(placeId);
    } else {
      onChange && onChange(undefined);
    }
  };

  const getDetail = async (placeId) => {
    const placeDetail = placePredictions.find(
      (item) => item.place_id === placeId
    ); //
    retrievePlaceInfo(placeDetail, placeId);
  };

  const retrievePlaceInfo = async (placeDetail, placeId) => {
    const placeDetailById = await getPlaceDetail(placeId);
    const combinedValue = {
      address: placeDetail.description,
      latitude: placeDetailById.geometry.location.lat.toFixed(5),
      longitude: placeDetailById.geometry.location.lng.toFixed(5),
    };
    onChange && onChange(combinedValue);
    if (combinedValue) {
      setTextValue(combinedValue.address);
    }
  };

  const onClear = () => {
    setTextValue("");
  };

  return (
    <Select
      allowClear
      showSearch
      placeholder={placeholder ? L(placeholder) : ""}
      onSearch={handleSearch}
      // loading={isPlacePredictionsLoading}
      disabled={disabled}
      onChange={changeCurrentValue}
      onClear={onClear}
      filterOption={false}
      value={textValue}
      className="w-100"
    >
      {(placePredictions || []).map((item: any, index) => (
        <Option key={index} value={item.place_id}>
          {item.description}
        </Option>
      ))}
    </Select>
  );
};

export default PlaceAutocompleteWithGoong;
