import React from "react";
import withRouter from "@components/Layout/Router/withRouter";
import { L } from "@lib/abpUtility";
import { Radio, Select } from "antd";
import Col from "antd/lib/col";
import Search from "antd/lib/input/Search";
import Row from "antd/lib/row";
import { AppComponentListBase } from "@components/AppComponentBase";

type Props = {
  handleSearch: any;
  filter: any;
  changeTab: any;
};

const tabKeys = {
  listing: L("LISTING"),
  report: L("REPORT"),
};
class ActivityFilterPanel extends AppComponentListBase<Props> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    selectedType: tabKeys.listing,
  };
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
          <Col sm={{ span: 4, offset: 0 }}>
            <Search size="middle" placeholder={L("FILTER_KEYWORD")} />
          </Col>

          <Col sm={{ span: 3, offset: 0 }}>
            <Select
              placeholder={L("TYPE")}
              style={{ width: "100%" }}
              allowClear
              // showSearch
            ></Select>
          </Col>
          <Col sm={{ span: 12, offset: 0 }}>
            <Radio.Group
              style={{ display: "inline-flex" }}
              onChange={async (value) => {
                await this.setState({ selectedType: value.target.value });
                await this.props.changeTab(value);
              }}
              value={this.state.selectedType}
              buttonStyle="solid"
            >
              <Radio.Button key={tabKeys.listing} value={tabKeys.listing}>
                {tabKeys.listing}
              </Radio.Button>
              <Radio.Button key={tabKeys.report} value={tabKeys.report}>
                {tabKeys.report}
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(ActivityFilterPanel);
