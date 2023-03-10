import React from "react";
import withRouter from "@components/Layout/Router/withRouter";
import { L } from "@lib/abpUtility";
import { Radio, Select } from "antd";
import Col from "antd/lib/col";
import Search from "antd/lib/input/Search";
import Row from "antd/lib/row";

type Props = {
  handleSearch: any;
  filter: any;
  changeTab: any;
};

const tabKeys = {
  shortTerm: "SHORT_TIME",
  longTerm: "LONG_TIME",
};
class ArrivalDeparturesFilterPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    selectedType: "",
  };
  componentDidMount() {
    this.searchTitleOptions("");
  }

  searchTitleOptions = async (keyword?) => {
    // your searchTitleOptions logic here
  };

  changeTab = async (event) => {
    const value = event.target.value;
    console.log("checked", value);
    await this.setState({ selectedType: value });
  };
  render() {
    return (
      <>
        <Row gutter={[4, 8]}>
          <Col sm={{ span: 4, offset: 0 }}>
            <Search size="middle" placeholder={L("FILTER_KEYWORD")} />
          </Col>

          <Col sm={{ span: 2, offset: 0 }}>
            <Select
              placeholder={L("PROJECT")}
              style={{ width: "100%" }}
              allowClear
              // showSearch
            ></Select>
          </Col>
          <Radio.Group
            onChange={async (value) => {
              await this.setState({ selectedType: value.target.value });
              await this.props.changeTab(value);
            }}
            value={this.state.selectedType}
            buttonStyle="solid"
          >
            <Radio.Button key={tabKeys.shortTerm} value={tabKeys.shortTerm}>
              {tabKeys.shortTerm}
            </Radio.Button>
            <Radio.Button key={tabKeys.longTerm} value={tabKeys.longTerm}>
              {tabKeys.longTerm}
            </Radio.Button>
          </Radio.Group>
          <Col sm={{ span: 2, offset: 0 }}>
            <Select
              placeholder={L("TYPE")}
              style={{ width: "100%" }}
              allowClear
              // showSearch
            ></Select>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(ArrivalDeparturesFilterPanel);
