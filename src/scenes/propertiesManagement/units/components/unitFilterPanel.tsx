import React from "react";
import withRouter from "@components/Layout/Router/withRouter";
import { L } from "@lib/abpUtility";
import { Button, Radio, Select } from "antd";
import Col from "antd/lib/col";
import Search from "antd/lib/input/Search";
import Row from "antd/lib/row";
import projectService from "@services/projects/projectService";
import { renderOptions } from "@lib/helper";
import _ from "lodash";

type Props = {
  handleSearch: any;
  tabKeys: any;
  filter: any;
  changeTab: any;
  onCreate: () => void;
};

type States = {
  selectedType: any;
  projectId: number;
  listProject: any[];
};
class UnitsFilterPanel extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    selectedType: this.props.tabKeys.gridView,
    projectId: 0,
    listProject: [],
  };
  componentDidMount = async () => {
    await this.getProject("");
    this.searchTitleOptions("");
  };
  getProject = async (keyword) => {
    const res = await projectService.getAll({
      pageSize: 10,
      pageNumber: 1,
      keyword,
    });
    const newProjects = res.items.map((i) => {
      return { id: i.id, name: i.projectName };
    });
    this.setState({ listProject: newProjects });
  };
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

          {this.state.selectedType === this.props.tabKeys.gridView && (
            <Col sm={{ span: 2, offset: 0 }}>
              <Select
                placeholder={L("TIME")}
                style={{ width: "100%" }}
                allowClear
                // showSearch
              ></Select>
            </Col>
          )}
          {this.state.selectedType === this.props.tabKeys.gridView && (
            <Col sm={{ span: 2, offset: 0 }}>
              <Select
                placeholder={L("PROJECT")}
                filterOption={false}
                className="w-100"
                onChange={(e) => {
                  if (!e) {
                    console.log(e);
                    this.setState({ projectId: 0 });
                    return;
                  }
                  console.log(e);

                  this.setState({ projectId: e });
                  // getFloorResult(e, "");
                }}
                onSearch={(value) => this.getProject(value)}
                allowClear
                showSearch
              >
                {" "}
                {renderOptions(this.state.listProject)}
              </Select>
            </Col>
          )}
          <Col sm={{ span: 2, offset: 0 }}>
            <Select
              placeholder={L("BUILDING")}
              style={{ width: "100%" }}
              allowClear
              // showSearch
            ></Select>
          </Col>
          <Col sm={{ span: 2, offset: 0 }}>
            <Select
              placeholder={L("TYPE")}
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
            <Radio.Button
              key={this.props.tabKeys.gridView}
              value={this.props.tabKeys.gridView}
            >
              {this.props.tabKeys.gridView}
            </Radio.Button>
            <Radio.Button
              key={this.props.tabKeys.listView}
              value={this.props.tabKeys.listView}
            >
              {this.props.tabKeys.listView}
            </Radio.Button>
          </Radio.Group>
          <div style={{ position: "absolute", right: 40 }}>
            <Button
              style={{ borderRadius: "8px", backgroundColor: "#FEC20C" }}
              onClick={() => this.props.onCreate()}
            >
              {L("NEW_UNIT")}
            </Button>
          </div>
        </Row>
      </>
    );
  }
}

export default withRouter(UnitsFilterPanel);
