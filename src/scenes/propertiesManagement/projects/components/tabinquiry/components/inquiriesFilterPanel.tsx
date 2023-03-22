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
  boardView: L("BOARD_VIEW"),
  listView: L("LIST_VIEW"),
};
class UnitsFilterPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    selectedType: tabKeys.boardView,
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
        <Row gutter={[4, 8]}>
          <Col sm={{ span: 4, offset: 0 }}>
            <Search size="middle" placeholder={L("FILTER_KEYWORD")} />
          </Col>

          <Col sm={{ span: 2, offset: 0 }}>
            <Select
              placeholder={L("TEAM")}
              style={{ width: "100%" }}
              allowClear
              // showSearch
            ></Select>
          </Col>

          <Col sm={{ span: 2, offset: 0 }}>
            <Select
              placeholder={L("STATUS")}
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
            <Radio.Button key={tabKeys.boardView} value={tabKeys.boardView}>
              {tabKeys.boardView}
            </Radio.Button>
            <Radio.Button key={tabKeys.listView} value={tabKeys.listView}>
              {tabKeys.listView}
            </Radio.Button>
          </Radio.Group>
        </Row>
      </>
    );
  }
}

export default withRouter(UnitsFilterPanel);
