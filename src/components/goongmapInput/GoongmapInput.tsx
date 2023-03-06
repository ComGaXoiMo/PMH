import { L } from "@lib/abpUtility";
import AppConsts from "@lib/appconst";
import { filterOptions, renderOptions } from "@lib/helper";
import appDataService from "@services/appDataService";
import { Col, Form, Row, Select } from "antd";
import React from "react";
import PlaceAutocompleteWithGoong from "./PlaceAutocompleteWithGoong";
const { formVerticalLayout } = AppConsts;

type Props = {
  unitAddress?: any;
  // formAddress: any;
};
declare var goongjs: any;

const GoongmapInput = (props: Props) => {
  const [initLabel, setInitLabel] = React.useState("");
  const [district, setDistrict] = React.useState<any[]>([]);
  const [province, setProvince] = React.useState<any[]>([]);

  const goongMapKey = "v2cU3WJ6KAzUJovMVtMeDgn88bsBtkiZERiRYB3w"; //key map
  const [geoCode, setGeoCode] = React.useState<any>([106.70071, 10.79228]);
  const [map, setMap] = React.useState<any>(undefined);
  // Add the control to the map.
  React.useEffect(() => {
    if (!map && goongjs) {
      initMap();
    }
  }, [map, goongjs]);
  React.useEffect(() => {
    let marker;
    if (map && goongjs) {
      marker = new goongjs.Marker().setLngLat(geoCode).addTo(map);
      map.flyTo({
        center: geoCode,
        zoom: 14,
        bearing: 0,
        speed: 1.5, // make the flying slow
        curve: 1, // change the speed at which it zooms out
        easing: function (t) {
          return t;
        },
        essential: true,
      });
    }
    return () => {
      marker && marker.remove();
    };
  }, [geoCode]);
  const initMap = async () => {
    goongjs.accessToken = goongMapKey;
    let map = await new goongjs.Map({
      container: "map", // container id
      style: "https://tiles.goong.io/assets/goong_map_web.json", // stylesheet location
      center: geoCode,
      zoom: 14, // starting zoom
    });
    setMap(map);
  };
  React.useEffect(() => {
    appDataService
      .getProvinces(232)
      .then((provinces) => setProvince(provinces));
  }, []);

  const getDistrict = async (provinceId) => {
    let districts = await appDataService.getDistricts(provinceId);
    setDistrict(districts);
  };
  const changeProvince = async (provinceId) => {
    getDistrict(provinceId);
  };

  React.useEffect(() => {
    if (props.unitAddress) {
      if (props.unitAddress.longitude && props.unitAddress.latitude)
        setGeoCode([props.unitAddress.longitude, props.unitAddress.latitude]);
      setInitLabel(props.unitAddress.address);
      setDistrict([
        ...district,
        {
          id: props.unitAddress.districtId,
          name: props.unitAddress.districtName,
        },
      ]);
    }
  }, [props.unitAddress]);
  return (
    <Row gutter={[8, 8]}>
      <Col sm={{ span: 8, offset: 0 }}>
        <Row>
          <Col sm={{ span: 24, offset: 0 }}>
            <Form.Item
              label={L("ADDRESS")}
              {...formVerticalLayout}
              name={["unitAddress", "address"]}
            >
              <PlaceAutocompleteWithGoong
                initLabel={initLabel}
                onChange={(address) => {
                  setGeoCode([address.longitude, address.latitude]);
                }}
              />
            </Form.Item>
          </Col>
          <Col sm={{ span: 12, offset: 0 }}>
            {L("LONGITUDE")} : {geoCode[0]}
          </Col>
          <Col sm={{ span: 12, offset: 0 }}>
            {L("LATITUDE")} : {geoCode[1]}
          </Col>

          <Col sm={{ span: 24, offset: 0 }} className="my-3">
            <Form.Item
              label={L("CITY")}
              {...formVerticalLayout}
              name={["unitAddress", "provinceId"]}
            >
              <Select
                style={{ width: "100%" }}
                allowClear
                showSearch
                filterOption={filterOptions}
                onChange={changeProvince}
              >
                {renderOptions(province)}
              </Select>
            </Form.Item>
          </Col>
          <Col sm={{ span: 24, offset: 0 }}>
            <Form.Item
              label={L("DISTRICT")}
              {...formVerticalLayout}
              name={["unitAddress", "districtId"]}
            >
              <Select
                style={{ width: "100%" }}
                allowClear
                showSearch
                filterOption={filterOptions}
              >
                {renderOptions(district)}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col sm={{ span: 16, offset: 0 }}>
        <div id="map" style={{ height: 450 }}></div>
      </Col>
    </Row>
  );
};

export default GoongmapInput;
