import React from "react";
import withRouter from "@components/Layout/Router/withRouter";
import { L } from "@lib/abpUtility";
import { Button, Select } from "antd";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { AppComponentListBase } from "@components/AppComponentBase";

type Props = {
  handleSearch: any;
  filter: any;
  changeTab: any;
  onCreate: () => void;
};

class InquiriFilter extends AppComponentListBase<Props> {
  constructor(props: Props) {
    super(props);
  }
  state = {};
  componentDidMount() {
    this.searchTitleOptions("");
  }

  searchTitleOptions = async (keyword?) => {
    // your searchTitleOptions logic here
  };

  changeTab = async (event) => {
    const value = event.target.value;
    await this.setState({ selectedType: value });
  };
  render() {
    return (
      <>
        <Row className="mb-3" gutter={[8, 8]}>
          <Col sm={{ span: 3, offset: 0 }}>
            <Select
              placeholder={L("TYPE")}
              style={{ width: "100%" }}
              allowClear
              // showSearch
            ></Select>
          </Col>
          <Col sm={{ span: 3, offset: 0 }}>
            <Select
              placeholder={L("STATUS")}
              style={{ width: "100%" }}
              allowClear
              // showSearch
            ></Select>
          </Col>

          <div style={{ position: "absolute", right: 40 }}>
            <Button
              style={{ borderRadius: "8px", backgroundColor: "#FEC20C" }}
              onClick={() => this.props.onCreate()}
            >
              {L("NEW_INQUIRY")}
            </Button>
          </div>
        </Row>
      </>
    );
  }
}

export default withRouter(InquiriFilter);
