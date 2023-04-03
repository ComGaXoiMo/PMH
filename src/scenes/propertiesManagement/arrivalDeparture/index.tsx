import * as React from "react";

import { inject, observer } from "mobx-react";
import DataTable from "@components/DataTable";
import gettColumns from "./components/arrivalDepartureColumn";
import { Table } from "antd";
import ProjectFilterPanel from "./components/arrivalDepartureFilterPanel";
import AppDataStore from "@stores/appDataStore";
import ProjectStore from "@stores/projects/projectStore";
import { withRouter } from "react-router-dom";

export interface IProjectProps {
  history: any;
  appDataStore: AppDataStore;
  projectStore: ProjectStore;
}

export interface IProjectState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  projectId: number;
}

@inject()
@observer
class ArrivalDeparture extends React.Component<any> {
  formRef: any = React.createRef();

  state = {
    maxResultCount: 10,
    skipCount: 0,
    projectId: 0,
    projectProvinces: [],
    filters: {},
  };

  async componentDidMount() {
    await this.getAll();

    await Promise.all([]);
  }
  getAll = async () => {};

  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };
  handleFilterChange = (filters) => {
    this.setState({ filters }, this.getAll);
  };
  gotoDetail = (id) => {};

  public render() {
    const {
      // projectStore: { tableData },
    } = this.props;

    const columns = gettColumns({});
    return (
      <>
        <ProjectFilterPanel />
        <DataTable
          // extraFilterComponent={filterComponent}
          // onRefresh={this.getAll}
          // onCreate={() => this.gotoDetail(null)}
          pagination={{
            pageSize: this.state.maxResultCount,
            // total: tableData === undefined ? 0 : tableData.totalCount,
            onChange: this.handleTableChange,
          }}
        >
          <Table
            size="middle"
            className=""
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            dataSource={dataFake === undefined ? [] : dataFake.items}
            bordered
            scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
          />
        </DataTable>
      </>
    );
  }
}
export default withRouter(ArrivalDeparture);

const dataFake = {
  items: [
    {
      id: 32,
      bookingCode: "29122022 - 01",
      type: "Check - In",
      unit: "2302",
      typesUnit: "2BR",
      propertyManagement: "Mr. Takuda",
      nationality: "JAPANESE",
      date: "3-Feb-23",
      dDate: "4-Feb-23",
      remark: "BILLS TO GUEST - 35% OFF",
    },
    {
      id: 33,
      bookingCode: "29122022 - 01",
      type: "Check - In",
      unit: "2303",
      typesUnit: "2BR",
      propertyManagement: "Ms. Lan",
      nationality: "VIETNAMESE",
      date: "3-Feb-23",
      dDate: "4-Feb-23",
      remark: "BILLS TO GUEST - 35% OFF",
    },
    {
      id: 34,
      bookingCode: "29122022 - 01",
      type: "Check - In",
      unit: "2304",
      typesUnit: "1BR",
      propertyManagement: "Mr. Takuda",
      nationality: "JAPANESE",
      date: "3-Feb-23",
      dDate: "4-Feb-23",
      remark: "BILLS TO GUEST - 35% OFF",
    },
  ],
};
