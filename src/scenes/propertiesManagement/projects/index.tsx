import * as React from "react";

import { inject, observer } from "mobx-react";
import { AppComponentListBase } from "@components/AppComponentBase";
import DataTable from "@components/DataTable";
import gettColumns from "./components/projectColumn";
import { Button, Table } from "antd";
import CompanyStore from "@stores/clientManagement/companyStore";
import Stores from "@stores/storeIdentifier";
import withRouter from "@components/Layout/Router/withRouter";
import AppConsts from "@lib/appconst";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { L } from "@lib/abpUtility";
import ProjectFilterPanel from "./components/projectFilterPanel";
import AppDataStore from "@stores/appDataStore";
import { portalLayouts } from "@components/Layout/Router/router.config";
const { align } = AppConsts;
export interface IProjectProps {
  navigate: any;
  companyStore: CompanyStore;
  appDataStore: AppDataStore;
}

export interface IProjectState {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  companyId: number;
}

@inject(Stores.CompanyStore)
@observer
class Projects extends AppComponentListBase<IProjectProps, IProjectState> {
  formRef: any = React.createRef();

  state = {
    maxResultCount: 10,
    skipCount: 0,
    companyId: 0,
    filters: {
      projectId: undefined,
    },
  };

  async componentDidMount() {
    await this.getAll();

    await Promise.all([
      this.props.appDataStore.getClientTypes({}),
      this.props.appDataStore.getIndustries({}),
      this.props.appDataStore.getLeadSources({}),
      this.props.appDataStore.getCountries({}),
    ]);
    await this.props.appDataStore.getIndustries({});
  }
  getAll = async () => {
    await this.props.companyStore.getAll({
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
      isShowInActive: false,
      isShowNotVerified: false,
      // ...this.state.filters,
    });
  };

  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };
  handleFilterChange = (filters) => {
    this.setState({ filters }, this.getAll);
  };
  gotoDetail = (id?) => {
    console.log(id);
    const { navigate } = this.props;
    if (id) {
      navigate(portalLayouts.projectsDetail.path.replace(":id", id));
    } else {
      navigate(portalLayouts.projectsCreate.path);
    }
  };
  public render() {
    const {
      companyStore: { tableData },
    } = this.props;

    const columns = gettColumns({
      title: L("ACTIONS"),
      dataIndex: "operation",
      key: "operation",
      align: align.right,
      width: "10%",
      render: (text: string, item: any) => (
        <div>
          {/* {this.isGranted(appPermissions.a.update) && ( */}
          <Button
            size="small"
            className="ml-1"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => this.gotoDetail(item.id)}
          />
          {/* )} */}
          {/* {this.isGranted(appPermissions.a.delete) && ( */}
          <Button
            size="small"
            className="ml-1"
            shape="circle"
            icon={item.isActive ? <CloseOutlined /> : <CheckOutlined />}
            // onClick={() => this.activateOrDeactivate(item.id, !item.isActive)}
          />
          {/* )} */}
        </div>
      ),
    });
    return (
      <>
        <ProjectFilterPanel />
        <DataTable
          // extraFilterComponent={filterComponent}
          // onRefresh={this.getAll}
          // onCreate={() => this.openOrCloseModal()}
          pagination={{
            pageSize: this.state.maxResultCount,
            total: tableData === undefined ? 0 : tableData.totalCount,
            onChange: this.handleTableChange,
          }}
        >
          <Table
            size="middle"
            className=""
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            dataSource={tableData === undefined ? [] : tableData.items}
            scroll={{ x: 1000, scrollToFirstRowOnChange: true }}
          />
        </DataTable>
      </>
    );
  }
}
export default withRouter(Projects);
