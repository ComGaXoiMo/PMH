import React from "react";
import withRouter from "@components/Layout/Router/withRouter";
import { L } from "@lib/abpUtility";
import { Button, Select } from "antd";
import Col from "antd/lib/col";
import Search from "antd/lib/input/Search";
import Row from "antd/lib/row";
import { AppComponentListBase } from "@components/AppComponentBase";
import { PlusCircleFilled } from "@ant-design/icons";

type Props = {
  handleSearch: any;
  onCreate: () => void;
  filter: any;
};

class DocumentFilterPanel extends AppComponentListBase<Props> {
  constructor(props: Props) {
    super(props);
  }
  state = {};
  componentDidMount() {}

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
          <div style={{ position: "absolute", right: 40 }}>
            <Button
              style={{ borderRadius: "8px", backgroundColor: "#FEC20C" }}
              onClick={() => this.props.onCreate()}
            >
              <PlusCircleFilled />
              {L("ADD_DOC")}
            </Button>
          </div>
        </Row>
      </>
    );
  }
}

export default withRouter(DocumentFilterPanel);
