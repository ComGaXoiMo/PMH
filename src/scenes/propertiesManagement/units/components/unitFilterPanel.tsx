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
  handleSearch: (filters) => void;
  tabKeys: any;
  filter: any;
  changeTab: any;
  projectId;
  onCreate: () => void;
};

// type States = {
//   selectedType: any;
//   filters: any;
//   listProject: any[];
// };
class UnitsFilterPanel extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }
  state = {
    selectedType: this.props.tabKeys.listView,
    listProject: [],
    listFloor: [],
    filters: {
      time: "",
      projectId: this.props.projectId,
      floorId: 0,
      typeId: 0,
      statusId: 0,
    },
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
  getFloorResult = async (id, keyword) => {
    const res = await projectService.getFloors(id, {
      pageSize: 20,
      pageNumber: 1,
      keyword,
    });
    this.setState({ listFloor: res });
  };
  searchTitleOptions = async (keyword?) => {
    // your searchTitleOptions logic here
  };
  handleChange = async (name, value) => {
    {
      // this.setState({ [name]: value });
      await this.setState({
        filters: { ...this.state.filters, [name]: value },
      });
      await this.props.handleSearch(this.state.filters);
    }
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
          {!this.props.projectId && (
            <Col sm={{ span: 2, offset: 0 }}>
              <Select
                placeholder={L("PROJECT")}
                filterOption={false}
                className="w-100"
                onChange={(value) => {
                  this.handleChange("projectId", value),
                    this.getFloorResult(value, "");
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
          {this.state.selectedType === this.props.tabKeys.gridView && (
            <Col sm={{ span: 2, offset: 0 }}>
              <Select
                placeholder={L("BUILDING")}
                filterOption={false}
                className="w-100"
                allowClear
                showSearch
                disabled={!this.state.filters?.projectId}
              ></Select>
            </Col>
          )}
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
