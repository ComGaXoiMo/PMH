import DataTable from "@components/DataTable";
import Filter from "@components/Filter";
import { portalLayouts } from "@components/Layout/Router/router.config";
import { L } from "@lib/abpUtility";
import AppConsts from "@lib/appconst";
import { renderOptions } from "@lib/helper";
import AppDataStore from "@stores/appDataStore";
import InquiryStore from "@stores/communication/inquiryStore";
import UnitStore from "@stores/projects/unitStore";
import Stores from "@stores/storeIdentifier";
import { Col, Row, Select, Table } from "antd";
import Search from "antd/lib/input/Search";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getColumns } from "./column";
const { tableMaxHeight } = AppConsts;
interface Props {
  history: any;
  inquiryStore: InquiryStore;
  unitStore: UnitStore;
  appDataStore: AppDataStore;
}

const Inquiry = inject(
  Stores.InquiryStore,
  Stores.UnitStore,
  Stores.AppDataStore
)(
  observer((props: Props) => {
    const [filter, setFilter] = useState({
      maxResultCount: 10,
      skipCount: 0,
    });
    useEffect(() => {
      const getFilterData = async () => {
        await Promise.all([
          props.appDataStore.getUnitCategories({}),
          props.unitStore?.getFacing(),
          props.unitStore?.getFacilities(),
          props.unitStore?.getView(),
        ]);
      };
      getFilterData();
    }, []);
    useEffect(() => {
      getAll();
    }, [filter]);
    const getAll = async () => {
      await props.inquiryStore.getAll(filter);
    };
    const handleSearch = (name, values) => {
      const newFilter = { ...filter, [name]: values };
      setFilter(newFilter);
    };
    const gotoDetail = (id) => {
      setFilter(filter);
      id
        ? props.history.push(
            portalLayouts.inquiryDetail.path.replace(":id", id)
          )
        : props.history.push(portalLayouts.inquiryCreate.path);
    };
    const keywordPlaceholder = "";
    const handleTableChange = (pagination) => {
      const newFilter = {
        ...filter,
        skipCount: (pagination.current - 1) * filter.maxResultCount,
        maxResultCount: pagination.pageSize,
      };
      setFilter(newFilter);
    };
    const columns = getColumns(gotoDetail, null);
    return (
      <div>
        <Filter handleRefresh={getAll}>
          <Row gutter={16}>
            <Col sm={{ span: 8, offset: 0 }}>
              <label>{L("FILTER_KEYWORD")}</label>
              <Search
                className="w-100"
                placeholder={keywordPlaceholder}
                onSearch={(value) => handleSearch("keyword", value)}
              />
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <label>{L("FILTER_VIEW")}</label>
              <Select
                style={{ width: "100%" }}
                allowClear
                showSearch
                mode="multiple"
                filterOption={false}
                onChange={(value) => handleSearch("viewIds", value)}
              >
                {renderOptions(props.unitStore.view)}
              </Select>
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <label>{L("FILTER_FACILITY")}</label>
              <Select
                style={{ width: "100%" }}
                allowClear
                mode="multiple"
                showSearch
                filterOption={false}
                onChange={(value) => handleSearch("facilityIds", value)}
              >
                {renderOptions(props.unitStore.facilities)}
              </Select>
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <label>{L("FILTER_FACING")}</label>
              <Select
                style={{ width: "100%" }}
                allowClear
                showSearch
                filterOption={false}
                onChange={(value) => handleSearch("facingId", value)}
              >
                {renderOptions(props.unitStore.facing)}
              </Select>
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <label>{L("FILTER_TYPE")}</label>
              <Select
                style={{ width: "100%" }}
                onChange={(value) => handleSearch("typeId", value)}
                allowClear
              >
                {renderOptions(props.appDataStore.unitTypes)}
              </Select>
            </Col>
            <Col sm={{ span: 8, offset: 0 }}>
              <label>{L("FILTER_STATUS")}</label>
              <Select
                style={{ width: "100%" }}
                onChange={(value) => handleSearch("statusId", value)}
                allowClear
              >
                {renderOptions(props.appDataStore.unitStatus)}
              </Select>
            </Col>
          </Row>
        </Filter>
        <DataTable
          title={L("INQUIRY_LIST")}
          pagination={{
            pageSize: filter.maxResultCount,
            total:
              props.inquiryStore.pageResult === undefined
                ? 0
                : props.inquiryStore.pageResult.totalCount,
            onChange: handleTableChange,
          }}
          onCreate={() => gotoDetail(null)}
        >
          <Table
            size="middle"
            className="custom-ant-table"
            // rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            loading={props.inquiryStore.isLoading}
            dataSource={
              props.inquiryStore.pageResult === undefined
                ? []
                : props.inquiryStore.pageResult.items
            }
            scroll={{
              x: 800,
              y: tableMaxHeight,
              scrollToFirstRowOnChange: true,
            }}
          />
        </DataTable>
      </div>
    );
  })
);

export default Inquiry;
