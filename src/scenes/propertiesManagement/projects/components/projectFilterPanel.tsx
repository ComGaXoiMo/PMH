import withRouter from "@components/Layout/Router/withRouter";
import { L } from "@lib/abpUtility";
import { Button, Select } from "antd";
import Col from "antd/lib/col";
import Search from "antd/lib/input/Search";
import Row from "antd/lib/row";
import React from "react";

type Props = {
  handleSearch: any;
  filter: any;
  onCreate: () => void;
};

const projectsFilterPanel = (props: Props) => {
  const searchTitleOptions = async (keyword?) => {};

  React.useEffect(() => {
    searchTitleOptions("");
  }, []);

  return (
    <Row gutter={[4, 8]}>
      <Col sm={{ span: 4, offset: 0 }}>
        <Search size="middle" placeholder={L("FILTER_KEYWORD")} />
      </Col>
      <Col sm={{ span: 2, offset: 0 }}>
        <Select
          placeholder={L("TYPE")}
          style={{ width: "100%" }}
          allowClear
          // showSearch
        ></Select>
      </Col>
      <div style={{ position: "absolute", right: 40 }}>
        <Button
          style={{ borderRadius: "8px", backgroundColor: "#FEC20C" }}
          onClick={() => props.onCreate()}
        >
          {L("NEW_PROPERTY")}
        </Button>
      </div>
    </Row>
  );
};

export default withRouter(projectsFilterPanel);
