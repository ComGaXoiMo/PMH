import * as React from "react";
import gettColumns from "./components/inquiruesColumn";

import { inject, observer } from "mobx-react";
import UnitFilterPanel from "./components/inquiriesFilterPanel";
import AppConsts from "@lib/appconst";
import { L } from "@lib/abpUtility";
import { Button, Col, Row, Table } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons/lib/icons";
import DataTable from "@components/DataTable";
import { withRouter } from "react-router-dom";
import InquiriesBoardView from "./components/inquiriesBoardView";
// import { Table } from "antd";
const { align } = AppConsts;
import "./components/pipeline-view.less";
import AppDataStore from "@stores/appDataStore";
import Stores from "@stores/storeIdentifier";
import InquiryStore from "@stores/communication/inquiryStore";
import ListingStore from "@stores/projects/listingStore";
import UnitStore from "@stores/projects/unitStore";
export interface IUnitProps {
  history: any;
  appDataStore: AppDataStore;
  inquiryStore: InquiryStore;
  listingStore: ListingStore;
  unitStore: UnitStore;
}

export interface IInquiriesListtate {
  maxResultCount: number;
  skipCount: number;
  filters: any;
  projectProvinces: any[];
  projectId: number;
  visible: boolean;
  title: string;
  tabView: string;
}

@inject(Stores.AppDataStore, Stores.InquiryStore)
@observer
class InquiriesList extends React.Component<any> {
  formRef: any = React.createRef();
  state = {
    maxResultCount: 10,
    skipCount: 0,
    projectId: 0,
    projectProvinces: [],
    filters: {},
    visible: false,
    title: L("CREATE"),
    tabView: "BOARD_VIEW",
  };

  async componentDidMount() {
    await this.getAll();
    await Promise.all([
      this.props.appDataStore.getCountryFull(),
      this.props.appDataStore.getInquiryTypes({}),
      this.props.appDataStore.getPropertyTypes(),
      this.props.appDataStore.getContacts({}),
      this.props.appDataStore.getClients({}),
      this.props.appDataStore.getInquirySourceAndStatus(),
      this.props.unitStore.getFacilities(),
      this.props.unitStore.getFacing(),
      this.props.unitStore.getView(),
    ]);
  }
  getAll = async () => {
    this.props.appDataStore.getInquirySourceAndStatus();
    this.props.inquiryStore.getAll("");
  };
  handleTableChange = (pagination: any) => {
    this.setState(
      { skipCount: (pagination.current - 1) * this.state.maxResultCount! },
      async () => await this.getAll()
    );
  };
  gotoDetail = (id?, title?) => {
    if (id) {
      this.setState({ title: title });
      this.setState({ visible: true });
    } else {
      // this.setState({ idBatch: null })
      this.setState({ visible: true });
    }
  };
  changeTab = async (value) => {
    await this.setState({ tabView: value.target.value });
  };

  public render() {
    const {
      appDataStore: { inquiryStatus },
      inquiryStore: { pageResult },
    } = this.props;
    const columns = gettColumns({
      title: L("ACTIONS"),
      dataIndex: "operation",
      key: "operation",
      align: align.right,
      width: "150px",
      render: (text: string, item: any) => (
        <div>
          {/* {this.isGranted(appPermissions.a.update) && ( */}
          <Button
            size="small"
            className="ml-1"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => this.gotoDetail(item.id, item.name)}
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
        <div>
          <UnitFilterPanel changeTab={this.changeTab} />
          {this.state.tabView === "LIST_VIEW" && (
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
                // dataSource={tableData === undefined ? [] : tableData.items}
                scroll={{ x: 800, y: 500, scrollToFirstRowOnChange: true }}
                bordered
              />
            </DataTable>
          )}
          {this.state.tabView === "BOARD_VIEW" && (
            <Row gutter={[16, 10]} className="mt-3 iqr-wrap-pipeline-flex">
              <Col
                sm={{ span: 24, offset: 0 }}
                className="iqr-pipeline-view-wrapper"
              >
                {inquiryStatus.map((inquiry, index) => (
                  <InquiriesBoardView
                    key={index}
                    data={pageResult.items.filter(
                      (item) => item?.statusId === inquiry.id
                    )}
                    status={inquiry}
                  />
                ))}
              </Col>
            </Row>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(InquiriesList);
