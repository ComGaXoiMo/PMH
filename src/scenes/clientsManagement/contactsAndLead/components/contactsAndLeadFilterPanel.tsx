import React from "react";
import withRouter from "@components/Layout/Router/withRouter";
import { L } from "@lib/abpUtility";
import { Button, Select } from "antd";
import Col from "antd/lib/col";
import Search from "antd/lib/input/Search";
import Row from "antd/lib/row";

type Props = {
  handleSearch: any;
  filter: any;
  changeTab: any;
  onCreate: () => void;
};

class contactsAndLeadFilterPanel extends React.Component<Props> {
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
              {L("NEW_CONTRACT")}
            </Button>
          </div>
        </Row>
      </>
    );
  }
}

export default withRouter(contactsAndLeadFilterPanel);
